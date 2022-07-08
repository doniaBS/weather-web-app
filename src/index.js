//* carousel
$(document).ready(function () {
  $(".owl-carousel").owlCarousel();
});

$(".owl-carousel").owlCarousel({
  loop: true,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  margin: 50,
  dots: true,
  dotsEach: true,
  responsiveClass: true,
  nav: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});
//* feature 1: display the current day info
let feature1 = document.querySelector("p.time-header");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let day = days[new Date().getDay()];
let date = new Date();
let hours = date.getHours();
let minutes = ("0" + date.getMinutes()).slice(-2); // I added 0 before minutes if less than 10 to make it look like 00:00
feature1.innerHTML = `${day} | ${hours}:${minutes}`;


//* feature 3: weather api => display the name of the city and its current temperture, humidity and wind
function weatherResponse(response) {
  console.log(response.data);
  let temperatureResponse = document.querySelector("#temperature");
  let cityResponse = document.querySelector("#city");
  let descriptionResponse = document.querySelector("#description");
  let humidityResponse = document.querySelector("#humidity");
  let windResponse = document.querySelector("#wind");
  let imageWeather = document.querySelector("#weather-img");
  temperatureResponse.innerHTML = Math.round(response.data.main.temp);
  cityResponse.innerHTML = response.data.name;
  descriptionResponse.innerHTML = response.data.weather[0].description;
  humidityResponse.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windResponse.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}Km/H`;
  imageWeather.setAttribute("src", `//openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}
function ajaxCall(city){
  let apiKey = "30e0e5bb453abedea9e4644fe840ec2e";
  let apiUrl = `//api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherResponse);
}
ajaxCall("new york");

//* feature 2: display the city name
function search(event) {
  if (event.keyCode === 13) {
    // key code of the keybord key
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    ajaxCall(searchInput.value);
  }
}
let container = document.querySelector("#search-container");
container.addEventListener("keypress", search);