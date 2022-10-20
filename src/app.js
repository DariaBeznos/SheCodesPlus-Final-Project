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
  document.querySelector("h2").innerHTML = response.data.city;
  let citytemp = document.querySelector("#temp");
  citytemp.innerHTML = Math.round(response.data.temperature.current);
  let conditionsCity = document.querySelector("#cloud");
  conditionsCity.innerHTML = response.data.condition.description;
  let hightemp = document.querySelector("#highest");
  hightemp.innerHTML =
    "H: " + Math.round(response.data.temperature.pressure) + "°";
  let lowtemp = document.querySelector("#lowest");
  lowtemp.innerHTML =
    "L: " + Math.round(response.data.temperature.humidity) + "°";
}

function entercity(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#Search-city").value;

  let apiKey = "&key=0do03079aa87b76e5601f032b94bt858";
  let keyUrl = "https://api.shecodes.io/weather/v1/current?query=";
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

  let apiKey = "key=0do03079aa87b76e5601f032b94bt858";
  let keyUrl = "https://api.shecodes.io/weather/v1/current?";
  let units = "units=metric";
  let newUrl = `${keyUrl}lon=${longitude}&lat=${latitude}&${apiKey}&${units}`;
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
