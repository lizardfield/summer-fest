$(document).ready(function() {

	alert( "hi what's up" );

	$.get( "http://127.0.0.1/photoMap/api/maps/1", function( data ) {
		$( ".result" ).html( data );
		alert( "Data get!" );
	});

});