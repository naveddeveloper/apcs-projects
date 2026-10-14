const SOUND_PATH = "assets/sounds/button-click.mp3";
let soundVolume = 0.7;
let audioContext = null;
let soundBuffer = null;
const audioPool = [];
const POOL_SIZE = 6;
let poolIndex = 0;

function initAudio() {
  for (let i = 0; i < POOL_SIZE; i++) {
    const audio = new Audio(SOUND_PATH);
    audio.preload = "auto";
    audio.volume = soundVolume;
    audioPool.push(audio);
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (AudioContextClass) {
    try {
      audioContext = new AudioContextClass();
      fetch(SOUND_PATH)
        .then((response) => {
          if (!response.ok) throw new Error();
          return response.arrayBuffer();
        })
        .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
        .then((decodedBuffer) => {
          soundBuffer = decodedBuffer;
        })
        .catch(() => {});
    } catch (e) {}
  }
}

function playClickSound() {
  try {
    if (audioContext && soundBuffer) {
      if (audioContext.state === "suspended") {
        audioContext.resume().catch(() => {});
      }
      const source = audioContext.createBufferSource();
      source.buffer = soundBuffer;
      const gainNode = audioContext.createGain();
      gainNode.gain.value = soundVolume;
      gainNode.connect(audioContext.destination);
      source.connect(gainNode);
      source.start(0);
      return;
    }

    if (audioPool.length > 0) {
      const audio = audioPool[poolIndex];
      poolIndex = (poolIndex + 1) % audioPool.length;
      audio.currentTime = 0;
      audio.volume = soundVolume;
      const promise = audio.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    }
  } catch (e) {}
}

function setSoundVolume(volume) {
  const clamped = Math.max(0, Math.min(1, volume));
  soundVolume = clamped;
  audioPool.forEach((audio) => {
    audio.volume = clamped;
  });
}

window.setSoundVolume = setSoundVolume;

let displayResult;
let displayExpression;
let lcdHistoryView;
let historyList;
let btnHistory;
let historyCloseBtn;
let btnBackspace;

let currentNumber = "0";
let previousNumber = null;
let currentOperator = null;
let expressionChain = "";
let displayExpressionText = "";
let shouldResetScreen = false;
const historyData = [];

function formatResult(value) {
  if (!isFinite(value)) {
    return "Error";
  }
  const rounded = parseFloat(value.toPrecision(12));
  return String(rounded);
}

function updateDisplay() {
  if (!displayResult || !displayExpression) return;
  displayResult.textContent = currentNumber;
  displayExpression.textContent = displayExpressionText;

  displayResult.classList.remove("small-text", "tiny-text");
  if (currentNumber.length > 11) {
    displayResult.classList.add("tiny-text");
  } else if (currentNumber.length > 7) {
    displayResult.classList.add("small-text");
  }
}

function triggerButtonEffect(buttonElement) {
  playClickSound();
  if (!buttonElement) return;
  buttonElement.classList.add("is-pressed");
  setTimeout(() => {
    buttonElement.classList.remove("is-pressed");
  }, 150);
}

function appendNumber(digit) {
  if (shouldResetScreen || currentNumber === "Error") {
    currentNumber = digit;
    shouldResetScreen = false;
  } else {
    if (currentNumber === "0") {
      currentNumber = digit;
    } else if (currentNumber.length < 14) {
      currentNumber += digit;
    }
  }
  updateDisplay();
}

function appendDecimal() {
  if (shouldResetScreen || currentNumber === "Error") {
    currentNumber = "0.";
    shouldResetScreen = false;
  } else if (!currentNumber.includes(".")) {
    currentNumber += ".";
  }
  updateDisplay();
}

function performCalculation(first, second, operator) {
  switch (operator) {
    case "+":
      return first + second;
    case "−":
    case "-":
      return first - second;
    case "×":
    case "*":
      return first * second;
    case "÷":
    case "/":
      if (second === 0) {
        return "Error";
      }
      return first / second;
    default:
      return second;
  }
}

function calculateIntermediate() {
  if (currentOperator === null || previousNumber === null) {
    return;
  }
  const first = parseFloat(previousNumber);
  const second = parseFloat(currentNumber);
  if (isNaN(first) || isNaN(second)) {
    return;
  }
  const outcome = performCalculation(first, second, currentOperator);
  if (outcome === "Error") {
    currentNumber = "Error";
    previousNumber = null;
    currentOperator = null;
    expressionChain = "";
    displayExpressionText = "";
    shouldResetScreen = true;
  } else {
    currentNumber = formatResult(outcome);
    previousNumber = currentNumber;
  }
}

function setOperator(operator) {
  if (currentNumber === "Error") {
    return;
  }
  if (shouldResetScreen && previousNumber !== null) {
    currentOperator = operator;
    expressionChain = expressionChain.slice(0, -1) + operator;
    displayExpressionText = expressionChain;
    updateDisplay();
    return;
  }
  const typedNumber = currentNumber;
  if (currentOperator !== null && !shouldResetScreen) {
    calculateIntermediate();
  }
  previousNumber = currentNumber;
  currentOperator = operator;
  if (!expressionChain) {
    expressionChain = typedNumber + operator;
  } else {
    expressionChain = expressionChain + typedNumber + operator;
  }
  displayExpressionText = expressionChain;
  shouldResetScreen = true;
  updateDisplay();
}

function calculate() {
  if (currentOperator === null || previousNumber === null || currentNumber === "Error") {
    return;
  }
  const first = parseFloat(previousNumber);
  const second = parseFloat(currentNumber);
  if (isNaN(first) || isNaN(second)) {
    return;
  }
  const outcome = performCalculation(first, second, currentOperator);
  const finalExpression = expressionChain
    ? expressionChain + currentNumber
    : previousNumber + currentOperator + currentNumber;

  if (outcome === "Error") {
    currentNumber = "Error";
    displayExpressionText = finalExpression;
    previousNumber = null;
    currentOperator = null;
    expressionChain = "";
    shouldResetScreen = true;
    updateDisplay();
    return;
  }

  const formattedResult = formatResult(outcome);
  saveHistory(finalExpression, formattedResult);
  displayExpressionText = finalExpression;
  currentNumber = formattedResult;
  previousNumber = null;
  currentOperator = null;
  expressionChain = "";
  shouldResetScreen = true;
  updateDisplay();
}

function clearCalculator() {
  currentNumber = "0";
  previousNumber = null;
  currentOperator = null;
  expressionChain = "";
  displayExpressionText = "";
  shouldResetScreen = false;
  updateDisplay();
}

function toggleSign() {
  if (currentNumber === "0" || currentNumber === "Error") {
    return;
  }
  if (currentNumber.startsWith("-")) {
    currentNumber = currentNumber.slice(1);
  } else {
    currentNumber = "-" + currentNumber;
  }
  updateDisplay();
}

function handlePercent() {
  if (currentNumber === "Error") {
    return;
  }
  const current = parseFloat(currentNumber);
  if (isNaN(current)) {
    return;
  }
  let outcome;
  if (previousNumber !== null && currentOperator !== null) {
    const prev = parseFloat(previousNumber);
    outcome = (prev * current) / 100;
  } else {
    outcome = current / 100;
  }
  currentNumber = formatResult(outcome);
  updateDisplay();
}

function deleteLastDigit() {
  if (currentNumber === "Error" || shouldResetScreen) {
    return;
  }
  if (currentNumber.length > 1) {
    currentNumber = currentNumber.slice(0, -1);
    if (currentNumber === "-") {
      currentNumber = "0";
    }
  } else {
    currentNumber = "0";
  }
  updateDisplay();
}

function saveHistory(expressionText, resultText) {
  historyData.unshift({
    expression: expressionText,
    result: resultText,
  });
  if (historyData.length > 8) {
    historyData.pop();
  }
}

function renderHistoryList() {
  if (!historyList) return;
  historyList.innerHTML = "";
  if (historyData.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "history-empty";
    emptyItem.textContent = "No history";
    historyList.appendChild(emptyItem);
    return;
  }
  historyData.forEach((item) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.textContent = item.expression + " = " + item.result;
    li.addEventListener("click", () => {
      currentNumber = item.result;
      displayExpressionText = item.expression;
      shouldResetScreen = true;
      closeHistory();
      updateDisplay();
    });
    historyList.appendChild(li);
  });
}

