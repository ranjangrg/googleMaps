




var myCenter; // Stores Default address
var mapCanvas;
var mapOptions;
var map;
var bbox;
var markers = []; // Contains list of markers used
var bbox; // Bounding box
var infoWindow;	// window/div to display info

function myMap() {
    myCenter = new google.maps.LatLng(52.077859, 4.306906);
    mapCanvas = document.getElementById("googleMap");
    mapOptions = {center: myCenter, zoom: 16};
    map = new google.maps.Map(mapCanvas, mapOptions);
	infoWindow = new google.maps.InfoWindow();
}

function markPlace() {
    var _lat = parseFloat(document.getElementById("lat-value").value);
    var _lon = parseFloat(document.getElementById("lon-value").value);
    var _label = document.getElementById("loc-name").value;
    if (_lat && _lon && _label) {
        var _location = new google.maps.LatLng(_lat, _lon);
        map.panTo(_location);
        var _marker = new google.maps.Marker({
            position: _location,
            label: _label
        });
        markers.push(_marker);
        _marker.setMap(map);
    } else {
        alert("Please fill latitude, longitude and a location name")
    }
}

function clearMarkers() {
    for (var i = markers.length - 1; i >= 0; i--) {
        markers[i].setMap(null);
        document.getElementById("location-list-table").deleteRow(i + 1);
        markers.pop();
    }
}

//markPlace(52.079257, 4.302003);

/*
var hotel = new google.maps.LatLng(52.076487, 4.303784);
var market = new google.maps.LatLng(52.077344, 4.308011);
var albert = new google.maps.LatLng(52.078030, 4.305758);

var journey = new google.maps.Polyline ({
    path: [hotel, market, albert], 
    strokeColor: "#0000FF",
    strokeOpacity: 0.8,
    strokeWeight: 2
});
journey.setMap(map);


bbox = new google.maps.Polygon ({
    path: [new google.maps.LatLng(52.076487, 4.303784), new google.maps.LatLng(52.076487, 4.308011), new google.maps.LatLng(52.078030, 4.308011), new google.maps.LatLng(52.078030, 4.303784)],
    strokeWeight: 0.5,
    fillOpacity: 0.2
});
bbox.setMap(map);
*/

function allowEnterKeyToAdd() {
    // Allows user to press Enter key to submit the location data
    var inputAtForm = document.getElementsByClassName("submit-form");
    var i;
    for (i = 0; i < inputAtForm.length; i++) {
        inputAtForm[i].addEventListener("keyup", function(event) {            
            event.preventDefault();
            var e = event || window.event;
            if (e.keyCode == 13) { // when enter key is pressed
                //alert("Function works");
                addLoc();
                markPlace();
            }
        });
    }
}

function gotoLocation(_lat_lon) {
    var latlon = [];
    var _lat = "";
    var _lon = "";
    var onLat = true;
    for (let _char of _lat_lon) {
        if ((/^[0-9]/.test(_char) || /^[.]/.test(_char)) && onLat ) {
            _lat += _char;  
        } else if ((/^[0-9]/.test(_char) || /^[.]/.test(_char)) && !onLat) {
            _lon += _char;  
        } else if (/^[_]/.test(_char)) {
            latlon.push(parseFloat(_lat));
            onLat = false;
        }
    }
    latlon.push(parseFloat(_lon));
    var lat = latlon[0]; 
    var lon = latlon[1];
    var _location = new google.maps.LatLng(lat, lon);
    map.panTo(_location);
    console.log(latlon);
}

function addLoc() {
    // Adds location from the form to the table
    var _table = document.getElementById("location-list-table");
    var _lat = document.getElementById("lat-value").value;
    var _lon = document.getElementById("lon-value").value;
    var _name = document.getElementById("loc-name").value;
    if (_lat && _lon && _name) {
        var row = _table.insertRow(1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1); 
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var commonHTML = "\
            <button class='special-button' onclick=';'> &#9940 </button> \
            <button id='" + _lat + "_" + _lon + "'class='special-button' onclick='javascript:gotoLocation(this.id);'> &#8680 </button> ";
        cell0.innerHTML = markers.length;  
        // markers array holds all the marker entries so 
        // its size will give us the no of entries/rows
        cell1.innerHTML = _name + commonHTML;
        cell2.innerHTML = _lat;
        cell3.innerHTML = _lon;
    } else {
        console.log("No valid location");
    }
}

function addBox() {
    if (bbox) {removeBox();} // clear bbox if there already exists one
    var _lat = parseFloat(document.getElementById("bbox-lat-value").value);
    var _lon = parseFloat(document.getElementById("bbox-lon-value").value);
    var _rad_lon = parseFloat(document.getElementById("bbox-radius").value) * (360/40075000) / (Math.cos(_lat * 3.141 / 180));
	var _rad_lat = parseFloat(document.getElementById("bbox-radius").value) * (360/39961058);
    var _label = "Bbox";
    if (_lat && _lon && _label) {
        var _location = new google.maps.LatLng(_lat, _lon);
        map.panTo(_location);
        bbox = new google.maps.Rectangle ({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            bounds: {
                north: _lat + _rad_lat,
                south: _lat - _rad_lat,
                east: _lon + _rad_lon,
                west: _lon - _rad_lon
            }
        });
        _rect.setMap(map);
    } else {
        alert("Please fill latitude, longitude and a radius value")
    }
}

