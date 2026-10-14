const API_BASE = 'https://api.open-meteo.com/v1/forecast';
const GEO_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
const CACHE_KEY = 'weathernow_state_v1';
const WEATHER_CACHE_TTL = 10 * 60 * 1000; // 10 minutes TTL
const geoCache = new Map();
const weatherCache = new Map();
const formatterCache = new Map();
let searchAbortController = null;
let weatherAbortController = null;
let resizeRaf = null;

function getCachedFormatter(key, options) {
    if (!formatterCache.has(key)) {
        formatterCache.set(key, new Intl.DateTimeFormat('en-US', options));
    }
    return formatterCache.get(key);
}

const state = {
    unit: 'celsius',
    lat: 40.7128,
    lon: -74.0060,
    cityName: 'New York',
    countryName: 'United States',
    timezone: 'America/New_York',
    weatherData: null,
    isFetching: false,
    requestId: 0,
    lightningInterval: null,
    lightningTimeouts: [],
    clockInterval: null,
    searchDebounce: null
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
    dashboard: $('#dashboard'),
    weatherBg: $('#weather-bg'),
    searchInput: $('#searchInput'),
    searchBtn: $('#searchBtn'),
    searchDropdown: $('#searchDropdown'),
    searchWrapper: $('#searchWrapper'),
    locationBtn: $('#locationBtn'),
    refreshBtn: $('#refreshBtn'),
    unitToggle: $('#unitToggle'),
    headerDate: $('#headerDate'),
    conditionTitle: $('#conditionTitle'),
    conditionSubtitle: $('#conditionSubtitle'),
    conditionDesc: $('#conditionDesc'),
    tempValue: $('#tempValue'),
    feelsLike: $('#feelsLike'),
    heroCity: $('#heroCity'),
    uvBadge: $('#uvBadge'),
    localTime: $('#localTime'),
    windSpeed: $('#windSpeed'),
    windDir: $('#windDir'),
    windGusts: $('#windGusts'),
    windGraph: $('#windGraph'),
    sunriseTime: $('#sunriseTime'),
    sunsetTime: $('#sunsetTime'),
    sunArc: $('#sunArc'),
    detHumidity: $('#detHumidity'),
    detPressure: $('#detPressure'),
    detVisibility: $('#detVisibility'),
    detPrecip: $('#detPrecip'),
    forecastTrack: $('#forecastTrack'),
    forecastCurve: $('#forecastCurve'),
    loadingOverlay: $('#loadingOverlay'),
    loadingText: $('#loadingText'),
    errorOverlay: $('#errorOverlay'),
    errorMessage: $('#errorMessage'),
    retryBtn: $('#retryBtn'),
    welcomeOverlay: $('#welcomeOverlay'),
    welcomeSearchBtn: $('#welcomeSearchBtn'),
    welcomeLocationBtn: $('#welcomeLocationBtn'),
    heroContent: $('#heroContent')
};

function saveCache() {
    try {
        const payload = {
            unit: state.unit,
            lat: state.lat,
            lon: state.lon,
            cityName: state.cityName,
            countryName: state.countryName,
            timezone: state.timezone,
            weatherData: state.weatherData,
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch (e) {}
}

function loadCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed && parsed.weatherData) return parsed;
    } catch (e) {}
    return null;
}

function init() {
    bindEvents();
    startClock();

    const cached = loadCache();
    if (cached) {
        state.unit = cached.unit || 'celsius';
        state.lat = cached.lat !== undefined ? cached.lat : state.lat;
        state.lon = cached.lon !== undefined ? cached.lon : state.lon;
        state.cityName = cached.cityName || state.cityName;
        state.countryName = cached.countryName || state.countryName;
        state.timezone = cached.timezone || state.timezone;
        state.weatherData = cached.weatherData;

        dom.unitToggle.querySelector('.unit-label').textContent = state.unit === 'celsius' ? '°C' : '°F';
        renderDashboard(state.weatherData);

        const cacheKey = `${state.lat.toFixed(3)},${state.lon.toFixed(3)}`;
        weatherCache.set(cacheKey, { data: state.weatherData, timestamp: cached.timestamp || Date.now() });

        const isStale = !cached.timestamp || (Date.now() - cached.timestamp > WEATHER_CACHE_TTL);
        if (isStale) {
            fetchWeather(true);
        }
    } else {
        fetchWeather(false);
    }
}

