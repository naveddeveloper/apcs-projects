const QUIZ_DATA = {
  html: {
    id: "html",
    title: "HTML Quiz",
    questions: [
      {
        id: 1,
        text: "What is the primary function of the <!DOCTYPE html> declaration at the beginning of an HTML document?",
        options: [
          "It imports the core HTML library from the browser's internal engine",
          "It informs the browser to render the document in modern standards mode using HTML5 specifications",
          "It acts as the root container holding all head and body tags",
          "It links external CSS stylesheets automatically"
        ],
        correctAnswer: "It informs the browser to render the document in modern standards mode using HTML5 specifications",
        correct: "It informs the browser to render the document in modern standards mode using HTML5 specifications",
        explanation: "The <!DOCTYPE html> declaration tells modern web browsers to parse and render the document according to current HTML5 standards rather than entering legacy quirks mode.",
        topic: "Document Structure"
      },
      {
        id: 2,
        text: "Which HTML5 semantic element is designated specifically for content that is standalone, syndicatable, and reusable independently, such as a blog post or news story?",
        options: [
          "<main>",
          "<section>",
          "<article>",
          "<aside>"
        ],
        correctAnswer: "<article>",
        correct: "<article>",
        explanation: "The <article> element is intended for self-contained compositions in a document, page, or site that could in principle be independently distributable or reusable.",
        topic: "Semantic Elements"
      },
      {
        id: 3,
        text: "According to web accessibility and SEO standards, how many <h1> heading elements should generally be present as the primary title of a single web page?",
        options: [
          "Exactly one <h1> per page representing the primary page topic",
          "One <h1> per section or container indefinitely",
          "Up to five <h1> tags per page",
          "As many as needed without any hierarchy rules"
        ],
        correctAnswer: "Exactly one <h1> per page representing the primary page topic",
        correct: "Exactly one <h1> per page representing the primary page topic",
        explanation: "Best practices in accessibility and SEO dictate using a single <h1> element per page to represent the document's main heading, followed by properly nested <h2> through <h6> subtitles.",
        topic: "Headings & Structure"
      },
      {
        id: 4,
        text: "When creating a hyperlink that opens in a new browser tab using target=\"_blank\", which attribute pairing should be included for security and performance protection?",
        options: [
          "target=\"_newtab\"",
          "security=\"sandbox\"",
          "protect=\"external\"",
          "rel=\"noopener noreferrer\""
        ],
        correctAnswer: "rel=\"noopener noreferrer\"",
        correct: "rel=\"noopener noreferrer\"",
        explanation: "Adding rel=\"noopener noreferrer\" prevents the newly opened page from accessing the origin page via window.opener, mitigating reverse tabnabbing security vulnerabilities.",
        topic: "Links & Security"
      },
      {
        id: 5,
        text: "Why is the alt attribute on the <img> element critical for web accessibility?",
        options: [
          "It controls the displayed pixel dimensions of the image on retina screens",
          "It provides equivalent textual context for screen readers when images fail to load or cannot be viewed",
          "It is required by the browser to apply CSS background filters",
          "It allows the image to be cached in browser localStorage"
        ],
        correctAnswer: "It provides equivalent textual context for screen readers when images fail to load or cannot be viewed",
        correct: "It provides equivalent textual context for screen readers when images fail to load or cannot be viewed",
        explanation: "The alt attribute conveys the functional meaning of an image to assistive technology users and displays fallback text if the image file cannot be retrieved.",
        topic: "Images & Accessibility"
      },
      {
        id: 6,
        text: "Which attribute correctly links an HTML <label> element to its corresponding <input> control for keyboard accessibility and click targeting?",
        options: [
          "The label's target attribute matching the input's class attribute",
          "The label's name attribute matching the input's name attribute",
          "The label's for attribute matching the input's id attribute",
          "The label's id attribute matching the input's value attribute"
        ],
        correctAnswer: "The label's for attribute matching the input's id attribute",
        correct: "The label's for attribute matching the input's id attribute",
        explanation: "Setting the label's for attribute to match the input element's unique id creates an explicit programmatic link that screen readers announce and that allows clicking the label to focus the input.",
        topic: "Forms & Labels"
      },
      {
        id: 7,
        text: "Which HTML5 input type automatically enforces client-side format validation for email addresses when submitted within a <form>?",
        options: [
          "<input type=\"mail\">",
          "<input type=\"text\" validate=\"email\">",
          "<input type=\"address\">",
          "<input type=\"email\">"
        ],
        correctAnswer: "<input type=\"email\">",
        correct: "<input type=\"email\">",
        explanation: "The <input type=\"email\"> element triggers native browser validation ensuring the entered string conforms to standard email format patterns before submitting the form.",
        topic: "Forms & Validation"
      },
      {
        id: 8,
        text: "What is the proper semantic HTML element used to group related input fields and their labels together inside a complex form?",
        options: [
          "<fieldset>",
          "<group>",
          "<formgroup>",
          "<section>"
        ],
        correctAnswer: "<fieldset>",
        correct: "<fieldset>",
        explanation: "The <fieldset> element is used to group several controls and labels within a web form, often accompanied by a <legend> element as the caption.",
        topic: "Forms & Accessibility"
      },
      {
        id: 9,
        text: "Which HTML list element represents a description or definition list containing pairs of terms and descriptions?",
        options: [
          "<ul>",
          "<ol>",
          "<dl>",
          "<list>"
        ],
        correctAnswer: "<dl>",
        correct: "<dl>",
        explanation: "A <dl> element encloses a description list composed of term items (<dt>) and corresponding description items (<dd>).",
        topic: "Lists"
      },
      {
        id: 10,
        text: "In an accessible HTML table, which tag and attribute should be used for header cells that represent columns?",
        options: [
          "<td header=\"col\">",
          "<th scope=\"col\">",
          "<tr type=\"header\">",
          "<col role=\"header\">"
        ],
        correctAnswer: "<th scope=\"col\">",
        correct: "<th scope=\"col\">",
        explanation: "The <th> tag with scope=\"col\" explicitly designates the cell as a column header, helping assistive screen readers announce header titles during cell navigation.",
        topic: "Tables & Accessibility"
      },
      {
        id: 11,
        text: "What is the purpose of custom data attributes (attributes prefixed with data-*) in HTML5?",
        options: [
          "They store proprietary private data custom to the page or application without affecting rendering",
          "They serve as mandatory database schema identifiers for backend APIs",
          "They replace standard CSS classes for layout positioning",
          "They encrypt form inputs before transmission"
        ],
        correctAnswer: "They store proprietary private data custom to the page or application without affecting rendering",
        correct: "They store proprietary private data custom to the page or application without affecting rendering",
        explanation: "HTML5 data-* attributes allow developers to embed custom data attributes on all HTML elements, easily accessible in JavaScript via element.dataset.",
        topic: "Attributes"
      },
      {
        id: 12,
        text: "Which semantic pair of HTML elements should be used to display an illustration, diagram, or code snippet with an associated caption?",
        options: [
          "<graphic> and <details>",
          "<picture> and <label>",
          "<media> and <caption>",
          "<figure> and <figcaption>"
        ],
        correctAnswer: "<figure> and <figcaption>",
        correct: "<figure> and <figcaption>",
        explanation: "The <figure> element represents self-contained content, optionally with a caption specified using the <figcaption> element.",
        topic: "Semantic Elements"
      },
      {
        id: 13,
        text: "What does the required boolean attribute indicate when placed on an HTML <input> element?",
        options: [
          "The input must contain a numerical value exclusively",
          "The field is permanently disabled and cannot receive user input",
          "The form cannot be submitted until the user provides a valid non-empty value for that input",
          "The field's value will be saved automatically in browser cookies"
        ],
        correctAnswer: "The form cannot be submitted until the user provides a valid non-empty value for that input",
        correct: "The form cannot be submitted until the user provides a valid non-empty value for that input",
        explanation: "The required attribute specifies that an input field must be filled out before submitting the form, initiating browser-native constraint validation.",
        topic: "Forms & Attributes"
      },
      {
        id: 14,
        text: "What is the difference between the defer and async attributes when loading external JavaScript scripts via the <script> tag?",
        options: [
          "defer blocks HTML parsing entirely while async runs in a background web worker",
          "defer executes scripts after HTML parsing is complete in DOM order, whereas async executes as soon as downloaded",
          "async only works for module scripts whereas defer works for inline script tags",
          "defer is deprecated in HTML5 in favor of async exclusively"
        ],
        correctAnswer: "defer executes scripts after HTML parsing is complete in DOM order, whereas async executes as soon as downloaded",
        correct: "defer executes scripts after HTML parsing is complete in DOM order, whereas async executes as soon as downloaded",
        explanation: "Both attributes download scripts asynchronously without blocking HTML parsing. However, defer guarantees execution order after document parsing finishes, while async executes immediately upon download.",
        topic: "Script Loading"
      },
      {
        id: 15,
        text: "Which <meta> tag configuration is essential in the <head> section to ensure responsive scaling across mobile devices?",
        options: [
          "<meta name=\"screen-scale\" content=\"standard\">",
          "<meta name=\"responsive\" content=\"true\">",
          "<meta name=\"device\" content=\"mobile-first\">",
          "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
        ],
        correctAnswer: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
        correct: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
        explanation: "The viewport meta tag instructs mobile browsers to match the virtual viewport width to the device's physical screen width and sets the initial zoom level to 100%.",
        topic: "Responsive Metadata"
      }
    ]
  },
  css: {
    id: "css",
    title: "CSS Quiz",
    questions: [
      {
        id: 1,
        text: "In the CSS Box Model, what components make up the total calculation from inside to outside?",
        options: [
          "Content, Margin, Border, Padding",
          "Content, Padding, Border, Margin",
          "Padding, Content, Border, Outline",
          "Margin, Border, Content, Padding"
        ],
        correctAnswer: "Content, Padding, Border, Margin",
        correct: "Content, Padding, Border, Margin",
        explanation: "The CSS box model consists of the innermost Content box, surrounded by Padding, wrapped by the Border, and bounded externally by Margin.",
        topic: "Box Model"
      },
      {
        id: 2,
        text: "What is the effect of applying box-sizing: border-box to an element?",
        options: [
          "The element's width is strictly determined by its content text alone",
          "The margin of the element is added inside the border perimeter",
          "Padding and border are included within the specified width and height of the element",
          "The element turns into an inline-level container automatically"
        ],
        correctAnswer: "Padding and border are included within the specified width and height of the element",
        correct: "Padding and border are included within the specified width and height of the element",
        explanation: "With box-sizing: border-box, the width and height properties include content, padding, and border. Adding padding or borders does not increase the element's rendered width.",
        topic: "Box Model"
      },
      {
        id: 3,
        text: "Which of the following selectors has the highest specificity score when resolving CSS conflicts?",
        options: [
          "#main-nav (ID selector)",
          ".nav-item.active (two class selectors)",
          "header nav ul li a (five element selectors)",
          "a:hover (one element and one pseudo-class)"
        ],
        correctAnswer: "#main-nav (ID selector)",
        correct: "#main-nav (ID selector)",
        explanation: "ID selectors carry a specificity weight of (0,1,0,0), which outweighs any quantity of classes (0,0,1,0) or element selectors (0,0,0,1).",
        topic: "Specificity"
      },
      {
        id: 4,
        text: "In Flexbox, which container property aligns flex items along the main axis?",
        options: [
          "flex-direction",
          "align-items",
          "align-content",
          "justify-content"
        ],
        correctAnswer: "justify-content",
        correct: "justify-content",
        explanation: "The justify-content property defines how the browser distributes space between and around flex items along the main axis of their container.",
        topic: "Flexbox"
      },
      {
        id: 5,
        text: "In Flexbox, which container property aligns items along the cross axis (perpendicular to the main axis)?",
        options: [
          "justify-content",
          "align-items",
          "justify-items",
          "flex-wrap"
        ],
        correctAnswer: "align-items",
        correct: "align-items",
        explanation: "The align-items property sets the default alignment for all flex items along the cross axis of the current flex line.",
        topic: "Flexbox"
      },
      {
        id: 6,
        text: "What does the fr unit represent in CSS Grid layout?",
        options: [
          "A font-relative unit equivalent to 1em",
          "A fixed frame pixel measurement tied to display DPI",
          "A fraction of the available free space in the grid container",
          "A frequency refresh interval for animations"
        ],
        correctAnswer: "A fraction of the available free space in the grid container",
        correct: "A fraction of the available free space in the grid container",
        explanation: "The fr unit represents a fraction of the remaining flexible space in the grid container after non-flexible tracks and gaps are accounted for.",
        topic: "CSS Grid"
      },
      {
        id: 7,
        text: "Which CSS Grid property shorthand defines both the column and row gutter spacing between grid cells?",
        options: [
          "track-padding",
          "grid-spacing",
          "cell-margin",
          "gap"
        ],
        correctAnswer: "gap",
        correct: "gap",
        explanation: "The gap property (previously grid-gap) sets the gutters between rows and columns in grid and flex layouts.",
        topic: "CSS Grid"
      },
      {
        id: 8,
        text: "How does an element with position: absolute behave regarding its positioning context?",
        options: [
          "It is removed from the normal document flow and positioned relative to its closest positioned ancestor",
          "It is positioned strictly relative to the browser viewport at all times",
          "It remains in normal flow but can be offset with top, right, bottom, and left",
          "It locks to the bottom of its parent regardless of scrolling"
        ],
        correctAnswer: "It is removed from the normal document flow and positioned relative to its closest positioned ancestor",
        correct: "It is removed from the normal document flow and positioned relative to its closest positioned ancestor",
        explanation: "An element with position: absolute is removed from normal flow and positioned relative to the nearest ancestor element whose position is not static.",
        topic: "Positioning"
      },
      {
        id: 9,
        text: "What occurs during vertical 'margin collapsing' in standard block layout?",
        options: [
          "Vertical margins become zero if padding is present",
          "The margins add together into a double-width margin",
          "Adjoining vertical margins of block boxes combine into a single margin equal to the maximum of the two",
          "Margins wrap horizontally into inline space"
        ],
        correctAnswer: "Adjoining vertical margins of block boxes combine into a single margin equal to the maximum of the two",
        correct: "Adjoining vertical margins of block boxes combine into a single margin equal to the maximum of the two",
        explanation: "Margin collapse occurs when adjacent top and bottom margins of normal flow block elements merge into a single margin whose size is the largest of the individual margins.",
        topic: "Margin Collapse"
      },
      {
        id: 10,
        text: "What is the key difference between the rem unit and the em unit in CSS font sizing?",
        options: [
          "rem is a fixed physical pixel unit, while em is responsive to viewport width",
          "rem is relative to the root (<html>) font-size, while em is relative to the parent element's font-size",
          "rem only applies to margins, while em only applies to font sizes",
          "rem inherits multiplicatively through nested children while em does not"
        ],
        correctAnswer: "rem is relative to the root (<html>) font-size, while em is relative to the parent element's font-size",
        correct: "rem is relative to the root (<html>) font-size, while em is relative to the parent element's font-size",
        explanation: "The rem (root em) unit is always calculated relative to the font-size of the root <html> element, preventing compound inheritance issues common with nested em units.",
        topic: "Units & Sizing"
      },
      {
        id: 11,
        text: "Which CSS media query syntax correctly targets viewport widths of 768 pixels or narrower?",
        options: [
          "@media (max-width: 768px)",
          "@media (min-width: 768px)",
          "@media (screen-width <= 768)",
          "@media screen and (device-width: 768px)"
        ],
        correctAnswer: "@media (max-width: 768px)",
        correct: "@media (max-width: 768px)",
        explanation: "The @media (max-width: 768px) rule applies the contained styles only when the viewport width is less than or equal to 768 pixels.",
        topic: "Media Queries"
      },
      {
        id: 12,
        text: "What does the pseudo-class :nth-child(2n) or :nth-child(even) select?",
        options: [
          "Elements with double margin borders",
          "Only the second child element inside each container",
          "Elements that have exactly two child nodes",
          "Every even-numbered sibling element among its parent's children"
        ],
        correctAnswer: "Every even-numbered sibling element among its parent's children",
        correct: "Every even-numbered sibling element among its parent's children",
        explanation: "The :nth-child(2n) or :nth-child(even) pseudo-class matches elements based on their 1-indexed sibling position that correspond to even numbers (2, 4, 6, etc.).",
        topic: "Pseudo-classes"
      },
      {
        id: 13,
        text: "Which CSS property specifies what happens if content overflows outside an element's designated box dimensions?",
        options: [
          "contain",
          "display",
          "overflow",
          "clip-path"
        ],
        correctAnswer: "overflow",
        correct: "overflow",
        explanation: "The overflow property (with values visible, hidden, scroll, auto) determines whether to clip content or add scrollbars when an element's content exceeds its boundaries.",
        topic: "Overflow"
      },
      {
        id: 14,
        text: "What is the primary difference between pseudo-classes (:hover) and pseudo-elements (::before)?",
        options: [
          "Pseudo-classes create new HTML DOM nodes, while pseudo-elements do not",
          "Pseudo-classes target an element state, while pseudo-elements style or insert a specific sub-part of an element",
          "Pseudo-elements only work on hyperlinks",
          "Pseudo-classes cannot be combined with class selectors"
        ],
        correctAnswer: "Pseudo-classes target an element state, while pseudo-elements style or insert a specific sub-part of an element",
        correct: "Pseudo-classes target an element state, while pseudo-elements style or insert a specific sub-part of an element",
        explanation: "A pseudo-class (single colon) selects elements based on their state (e.g. :hover, :focus), while a pseudo-element (double colon) styles abstractions of the document tree (e.g. ::before, ::after).",
        topic: "Pseudo-classes & Elements"
      },
      {
        id: 15,
        text: "What is the behavior of an element styled with position: sticky?",
        options: [
          "It cannot have margins or padding applied",
          "It is permanently glued to the center of the viewport",
          "It floats over other elements without respecting z-index",
          "It is treated as relative until it crosses a specified scroll threshold, where it behaves as fixed"
        ],
        correctAnswer: "It is treated as relative until it crosses a specified scroll threshold, where it behaves as fixed",
        correct: "It is treated as relative until it crosses a specified scroll threshold, where it behaves as fixed",
        explanation: "An element with position: sticky toggles between relative and fixed positioning depending on the user's scroll position relative to its containing block.",
        topic: "Positioning"
      }
    ]
  },
  js: {
    id: "js",
    title: "JavaScript Quiz",
    questions: [
      {
        id: 1,
        text: "Which of the following is NOT a primitive data type in modern JavaScript?",
        options: [
          "Symbol",
          "Array",
          "BigInt",
          "Undefined"
        ],
        correctAnswer: "Array",
        correct: "Array",
        explanation: "In JavaScript, primitive types are Number, String, Boolean, Undefined, Null, Symbol, and BigInt. Arrays are reference types (specialized Object instances).",
        topic: "Data Types"
      },
      {
        id: 2,
        text: "What is the fundamental difference between variable declarations made with let and those made with const?",
        options: [
          "const variables are automatically immutable and freeze object contents",
          "let is block-scoped while const is function-scoped",
          "let variables can be reassigned to a new value, while const bindings cannot be reassigned",
          "let variables are hoisted to window while const variables are not"
        ],
        correctAnswer: "let variables can be reassigned to a new value, while const bindings cannot be reassigned",
        correct: "let variables can be reassigned to a new value, while const bindings cannot be reassigned",
        explanation: "Both let and const provide block scoping, but const creates a read-only binding that cannot be reassigned after declaration. Note that object properties inside a const object can still be mutated.",
        topic: "Variables & Scope"
      },
      {
        id: 3,
        text: "What is the Temporal Dead Zone (TDZ) in JavaScript?",
        options: [
          "The period between entering block scope and variable initialization where accessing let or const throws a ReferenceError",
          "The pause time during asynchronous Promise execution",
          "The interval when garbage collection freezes main thread execution",
          "The time window before setTimeout callbacks are pushed to the microtask queue"
        ],
        correctAnswer: "The period between entering block scope and variable initialization where accessing let or const throws a ReferenceError",
        correct: "The period between entering block scope and variable initialization where accessing let or const throws a ReferenceError",
        explanation: "The Temporal Dead Zone refers to the region of code from the start of a block until a let or const variable declaration is evaluated; accessing it prior to declaration throws a ReferenceError.",
        topic: "Variables & Scope"
      },
      {
        id: 4,
        text: "Which array method creates a new array containing all elements that pass a test implemented by the provided callback function?",
        options: [
          "reduce()",
          "map()",
          "find()",
          "filter()"
        ],
        correctAnswer: "filter()",
        correct: "filter()",
        explanation: "The filter() method iterates over an array and constructs a new array with all elements that return a truthy value when passed to the callback test function.",
        topic: "Array Methods"
      },
      {
        id: 5,
        text: "What does the reduce() array method do?",
        options: [
          "It reduces the array's length by half",
          "It executes a reducer function on each array element, accumulating the results into a single output value",
          "It sorts the array in descending numerical order",
          "It removes falsy values from an array"
        ],
        correctAnswer: "It executes a reducer function on each array element, accumulating the results into a single output value",
        correct: "It executes a reducer function on each array element, accumulating the results into a single output value",
        explanation: "reduce() runs an accumulator function over each element of an array in order, passing in the return value from the calculation on the preceding element to produce a single aggregated value.",
        topic: "Array Methods"
      },
      {
        id: 6,
        text: "What is the key difference between strict equality (===) and loose equality (==) in JavaScript?",
        options: [
          "=== is only valid for strings while == is for numbers",
          "== compares object references while === compares object values",
          "=== checks both value and type without performing type coercion, while == performs type coercion before comparison",
          "There is no difference in ES6"
        ],
        correctAnswer: "=== checks both value and type without performing type coercion, while == performs type coercion before comparison",
        correct: "=== checks both value and type without performing type coercion, while == performs type coercion before comparison",
        explanation: "Strict equality (===) checks whether two operands are of the same type and have the same value, whereas loose equality (==) coerces operands to matching types before comparing.",
        topic: "Equality & Coercion"
      },
      {
        id: 7,
        text: "Which DOM method returns a non-live NodeList matching all elements in the document that satisfy a specified CSS selector string?",
        options: [
          "document.findElements()",
          "document.getElementsByClassName()",
          "document.querySelector()",
          "document.querySelectorAll()"
        ],
        correctAnswer: "document.querySelectorAll()",
        correct: "document.querySelectorAll()",
        explanation: "document.querySelectorAll() returns a static (non-live) NodeList containing all elements matching the given CSS selector, unlike getElementsByClassName which returns a live HTMLCollection.",
        topic: "DOM Selection"
      },
      {
        id: 8,
        text: "What does event.preventDefault() do when called inside an event listener callback?",
        options: [
          "It cancels the default browser action typically associated with the event (e.g. form submission or link navigation)",
          "It stops the event from bubbling up the DOM hierarchy to parent elements",
          "It removes the event listener immediately after one execution",
          "It prevents errors from appearing in the browser console"
        ],
        correctAnswer: "It cancels the default browser action typically associated with the event (e.g. form submission or link navigation)",
        correct: "It cancels the default browser action typically associated with the event (e.g. form submission or link navigation)",
        explanation: "event.preventDefault() instructs the browser not to execute its default native action (such as reloading the page on form submission or following an <a> link).",
        topic: "Events"
      },
      {
        id: 9,
        text: "What is the difference between event bubbling and event capturing?",
        options: [
          "Bubbling is handled by CSS, while capturing is handled by JavaScript",
          "Bubbling only occurs on click events, while capturing applies to keyboard events",
          "Capturing travels down from the window to the target element, while bubbling propagates upward from target to window",
          "Capturing was removed in modern web standards"
        ],
        correctAnswer: "Capturing travels down from the window to the target element, while bubbling propagates upward from target to window",
        correct: "Capturing travels down from the window to the target element, while bubbling propagates upward from target to window",
        explanation: "The DOM event flow has three phases: capturing (traveling from window down through ancestors to target), target phase, and bubbling (propagating upward back to window).",
        topic: "Events"
      },
      {
        id: 10,
        text: "What is an arrow function's behavior regarding the this keyword compared to a standard function declaration?",
        options: [
          "Arrow functions always bind this to the global window object",
          "Arrow functions do not bind their own this; they inherit this lexically from their enclosing scope",
          "Arrow functions create a brand new this context upon every invocation",
          "Arrow functions require this to be explicitly passed as the first parameter"
        ],
        correctAnswer: "Arrow functions do not bind their own this; they inherit this lexically from their enclosing scope",
        correct: "Arrow functions do not bind their own this; they inherit this lexically from their enclosing scope",
        explanation: "Unlike standard functions whose this context is determined by how they are called, arrow functions capture the this value of the enclosing lexical execution context.",
        topic: "Functions"
      },
      {
        id: 11,
        text: "How do Promises represent the lifecycle of an asynchronous operation in JavaScript?",
        options: [
          "A Promise can be in one of three mutually exclusive states: pending, fulfilled, or rejected",
          "A Promise always executes synchronously on the main thread before any other task",
          "A Promise creates a separate operating system thread to run code in parallel",
          "A Promise is synonymous with a recursive setTimeout loop"
        ],
        correctAnswer: "A Promise can be in one of three mutually exclusive states: pending, fulfilled, or rejected",
        correct: "A Promise can be in one of three mutually exclusive states: pending, fulfilled, or rejected",
        explanation: "A Promise is an object representing the eventual completion or failure of an asynchronous operation, transitioning from 'pending' to either 'fulfilled' (with a value) or 'rejected' (with an error).",
        topic: "Asynchronous JS"
      },
      {
        id: 12,
        text: "What is the purpose of the async and await keywords introduced in modern JavaScript?",
        options: [
          "They replace the need for try...catch blocks during errors",
          "They convert JavaScript into a multithreaded compiled language",
          "They bypass the JavaScript event loop and execute code immediately",
          "They provide clean, synchronous-looking syntax for writing and consuming Promise-based asynchronous code"
        ],
        correctAnswer: "They provide clean, synchronous-looking syntax for writing and consuming Promise-based asynchronous code",
        correct: "They provide clean, synchronous-looking syntax for writing and consuming Promise-based asynchronous code",
        explanation: "The async keyword marks a function as returning a Promise, and await pauses execution inside the async function until the awaited Promise resolves or rejects, simplifying asynchronous workflows.",
        topic: "Async / Await"
      },
      {
        id: 13,
        text: "What is the primary difference between localStorage and sessionStorage?",
        options: [
          "sessionStorage is shared across different browser profiles",
          "localStorage can store objects directly without JSON serialization",
          "localStorage data persists until explicitly cleared, while sessionStorage is cleared when the page session / tab ends",
          "localStorage has a 1GB storage limit while sessionStorage is limited to 50KB"
        ],
        correctAnswer: "localStorage data persists until explicitly cleared, while sessionStorage is cleared when the page session / tab ends",
        correct: "localStorage data persists until explicitly cleared, while sessionStorage is cleared when the page session / tab ends",
        explanation: "Both provide key-value string storage scoped to origin. However, localStorage has no expiration time, whereas sessionStorage data is purged whenever the tab or window closes.",
        topic: "Web Storage"
      },
      {
        id: 14,
        text: "In error handling with try...catch...finally, when does the finally block execute?",
        options: [
          "It only executes if an unhandled exception occurred in the catch block",
          "It always executes regardless of whether an error was thrown or caught in the try block",
          "It executes only when the try block completes without any errors",
          "It only executes if explicitly invoked by a return statement"
        ],
        correctAnswer: "It always executes regardless of whether an error was thrown or caught in the try block",
        correct: "It always executes regardless of whether an error was thrown or caught in the try block",
        explanation: "The finally block statements run unconditionally after the try and catch blocks finish, making it ideal for cleanup routines like closing connections or resetting timers.",
        topic: "Error Handling"
      },
      {
        id: 15,
        text: "What is the JavaScript Event Loop?",
        options: [
          "A syntax construct for iterating over DOM collections",
          "A built-in while loop that runs forever inside every function",
          "A browser engine component that renders CSS animations at 60 FPS",
          "A runtime mechanism that coordinates the execution of code, collecting events, and running microtasks and macrotasks from queues when the call stack is empty"
        ],
        correctAnswer: "A runtime mechanism that coordinates the execution of code, collecting events, and running microtasks and macrotasks from queues when the call stack is empty",
        correct: "A runtime mechanism that coordinates the execution of code, collecting events, and running microtasks and macrotasks from queues when the call stack is empty",
        explanation: "The event loop continuously monitors the call stack and task queues; when the call stack is clear, it pushes queued microtasks (Promises) and macrotasks (setTimeout, events) onto the stack for execution.",
        topic: "Event Loop"
      }
    ]
  }
};

