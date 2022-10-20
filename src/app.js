function formatdate(date) {
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
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} , ${hours}:${minutes}`;
}

function showTemp(response) {
  console.log(response.data);
  document.querySelector("h2").innerHTML = response.data.name;
  let citytemp = document.querySelector("#temp");
  citytemp.innerHTML = Math.round(response.data.main.temp);
  let conditionsCity = document.querySelector("#cloud");
  conditionsCity.innerHTML = response.data.weather[0].main;
  let hightemp = document.querySelector("#highest");
  hightemp.innerHTML = "H: " + Math.round(response.data.main.temp_max) + "°";
  let lowtemp = document.querySelector("#lowest");
  lowtemp.innerHTML = "L: " + Math.round(response.data.main.temp_min) + "°";
}

function entercity(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#Search-city").value;

  let apiKey = "&appid=4dd5070f619df286cb5eef7a02d06ffc";
  let keyUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let units = "&units=metric";
  let fullUrl = keyUrl + cityinput + apiKey + units;
  axios.get(fullUrl).then(showTemp);
}

let search = document.querySelector("#searchcity-form");
search.addEventListener("submit", entercity);

///bonus points attempt
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "appid=4dd5070f619df286cb5eef7a02d06ffc";
  let keyUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "units=metric";
  let newUrl = `${keyUrl}lat=${latitude}&lon=${longitude}&${apiKey}&${units}`;
  axios.get(newUrl).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let nowdate = document.querySelector("h4");
let nowtime = new Date();
nowdate.innerHTML = formatdate(nowtime);

let currentbutton = document.querySelector("#Current-city");
currentbutton.addEventListener("click", getCurrentPosition);
