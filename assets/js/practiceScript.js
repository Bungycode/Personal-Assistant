var eventCityEl = document.querySelector(".event-city");
var dateEl = document.querySelector(".date");
var getEventsEl = document.querySelector(".get-events");
var savedEventsEl = document.querySelector(".saved-events");
var eventWeatherEl = document.querySelector(".event-weather");
var cityInputEl = document.querySelector(".city");
var resultHeader = document.querySelector("#result-header");

var HIDE_CLASS = "hide"; 

// Datepicker not in use at the moment. Future feature to filter events by date.

var currYear = (new Date()).getFullYear();
$(document).ready(function() {
  $(".datepicker").datepicker({
    defaultDate: new Date(currYear,03),
    format: "mm-dd-yyyy"
  });
});


// Api Features

// TicketMaster Api Info
var eventUrl = `https://app.ticketmaster.com/discovery/v2/`;
var tmConsumerKey = `pcEJGr2cYwQGRI3Kn9mALQEZapaMlNvg`;

// OpenWeather Api Info
var weatherUrl = "https://api.openweathermap.org/";
var weatherApiKey = "4032b269e04269c6ea8463855c745b5d";

// Events Query
function getEvents() {

var city = eventCityEl.value;
console.log(city);
// var date = dateEl.value;
// console.log(date);
// var generateEventsName = "";
// var generateEventsVenue = "";
// Have to target the hard coded element.
getEventsEl.innerHTML = "";

var eventsQuery =
  "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city="+ city +"&apikey="+ tmConsumerKey +"";

  fetch(eventsQuery).then(function (response) {
    console.log(response) // throws an error because it hasnt been converted yet.
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    for (var i = 0; i < data._embedded.events.length; i++) {
      var generateEventsName = data._embedded.events[i].name;
      console.log(generateEventsName);
      if (data._embedded.events[i]._embedded.venues[0].name) {
      var generateEventsVenue = data._embedded.events[i]._embedded.venues[0].name;
      } else {
        generateEventsVenue = "TBA";
      }
        console.log(generateEventsVenue);
        var generateEventsEl = document.createElement("div");
        // generatedEventsEl.addClass("clearList")
        generateEventsEl.innerHTML = `
                          <div>
                            <div class="col s7 grey lighten-2 black-border">
                              ${generateEventsName}
                            </div>
                            <div class="col s5 black grey-text text-lighten-2 grey-border">
                              ${generateEventsVenue}
                            </div>
                          </div>
                          `
      getEventsEl.appendChild(generateEventsEl);
    }
    resultHeader.innerHTML = `
                    <div class="row valign-wrapper zero-margin">
                      <h4 class="col s7 light-green-text text-accent-1">${city} Events</h4>
                      <h4 class="col s5 light-green-text text-accent-1">Venues</h4>
                    </div>
                  `
  });

}

function printUserSearch() {
  var citySearch = JSON.parse(window.localStorage.getItem("citySearch")) || [];
  citySearch.forEach(function (city) {
    var newDiv = document.createElement("li");
    newDiv.textContent = city;
  }) 

}

printUserSearch();

function saveUserSearch() {
  var city = cityInputEl.value;
  console.log(city);
  if (city !== "") {
    var citySearch = JSON.parse(window.localStorage.getItem("citySearch")) || [];
    var newCity = {
      city: city
    };
    citySearch.push(newCity);
    window.localStorage.setItem("citySearch", JSON.stringify(citySearch));
  }
}


function setEventListeners() {
  $(".submit").on("click", function () {
    //ticketMaster fetch code goes here
    var city = eventCityEl.value;
    console.log(city);
    // var date = dateEl.value;
    // console.log(date);

    // var eventsQuery =
    // "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=" +
    // city +
    // "&apikey=" +
    // tmConsumerKey +
    // "";

    var eventsQuery =
      "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=" +
      city +
      "&apikey=" +
      tmConsumerKey +
      "";

    // Future feature to try to get certain data by bypassing CORS
    // fetch(eventsQuery, { method: "GET", headers: {"Content-Type": "application/json"}}) // allow me to actually get the data with the assumption im in the same origin.
    fetch(eventsQuery)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        if (!city) {
          console.log("Please enter major city.");

          // Only need .ready for when the page loads on ready.
          // $(document).ready(function(){
            $('.modal').modal();
            $('.noInputModal').modal('open');
            return;
          // });

        } else if (!data._embedded) {
          console.log("No city found! Please enter the correct city.");

          // Only need .ready for when the page loads on ready.
          // $(document).ready(function(){
            $('.modal').modal();
            $('.cityErrorModal').modal('open');
            return;
          // });

        } else {
          console.log("Please choose one of the events listed below!")
          console.log(data._embedded.events)
          getEvents();
          saveUserSearch()
        }
      });

    // weather fetch code goes here

    var weatherQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherApiKey}`;

    fetch(weatherQuery)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // var generateCityWeatherName = "";
        // var generateCityWeatherTemp = "";
        // var generateCityWeatherHumidity = "";
        // var generateCityWeatherDescription = "";
        eventWeatherEl.innerHTML = "";
        var displayCityWeather = document.createElement("div"); 
        //displayCityWeather.classList.add("center-align");
        var generateCityWeatherName = data.name;
        console.log(generateCityWeatherName);
        var generateCityWeatherTemp = data.main.temp;
        console.log(generateCityWeatherTemp);
        var generateCityWeatherHumidity = data.main.humidity;
        console.log(generateCityWeatherHumidity);
        var generateCityWeatherDescription = data.weather[0].description;
        console.log(generateCityWeatherDescription);
        var generateCityWeatherIcon = data.weather[0].icon;
        console.log(generateCityWeatherIcon);
        displayCityWeather.classList ="col m3 col s12 grey-text text-lighten-2 black-border";
        displayCityWeather.innerHTML = `
                              <h4 class="light-green-text text-accent-1">${generateCityWeatherName} Weather</h4>
                              <img src="https://openweathermap.org/img/wn/${generateCityWeatherIcon}.png" />
                              <p>Description: ${generateCityWeatherDescription}</p>
                              <p>Temp: ${generateCityWeatherTemp}</p>
                              <p>Humidity: ${generateCityWeatherHumidity}%</p>
                            `
        eventWeatherEl.appendChild(displayCityWeather);

      });
  });
}

// Future feature: Get current location and time from user

// var currentTime = tmConsumerKey.current.dt;

// var geolocationLat = crd.lat;
// console.log(geolocationLat);
// var geolocationLon = crd.lon;
// console.log(geolocationLon);

// var locationUrl =
// `https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=${weatherApiKey}`

// fetch(locationUrl).then(function (response) {
//   console.log(response);
//   return response.json();
// })
// .then(function (data) {
//   console.log(data);
//   var lat = data.coord.lat;
//   console.log(lat);
//   var lon = data.coord.lon;
//   console.log(lon);
//   var city = data.name;
//   console.log(city);

// });

// function createCityEvents() {
//     console.log("foo");
// }

// The below code is for current gps authorization.

// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };

// function success(pos) {
//   var crd = pos.coords;
//   console.log(pos);
//   console.log("Your current position is:");
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);

// });

// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }
// // Ask James where the allow gps access authorization is located in the console. Is it in the cache?
// console.log(navigator);
// console.log(navigator.geolocation);
// console.log(navigator.geolocation.getCurrentPosition)
// console.log(navigator.geolocation.getCurrentPosition(success, error, options));

function init() {
  setEventListeners();
  // calendarFunction();
  // createdRows();
}

init();
