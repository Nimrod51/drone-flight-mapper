/* Create basemaps */
var terrain = new L.StamenTileLayer("terrain");
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

/* Initial map setup*/
var map = L.map('mapid', {
  center: [51.962038, 7.625937],
  /*Default location */
  zoom: 15,
  /*Default Zoom */
  layers: [terrain] // Default basemaplayer on startrup, can also give another layer here to show by default)
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
		circle: false
	},
  edit: {
    featureGroup: flightItems
  }
});
map.addControl(drawControl);


// /* Store items in the 'flightItems' variable upon finishing */
map.on(L.Draw.Event.CREATED, function(event) {
  var layer = event.layer;
  flightItems.addLayer(layer);
});


/* Store all  basemaps in variable  */
var baseLayers = {
  "Terrain": terrain,
  "OpenStreetMap_Mapnik": OpenStreetMap_Mapnik,
  "OpenStreetMap DE": OpenStreetMap_DE
};

/*
var overlays = {
	"Density": density
};*/

var ctrl = L.control.layers(baseLayers).addTo(map);
