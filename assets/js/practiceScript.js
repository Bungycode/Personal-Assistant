
M.Datepicker.init(document.querySelectorAll(".datepicker"), {
  format: "mm-dd-yyyy",
  showClearBtn: true,
  onClose: function() {
    var newDate = $(this.el).parent().find('.datepicker').val();
    $(this.el).parent().find('input[type!=hidden]').val(newDate);          
  }
});
$(".datepicker-prefix .prefix").click(function() {
  $(this)
    .parent()
    .find(".datepicker")
    .datepicker("open");
});
$(".datepicker-prefix")
  .find("input[type!=hidden]")
  .change(function() {
    if ($(this).val() != "") {
      var comps = $(this)
        .val()
        .split("-");
      // change code below to match your format needs
      var date = new Date(
        parseInt(comps[2]),
        parseInt(comps[1]) - 1,
        parseInt(comps[0])
      );
      $(this)
        .parent()
        .find(".datepicker")
        .datepicker("setDate", date);
    }
  });


  


  // 4/14 progress


  function calendarFunction() {
    M.Datepicker.init(document.querySelectorAll(".datepicker"), {
      format: "mm-dd-yyyy",
      showClearBtn: true,
      onClose: function () {
        var newDate = $(this.el).parent().find(".datepicker").val();
        $(this.el).parent().find("input[type!=hidden]").val(newDate);
      },
    });
    $(".datepicker-prefix .prefix").click(function () {
      $(this).parent().find(".datepicker").datepicker("open");
    });
    $(".datepicker-prefix")
      .find("input[type!=hidden]")
      .change(function () {
        if ($(this).val() != "") {
          var comps = $(this).val().split("-");
          // change code below to match your format needs
          var date = new Date(
            parseInt(comps[2]),
            parseInt(comps[1]) - 1,
            parseInt(comps[0])
          );
          $(this).parent().find(".datepicker").datepicker("setDate", date);
        }
      });
  }
  
  // Api Features
  
  // TicketMaster Api Info
  var eventUrl = "https://app.ticketmaster.com/discovery/v2/";
  var tmConsumerKey = "pcEJGr2cYwQGRI3Kn9mALQEZapaMlNvg";
  
  // OpenWeather Api Info
  var weatherUrl = "https://api.openweathermap.org/";
  var weatherApiKey = "4032b269e04269c6ea8463855c745b5d";
  
  // Events Query
  
  function getLocalEvents() {}
  
  // var eventsQuery =
  //   "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city="+ city +"&apikey="+ tmConsumerKey +"";
  // // window.location
  // var weathersQuery;
  // var query =
  //   "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=" +
  //   city +
  //   "&startDateTime=" +
  //   sTime +
  //   "apikey=" +
  //   apiKey +
  //   "";
  // var apiKey = "pcEJGr2cYwQGRI3Kn9mALQEZapaMlNvg";
  
  // Weather Query
  
  // var currentTime = tmConsumerKey.current.dt;
  
  var locationUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=33.3807616&lon=-84.7413248&q=atlanta&appid="+ weatherApiKey +""
  fetch(locationUrl).then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  
  
  })
  
  // User story templage
  
  // As a user
  
  // I want to create a row for the activity
  
  // So that it gets added to the screen.
  
  function setEventListeners() {
    // Create createdRows function
  }
  
  function init() {
    calendarFunction();
    // createdRows();
  }
  
  // The below code is for current gps authorization.
  // Get james to help us with this function.
  
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
  // }
  
  // function error(err) {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }
  
  // console.log(navigator.geolocation.getCurrentPosition(success, error, options));
  
  init();
  