// helper ajax request function
var getData = function(url, callback) {
  $.ajax({
    type: "GET",
    url: url,
    crossDomain: true,
    dataType: "jsonp",
    data: {'format': 'jsonp'},
    success: callback
  });
}

$(window).load(function () {

  var map = L.map('map', {
    zoomControl: false
  }).setView([39.50,-98.35], 4);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

 // move zoom controls to top right
  new L.Control.Zoom({
    position: 'topright'
  }).addTo(map);

  // markers
  var myIcon = L.icon({
    iconUrl: './images/marker-icon.png',
    iconRetinaUrl: './images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 20.5],
    //popupAnchor: [-3, -76],
    shadowUrl: './images/marker-shadow.png',
    shadowRetinaUrl: './images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 20]
  });

  var placeEvent = function(event) {

    // add event marker to map
    L.marker([event.latitude,event.longitude], {icon: myIcon})
    .addEventListener("click", getEvent, {id: event.id})
    .addTo(map);

    // set default image for bottom scroll
    var eventImage = event.image;
    if (eventImage === null) {
      var eventImage = "http://4.bp.blogspot.com/-MzZCzWI_6Xc/UIUQp1qPfzI/AAAAAAAAHpA/OTwHCJSWFAY/s1600/cats_animals_kittens_cat_kitten_cute_desktop_1680x1050_hd-wallpaper-753974.jpeg";
    };

    // add event to bottom scroll
    var eventBox = $("<li/>", { "class": "event",}).bind("click", function() { getEvent.call({id: event.id}); } );
    eventBox.append("<a href=#><img src='" + eventImage + "' alt='" + event.name + "'><h2>" + event.name + "<br>" + event.date + "</h2></a>");
    $("#event-scroll").append(eventBox);


    // $("#event-scroll").append("<li class='event'><a href=#><img src='" + eventImage + "' alt='" + event.name + "'><h2>" + event.name + "<br>" + event.date + "</h2></a></li>")

    // $
  }

  var getEvent = function() {
    getData("http://127.0.0.1:8000/photoMap/api/events/" + this.id, populateOverlay);
  }

  var populateOverlay = function(event) {
    // set default image
    var eventImage = event.image;
    if (eventImage === null) {
      var eventImage = "http://4.bp.blogspot.com/-MzZCzWI_6Xc/UIUQp1qPfzI/AAAAAAAAHpA/OTwHCJSWFAY/s1600/cats_animals_kittens_cat_kitten_cute_desktop_1680x1050_hd-wallpaper-753974.jpeg";
    };

    // if it's only one day, just put the date once
    if (event.date === event.endDate) {
      var date = event.date;
    } else {
      var date = event.date + " to " + event.endDate;
    };

    // populate overlay
    $("#eventImg").html("<img src=" + eventImage + ">");
    $("#eventName").html(event.name);
    $("#eventDate").html(date);
    $("#eventDesc").html(event.description);

    $("#overlay").fadeToggle("fast");
    $("#fade-bg").fadeToggle("fast");

  }

  var populateMap = function(d) {

    // replace titles
    $(".interactive-title").html(d.name);
    document.title = d.name;

    $("#event-scroll").empty();

    // populate map and bottom scroll w/ markers
    for (var i = 0; i < d.events.length; i++) {
      placeEvent(d.events[i]);
    }
  };

  getData("http://127.0.0.1:8000/photoMap/api/maps/1/", populateMap);

  $("#overlay").hide();
  $("#fade-bg").hide();
  $("#exit-button").click(function() {
    $("#overlay").fadeToggle("fast");
    $("#fade-bg").fadeToggle("fast");
  });

});