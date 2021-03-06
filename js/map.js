// helper ajax request function
var getData = function(url4, callback) {
  $.ajax({
    type: "GET",
    url: url4,
    crossDomain: true,
    dataType: "jsonp",
    data: {'format': 'jsonp'},
    success: callback
  });
}

// set default event image
var defaultImage = "http://www.nbn.org.il/gosouth/wp-content/uploads/2014/05/summer.jpg";

$(window).load(function () {

  // set map's max bounds
  var cornerSW = L.latLng(51.0000,-128.0000),
      cornerNE = L.latLng(22.0000,-68.0000),
      bounds = L.latLngBounds(cornerSW, cornerNE);

  var map = L.map('map', {
    zoomControl: false,
    layers: MQ.mapLayer(),
    maxBounds: bounds,
    minZoom: 4,
  }).setView([39.50,-98.35], 4);

 // move zoom controls to top right
  new L.Control.Zoom({
    position: 'topright'
  }).addTo(map);

  // markers
  var myIcon = L.icon({
    iconUrl: './images/marker-icon.png',
    iconRetinaUrl: './images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 40],
    shadowUrl: './images/marker-shadow.png',
    shadowRetinaUrl: './images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 40]
  });

  var placeEvent = function(event) {

    // add event marker to map
    L.marker([event.latitude,event.longitude], {icon: myIcon})
    .addEventListener("click", getEvent, {id: event.id})
    .addTo(map);

    // set default image for bottom scroll
    var eventImage = event.image;
    if (eventImage === null) {
      var eventImage = defaultImage;
    };

    var startingDate = new Date(event.date);
    var endingDate = new Date(event.endDate);

    // add event to bottom scroll
    var eventBox = $("<li/>", { "class": "event",}).bind("click", function() { getEvent.call({id: event.id}); } );
    eventBox.append("<a href=#><img src='" + eventImage + "' alt='" + event.name + "'><h2>" + event.name + "<br>" + $.format.date(event.date, "MMM d") + "</h2></a>");
    $("#event-scroll").append(eventBox);

    // console.log($.format.date(event.date, "ddd, MMMM d"))
  }

  var getEvent = function() {
    getData("http://127.0.0.1:8000/photoMap/api/events/" + this.id, populateOverlay);
  }

  var populateOverlay = function(event) {
    // set default image
    var eventImage = event.image;
    if (eventImage === null) {
      var eventImage = defaultImage;
    };

    // if it's only one day, just put the date once
    var startingDate = new Date(event.date);
    var endingDate = new Date(event.endDate);

    if (startingDate.getYear() === endingDate.getYear() && startingDate.getMonth() === endingDate.getMonth() && startingDate.getDay() === endingDate.getDay()) {
      var date = $.format.date(event.date, "MMM d");
    } else {
      var date = $.format.date(event.date, "MMM d") + " to " + $.format.date(event.endDate, "MMM d");
    };

    // populate overlay
//    $("#eventImg").html("<img src=" + eventImage + ">");
    $("#overlay-box")
      .css("background-image", "url(" + eventImage + ")");
    $("#eventName").html(event.name);
    $("#eventDate").html(date);
    $("#eventDesc").html(event.description);

    $("#overlay").fadeToggle("fast");
    $("#fade-bg").fadeToggle("fast");

  }

  var populateMap = function(d) {

    // replace titles
    $("#interactive-title").html(d.name);
    document.title = d.name;

    $("#event-scroll").empty();

    d.events.sort(function(a, b) {
      return Date.parse(a.date) - Date.parse(b.date);
    });

    // populate map and bottom scroll w/ markers
    for (var i = 0; i < d.events.length; i++) {
      placeEvent(d.events[i]);
    }
  };

  getData("http://127.0.0.1:8000/photoMap/api/maps/1/", populateMap);

  $("#attribution-overlay").hide();
  $("#attr-fade-bg").hide();
  $("#overlay").hide();
  $("#fade-bg").hide();
  $("#exit-button").click(function() {
    $("#overlay").fadeToggle("fast");
    $("#fade-bg").fadeToggle("fast");
  });

  $("#fade-bg").click(function() {
    $("#overlay").fadeToggle("fast");
    $("#fade-bg").fadeToggle("fast");
  });

  $("#attribution-link").click(function() {
    $("#attribution-overlay").fadeToggle("fast");
    $("#attr-fade-bg").fadeToggle("fast");
  });

  $("#attr-exit-button").click(function() {
    $("#attribution-overlay").fadeToggle("fast");
    $("#attr-fade-bg").fadeToggle("fast");
  });

  $("#attr-fade-bg").click(function() {
    $("#attribution-overlay").fadeToggle("fast");
    $("#attr-fade-bg").fadeToggle("fast");
  });

});