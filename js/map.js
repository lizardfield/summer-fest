// load data

$(document).ready(function() {

//  $.get("http://127.0.0.1:8000/photoMap/api/maps/1", function(data) {
//    $(".result").html(data);
//    alert("data get!");
//  });

  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/photoMap/api/maps/1/",
    crossDomain: true,
    dataType: "jsonp",
    data: {'format': 'jsonp'},
    success: function (d) {
      $(".interactive-title").html(d.name);
      document.title = d.name;
      $(".sidebar-title").html("Filter by " + d.subevent_type);
    }
  });

  function getEventList() {
    return $.ajax({
      type: "GET",
      url: "http://127.0.0.1:8000/photoMap/api/maps/1/",
      crossDomain: true,
      dataType: "jsonp",
      data: {'format': 'jsonp'},
//      success:
    });
  }

getEventList().done(console.log);

}); // $(document).ready

// leaflet

window.onload = function () {
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

  L.marker([39.50,-98.35], {icon: myIcon}).addTo(map);

};