function removeBox() {
    if (bbox) {
        bbox.setMap(null);
    } else {
        alert("Please fill latitude, longitude and a radius value")
    }
}

// TESTING Arrayed list of locations
var locations = [[52, 5], [52.0001, 5.0001], [52.0002, 5.0002] , [52.001, 5.001]];
function addLocArray(_location_name) {
    var _table = document.getElementById("location-list-table");
    for (var i = 0; i < locations.length; i++) {
        console.log(locations[i]);
        var row = _table.insertRow(1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1); 
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var commonHTML = "\
            <button class='special-button' onclick=';'> &#9940 </button> \
            <button class='special-button' onclick=';'> &#8680 </button> ";
        cell0.innerHTML = markers.length;  
        // markers array holds all the marker entries so 
        // its size will give us the no of entries/rows
        cell1.innerHTML = _location_name + commonHTML;
        cell2.innerHTML = locations[i][0];
        cell3.innerHTML = locations[0][1];
        var _location = new google.maps.LatLng(locations[i][0], locations[i][1]);
        map.panTo(_location);
        var _marker = new google.maps.Marker({
            position: _location,
            label: String(_location_name)
        });
        markers.push(_marker);
        _marker.setMap(map);
    }
}

/*
function readCSVfile() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "./data.csv", true);
    
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                var allText = rawFile.responseText;
            }
        }
    }
    
    rawFile.send(null);
    return allText;
}
*/
/*
function handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];
    var reader = new FileReader();
    reader.onloadend = function (evt) {
        var contents = evt.target.result;
        var lines = contents.split('\n');
        console.log(contents);
    };
    reader.readAsBin(file);
}
document.getElementById('csv-file').addEventListener('change', handleFileSelect, false);
*/

var dataFromFile; // contains data from csv file
function useFile() {
    if (document.getElementById('csv-file').files[0]) {
        // if a file is selected
        var _file = document.getElementById('csv-file').files[0]; // we read only the first file
        var _reader = new FileReader();
        _reader.readAsText(_file);
        _reader.onload = function() { // have to wait for the data to load before we continue
            dataFromFile = _reader.result;
            console.log(dataFromFile);
        }
        return dataFromFile;
    } else {alert("No file selected");}
}



function parseData(_data) {
    var dataList = [];
    var eachData = "";
    var eachLine = [];
    for (let _char of _data) {
        // check for comma, space and tabs
        if (/^[,]/.test(_char) || (/^[ ]/.test(_char) && !eachData) || /^[\t]/.test(_char) ) {
            // if comma, tab or (space not within the data), push the data and start new data
            if (eachData) {
                eachLine.push(eachData);
                eachData = "";
            }
        } else if (/^[\n]/.test(_char)) {
            // If new line starts, move to next row of data
            eachLine.push(eachData);
            dataList.push(eachLine);
            eachData = "";
            eachLine = [];
        } else if (/^[ ]/.test(_char) && eachData) {
            // if space is within the data, add the space to data e.g. 'HTM 4041'
            eachData += _char;
        } else {
            // keep on populating the data char by char
            eachData += _char;
        }
    }
    eachLine.push(eachData);
    dataList.push(eachLine);

    return dataList;
}

function plotPoint(_lat, _lon, _label, _info) {
    var _location = new google.maps.LatLng(_lat, _lon);
    map.panTo(_location);
	
	var tooltip = _label;
	_label = "";	// making labels empty
	
    var _marker = new google.maps.Marker({
        position: _location,
        label: _label,
		title: tooltip,
		info: _info,
        map: map
    });
    markers.push(_marker);
	
	// handle mouse click to show infoWindow
	google.maps.event.addListener(_marker, 'click', (function(_marker) {
		return function() {
			infoWindow.setContent(_marker.info);
			infoWindow.open(map, _marker);
		}
	})(_marker));
	
	return true; // success. Used for checking if it is completed
    //_marker.setMap(map);
}

function plotCSV() {
    if (!dataFromFile) {
        alert("No data loaded. Click on Load File.")
        return "";
    }
    var data = parseData(dataFromFile); // Converted to array

    var _lat, _lon, _label, _location, _marker;
    for (let _d of data) { 
        _lat = parseFloat(_d[0]); 
        _lon = parseFloat(_d[1]);
        if (_d[2]) {
            _label = _d[2];
        } else {_label = "";} // if label is not defined
		
		if (_d[3]) {
            _info = _d[3];
        } else {_info = "";} // if info is not defined

        //plotPoint(_lat, _lon, _label, _info); 
		//console.log("Location Plotted.");

        if (_lat && _lon && _label && plotPoint(_lat, _lon, _label, _info)) {
            var _table = document.getElementById("location-list-table");
            var row = _table.insertRow(1);
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1); 
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var commonHTML = "\
                <button class='special-button' onclick=';'> &#9940 </button> \
                <button id='" + _lat + "_" + _lon + "'class='special-button' onclick='javascript:gotoLocation(this.id);'> &#8680 </button> ";
            cell0.innerHTML = markers.length;  
            // markers array holds all the marker entries so 
            // its size will give us the no of entries/rows
            cell1.innerHTML = _label + commonHTML;
            cell2.innerHTML = _lat;
            cell3.innerHTML = _lon;
        }

        //console.log(_d);
        //console.log(_lat, _lon, _label);
    }

}