const STORAGE_KEY = "navedquiz_attempts_history";

const appState = {
  currentCategory: "html",
  currentIndex: 0,
  answers: {},
  timerInterval: null,
  elapsedSeconds: 0,
  isReviewMode: false,
  isCompleted: false
};

const dom = {
  views: {
    home: document.getElementById("view-home"),
    quiz: document.getElementById("view-quiz"),
    results: document.getElementById("view-results"),
    about: document.getElementById("view-about"),
    contact: document.getElementById("view-contact")
  },
  navLinks: {
    home: document.getElementById("nav-home"),
    about: document.getElementById("nav-about"),
    quiz: document.getElementById("nav-quiz"),
    contact: document.getElementById("nav-contact")
  },
  brandLink: document.getElementById("brand-link"),
  avatarBtn: document.getElementById("avatar-btn"),
  quizTitle: document.getElementById("quiz-title-text"),
  topicDropdown: document.getElementById("quiz-topic-dropdown"),
  timerDisplay: document.getElementById("quiz-timer-display"),
  progressTrack: document.getElementById("progress-track-wrapper"),
  progressBar: document.getElementById("quiz-progress-bar"),
  progressText: document.getElementById("quiz-progress-text"),
  questionIndexLabel: document.getElementById("question-index-label"),
  questionBodyText: document.getElementById("question-body-text"),
  referenceModalBtn: document.getElementById("open-reference-modal-btn"),
  optionsList: document.getElementById("options-list-container"),
  explanationBox: document.getElementById("explanation-container"),
  explanationBody: document.getElementById("explanation-body-text"),
  submitBtn: document.getElementById("submit-answer-btn"),
  prevBtn: document.getElementById("prev-question-btn"),
  nextBtn: document.getElementById("next-question-btn"),
  restartInlineBtn: document.getElementById("restart-quiz-inline-btn"),
  backToResultsBtn: document.getElementById("back-to-results-btn"),
  sidebarPercentage: document.getElementById("sidebar-percentage-display"),
  sidebarSubtext: document.getElementById("sidebar-subtext-display"),
  sidebarStatusPill: document.getElementById("sidebar-status-pill"),
  questionNavList: document.getElementById("question-nav-list"),
  statTotalAttempts: document.getElementById("stat-total-attempts"),
  statCompletedQuizzes: document.getElementById("stat-completed-quizzes"),
  statBestScore: document.getElementById("stat-best-score"),
  statAvgScore: document.getElementById("stat-avg-score"),
  breakdownHtmlAttempts: document.getElementById("breakdown-html-attempts"),
  breakdownHtmlBest: document.getElementById("breakdown-html-best"),
  breakdownHtmlAvg: document.getElementById("breakdown-html-avg"),
  breakdownCssAttempts: document.getElementById("breakdown-css-attempts"),
  breakdownCssBest: document.getElementById("breakdown-css-best"),
  breakdownCssAvg: document.getElementById("breakdown-css-avg"),
  breakdownJsAttempts: document.getElementById("breakdown-js-attempts"),
  breakdownJsBest: document.getElementById("breakdown-js-best"),
  breakdownJsAvg: document.getElementById("breakdown-js-avg"),
  historyTableBody: document.getElementById("history-table-body"),
  clearHistoryBtn: document.getElementById("clear-history-btn"),
  contactForm: document.getElementById("contact-form"),
  contactSuccessBox: document.getElementById("contact-success-box"),
  referenceBackdrop: document.getElementById("reference-modal-backdrop"),
  referenceModalTitle: document.getElementById("reference-modal-title"),
  closeReferenceBtn: document.getElementById("close-reference-modal-btn"),
  confirmReferenceBtn: document.getElementById("confirm-reference-modal-btn"),
  resultsCategoryTag: document.getElementById("results-category-tag"),
  resultsMainTitle: document.getElementById("results-main-title"),
  resultsCatName: document.getElementById("results-cat-name"),
  resultsPercentageBadge: document.getElementById("results-percentage-badge"),
  resultsFeedbackTitle: document.getElementById("results-feedback-title"),
  resultsTotalCount: document.getElementById("results-total-count"),
  resultsAnsweredCount: document.getElementById("results-answered-count"),
  resultsCorrectCount: document.getElementById("results-correct-count"),
  resultsIncorrectCount: document.getElementById("results-incorrect-count"),
  resultsUnansweredCount: document.getElementById("results-unanswered-count"),
  resultsTimeTaken: document.getElementById("results-time-taken"),
  reviewAnswersBtn: document.getElementById("review-answers-btn"),
  restartQuizModalBtn: document.getElementById("restart-quiz-modal-btn"),
  changeCategoryModalBtn: document.getElementById("change-category-modal-btn"),
  resultsHomeBtn: document.getElementById("results-home-btn"),
  confirmBackdrop: document.getElementById("confirm-modal-backdrop"),
  confirmTitle: document.getElementById("confirm-modal-title"),
  confirmMessage: document.getElementById("confirm-modal-message"),
  confirmProceedBtn: document.getElementById("confirm-proceed-btn"),
  confirmCancelBtn: document.getElementById("confirm-cancel-btn"),
  confirmCancelXBtn: document.getElementById("confirm-cancel-x-btn"),
  navToggleBtn: document.getElementById("nav-toggle-btn"),
  mainNavMenu: document.getElementById("main-nav-menu"),
  navOverlay: document.getElementById("nav-overlay"),
  questionNavCard: document.getElementById("question-nav-card"),
  toggleQNavBtn: document.getElementById("toggle-qnav-btn")
};

