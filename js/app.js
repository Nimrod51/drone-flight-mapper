/* Create basemaps */
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
	'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	'Imagery © <a href="http://mapbox.com">Mapbox</a>',
mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmdhdmlzaCIsImEiOiJjaXFheHJmc2YwMDdoaHNrcWM4Yjhsa2twIn0.8i1Xxwd1XifUU98dGE9nsQ';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}),
outdoors = L.tileLayer(mbUrl, {id: 'mapbox.outdoors', attribution: mbAttr}),
satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr}),
dark = L.tileLayer(mbUrl, {id: 'mapbox.dark', attribution: mbAttr}),
light = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
satellitestreets = L.tileLayer(mbUrl, {id: 'mapbox.streets-satellite', attribution: mbAttr});

/* Initial map setup*/
var map = L.map('mapid', {
  center: [51.962038, 7.625937],
  /*Default location */
  zoom: 15,
  /*Default Zoom */
  layers: [streets] // Default basemaplayer on startrup, can also give another layer here to show by default)
});

/* Initiate variable to store flight paths drawn by user*/
var flightItems = new L.FeatureGroup();
map.addLayer(flightItems);


// /* Add draw control to map */
var drawControl = new L.Control.Draw({
	draw: {
		position: 'topleft',
		polygon: false,
		marker: false,
		polyline: true,
		rectangle: false,
		circle: false,
		circlemarker: false
	},
  edit: {
    featureGroup: flightItems
  }
});
map.addControl(drawControl);


/* Store items in the 'flightItems' variable upon finishing */
var count=0;
map.on(L.Draw.Event.CREATED, function(event) {
  var layer = event.layer;
  flightItems.addLayer(layer);
	ctrl.addOverlay(layer, count);
	count+=1
});

/* When user removes a layer AND saves changes then remove all layers from legend */
map.on(L.Draw.Event.DELETED, function(event) {
	layers = event.layers._layers
	for (var layerIndex in layers) {
        ctrl.removeLayer(layers[layerIndex]);
}

});

var baseLayers = {
		"Grayscale": grayscale,
		"Streets": streets,
		"Outdoors": outdoors,
		"Satellite": satellite,
		"Satellite Streets": satellitestreets,
		"Dark Map": dark,
		"Light Map": light
	};

var ctrl = L.control.layers(baseLayers).addTo(map);
