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
  let sunriseResponse = document.querySelector("#sunrise");
  let sunsetResponse = document.querySelector("#sunset");
  celciusTemp = response.data.main.temp;
  temperatureResponse.innerHTML = Math.round(celciusTemp);
  cityResponse.innerHTML = response.data.name;
  descriptionResponse.innerHTML = response.data.weather[0].description;
  humidityResponse.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windResponse.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}Km/H`;
  imageWeather.setAttribute("src", `//openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  sunriseResponse.innerHTML = sunrise(formattedTimeSunrise);
  sunsetResponse.innerHTML = sunsetFormat(formattedTimeSunset);
  function sunriseFormat(){
    let sunriseApi = response.data.sys.sunrise;
    let date = new Date(sunriseApi * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTimeSunrise = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }return formattedTimeSunrise;
  function sunsetFormat(){
    let sunsetApi = response.data.sys.sunset;
    let date = new Date(sunsetApi * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTimeSunset = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }return formattedTimeSunset;
  
}
function ajaxCall(city){
  let apiKey = "30e0e5bb453abedea9e4644fe840ec2e";
  let apiUrl = `//api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherResponse);
}


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

//# conversion temperature feature
function showFahrenheitTemp(event){
event.preventDefault();
let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
let temperatureResponse = document.querySelector("#temperature");
//# pass the active class from celcius to fahrenheit
celcius.classList.remove("active");
fahrenheit.classList.add("active");
temperatureResponse.innerHTML = Math.round(fahrenheitTemp);
}
function showCelciusTemp(event){
event.preventDefault();
let temperatureResponse = document.querySelector("#temperature");
celcius.classList.add("active");
fahrenheit.classList.remove("active");
temperatureResponse.innerHTML = Math.round(celciusTemp);
}
let celciusTemp = null;
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelciusTemp);
ajaxCall("new york");