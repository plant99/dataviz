let loadedLayers = [];
var battlePopups = [];
let maps = {};
let popularplaces = [];
let silkLayers = [];
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

//city icon

var cityIcon = L.icon({
    iconUrl: '/images/city.svg',

    iconSize:     [32, 32], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

//Slider
$('#ex1').slider({
	formatter: function(value) {
		return 'Current value: ' + value;
	}
});

$('#ex1').change(function(){
    let newValueOfTime = $('#ex1').val();
	$('.timeDisplay').html(parseToYear(newValueOfTime));
    //load proper maps

    //make this a function
    while(loadedLayers.length){
        let toBeRemoved = loadedLayers.pop();
        mymap.removeLayer(toBeRemoved);
    }
    
    let mapName = maps['map'+newValueOfTime];
    loadToMap(mapName);
    
})

var mymap = L.map('map').setView([51.9194, 100.1452], 3);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGxhbnQ5OSIsImEiOiJjajh5MzhqdTUyNWxrMzJwOGJ0dWE2NTB0In0.dyjmXnIUF9KYU4ewcTdqcQ', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 16,
    id: 'isawnyu.map-knmctlkh',
    accessToken: 'pk.eyJ1IjoicGxhbnQ5OSIsImEiOiJjajh5MzhqdTUyNWxrMzJwOGJ0dWE2NTB0In0.dyjmXnIUF9KYU4ewcTdqcQ'
}).addTo(mymap);

//on resize, change map size too
mymap.on('map-container-resize', function () {
   setTimeout(function(){ map.invalidateSize()}, 400);
});

function onEachFeature(feature, layer) {
    //temporarily does nothing
    if (feature.properties && feature.properties.name) {
        layer.bindPopup('<p>'+feature.properties.name+'</p>');
    }
}

let loadedJSONCount = 0;
//modify this to check json 'MAPS'
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
mymap.on('zoomend', function(e){
    if(mymap.getZoom() >= 5){
        //display important places
        var popularplacesMap = maps['popularplaces']['places'];
        if(!popularplaces.length){
            console.log(true);
            for(i in popularplacesMap){
                console.log("Ho raha hai")
                var markerPointer = L.marker([popularplacesMap[i].location.lat, popularplacesMap[i].location.lng], {icon: cityIcon}).addTo(mymap);
                markerPointer.bindPopup(popularplacesMap[i].placeName);
                popularplaces.push(markerPointer);
            }
        }

    }else{
        //delete important places
        while(popularplaces.length){
            var popularplace = popularplaces.pop();
            mymap.removeLayer(popularplace);
        }
    }
    if(mymap.getZoom() >= 6){
        // add road layer
        var area = maps['silkroad'];
        let toBeAdded = L.geoJSON(area, {
            fillOpacity:1,
            weight:3,
            style: function (feature) {
                return feature.properties && feature.properties.style;
            },

            onEachFeature: onEachFeature,

            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 8,
                    fillColor: "#7442a9",
                    color: "#212f5b",
                    weight: 0.5,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
        });
        toBeAdded.bindPopup("The route used by traders to trade silk and spices.")
        silkLayers.push(toBeAdded);
        toBeAdded.addTo(mymap);
    }else{
        while(silkLayers.length){
            let toBeRemoved = silkLayers.pop();
            mymap.removeLayer(toBeRemoved);
        }
    }
})
mymap.on('click', function(e){
    console.log(e.latlng)
})
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
$.getJSON('/jsons/map8.geojson', function(json){
    maps['map8'] = json;
})

$.getJSON('/jsons/battles.geojson', function(data){
    maps['battles'] = data;
})
$.getJSON('/jsons/popularplaces.geojson', function(data){
    maps['popularplaces'] = data;
})
$.getJSON('/jsons/silkroad.geojson', function(data){
    maps['silkroad'] = data;
})
$('.majorBattles').click(()=>{
    while(loadedLayers.length){
        let toBeRemoved = loadedLayers.pop();
        mymap.removeLayer(toBeRemoved);
    }
    while(battlePopups.length){
        let toBeRemoved = battlePopups.pop();
        mymap.removeLayer(toBeRemoved);
    }
    let description, date, facts;
    

    let battles = maps['battles']['battles'];
    for (i in battles){
        let battleMark = L.marker([battles[i].coordinates.lat, battles[i].coordinates.lng ]).addTo(mymap);
        battleMark.bindPopup(battles[i].name);
        let description = battles[i].description;
        let date = battles[i].date;
        let facts = '';
        for (j in battles[i].facts){
            facts += "<li>"+ battles[i].facts[j] + "</li>"
        }
        let factTemplate = `
            <h4>${description}</h4>
            <p>Fought during ${date}</p>
            <ul>${facts}</ul>
        `
        battleMark.on('click', function(){
            $('.facts').html(factTemplate);
        })
        battlePopups.push(battleMark);
    }
})
$('.nextInstruction').click(function(){
    $('.mapAndExpansion').hide();
    $('.battleMarkers').show();
    $('.otherFacts').animatescroll({'scrollspeed':400});
})
$('.finalInstruction').click(function(){
    $('.instructions').hide();
    $('body').animatescroll({'scrollspeed':400});
})
function loadToMap(mapName){
    var area = mapName;
    let toBeAdded = L.geoJSON(area, {
        fillOpacity:0.6,
        weight:0.3,
        style: function (feature) {
            return feature.properties && feature.properties.style;
        },

        onEachFeature: onEachFeature,

        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: "#7442a9",
                color: "#212f5b",
                weight: 0.5,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    });
    toBeAdded.addTo(mymap);
    loadedLayers.push(toBeAdded);
}
function parseToYear(alpha){
    switch(alpha){
        case '1':
            return 1206;
            break;
        case '2':
            return 1219;
            break;
        case '3':
            return 1223;
            break;
        case '4':
            return 1227;
            break;
        case '5':
            return 1237;
            break;
        case '6':
            return 1259;
            break;
        case '7':
            return 1279;
            break;
        case '8':
            return 1294;
            break;
    }
}
