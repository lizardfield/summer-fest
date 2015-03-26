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

  var placeEvents = function(event) {
    // add event marker to map
    L.marker([event.latitude,event.longitude], {icon: myIcon})
    .addEventListener("click", showEvent, event)
    .addTo(map);

    // set default image for bottom scroll
    var eventImage = event.image;
    if (eventImage === null) {
      var eventImage = "http://4.bp.blogspot.com/-MzZCzWI_6Xc/UIUQp1qPfzI/AAAAAAAAHpA/OTwHCJSWFAY/s1600/cats_animals_kittens_cat_kitten_cute_desktop_1680x1050_hd-wallpaper-753974.jpeg";
    };

    // add event to bottom scroll
    $("#event-scroll").append("<li class='event'><a href=#><img src='" + eventImage + "' alt='" + event.name + "'><h2>" + event.name + "<br>" + event.date + "</h2></a></li>");
  }

  // image URL is incorrect

  var placeSubevents = function(subevent) {
    $("#subevent-scroll").append("<li>" + subevent.name + "</li>");
  }

  var showEvent = function(details) {
    console.log(this);
  }

//  var populateSidebar = function(d) {
//    $("#subevent-scroll").empty();
//    getData("http://127.0.0.1:8000/photoMap/api/events/" + );
//  }
// how to know total # of subevents? does there need to be a subevent array in api/maps?

  var populateMap = function(d) {
    // replace titles
    $(".interactive-title").html(d.name);
    document.title = d.name;
    $(".sidebar-title").html("Filter by " + d.subevent_type);

    $("#event-scroll").empty();

    // populate map w/ markers
    for (var i = 0; i < d.events.length; i++) {
      console.log(d.events[i]);
      getData("http://127.0.0.1:8000/photoMap/api/events/" + d.events[i], placeEvents);
    }
  }

  getData("http://127.0.0.1:8000/photoMap/api/maps/1/", populateMap);
});