function toggleHistory() {
  if (!lcdHistoryView) return;
  const isHidden = !lcdHistoryView.classList.contains("is-open");
  if (isHidden) {
    renderHistoryList();
    lcdHistoryView.classList.add("is-open");
    lcdHistoryView.removeAttribute("hidden");
  } else {
    closeHistory();
  }
}

function closeHistory() {
  if (!lcdHistoryView) return;
  lcdHistoryView.classList.remove("is-open");
  lcdHistoryView.setAttribute("hidden", "");
}

function handleButtonClick(button) {
  if (!button) return;
  button.blur();
  triggerButtonEffect(button);
  if (button.dataset.number !== undefined) {
    appendNumber(button.dataset.number);
  } else if (button.dataset.operator !== undefined) {
    setOperator(button.dataset.operator);
  } else if (button.dataset.action === "decimal") {
    appendDecimal();
  } else if (button.dataset.action === "clear") {
    clearCalculator();
  } else if (button.dataset.action === "toggle-sign") {
    toggleSign();
  } else if (button.dataset.action === "percent") {
    handlePercent();
  } else if (button.dataset.action === "calculate") {
    calculate();
  } else if (button.id === "btnBackspace" || button.dataset.utility === "backspace") {
    deleteLastDigit();
  } else if (button.id === "btnHistory" || button.dataset.utility === "history") {
    toggleHistory();
  }
}

