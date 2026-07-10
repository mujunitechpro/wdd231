
const WEATHER_API_KEY = "26dde041e93e5cb9c70c1d1aa426c689";

const DAR_ES_SALAAM = { lat: -6.7924, lon: 39.2083 };

const currentWeatherEl = document.getElementById("currentWeather");
const forecastEl = document.getElementById("weatherForecast");

async function getCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${DAR_ES_SALAAM.lat}&lon=${DAR_ES_SALAAM.lon}&units=metric&appid=${WEATHER_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Current weather request failed (status ${response.status})`);
    }
    return response.json();
}

async function getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${DAR_ES_SALAAM.lat}&lon=${DAR_ES_SALAAM.lon}&units=metric&appid=${WEATHER_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Forecast request failed (status ${response.status})`);
    }
    return response.json();
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    currentWeatherEl.innerHTML = `
    <img
      src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
      alt="${description}"
      class="weather__icon"
      width="60"
      height="60"
    />
    <div>
      <p class="weather__temp">${temp}&deg;C</p>
      <p class="weather__description">${description}</p>
    </div>
  `;
}

function displayForecast(data) {
    const today = new Date().toDateString();
    const seenDays = new Set([today]);
    const dailyPicks = [];

    for (const entry of data.list) {
        const entryDate = new Date(entry.dt * 1000);
        const dayString = entryDate.toDateString();
        const hour = entryDate.getHours();

        if (!seenDays.has(dayString) && hour >= 11 && hour <= 14) {
            seenDays.add(dayString);
            dailyPicks.push(entry);
        }

        if (dailyPicks.length === 3) break;
    }

    const dayLabelFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });

    forecastEl.innerHTML = dailyPicks
        .map((entry) => {
            const label = dayLabelFormatter.format(new Date(entry.dt * 1000));
            const temp = Math.round(entry.main.temp);
            return `
        <div class="forecast-day">
          <p class="forecast-day__label">${label}</p>
          <p class="forecast-day__temp">${temp}&deg;C</p>
        </div>
      `;
        })
        .join("");
}

async function loadWeather() {
    try {
        const [current, forecast] = await Promise.all([getCurrentWeather(), getForecast()]);
        displayCurrentWeather(current);
        displayForecast(forecast);
    } catch (error) {
        currentWeatherEl.innerHTML = `<p>Weather data is temporarily unavailable.</p>`;
        console.error("Failed to load weather:", error);
    }
}

loadWeather();