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

  var placeMarker = function(d) {
    L.marker([d.latitude,d.longitude], {icon: myIcon}).addTo(map);
  }

  var populateMap = function(d) {
  // replace titles
  $(".interactive-title").html(d.name);
  document.title = d.name;
  $(".sidebar-title").html("Filter by " + d.subevent_type);

  // populate map w/ markers
  for (var i = 0; i < d.events.length; i++) {
    console.log(d.events[i]);
    getData("http://127.0.0.1:8000/photoMap/api/events/" + d.events[i], placeMarker); // run
  }
}

  getData("http://127.0.0.1:8000/photoMap/api/maps/1/", populateMap);
});