function bindEvents() {
    dom.searchBtn.addEventListener('click', handleSearch);
    dom.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    dom.searchInput.addEventListener('input', handleSearchInput);
    dom.locationBtn.addEventListener('click', handleGeolocation);
    dom.refreshBtn.addEventListener('click', refreshWeather);
    dom.unitToggle.addEventListener('click', toggleUnit);
    dom.retryBtn.addEventListener('click', refreshWeather);
    dom.welcomeSearchBtn.addEventListener('click', () => {
        hideWelcome();
        dom.searchInput.focus();
    });
    dom.welcomeLocationBtn.addEventListener('click', () => {
        hideWelcome();
        handleGeolocation();
    });

    // Delegated click handler on dropdown to eliminate per-item listener allocations
    dom.searchDropdown.addEventListener('click', (e) => {
        const el = e.target.closest('.search-result');
        if (!el) return;
        const lat = parseFloat(el.dataset.lat);
        const lon = parseFloat(el.dataset.lon);
        const name = el.dataset.name;
        const country = el.dataset.country;
        const tz = el.dataset.tz;
        dom.searchInput.value = name;
        closeDropdown();
        selectCity(lat, lon, name, country, tz);
    });

    document.addEventListener('click', (e) => {
        if (!dom.searchWrapper.contains(e.target)) {
            closeDropdown();
        }
    });
}

function handleSearchInput() {
    clearTimeout(state.searchDebounce);
    const query = dom.searchInput.value.trim();
    if (query.length < 2) {
        closeDropdown();
        return;
    }
    state.searchDebounce = setTimeout(() => {
        fetchCitySuggestions(query);
    }, 350);
}

async function fetchCitySuggestions(query) {
    const cacheKey = query.toLowerCase();
    if (geoCache.has(cacheKey)) {
        renderSuggestions(geoCache.get(cacheKey));
        return;
    }

    if (searchAbortController) {
        searchAbortController.abort();
    }
    searchAbortController = new AbortController();

    try {
        const res = await fetch(`${GEO_BASE}?name=${encodeURIComponent(query)}&count=6&language=en&format=json`, {
            signal: searchAbortController.signal
        });
        if (!res.ok) return;
        const data = await res.json();
        const results = data.results || [];

        // Bound cache size to prevent memory leaks
        if (geoCache.size >= 50) {
            const oldestKey = geoCache.keys().next().value;
            geoCache.delete(oldestKey);
        }
        geoCache.set(cacheKey, results);
        renderSuggestions(results);
    } catch (e) {
        if (e.name !== 'AbortError') closeDropdown();
    }
}

function renderSuggestions(results) {
    if (!results || results.length === 0) {
        showDropdown('<div class="search-no-results">No cities found</div>');
        return;
    }
    const html = results.map((r, i) => {
        const region = r.admin1 ? `, ${r.admin1}` : '';
        return `<div class="search-result" data-idx="${i}" data-lat="${r.latitude}" data-lon="${r.longitude}" data-name="${r.name}" data-country="${r.country || ''}" data-tz="${r.timezone || 'auto'}">${r.name}${region}<span class="result-country">${r.country || ''}</span></div>`;
    }).join('');
    showDropdown(html);
}

function showDropdown(html) {
    dom.searchDropdown.innerHTML = html;
    dom.searchDropdown.classList.add('active');
}

function closeDropdown() {
    dom.searchDropdown.classList.remove('active');
}

