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
