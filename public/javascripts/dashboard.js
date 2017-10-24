$('.toggleNav').click(function(){
	if($('#navbarContainer').css('margin-left') == '0px'){
		console.log(1);
		$('#navbarContainer').animate({'margin-left':'-=170'}, 600)
		$('.toggleIcon').toggleClass('fa-chevron-right', 600, 'easeOutSine')
		$('.toggleIcon').toggleClass('fa-chevron-left', 600, 'easeOutSine')
		$('.mainBox').toggleClass('col-9', 600, 'easeOutSine');
		$('.mainBox').toggleClass('col-11', 600, 'easeOutSine');
	}else{
		console.log(2);
		$('#navbarContainer').animate({marginLeft: '0px'}, 600)
		$('.toggleIcon').toggleClass('fa-chevron-right', 600, 'easeOutSine')
		$('.toggleIcon').toggleClass('fa-chevron-left', 600, 'easeOutSine')
		$('.mainBox').toggleClass('col-9', 600, 'easeOutSine');
		$('.mainBox').toggleClass('col-11', 600, 'easeOutSine');

	}
})

//Slider
$('#ex1').slider({
	formatter: function(value) {
		return 'Current value: ' + value;
	}
});
$('#ex1').change(function(){
	$('.timeDisplay').html($('#ex1').val())
})

var mymap = L.map('map').setView([51.505, -0.09], 3);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGxhbnQ5OSIsImEiOiJjajh5MzhqdTUyNWxrMzJwOGJ0dWE2NTB0In0.dyjmXnIUF9KYU4ewcTdqcQ', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 16,
    id: 'isawnyu.map-knmctlkh',
    accessToken: 'pk.eyJ1IjoicGxhbnQ5OSIsImEiOiJjajh5MzhqdTUyNWxrMzJwOGJ0dWE2NTB0In0.dyjmXnIUF9KYU4ewcTdqcQ'
}).addTo(mymap);
var marker = L.marker([51.5, -0.09]).addTo(mymap);

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

$.getJSON("/jsons/map1.geojson", function(json) {
    console.log(json); // this will show the info it in firebug console
    var campus = json;
    x = L.geoJSON(campus, {
        color: 'grey',
        fillColor: '#f03',
        style: function (feature) {
            return feature.properties && feature.properties.style;
        },

        onEachFeature: onEachFeature,

        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    });
    x.addTo(mymap);
    //remove layer
    setTimeout(()=>{
        mymap.removeLayer(x);
    }, 5000)
});


function onEachFeature(feature, layer) {
		var popupContent = "<p>I started out as a GeoJSON " +
				feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
		}

		layer.bindPopup(popupContent);
	}