async function handleSearch() {
    const query = dom.searchInput.value.trim();
    if (!query) return;
    closeDropdown();
    showLoading('Searching for "' + query + '"...');
    try {
        const res = await fetch(`${GEO_BASE}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
        if (!res.ok) throw new Error('Geocoding failed');
        const data = await res.json();
        if (!data.results || data.results.length === 0) {
            showError('No city found for "' + query + '". Try another name.');
            return;
        }
        const city = data.results[0];
        selectCity(city.latitude, city.longitude, city.name, city.country || '', city.timezone || 'auto');
    } catch (e) {
        showError('Unable to search. Check your connection and try again.');
    }
}

async function selectCity(lat, lon, name, country, timezone) {
    state.lat = lat;
    state.lon = lon;
    state.cityName = name;
    state.countryName = country;
    state.timezone = timezone || 'auto';
    hideWelcome();
    await fetchWeather();
}

function handleGeolocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser.');
        return;
    }
    showLoading('Getting your location...');
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            state.lat = pos.coords.latitude;
            state.lon = pos.coords.longitude;
            state.timezone = 'auto';
            state.cityName = 'My Location';
            state.countryName = '';
            hideWelcome();
            await fetchWeather();
        },
        (err) => {
            let msg = 'Unable to get your location.';
            if (err.code === 1) msg = 'Location permission denied. Please search for a city instead.';
            else if (err.code === 2) msg = 'Location unavailable. Please search for a city.';
            else if (err.code === 3) msg = 'Location request timed out. Please try again.';
            showError(msg);
        },
        { timeout: 10000, enableHighAccuracy: false }
    );
}

async function fetchWeather(silent = false) {
    if (state.lat === null || state.lon === null) return;

    const cacheKey = `${state.lat.toFixed(3)},${state.lon.toFixed(3)}`;
    const now = Date.now();
    const cachedEntry = weatherCache.get(cacheKey);

    // Instant response if fresh data is already cached in memory
    if (!silent && cachedEntry && (now - cachedEntry.timestamp < WEATHER_CACHE_TTL)) {
        state.weatherData = cachedEntry.data;
        hideLoading();
        hideError();
        renderDashboard(cachedEntry.data);
        saveCache();
        return;
    }

    // Cancel any in-flight weather request
    if (weatherAbortController) {
        weatherAbortController.abort();
    }
    weatherAbortController = new AbortController();

    state.requestId++;
    const currentRequest = state.requestId;
    if (!silent && !state.isFetching) showLoading('Fetching weather data...');
    state.isFetching = true;

    try {
        const params = new URLSearchParams({
            latitude: state.lat,
            longitude: state.lon,
            current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,surface_pressure',
            hourly: 'wind_speed_10m,visibility,uv_index,precipitation_probability',
            daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
            timezone: state.timezone,
            forecast_days: 7
        });

        const res = await fetch(`${API_BASE}?${params}`, {
            signal: weatherAbortController.signal
        });
        if (!res.ok) throw new Error('Weather API error');
        const data = await res.json();
        if (currentRequest !== state.requestId) return;

        // Keep cache bounded
        if (weatherCache.size >= 20) {
            const oldestKey = weatherCache.keys().next().value;
            weatherCache.delete(oldestKey);
        }
        weatherCache.set(cacheKey, { data, timestamp: Date.now() });

        state.weatherData = data;
        state.isFetching = false;
        hideLoading();
        hideError();
        renderDashboard(data);
        saveCache();
    } catch (e) {
        state.isFetching = false;
        if (e.name === 'AbortError') return;
        if (currentRequest !== state.requestId) return;
        if (!silent || !state.weatherData) {
            showError('Failed to load weather data. Please try again.');
        }
    }
}

function refreshWeather() {
    hideError();
    if (state.lat !== null && state.lon !== null) {
        // Clear in-memory cache for this location to force fresh network fetch
        const cacheKey = `${state.lat.toFixed(3)},${state.lon.toFixed(3)}`;
        weatherCache.delete(cacheKey);
        fetchWeather(false);
    } else {
        showWelcome();
    }
}

function toggleUnit() {
    state.unit = state.unit === 'celsius' ? 'fahrenheit' : 'celsius';
    dom.unitToggle.querySelector('.unit-label').textContent = state.unit === 'celsius' ? '°C' : '°F';
    if (state.weatherData) {
        updateTemperaturesOnly(state.weatherData);
    }
    saveCache();
}

function updateTemperaturesOnly(data) {
    const current = data.current;
    if (current) {
        dom.tempValue.textContent = formatTempDisplay(current.temperature_2m);
        dom.feelsLike.textContent = `Feels like ${formatTempDisplay(current.apparent_temperature)}° · Wind ${Math.round(current.wind_speed_10m)} km/h`;
    }
    const cards = dom.forecastTrack.querySelectorAll('.forecast-day');
    if (cards.length && data.daily) {
        cards.forEach((card, i) => {
            if (data.daily.temperature_2m_max[i] !== undefined) {
                const tempEl = card.querySelector('.forecast-temp');
                if (tempEl) {
                    tempEl.innerHTML = `${formatTempDisplay(data.daily.temperature_2m_max[i])}<span class="forecast-temp-deg">°</span>`;
                }
            }
            if (data.daily.temperature_2m_min[i] !== undefined) {
                const lowEl = card.querySelector('.forecast-low');
                if (lowEl) {
                    lowEl.textContent = `Low: ${formatTempDisplay(data.daily.temperature_2m_min[i])}°`;
                }
            }
        });
    }
}

function convertTemp(celsius) {
    if (state.unit === 'fahrenheit') return Math.round(celsius * 9 / 5 + 32);
    return Math.round(celsius);
}

function formatTempDisplay(celsius) {
    return convertTemp(celsius);
}

function renderDashboard(data) {
    const current = data.current;
    const daily = data.daily;
    const hourly = data.hourly;

    const isDay = current.is_day === 1;
    const wmoCode = current.weather_code;
    const condition = getConditionInfo(wmoCode, isDay);

    transitionHero(() => {
        dom.conditionTitle.textContent = condition.title;
        dom.conditionSubtitle.textContent = condition.subtitle;
        dom.conditionDesc.textContent = condition.description;
        dom.tempValue.textContent = formatTempDisplay(current.temperature_2m);
        dom.feelsLike.textContent = `Feels like ${formatTempDisplay(current.apparent_temperature)}° · Wind ${Math.round(current.wind_speed_10m)} km/h`;
        dom.heroCity.textContent = state.cityName + (state.countryName ? ', ' + state.countryName : '');

        const currentHourIdx = getCurrentHourIndex(hourly);
        const uvIndex = currentHourIdx !== -1 && hourly.uv_index ? hourly.uv_index[currentHourIdx] : null;
        dom.uvBadge.textContent = uvIndex !== null && uvIndex !== undefined ? `UV Ind: ${Math.round(uvIndex)}` : '';

        updateLocalTime(data.timezone);
    });

    updateHeaderDate(data.timezone);
    const theme = getWeatherTheme(wmoCode, isDay);
    updateBackgroundTheme(theme);
    renderWindCard(current, hourly);
    renderSunCard(daily, data.timezone);
    renderDetails(current, hourly);
    renderForecast(daily);
}

function transitionHero(updateFn) {
    dom.heroContent.classList.add('transitioning');
    setTimeout(() => {
        updateFn();
        dom.heroContent.classList.remove('transitioning');
    }, 280);
}

function getCurrentHourIndex(hourly) {
    if (!hourly || !hourly.time) return -1;
    const now = new Date();
    const currentHour = now.toISOString().slice(0, 13);
    for (let i = 0; i < hourly.time.length; i++) {
        if (hourly.time[i].startsWith(currentHour.slice(0, 10)) &&
            hourly.time[i].includes('T' + String(now.getHours()).padStart(2, '0'))) {
            return i;
        }
    }
    return Math.min(now.getHours(), hourly.time.length - 1);
}

function getConditionInfo(code, isDay) {
    const conditions = {
        0: {
            title: isDay ? 'Clear Sky' : 'Clear Night',
            subtitle: isDay ? 'bright sunshine' : 'starry skies',
            description: isDay
                ? 'Beautiful clear skies with abundant sunshine. Perfect weather for outdoor activities.'
                : 'A calm, clear night with excellent visibility. Stars are visible across the sky.'
        },
        1: {
            title: 'Mostly Clear',
            subtitle: 'mainly clear skies',
            description: 'Predominantly clear skies with minimal cloud coverage. Pleasant and mild conditions.'
        },
        2: {
            title: 'Mostly Sunny',
            subtitle: 'partly cloudy skies',
            description: 'Clear skies with occasional clouds. Light winds keep temperatures comfortable, warm afternoons and cooler evenings.'
        },
        3: {
            title: 'Overcast',
            subtitle: 'heavy cloud cover',
            description: 'Thick cloud cover blanketing the sky. Temperatures remain mild with diffused lighting throughout the day.'
        },
        45: {
            title: 'Foggy',
            subtitle: 'low visibility fog',
            description: 'Dense fog reducing visibility significantly. Drive carefully and expect damp, cool conditions.'
        },
        48: {
            title: 'Rime Fog',
            subtitle: 'depositing rime fog',
            description: 'Freezing fog that deposits ice crystals on surfaces. Roads and walkways may be slippery.'
        },
        51: {
            title: 'Light Drizzle',
            subtitle: 'gentle drizzle',
            description: 'Fine, light drizzle falling steadily. An umbrella may be helpful for extended time outdoors.'
        },
        53: {
            title: 'Drizzle',
            subtitle: 'moderate drizzle',
            description: 'Persistent drizzle with moderate intensity. Surfaces may become damp and slippery.'
        },
        61: {
            title: 'Light Rain',
            subtitle: 'light rainfall',
            description: 'Light rain showers with gentle precipitation. Pack an umbrella if heading outdoors.'
        },
        63: {
            title: 'Rain',
            subtitle: 'moderate rainfall',
            description: 'Steady rainfall with moderate intensity. Expect wet roads and reduced visibility in some areas.'
        },
        65: {
            title: 'Heavy Rain',
            subtitle: 'intense rainfall',
            description: 'Heavy rain with significant precipitation. Possible localized flooding in low-lying areas.'
        },
        71: {
            title: 'Light Snow',
            subtitle: 'gentle snowfall',
            description: 'Light snow flurries dusting the landscape. Temperatures are near or below freezing.'
        },
        73: {
            title: 'Snow',
            subtitle: 'moderate snowfall',
            description: 'Steady snowfall with accumulation expected. Roads may become hazardous.'
        },
        75: {
            title: 'Heavy Snow',
            subtitle: 'intense snowfall',
            description: 'Heavy snowfall with significant accumulation. Travel may be seriously impacted.'
        },
        80: {
            title: 'Rain Showers',
            subtitle: 'scattered showers',
            description: 'Brief rain showers that may come and go. Keep an umbrella handy.'
        },
        95: {
            title: 'Thunderstorms',
            subtitle: 'intense weather conditions',
            description: 'Heavy rain, strong winds, and occasional lightning expected. Sudden downpours may lead to localized flooding in some areas.'
        },
        96: {
            title: 'Thunderstorm with Hail',
            subtitle: 'severe thunderstorm',
            description: 'Severe thunderstorm with hail. Seek shelter immediately.'
        }
    };

    return conditions[code] || {
        title: 'Cloudy',
        subtitle: 'variable clouds',
        description: 'Current weather conditions observed.'
    };
}

function getWeatherTheme(code, isDay) {
    if (code >= 95) return 'weather-thunder';
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'weather-snow';
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'weather-rain';
    if (code === 45 || code === 48) return 'weather-fog';
    if (code >= 2 && code <= 3) return 'weather-cloudy';
    if (!isDay) return 'weather-clear-night';
    return 'weather-clear-day';
}

function stopLightning() {
    if (state.lightningInterval) {
        clearInterval(state.lightningInterval);
        state.lightningInterval = null;
    }
    if (state.lightningTimeouts && state.lightningTimeouts.length) {
        state.lightningTimeouts.forEach(clearTimeout);
        state.lightningTimeouts = [];
    }
}

function updateBackgroundTheme(theme) {
    const bg = dom.weatherBg;
    const currentClasses = [...bg.classList].filter(c => c.startsWith('weather-'));
    currentClasses.forEach(c => bg.classList.remove(c));
    bg.classList.add(theme);

    stopLightning();

    if (theme === 'weather-thunder') {
        startLightning();
    }
}

function startLightning() {
    const lightningEl = $('.bg-lightning');
    function flash() {
        if (!lightningEl) return;
        lightningEl.classList.add('flash');
        const t1 = setTimeout(() => lightningEl.classList.remove('flash'), 100);
        state.lightningTimeouts.push(t1);

        const t2 = setTimeout(() => {
            if (Math.random() > 0.4) {
                lightningEl.classList.add('flash');
                const t3 = setTimeout(() => lightningEl.classList.remove('flash'), 70);
                state.lightningTimeouts.push(t3);
            }
        }, 180);
        state.lightningTimeouts.push(t2);
    }
    state.lightningInterval = setInterval(() => {
        if (Math.random() > 0.6) flash();
    }, 4500);
}

function renderWindCard(current, hourly) {
    dom.windSpeed.textContent = current.wind_speed_10m !== undefined ? current.wind_speed_10m.toFixed(2) : '--';
    dom.windDir.textContent = current.wind_direction_10m !== undefined ? getWindDirection(current.wind_direction_10m) : '--';
    dom.windGusts.textContent = current.wind_gusts_10m !== undefined ? current.wind_gusts_10m.toFixed(1) + ' km/h' : '--';

    if (hourly && hourly.wind_speed_10m) {
        const now = new Date();
        const currentHour = now.getHours();
        const startIdx = Math.max(0, currentHour - 5);
        const windData = hourly.wind_speed_10m.slice(startIdx, startIdx + 12);
        renderCustomWindGraph(windData);
    }
}

function getWindDirection(degrees) {
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round(degrees / 22.5) % 16;
    return dirs[idx] + ' (' + Math.round(degrees) + '°)';
}

function renderCustomWindGraph(windData) {
    if (!windData || windData.length === 0) return;
    const svg = dom.windGraph;
    const maxWind = Math.max(...windData, 1);
    const w = 260;
    const h = 70;
    const padding = 8;
    const graphW = w - padding * 2;
    const graphH = h - padding * 2;

    const points = windData.map((val, i) => {
        const x = padding + (i / (windData.length - 1)) * graphW;
        const y = padding + graphH - (val / maxWind) * (graphH * 0.85);
        return { x, y };
    });

    const curvePath = createSmoothPath(points);
    const areaPath = curvePath + ` L ${points[points.length - 1].x},${h - padding} L ${points[0].x},${h - padding} Z`;

    const bars = windData.map((val, i) => {
        const x = padding + (i / (windData.length - 1)) * graphW;
        const barH = Math.max(3, (val / maxWind) * (graphH * 0.45));
        return `<rect class="graph-bar" x="${x - 1.5}" y="${h - padding - barH}" width="3" height="${barH}" rx="1"/>`;
    }).join('');

    svg.innerHTML = `
        <defs>
            <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(255,255,255,0.35)"/>
                <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
            </linearGradient>
        </defs>
        ${bars}
        <path class="graph-area" d="${areaPath}"/>
        <path class="graph-line" d="${curvePath}"/>
    `;
}

function createSmoothPath(points) {
    if (points.length < 2) return '';
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const cp1x = points[i].x + (points[i + 1].x - points[i].x) / 2.5;
        const cp1y = points[i].y;
        const cp2x = points[i + 1].x - (points[i + 1].x - points[i].x) / 2.5;
        const cp2y = points[i + 1].y;
        d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${points[i + 1].x},${points[i + 1].y}`;
    }
    return d;
}

function renderSunCard(daily, timezone) {
    if (!daily || !daily.sunrise || !daily.sunset) {
        dom.sunriseTime.textContent = '--:--';
        dom.sunsetTime.textContent = '--:--';
        return;
    }

    const sunrise = new Date(daily.sunrise[0]);
    const sunset = new Date(daily.sunset[0]);

    dom.sunriseTime.textContent = formatTime(sunrise);
    dom.sunsetTime.textContent = formatTime(sunset);

    const now = new Date();
    const sunriseMs = sunrise.getTime();
    const sunsetMs = sunset.getTime();
    const nowMs = now.getTime();

    let progress = 0;
    if (nowMs < sunriseMs) progress = 0;
    else if (nowMs > sunsetMs) progress = 1;
    else progress = (nowMs - sunriseMs) / (sunsetMs - sunriseMs);

    renderSimulatedSunArc(progress);
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function renderSimulatedSunArc(progress) {
    const svg = dom.sunArc;
    const w = 220;
    const h = 120;
    const cx = w / 2;
    const baseY = h - 14;
    const radius = 86;

    const arcStart = { x: cx - radius, y: baseY };
    const arcEnd = { x: cx + radius, y: baseY };
    const arcPath = `M ${arcStart.x},${baseY} A ${radius},${radius} 0 0 1 ${arcEnd.x},${baseY}`;

    const clampedProg = Math.max(0, Math.min(1, progress));
    const sunAngle = Math.PI - clampedProg * Math.PI;
    const sunX = cx + radius * Math.cos(sunAngle);
    const sunY = baseY - radius * Math.sin(sunAngle);

    const arcLength = Math.PI * radius;
    const progressLength = clampedProg * arcLength;

    const numRays = 8;
    let rays = '';
    for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2;
        const r1 = 6;
        const r2 = 12;
        rays += `<line class="arc-ray"
            x1="${sunX + r1 * Math.cos(angle)}"
            y1="${sunY + r1 * Math.sin(angle)}"
            x2="${sunX + r2 * Math.cos(angle)}"
            y2="${sunY + r2 * Math.sin(angle)}"/>`;
    }

    const tickCount = 9;
    let ticks = '';
    for (let i = 0; i <= tickCount; i++) {
        const a = Math.PI - (i / tickCount) * Math.PI;
        const innerR = radius - 6;
        const outerR = radius;
        ticks += `<line
            x1="${cx + innerR * Math.cos(a)}"
            y1="${baseY - innerR * Math.sin(a)}"
            x2="${cx + outerR * Math.cos(a)}"
            y2="${baseY - outerR * Math.sin(a)}"
            stroke="rgba(255,255,255,0.18)" stroke-width="1"/>`;
    }

    svg.innerHTML = `
        <line class="horizon-line" x1="12" y1="${baseY}" x2="${w - 12}" y2="${baseY}"/>
        <path d="M ${cx - 16},${baseY} A 16,16 0 0 1 ${cx + 16},${baseY}" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
        <line x1="${cx - 16}" y1="${baseY}" x2="${cx + 16}" y2="${baseY}" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        ${ticks}
        <path class="arc-path" d="${arcPath}"/>
        <path class="arc-progress" d="${arcPath}"
            stroke-dasharray="${arcLength}"
            stroke-dashoffset="${arcLength - progressLength}"/>
        ${rays}
        <circle class="sun-dot" cx="${sunX}" cy="${sunY}" r="5.5"/>
    `;
}

function renderDetails(current, hourly) {
    dom.detHumidity.textContent = current.relative_humidity_2m !== undefined ? current.relative_humidity_2m + '%' : 'Unavailable';
    dom.detPressure.textContent = current.surface_pressure !== undefined ? Math.round(current.surface_pressure) + ' hPa' : 'Unavailable';

    const hourIdx = getCurrentHourIndex(hourly);
    if (hourly && hourly.visibility && hourIdx !== -1 && hourly.visibility[hourIdx] !== undefined) {
        const visKm = (hourly.visibility[hourIdx] / 1000).toFixed(1);
        dom.detVisibility.textContent = visKm + ' km';
    } else {
        dom.detVisibility.textContent = 'Unavailable';
    }

    if (hourly && hourly.precipitation_probability && hourIdx !== -1 && hourly.precipitation_probability[hourIdx] !== undefined) {
        dom.detPrecip.textContent = hourly.precipitation_probability[hourIdx] + '%';
    } else {
        dom.detPrecip.textContent = 'Unavailable';
    }
}

function renderForecast(daily) {
    if (!daily || !daily.time) return;

    const track = dom.forecastTrack;
    const today = new Date().toISOString().slice(0, 10);
    let html = '';
    const temps = [];

    for (let i = 0; i < daily.time.length; i++) {
        const date = new Date(daily.time[i] + 'T00:00:00');
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const isToday = daily.time[i] === today;
        const maxTemp = formatTempDisplay(daily.temperature_2m_max[i]);
        const minTemp = formatTempDisplay(daily.temperature_2m_min[i]);
        const wmoCode = daily.weather_code[i];
        const iconSvg = getWeatherIcon(wmoCode, true);

        temps.push(daily.temperature_2m_max[i]);

        html += `
            <div class="forecast-day ${isToday ? 'today active-day highlight-node' : ''}">
                <span class="forecast-day-name">${isToday ? 'Today' : dayName}</span>
                <span class="forecast-temp">${maxTemp}<span class="forecast-temp-deg">°</span></span>
                <div class="forecast-icon">${iconSvg}</div>
                <span class="forecast-low">Low: ${minTemp}°</span>
            </div>
        `;
    }

    track.innerHTML = html;
    renderForecastCurve(temps, daily.time.length, 0);
}

function renderForecastCurve(temps, count, highlightIdx = 0) {
    const svg = dom.forecastCurve;
    if (temps.length < 2) { svg.innerHTML = ''; return; }

    const rect = svg.parentElement.getBoundingClientRect();
    const w = Math.max(100, (rect.width && rect.width > 72) ? Math.round(rect.width - 72) : 300);
    const h = 60;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

    const minT = Math.min(...temps);
    const maxT = Math.max(...temps);
    const range = maxT - minT || 1;

    const padding = 24;
    const segW = (w - padding * 2) / (count - 1);

    const points = temps.map((t, i) => ({
        x: padding + i * segW,
        y: 12 + (1 - (t - minT) / range) * (h - 24)
    }));

    const curvePath = createSmoothPath(points);
    const dots = points.map((p, i) => {
        const isHigh = i === highlightIdx;
        return `<circle class="curve-dot ${isHigh ? 'curve-dot-highlight' : ''}" cx="${p.x}" cy="${p.y}" r="${isHigh ? '5' : '3.5'}"/>`;
    }).join('');

    svg.innerHTML = `<path class="curve-line" d="${curvePath}"/>${dots}`;
}

function getWeatherIcon(code, isDay = true) {
    if (code === 0 || code === 1) {
        if (!isDay) {
            return `<svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="8" fill="rgba(210,225,245,0.85)"/><path d="M22 14a8 8 0 0 1-8 10" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/></svg>`;
        }
        return `<svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="6.5" fill="rgba(255,215,90,0.95)"/><g stroke="rgba(255,195,50,0.8)" stroke-width="1.6" stroke-linecap="round"><line x1="18" y1="3" x2="18" y2="7"/><line x1="18" y1="29" x2="18" y2="33"/><line x1="3" y1="18" x2="7" y2="18"/><line x1="29" y1="18" x2="33" y2="18"/><line x1="7.4" y1="7.4" x2="10.2" y2="10.2"/><line x1="25.8" y1="25.8" x2="28.6" y2="28.6"/><line x1="7.4" y1="28.6" x2="10.2" y2="25.8"/><line x1="25.8" y1="10.2" x2="28.6" y2="7.4"/></g></svg>`;
    }
    if (code === 2) {
        return `<svg viewBox="0 0 36 36" fill="none"><circle cx="14" cy="14" r="5" fill="rgba(255,215,90,0.9)"/><g stroke="rgba(255,195,50,0.6)" stroke-width="1.2" stroke-linecap="round"><line x1="14" y1="4" x2="14" y2="7"/><line x1="14" y1="21" x2="14" y2="24"/><line x1="4" y1="14" x2="7" y2="14"/><line x1="21" y1="14" x2="24" y2="14"/></g><path d="M21 21a6 6 0 0 0-6-6 6 6 0 0 0-3 .8A5 5 0 0 1 21 17a5 5 0 0 1 7 4.5H14" stroke="rgba(255,255,255,0.75)" stroke-width="1.5" fill="rgba(255,255,255,0.2)"/></svg>`;
    }
    if (code === 3) {
        return `<svg viewBox="0 0 36 36" fill="none"><path d="M10 26h18a6 6 0 0 0 0-12 6 6 0 0 0-4-1 8 8 0 0 0-16 5 6 6 0 0 0 2 8z" fill="rgba(190,205,225,0.4)" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/></svg>`;
    }
    if (code === 45 || code === 48) {
        return `<svg viewBox="0 0 36 36" fill="none"><line x1="6" y1="14" x2="30" y2="14" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round"/><line x1="10" y1="19" x2="26" y2="19" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="24" x2="28" y2="24" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-linecap="round"/></svg>`;
    }
    if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) {
        return `<svg viewBox="0 0 36 36" fill="none"><path d="M10 18h16a5 5 0 0 0 0-10 5 5 0 0 0-3-.5 7 7 0 0 0-14 4 5 5 0 0 0 1 6.5z" fill="rgba(160,180,205,0.45)" stroke="rgba(255,255,255,0.5)" stroke-width="1.4"/><line x1="12" y1="22" x2="11" y2="28" stroke="rgba(170,210,255,0.7)" stroke-width="1.6" stroke-linecap="round"/><line x1="18" y1="22" x2="17" y2="28" stroke="rgba(170,210,255,0.7)" stroke-width="1.6" stroke-linecap="round"/><line x1="24" y1="22" x2="23" y2="28" stroke="rgba(170,210,255,0.7)" stroke-width="1.6" stroke-linecap="round"/></svg>`;
    }
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
        return `<svg viewBox="0 0 36 36" fill="none"><path d="M10 18h16a5 5 0 0 0 0-10 5 5 0 0 0-3-.5 7 7 0 0 0-14 4 5 5 0 0 0 1 6.5z" fill="rgba(210,225,245,0.35)" stroke="rgba(255,255,255,0.5)" stroke-width="1.4"/><circle cx="12" cy="24" r="1.6" fill="rgba(255,255,255,0.7)"/><circle cx="18" cy="26" r="1.6" fill="rgba(255,255,255,0.7)"/><circle cx="24" cy="23" r="1.6" fill="rgba(255,255,255,0.7)"/></svg>`;
    }
    if (code >= 95) {
        return `<svg viewBox="0 0 36 36" fill="none"><path d="M10 16h16a5 5 0 0 0 0-10 5 5 0 0 0-3-.5 7 7 0 0 0-14 4 5 5 0 0 0 1 6.5z" fill="rgba(90,95,115,0.6)" stroke="rgba(255,255,255,0.4)" stroke-width="1.4"/><path d="M19 17l-3 6h4l-3 6" stroke="rgba(255,220,70,0.95)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
    return `<svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="6" fill="rgba(255,215,90,0.9)"/></svg>`;
}

function updateHeaderDate(timezone) {
    try {
        const now = new Date();
        const tz = timezone !== 'auto' ? timezone : undefined;
        const dateKey = `hdr_date_${tz}`;
        const timeKey = `hdr_time_${tz}`;

        const dateFmt = getCachedFormatter(dateKey, {
            day: 'numeric',
            month: 'short',
            timeZone: tz
        });
        const timeFmt = getCachedFormatter(timeKey, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: tz
        });

        dom.headerDate.textContent = `${dateFmt.format(now)} | ${timeFmt.format(now)}`;
    } catch (e) {
        dom.headerDate.textContent = '28 Aug | 11:52';
    }
}

function updateLocalTime(timezone) {
    try {
        const now = new Date();
        const tz = timezone !== 'auto' ? timezone : undefined;
        const timeKey = `local_time_${tz}`;

        const timeFmt = getCachedFormatter(timeKey, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: tz
        });

        dom.localTime.textContent = timeFmt.format(now);
    } catch (e) {
        dom.localTime.textContent = '';
    }
}

function startClock() {
    if (state.clockInterval) clearInterval(state.clockInterval);
    state.clockInterval = setInterval(() => {
        if (state.weatherData) {
            updateHeaderDate(state.weatherData.timezone);
            updateLocalTime(state.weatherData.timezone);
        }
    }, 1000);
}

function showLoading(msg) {
    dom.loadingText.textContent = msg || 'Loading...';
    dom.loadingOverlay.classList.add('active');
    dom.errorOverlay.classList.remove('active');
}

function hideLoading() {
    dom.loadingOverlay.classList.remove('active');
}

function showError(msg) {
    dom.errorMessage.textContent = msg;
    dom.errorOverlay.classList.add('active');
    dom.loadingOverlay.classList.remove('active');
}

function hideError() {
    dom.errorOverlay.classList.remove('active');
}

function showWelcome() {
    dom.welcomeOverlay.classList.add('active');
}

function hideWelcome() {
    dom.welcomeOverlay.classList.remove('active');
}

window.addEventListener('resize', () => {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
        if (state.weatherData && state.weatherData.daily) {
            const temps = state.weatherData.daily.temperature_2m_max;
            renderForecastCurve(temps, temps.length, 0);
        }
    });
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