let pendingConfirmAction = null;

function getCurrentQuestions() {
  const cat = QUIZ_DATA[appState.currentCategory];
  return cat ? cat.questions : QUIZ_DATA.html.questions;
}

function formatTimer(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const paddedMins = String(mins).padStart(2, "0");
  const paddedSecs = String(secs).padStart(2, "0");
  return `${paddedMins}:${paddedSecs}`;
}

function startTimer() {
  stopTimer();
  dom.timerDisplay.textContent = `⏱ ${formatTimer(appState.elapsedSeconds)}`;
  appState.timerInterval = setInterval(() => {
    appState.elapsedSeconds += 1;
    dom.timerDisplay.textContent = `⏱ ${formatTimer(appState.elapsedSeconds)}`;
  }, 1000);
}

function stopTimer() {
  if (appState.timerInterval !== null) {
    clearInterval(appState.timerInterval);
    appState.timerInterval = null;
  }
}

function resetTimer() {
  stopTimer();
  appState.elapsedSeconds = 0;
  dom.timerDisplay.textContent = "⏱ 00:00";
}

function closeMobileMenu() {
  if (dom.mainNavMenu) {
    dom.mainNavMenu.classList.remove("open");
  }
  if (dom.navToggleBtn) {
    dom.navToggleBtn.classList.remove("open");
    dom.navToggleBtn.setAttribute("aria-expanded", "false");
  }
  if (dom.navOverlay) {
    dom.navOverlay.classList.remove("active");
    dom.navOverlay.classList.add("hidden");
  }
}