function handleKeyDown(event) {
  let digit = null;
  if (event.key >= "0" && event.key <= "9") {
    digit = event.key;
  } else if (event.code && /^Numpad[0-9]$/.test(event.code)) {
    digit = event.code.replace("Numpad", "");
  } else if (event.code && /^Digit[0-9]$/.test(event.code)) {
    digit = event.code.replace("Digit", "");
  }

  if (digit !== null) {
    appendNumber(digit);
    const btn = document.querySelector(`.btn-number[data-number="${digit}"]`);
    triggerButtonEffect(btn);
    return;
  }

  if (
    event.key === "." ||
    event.key === "," ||
    event.code === "NumpadDecimal"
  ) {
    appendDecimal();
    const btn = document.querySelector('.btn-number[data-action="decimal"]');
    triggerButtonEffect(btn);
    return;
  }

  if (
    event.key === "+" ||
    event.code === "NumpadAdd"
  ) {
    setOperator("+");
    const btn = document.querySelector('.btn-operator[data-operator="+"]');
    triggerButtonEffect(btn);
    return;
  }

  if (
    event.key === "-" ||
    event.code === "NumpadSubtract"
  ) {
    setOperator("−");
    const btn = document.querySelector('.btn-operator[data-operator="−"]');
    triggerButtonEffect(btn);
    return;
  }

  if (
    event.key === "*" ||
    event.key === "x" ||
    event.key === "X" ||
    event.code === "NumpadMultiply"
  ) {
    setOperator("×");
    const btn = document.querySelector('.btn-operator[data-operator="×"]');
    triggerButtonEffect(btn);
    return;
  }

  if (
    event.key === "/" ||
    event.code === "NumpadDivide"
  ) {
    if (event.preventDefault) event.preventDefault();
    setOperator("÷");
    const btn = document.querySelector('.btn-operator[data-operator="÷"]');
    triggerButtonEffect(btn);
    return;
  }

  if (
    event.key === "Enter" ||
    event.key === "=" ||
    event.code === "NumpadEnter"
  ) {
    if (event.preventDefault) event.preventDefault();
    calculate();
    const btn = document.querySelector(".btn-equals");
    triggerButtonEffect(btn);
    return;
  }

  if (
    event.key === "Backspace" ||
    (event.key === "Delete" && event.code === "NumpadDecimal")
  ) {
    if (event.preventDefault) event.preventDefault();
    deleteLastDigit();
    triggerButtonEffect(btnBackspace);
    return;
  }

  if (
    event.key === "Escape" ||
    event.key === "c" ||
    event.key === "C" ||
    event.key === "Delete" ||
    event.code === "NumpadClear"
  ) {
    clearCalculator();
    const btn = document.querySelector(".btn-clear");
    triggerButtonEffect(btn);
    return;
  }

  if (event.key === "%") {
    handlePercent();
    const btn = document.querySelector('.btn-function[data-action="percent"]');
    triggerButtonEffect(btn);
    return;
  }
}

function initCalculator() {
  initAudio();
  displayResult = document.getElementById("displayResult");
  displayExpression = document.getElementById("displayExpression");
  lcdHistoryView = document.getElementById("lcdHistoryView");
  historyList = document.getElementById("historyList");
  btnHistory = document.getElementById("btnHistory");
  historyCloseBtn = document.getElementById("historyCloseBtn");
  btnBackspace = document.getElementById("btnBackspace");

  const keypadPanel = document.querySelector(".keypad-panel");
  if (keypadPanel) {
    keypadPanel.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (button) {
        handleButtonClick(button);
      }
    });
  }

  const utilityRow = document.querySelector(".utility-row");
  if (utilityRow) {
    utilityRow.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (button) {
        handleButtonClick(button);
      }
    });
  }

  if (historyCloseBtn) {
    historyCloseBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      historyCloseBtn.blur();
      triggerButtonEffect(historyCloseBtn);
      closeHistory();
    });
  }

  document.removeEventListener("keydown", handleKeyDown);
  document.addEventListener("keydown", handleKeyDown);

  updateDisplay();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCalculator);
} else {
  initCalculator();
}
