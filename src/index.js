let h2 = document.querySelector("h2");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

h2.innerHTML = `${day} ${hour}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type city");
  }
}
let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", search);

function displayWeatherCondition(response) {
  let temp = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}`;
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let humidity = document.querySelector("#humidity");
  let humid = response.data.main.humidity;
  humidity.innerHTML = `${humid};`;
  let description = document.querySelector("#description");
  descrip = response.data.weather[0].main;
  description.innerHTML = `${descrip}`;
  let wind = document.querySelector("#wind");
  let windy = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windy}`;
}

function showPosition(position) {
  let apiKey = "b084cc863e7cc77fe1afd652d110f617";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

navigator.geolocation.getCurrentPosition(showPosition);

function searchCity(city) {
  let apiKey = "b084cc863e7cc77fe1afd652d110f617";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCity);
}

function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", cityInput);

let button = document.querySelector("#location");
button.addEventListener("click", displayWeatherCondition);