function toggleMobileMenu(forceState) {
  if (!dom.mainNavMenu || !dom.navToggleBtn) return;
  const isCurrentlyOpen = dom.mainNavMenu.classList.contains("open");
  const shouldOpen = typeof forceState === "boolean" ? forceState : !isCurrentlyOpen;
  if (shouldOpen) {
    dom.mainNavMenu.classList.add("open");
    dom.navToggleBtn.classList.add("open");
    dom.navToggleBtn.setAttribute("aria-expanded", "true");
    if (dom.navOverlay) {
      dom.navOverlay.classList.remove("hidden");
      dom.navOverlay.classList.add("active");
    }
  } else {
    closeMobileMenu();
  }
}

function switchView(viewName) {
  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });

  Object.keys(dom.views).forEach((key) => {
    if (key === viewName) {
      dom.views[key].classList.remove("hidden");
    } else {
      dom.views[key].classList.add("hidden");
    }
  });

  Object.keys(dom.navLinks).forEach((key) => {
    if (key === viewName || (viewName === "results" && key === "quiz")) {
      dom.navLinks[key].classList.add("active");
    } else {
      dom.navLinks[key].classList.remove("active");
    }
  });

  if (viewName === "home") {
    renderHistoryDashboard();
  }
}

function openConfirmModal(title, message, onProceed) {
  dom.confirmTitle.textContent = title;
  dom.confirmMessage.textContent = message;
  pendingConfirmAction = onProceed;
  dom.confirmBackdrop.classList.remove("hidden");
}

