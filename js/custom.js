$(document).ready(function() {
	$('.sidebar-toggle').toggle(function() {
    $('.sidebar').stop().animate({
        width: "200px",
    }, 1000);
	}, function() {
    $('.sidebar').stop().animate({
        width: "-10px",
    }, 1000);
});