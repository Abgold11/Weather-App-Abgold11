let currentTime = new Date();
function setDate(date) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  let hour = currentTime.getHours();
  let hour_string = `${hour}`;
  if (hour < 10) {
    hour_string = "0" + hour_string;
  }
  let minutes = currentTime.getMinutes();
  let minutes_string = `${minutes}`;
  if (minutes < 10) {
    minutes_string = "0" + minutes_string;
  }
  //return `${currentMonth} ${currentDate} ${hour}:${minutes}`

  let nowTime = document.querySelector("#nowTime");
  nowTime.innerHTML = `${hour_string}:${minutes_string}`;
  let nowDate = document.querySelector("#nowDate");
  nowDate.innerHTML = `${currentDate} ${currentMonth}`;
}

setDate(currentTime);

function celciusF(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector(".current");
  let tempF = Math.round((celsiusTemperature * 9) / 5 + 32);
  fahrenheitTemp.innerHTML = tempF;
}

function fahrenheitC(event) {
  event.preventDefault();
  let celciusTemp = document.querySelector(".current");
  celciusTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", celciusF);
let convert = document.querySelector(".celcius");
convert.addEventListener("click", fahrenheitC);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ca8471e6e6da36ee717fbd8bc9f904e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemperature = response.data.main.temp;
  document.querySelector(".highLow").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}ºC/${Math.round(response.data.main.temp_max)}ºC`;
  document.querySelector(".weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "ca8471e6e6da36ee717fbd8bc9f904e0";
  let apiSite = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiSite}?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
//console.log(input.value);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function geoPosition(response) {
  let longitude = response.coords.longitude;
  let latitude = response.coords.latitude;
  let apiKey = "ca8471e6e6da36ee717fbd8bc9f904e0";
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(geoUrl).then(displayWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getPosition);