function closeConfirmModal() {
  dom.confirmBackdrop.classList.add("hidden");
  pendingConfirmAction = null;
}

function initializeQuiz(categoryKey, startingQuestionIndex = 0) {
  if (!QUIZ_DATA[categoryKey]) {
    categoryKey = "html";
  }

  appState.currentCategory = categoryKey;
  appState.currentIndex = startingQuestionIndex;
  appState.answers = {};
  appState.isReviewMode = false;
  appState.isCompleted = false;

  dom.quizTitle.textContent = QUIZ_DATA[categoryKey].title;
  dom.topicDropdown.value = categoryKey;

  resetTimer();
  startTimer();

  renderCurrentQuestion();
  updateSidebarScore();
  renderQuestionNavList();
}

function renderCurrentQuestion() {
  const questions = getCurrentQuestions();
  const total = questions.length;
  const currentQ = questions[appState.currentIndex];

  dom.questionIndexLabel.textContent = `Question ${appState.currentIndex + 1}/${total}:`;
  dom.questionBodyText.textContent = ` ${currentQ.text}`;

  const progressPercent = Math.round(((appState.currentIndex + 1) / total) * 100);
  dom.progressBar.style.width = `${progressPercent}%`;
  dom.progressTrack.setAttribute("aria-valuenow", progressPercent);
  dom.progressText.textContent = `Question ${appState.currentIndex + 1}/${total} (${progressPercent}%)`;

  dom.prevBtn.disabled = appState.currentIndex === 0;

  if (appState.isReviewMode) {
    dom.backToResultsBtn.classList.remove("hidden");
    if (appState.currentIndex === total - 1) {
      dom.nextBtn.textContent = "Back to Results";
    } else {
      dom.nextBtn.textContent = "Next";
    }
  } else {
    dom.backToResultsBtn.classList.add("hidden");
    if (appState.currentIndex === total - 1) {
      dom.nextBtn.textContent = "Finish Quiz";
    } else {
      dom.nextBtn.textContent = "Next";
    }
  }

  dom.optionsList.innerHTML = "";
  const savedAnswer = appState.answers[appState.currentIndex];
  const isSubmitted = savedAnswer && savedAnswer.submitted;

  currentQ.options.forEach((optText, optIdx) => {
    const optButton = document.createElement("button");
    optButton.type = "button";
    optButton.className = "option-item";
    optButton.dataset.index = optIdx;

    const textSpan = document.createElement("span");
    textSpan.className = "option-text";
    textSpan.textContent = optText;
    optButton.appendChild(textSpan);

    if (savedAnswer && savedAnswer.selectedIndex === optIdx) {
      optButton.classList.add("selected");
    }

    if (isSubmitted) {
      optButton.classList.add("graded");
      optButton.classList.add("disabled");

      const correctAnswerText = currentQ.correctAnswer || currentQ.correct;
      if (optText === correctAnswerText) {
        optButton.classList.add("correct");
        const iconSpan = document.createElement("span");
        iconSpan.className = "option-status-icon";
        iconSpan.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 20 20" fill="#16a34a">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        `;
        optButton.appendChild(iconSpan);
      } else if (savedAnswer.selectedIndex === optIdx) {
        optButton.classList.add("incorrect");
        const iconSpan = document.createElement("span");
        iconSpan.className = "option-status-icon";
        iconSpan.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 20 20" fill="#dc2626">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm2.707-10.707a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293z" clip-rule="evenodd" />
          </svg>
        `;
        optButton.appendChild(iconSpan);
      }
    }

    optButton.addEventListener("click", () => {
      handleOptionSelect(optIdx);
    });

    dom.optionsList.appendChild(optButton);
  });

  if (isSubmitted) {
    dom.submitBtn.classList.add("hidden");
    dom.explanationBody.textContent = currentQ.explanation;
    dom.explanationBox.classList.remove("hidden");
  } else {
    dom.explanationBox.classList.add("hidden");
    if (savedAnswer && savedAnswer.selectedIndex !== undefined && !appState.isReviewMode) {
      dom.submitBtn.classList.remove("hidden");
    } else {
      dom.submitBtn.classList.add("hidden");
    }
  }

  updateQuestionNavSelection();
}

function handleOptionSelect(optIdx) {
  if (appState.isReviewMode) {
    return;
  }

  const savedAnswer = appState.answers[appState.currentIndex];
  if (savedAnswer && savedAnswer.submitted) {
    return;
  }

  appState.answers[appState.currentIndex] = {
    selectedIndex: optIdx,
    submitted: false,
    isCorrect: false
  };

  const allOptionBtns = dom.optionsList.querySelectorAll(".option-item");
  allOptionBtns.forEach((btn) => {
    if (parseInt(btn.dataset.index, 10) === optIdx) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });

  dom.submitBtn.classList.remove("hidden");
  renderQuestionNavList();
}

function submitCurrentAnswer() {
  const savedAnswer = appState.answers[appState.currentIndex];
  if (!savedAnswer || savedAnswer.selectedIndex === undefined || savedAnswer.submitted) {
    return;
  }

  const questions = getCurrentQuestions();
  const currentQ = questions[appState.currentIndex];
  const chosenOptionText = currentQ.options[savedAnswer.selectedIndex];
  const correctAnswerText = currentQ.correctAnswer || currentQ.correct;
  const isCorrect = chosenOptionText === correctAnswerText;

  savedAnswer.submitted = true;
  savedAnswer.isCorrect = isCorrect;

  renderCurrentQuestion();
  updateSidebarScore();
  renderQuestionNavList();
}

function updateSidebarScore() {
  const questions = getCurrentQuestions();
  const total = questions.length;
  let correctCount = 0;
  let submittedCount = 0;

  Object.values(appState.answers).forEach((ans) => {
    if (ans.submitted) {
      submittedCount += 1;
      if (ans.isCorrect) {
        correctCount += 1;
      }
    }
  });

  let percentageString = "0.0%";
  if (appState.isCompleted) {
    percentageString = `${((correctCount / total) * 100).toFixed(1)}%`;
  } else if (submittedCount > 0) {
    percentageString = `${((correctCount / submittedCount) * 100).toFixed(1)}%`;
  }

  dom.sidebarPercentage.textContent = percentageString;
  dom.sidebarSubtext.textContent = `You got ${correctCount} answer${correctCount === 1 ? "" : "s"} correct`;

  if (appState.isCompleted) {
    dom.sidebarStatusPill.textContent = "Completed";
  } else {
    dom.sidebarStatusPill.textContent = `In Progress (${submittedCount}/${total})`;
  }
}

function renderQuestionNavList() {
  const questions = getCurrentQuestions();
  dom.questionNavList.innerHTML = "";

  questions.forEach((q, idx) => {
    const navItem = document.createElement("div");
    navItem.className = "question-nav-item";
    navItem.dataset.questionIndex = idx;

    if (idx === appState.currentIndex) {
      navItem.classList.add("current");
    }

    const saved = appState.answers[idx];
    const iconSpan = document.createElement("span");
    iconSpan.className = "nav-status-icon";

    if (saved && saved.submitted) {
      if (saved.isCorrect) {
        navItem.classList.add("answered-correct");
        iconSpan.classList.add("icon-correct");
        iconSpan.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        `;
      } else {
        navItem.classList.add("answered-incorrect");
        iconSpan.classList.add("icon-incorrect");
        iconSpan.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        `;
      }
    } else {
      navItem.classList.add("unanswered");
      const dotSpan = document.createElement("span");
      dotSpan.className = "icon-neutral";
      iconSpan.appendChild(dotSpan);
    }

    const textSpan = document.createElement("span");
    textSpan.className = "qnav-text";
    textSpan.innerHTML = `<span class="qnav-prefix">Question </span>${idx + 1}`;

    navItem.appendChild(iconSpan);
    navItem.appendChild(textSpan);

    navItem.addEventListener("click", () => {
      appState.currentIndex = idx;
      renderCurrentQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    dom.questionNavList.appendChild(navItem);
  });
}

function updateQuestionNavSelection() {
  const items = dom.questionNavList.querySelectorAll(".question-nav-item");
  items.forEach((item) => {
    const idx = parseInt(item.dataset.questionIndex, 10);
    if (idx === appState.currentIndex) {
      item.classList.add("current");
    } else {
      item.classList.remove("current");
    }
  });
}

function handleNextQuestion() {
  const questions = getCurrentQuestions();
  if (appState.currentIndex < questions.length - 1) {
    appState.currentIndex += 1;
    renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    if (appState.isReviewMode) {
      switchView("results");
    } else {
      finishQuizFlow();
    }
  }
}

function handlePrevQuestion() {
  if (appState.currentIndex > 0) {
    appState.currentIndex -= 1;
    renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function finishQuizFlow() {
  const currentAnswer = appState.answers[appState.currentIndex];
  if (currentAnswer && currentAnswer.selectedIndex !== undefined && !currentAnswer.submitted) {
    submitCurrentAnswer();
  }

  const questions = getCurrentQuestions();
  const total = questions.length;
  let submittedCount = 0;

  Object.values(appState.answers).forEach((ans) => {
    if (ans.submitted) {
      submittedCount += 1;
    }
  });

  const unanswered = total - submittedCount;
  if (!appState.isReviewMode && unanswered > 0) {
    openConfirmModal(
      "Unanswered Questions",
      `You have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"} in this quiz. Are you sure you want to finish and calculate your final score now?`,
      () => {
        completeQuizAndShowResults();
      }
    );
  } else {
    completeQuizAndShowResults();
  }
}

function completeQuizAndShowResults() {
  if (appState.isCompleted) {
    switchView("results");
    return;
  }

  stopTimer();
  appState.isCompleted = true;

  const questions = getCurrentQuestions();
  const total = questions.length;
  let correctCount = 0;
  let submittedCount = 0;

  Object.values(appState.answers).forEach((ans) => {
    if (ans.submitted) {
      submittedCount += 1;
      if (ans.isCorrect) {
        correctCount += 1;
      }
    }
  });

  const incorrectCount = submittedCount - correctCount;
  const unansweredCount = total - submittedCount;
  const finalPercentageValue = total > 0 ? ((correctCount / total) * 100) : 0;
  const formattedPercentage = `${finalPercentageValue.toFixed(1)}%`;
  const timeFormatted = formatTimer(appState.elapsedSeconds);
  const currentQuiz = QUIZ_DATA[appState.currentCategory] || QUIZ_DATA.html;

  if (dom.resultsCategoryTag) {
    dom.resultsCategoryTag.textContent = currentQuiz.title;
  }
  if (dom.resultsMainTitle) {
    dom.resultsMainTitle.textContent = `${currentQuiz.title} - Final Results`;
  }
  if (dom.resultsCatName) {
    dom.resultsCatName.textContent = currentQuiz.title;
  }
  if (dom.resultsPercentageBadge) {
    dom.resultsPercentageBadge.textContent = formattedPercentage;
  }
  if (dom.resultsTotalCount) {
    dom.resultsTotalCount.textContent = total;
  }
  if (dom.resultsAnsweredCount) {
    dom.resultsAnsweredCount.textContent = submittedCount;
  }
  if (dom.resultsCorrectCount) {
    dom.resultsCorrectCount.textContent = correctCount;
  }
  if (dom.resultsIncorrectCount) {
    dom.resultsIncorrectCount.textContent = incorrectCount;
  }
  if (dom.resultsUnansweredCount) {
    dom.resultsUnansweredCount.textContent = unansweredCount;
  }
  if (dom.resultsTimeTaken) {
    dom.resultsTimeTaken.textContent = timeFormatted;
  }

  let feedback = "Good Effort!";
  if (finalPercentageValue >= 90) {
    feedback = "Outstanding Mastery!";
  } else if (finalPercentageValue >= 75) {
    feedback = "Excellent Performance!";
  } else if (finalPercentageValue >= 50) {
    feedback = "Passing Score — Review Recommended";
  } else {
    feedback = "Keep Practicing — Review Recommended";
  }
  if (dom.resultsFeedbackTitle) {
    dom.resultsFeedbackTitle.textContent = feedback;
  }

  saveAttemptRecord({
    id: Date.now(),
    category: appState.currentCategory,
    categoryTitle: currentQuiz.title,
    date: new Date().toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    scorePercent: parseFloat(finalPercentageValue.toFixed(1)),
    correct: correctCount,
    incorrect: incorrectCount,
    unanswered: unansweredCount,
    totalQuestions: total,
    timeTakenSeconds: appState.elapsedSeconds,
    timeTakenFormatted: timeFormatted
  });

  updateSidebarScore();
  renderQuestionNavList();
  switchView("results");
}

function saveAttemptRecord(record) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let historyList = [];
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        historyList = parsed;
      }
    }
    historyList.unshift(record);
    if (historyList.length > 30) {
      historyList = historyList.slice(0, 30);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historyList));
  } catch (error) {
  }
}

function getStoredHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function renderHistoryDashboard() {
  const historyList = getStoredHistory();

  if (historyList.length === 0) {
    dom.statTotalAttempts.textContent = "0";
    dom.statCompletedQuizzes.textContent = "0";
    dom.statBestScore.textContent = "0%";
    dom.statAvgScore.textContent = "0%";

    dom.breakdownHtmlAttempts.textContent = "0 attempts";
    dom.breakdownHtmlBest.textContent = "0%";
    dom.breakdownHtmlAvg.textContent = "0%";

    dom.breakdownCssAttempts.textContent = "0 attempts";
    dom.breakdownCssBest.textContent = "0%";
    dom.breakdownCssAvg.textContent = "0%";

    dom.breakdownJsAttempts.textContent = "0 attempts";
    dom.breakdownJsBest.textContent = "0%";
    dom.breakdownJsAvg.textContent = "0%";

    dom.historyTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">No saved attempts found. Select a category above to start practicing!</td>
      </tr>
    `;
    return;
  }

  const total = historyList.length;
  let overallBest = 0;
  let overallSum = 0;

  const catStats = {
    html: { count: 0, sum: 0, best: 0 },
    css: { count: 0, sum: 0, best: 0 },
    js: { count: 0, sum: 0, best: 0 }
  };

  historyList.forEach((item) => {
    const score = Number(item.scorePercent) || 0;
    if (score > overallBest) {
      overallBest = score;
    }
    overallSum += score;

    const catKey = item.category || "html";
    if (catStats[catKey]) {
      catStats[catKey].count += 1;
      catStats[catKey].sum += score;
      if (score > catStats[catKey].best) {
        catStats[catKey].best = score;
      }
    }
  });

  const overallAvg = (overallSum / total).toFixed(1);

  dom.statTotalAttempts.textContent = String(total);
  dom.statCompletedQuizzes.textContent = String(total);
  dom.statBestScore.textContent = `${overallBest.toFixed(1)}%`;
  dom.statAvgScore.textContent = `${overallAvg}%`;

  const htmlCount = catStats.html.count;
  dom.breakdownHtmlAttempts.textContent = `${htmlCount} attempt${htmlCount === 1 ? "" : "s"}`;
  dom.breakdownHtmlBest.textContent = `${catStats.html.best.toFixed(1)}%`;
  dom.breakdownHtmlAvg.textContent = htmlCount > 0 ? `${(catStats.html.sum / htmlCount).toFixed(1)}%` : "0%";

  const cssCount = catStats.css.count;
  dom.breakdownCssAttempts.textContent = `${cssCount} attempt${cssCount === 1 ? "" : "s"}`;
  dom.breakdownCssBest.textContent = `${catStats.css.best.toFixed(1)}%`;
  dom.breakdownCssAvg.textContent = cssCount > 0 ? `${(catStats.css.sum / cssCount).toFixed(1)}%` : "0%";

  const jsCount = catStats.js.count;
  dom.breakdownJsAttempts.textContent = `${jsCount} attempt${jsCount === 1 ? "" : "s"}`;
  dom.breakdownJsBest.textContent = `${catStats.js.best.toFixed(1)}%`;
  dom.breakdownJsAvg.textContent = jsCount > 0 ? `${(catStats.js.sum / jsCount).toFixed(1)}%` : "0%";

  dom.historyTableBody.innerHTML = "";
  historyList.forEach((row) => {
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    tdDate.textContent = row.date;

    const tdCategory = document.createElement("td");
    tdCategory.textContent = row.categoryTitle || row.category.toUpperCase();

    const tdScore = document.createElement("td");
    tdScore.textContent = `${row.scorePercent}%`;
    tdScore.style.fontWeight = "600";
    if (row.scorePercent >= 75) {
      tdScore.style.color = "var(--success-color)";
    } else if (row.scorePercent < 50) {
      tdScore.style.color = "var(--danger-color)";
    }

    const tdCount = document.createElement("td");
    tdCount.textContent = `${row.correct} / ${row.totalQuestions}`;

    const tdTime = document.createElement("td");
    tdTime.textContent = row.timeTakenFormatted || "—";

    tr.appendChild(tdDate);
    tr.appendChild(tdCategory);
    tr.appendChild(tdScore);
    tr.appendChild(tdCount);
    tr.appendChild(tdTime);

    dom.historyTableBody.appendChild(tr);
  });
}

function clearAllHistory() {
  openConfirmModal(
    "Clear Attempt History",
    "Are you sure you want to permanently clear all saved quiz history from localStorage?",
    () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
      }
      renderHistoryDashboard();
    }
  );
}

function setupEventListeners() {
  dom.navLinks.home.addEventListener("click", (e) => {
    e.preventDefault();
    switchView("home");
  });

  dom.navLinks.about.addEventListener("click", (e) => {
    e.preventDefault();
    switchView("about");
  });

  dom.navLinks.quiz.addEventListener("click", (e) => {
    e.preventDefault();
    if (appState.isCompleted && !appState.isReviewMode) {
      switchView("results");
    } else {
      if (!appState.timerInterval && Object.keys(appState.answers).length === 0 && !appState.isCompleted) {
        initializeQuiz("html", 0);
      }
      switchView("quiz");
    }
  });

  dom.navLinks.contact.addEventListener("click", (e) => {
    e.preventDefault();
    switchView("contact");
  });

  dom.brandLink.addEventListener("click", (e) => {
    e.preventDefault();
    switchView("home");
  });

  dom.avatarBtn.addEventListener("click", () => {
    openConfirmModal(
      "Student Candidate",
      "NavedQuiz APCS Candidate: Naved. Tested and optimized for modern web development assessments.",
      () => {}
    );
  });

  if (dom.navToggleBtn) {
    dom.navToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (dom.navOverlay) {
    dom.navOverlay.addEventListener("click", () => {
      closeMobileMenu();
    });
  }

  if (dom.toggleQNavBtn && dom.questionNavCard) {
    dom.toggleQNavBtn.addEventListener("click", () => {
      const isCollapsed = dom.questionNavCard.classList.toggle("collapsed");
      dom.toggleQNavBtn.setAttribute("aria-expanded", String(!isCollapsed));
    });
    dom.toggleQNavBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dom.toggleQNavBtn.click();
      }
    });
  }

  const startCategoryButtons = document.querySelectorAll(".start-cat-btn");
  startCategoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.category;
      initializeQuiz(cat, 0);
      switchView("quiz");
    });
  });

  dom.topicDropdown.addEventListener("change", (e) => {
    const newCategory = e.target.value;
    if (newCategory !== appState.currentCategory) {
      openConfirmModal(
        "Switch Quiz Category",
        "Switching categories will reset your current progress in this quiz. Would you like to proceed?",
        () => {
          initializeQuiz(newCategory, 0);
        }
      );
      dom.topicDropdown.value = appState.currentCategory;
    }
  });

  dom.submitBtn.addEventListener("click", () => {
    submitCurrentAnswer();
  });

  dom.nextBtn.addEventListener("click", () => {
    handleNextQuestion();
  });

  dom.prevBtn.addEventListener("click", () => {
    handlePrevQuestion();
  });

  dom.restartInlineBtn.addEventListener("click", () => {
    openConfirmModal(
      "Restart Quiz",
      "Are you sure you want to restart this quiz from Question 1?",
      () => {
        initializeQuiz(appState.currentCategory, 0);
      }
    );
  });

  dom.clearHistoryBtn.addEventListener("click", () => {
    clearAllHistory();
  });

  dom.referenceModalBtn.addEventListener("click", () => {
    dom.referenceBackdrop.classList.remove("hidden");
  });

  dom.closeReferenceBtn.addEventListener("click", () => {
    dom.referenceBackdrop.classList.add("hidden");
  });

  dom.confirmReferenceBtn.addEventListener("click", () => {
    dom.referenceBackdrop.classList.add("hidden");
  });

  dom.reviewAnswersBtn.addEventListener("click", () => {
    appState.isReviewMode = true;
    appState.currentIndex = 0;
    switchView("quiz");
    renderCurrentQuestion();
    renderQuestionNavList();
  });

  dom.restartQuizModalBtn.addEventListener("click", () => {
    initializeQuiz(appState.currentCategory, 0);
    switchView("quiz");
  });

  dom.changeCategoryModalBtn.addEventListener("click", () => {
    switchView("home");
  });

  dom.resultsHomeBtn.addEventListener("click", () => {
    switchView("home");
  });

  dom.backToResultsBtn.addEventListener("click", () => {
    switchView("results");
  });

  dom.confirmProceedBtn.addEventListener("click", () => {
    if (typeof pendingConfirmAction === "function") {
      pendingConfirmAction();
    }
    closeConfirmModal();
  });

  dom.confirmCancelBtn.addEventListener("click", () => {
    closeConfirmModal();
  });

  dom.confirmCancelXBtn.addEventListener("click", () => {
    closeConfirmModal();
  });

  dom.contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const subjectInput = document.getElementById("contact-subject");
    const messageInput = document.getElementById("contact-message");

    const errorName = document.getElementById("error-name");
    const errorEmail = document.getElementById("error-email");
    const errorSubject = document.getElementById("error-subject");
    const errorMessage = document.getElementById("error-message");

    errorName.textContent = "";
    errorEmail.textContent = "";
    errorSubject.textContent = "";
    errorMessage.textContent = "";

    if (!nameInput.value.trim()) {
      errorName.textContent = "Please enter your name.";
      isValid = false;
    }

    if (!emailInput.value.trim() || !emailInput.value.includes("@")) {
      errorEmail.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (!subjectInput.value.trim()) {
      errorSubject.textContent = "Please enter a subject.";
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      errorMessage.textContent = "Please enter your message.";
      isValid = false;
    }

    if (isValid) {
      dom.contactSuccessBox.classList.remove("hidden");
      dom.contactForm.reset();
      setTimeout(() => {
        dom.contactSuccessBox.classList.add("hidden");
      }, 6000);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu();
      dom.referenceBackdrop.classList.add("hidden");
      closeConfirmModal();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

function loadInitialState() {
  setupEventListeners();
  switchView("home");
  renderHistoryDashboard();
}

window.addEventListener("DOMContentLoaded", () => {
  loadInitialState();
});
