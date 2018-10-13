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
  layers: [outdoors] // Default basemaplayer on startrup, can also give another layer here to show by default)
});

/* Initiate variable to store flight paths drawn by user*/
var flightItems = new L.FeatureGroup();
map.addLayer(flightItems);


/* Add draw control to map */
var drawControl = new L.Control.Draw({
	draw: {
		position: 'topleft',
    polyline: true,
		polygon: false,
		marker: false,
		rectangle: false,
		circle: false,
		circlemarker: false
	},
  edit: {
    featureGroup: flightItems
  }
});
map.addControl(drawControl);


/* User creates a new path: Store flight paths globally, add to legend and to sidebar*/
var pathCount=0;
var pathGeojson={};
map.on(L.Draw.Event.CREATED, function(event) {
  pathCount++;
  var layer = event.layer;
  pathGeojson[pathCount]=layer.toGeoJSON();
  var geojsonURI= "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pathGeojson[pathCount]));
  layer.id=pathCount;
  flightItems.addLayer(layer);
	ctrl.addOverlay(layer, "Flight Path " + pathCount);
  e = $('<p> &#8226; Flight Path ' + pathCount + ' |'+'<a href="data:' + geojsonURI + '" download="flightPath' +pathCount + '.geojson"> Download as GeoJSON</a></p>' );
	$('#sidebar').append( e );
  eId="pathid" + pathCount;
  e.attr('id', eId);
});

/* User deletes a path layer:  Remove layer from legend and from sidebar */
map.on(L.Draw.Event.DELETED, function(event) {
	var layers = event.layers._layers;
	for (var layerIndex in layers) {
        ctrl.removeLayer(layers[layerIndex]);
        $('#sidebar').children("#pathid"+layers[layerIndex].id).remove();
  }
});

/* User edits an existing path layer:  Update GEOJSON URI */
map.on(L.Draw.Event.EDITED, function(event) {
  var layers = event.layers._layers;
  for (var layerIndex in layers) {
        var layerid=layers[layerIndex].id
        pathGeojson[layerid]=event.layers._layers[layerIndex].toGeoJSON();
        var geojsonURI= "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pathGeojson[event.layers._layers[layerIndex].id]));
        var newURI='data:' + geojsonURI + ' download=flightPath' + layerid + '.geojson'
        $('#sidebar').children("#pathid"+layers[layerIndex].id).children('a').attr('href',newURI.split(" ")[0])
  }
});


/* Basemap options*/
var baseLayers = {
		"Grayscale": grayscale,
		"Streets": streets,
		"Outdoors": outdoors,
		"Satellite": satellite,
		"Satellite Streets": satellitestreets,
		"Dark Map": dark,
		"Light Map": light
	};

/* Create collapsed leaflet control*/
var ctrl = L.control.layers(baseLayers, null,
  {collapsed: false}

).addTo(map);


/* Add sidebar to map*/
var sidebar = L.control.sidebar('sidebar', {
    position: 'left'
});
map.addControl(sidebar);
