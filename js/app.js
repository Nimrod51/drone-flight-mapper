const terrain = new L.StamenTileLayer("terrain");

var map = L.map('mapid', {
	center: [51.962038,7.625937], /*Default location */
	zoom: 15, /*Default Zoom */
	layers: [terrain] // Default basemaplayer on startrup, can also give another layer here to show by default)
});

var baseLayers = {
	"Terrain": terrain
};

/*
var overlays = {
	"Density": density
};*/

var ctrl = L.control.layers(baseLayers).addTo(map);
