function formatForDate(time) {
  let date = new Date(time);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let theDay = days[date.getDay()];
  return `${theDay} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let temperatureBox = document.querySelector("#temperature");
  let cityBox = document.querySelector("#modifiedCity");
  let descriptionBox = document.querySelector("#weather-state");
  let humidityBox = document.querySelector("#humidity");
  let windBox = document.querySelector("#wind");
  let dateBox = document.querySelector("#day-time");
  let iconBox = document.querySelector("#icon");

  tempInCelsius = response.data.main.temp;

  temperatureBox.innerHTML = Math.round(tempInCelsius);
  cityBox.innerHTML = response.data.name;
  descriptionBox.innerHTML = response.data.weather[0].description;
  humidityBox.innerHTML = response.data.main.humidity;
  windBox.innerHTML = Math.round(response.data.wind.speed);
  dateBox.innerHTML = formatForDate(response.data.dt * 1000);
  iconBox.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconBox.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "b6d0f48d8b8d9ccceaeb0e9770f0b375";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function submitHandler(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-selection");
  search(cityInputElement.value);
}

function displayTempInFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempInFahrenheit = (tempInCelsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(tempInFahrenheit);
}

function displayTempInCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(tempInCelsius);
}

let tempInCelsius = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitHandler);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayTempInFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayTempInCelsius);

search("Dhaka");
