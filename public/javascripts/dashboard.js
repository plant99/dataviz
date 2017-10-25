let loadedLayers = [];
let maps = {};
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
    let newValueOfTime = $('#ex1').val();
	$('.timeDisplay').html(newValueOfTime);
    //load proper maps

    while(loadedLayers.length){
        let toBeRemoved = loadedLayers.pop();
        mymap.removeLayer(toBeRemoved);
    }
    var area = maps['map'+newValueOfTime];
    let toBeAdded = L.geoJSON(area, {
        color: 'grey',
        fillColor: '#f03',
        style: function (feature) {
            return feature.properties && feature.properties.style;
        },

        onEachFeature: onEachFeature,

        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: "##7442a9",
                color: "#212f5b",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    });
    toBeAdded.addTo(mymap);
    loadedLayers.push(toBeAdded);
})

var mymap = L.map('map').setView([51.505, -0.09], 3);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGxhbnQ5OSIsImEiOiJjajh5MzhqdTUyNWxrMzJwOGJ0dWE2NTB0In0.dyjmXnIUF9KYU4ewcTdqcQ', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 16,
    id: 'isawnyu.map-knmctlkh',
    accessToken: 'pk.eyJ1IjoicGxhbnQ5OSIsImEiOiJjajh5MzhqdTUyNWxrMzJwOGJ0dWE2NTB0In0.dyjmXnIUF9KYU4ewcTdqcQ'
}).addTo(mymap);
/*
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

*/
function onEachFeature(feature, layer) {
		var popupContent = "<p>I started out as a GeoJSON " +
				feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
		}

		layer.bindPopup(popupContent);
	}

let loadedJSONCount = 0;
function checkAllLoaded(){
    var allLoaded = true;
    var jsons = [map1, map2, map3, map4, map5, map6, map7, map8_1, map8_2, map8_3, map8_4];
    for(i in jsons){
        if(!jsons[i]){
            allLoaded = false;
        }
    }
    return allLoaded;
}
//load jsons
$.getJSON('/jsons/map1.geojson', function(json){
    maps['map1'] = json;
})
$.getJSON('/jsons/map2.geojson', function(json){
    maps['map2'] = json;  
})
$.getJSON('/jsons/map3.geojson', function(json){
    maps['map3'] = json;
})
$.getJSON('/jsons/map4.geojson', function(json){
    maps['map4'] = json;
})
$.getJSON('/jsons/map5.geojson', function(json){
    maps['map5'] = json;
})
$.getJSON('/jsons/map6.geojson', function(json){
    maps['map6'] = json;
})
$.getJSON('/jsons/map7.geojson', function(json){
    maps['map7'] = json;
})
$.getJSON('/jsons/map8-1.json', function(json){
    maps['map8_1'] = json;
})
$.getJSON('/jsons/map8-2.json', function(json){
    maps['map8_2'] = json;
})
$.getJSON('/jsons/map8-3.json', function(json){
    maps['map8_3'] = json;
})
$.getJSON('/jsons/map8-4.json', function(json){
    maps['map8_4'] = json;
})