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

function displayForecast() {
  let FCelement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let fcHTML = `<div class="row">`;

  days.forEach(function (day) {
    fcHTML =
      fcHTML +
      `
        <div class="col-2">
          <div class="weatherFCday">${day}</div>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png"
            alt=""
            width="22"
          />
          <div class="weatherFCtemp">
            <span class="weatherFChighest"> 18 </span>
            <span class="weatherFClowest"> 12 </span>
          </div>
        </div>
      </div>`;
  });

  fcHTML = fcHTML + `</div>`;
  FCelement.innerHTML = fcHTML;
}

function showTemp(response) {
  console.log(response.data);
  document.querySelector("h2").innerHTML =
    response.data.city + ", " + response.data.country;
  celsiustemp = response.data.temperature.current;

  let citytemp = document.querySelector("#temp");
  citytemp.innerHTML = Math.round(celsiustemp);
  let conditionsCity = document.querySelector("#cloud");
  conditionsCity.innerHTML = response.data.condition.description;
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML =
    "Pressure: " + Math.round(response.data.temperature.pressure) + "%";
  document.querySelector("#humidity").innerHTML =
    "Humidity: " + Math.round(response.data.temperature.humidity) + "%";

  document
    .querySelector("#weathericon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
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

function showfahrenheit(change) {
  change.preventDefault();
  let fahrenheittemp = (celsiustemp * 9) / 5 + 32;
  document.querySelector("#temp").innerHTML = Math.round(fahrenheittemp);
  document.querySelector("#celsius").classList.remove("active");
  document.querySelector("#fahrenheit").classList.add("active");
}
function celsiuslink(changecelsius) {
  changecelsius.preventDefault();
  document.querySelector("#temp").innerHTML = Math.round(celsiustemp);
  document.querySelector("#celsius").classList.add("active");
  document.querySelector("#fahrenheit").classList.remove("active");
}

let nowdate = document.querySelector("h4");
let nowtime = new Date();
nowdate.innerHTML = formatdate(nowtime);

let currentbutton = document.querySelector("#Current-city");
currentbutton.addEventListener("click", getCurrentPosition);

document.querySelector("#fahrenheit").addEventListener("click", showfahrenheit);
let celsiustemp = null;

document.querySelector("#celsius").addEventListener("click", celsiuslink);
displayForecast();
