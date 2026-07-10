const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=26dde041e93e5cb9c70c1d1aa426c689";

async function apiFetch() {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayResults(data) {

    currentTemp.textContent = data.main.temp;

    const iconsrc =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const desc = data.weather[0].description;

    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);

    captionDesc.textContent = desc;
}

apiFetch();