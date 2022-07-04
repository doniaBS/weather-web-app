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
//* feature 2: display the city name
function search(event) {
  let search = document.querySelector("input.search");
  if (event.keyCode === 13) {
    // key code of the keybord key
    event.preventDefault();
    let searchInput = document.querySelector("input#search-text-input");
    searchInput.innerHTML = `hello`;
    let text = document.querySelector("div.text-search");
    text.innerHTML = `${searchInput.value}`;
  }
}
let container = document.querySelector(".container");
container.addEventListener("keypress", search);

//* feature 3: weather api => display the name of the city and its current temperture, humidity and wind
function weather(response) {
  document.querySelector("div.text-search").innerHTML = response.data.name;
  document.querySelector("div.text-tempeture").innerHTML =
    response.data.main.temp;
}
function apiCity(city) {
  var apiKey = "30e0e5bb453abedea9e4644fe840ec2e";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios.get(`${apiUrl}&q=${cityValue}&appid=${apiKey}`).then(weather);
}
function searchCity(event) {
  event.preventDefault();
  var city = document.querySelector("input.form-control").value;
  apiCity(city);
}
