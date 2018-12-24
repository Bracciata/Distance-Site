(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var lat1 = -91;
var lat2 = -91;
var lon1 = -181;
var lon2 = -181;
window.onload = function () {
    new Vue({
        el: '#app',
        data: {
            googleMap: '',
            address: '',
        },
        mounted: function () {
            this.googleMap = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {
                types: ['geocode']
            });
            this.googleMap.addListener('place_changed', function () {
                this.fillInAddress(this.googleMap.getPlace());
            }.bind(this));
        },
        methods: {
            fillInAddress: function (place) {
                lat1 = place.geometry.location.lat();
                lon1 = place.geometry.location.lng();
                this.address = place.name;
                trySubmit();
            },
            canSubmit: false
        }
    });

    new Vue({
        el: '#app2',
        data: {
            googleMap: '',
            address: ''
        },
        mounted: function () {
            this.googleMap = new google.maps.places.Autocomplete((document.getElementById('autocomplete2')), {
                types: ['geocode']
            });
            this.googleMap.addListener('place_changed', function () {
                this.fillInAddress(this.googleMap.getPlace());
            }.bind(this));
        },
        methods: {
            fillInAddress: function (place) {
                lat2 = place.geometry.location.lat();
                lon2 = place.geometry.location.lng();
                this.address = place.name;
                trySubmit();
            },
            canSubmit: false
        }
    });
}

function trySubmit() {
    if (checkAllNotDefault()) {
        var aeiralDistMeters = getAerialDist();
        var aeiralDistMiles = metersToMiles(aeiralDistMeters);
        var textForAerial = "Bird's Distance is " + prepareForOutput(aeiralDistMeters / 1000) + " kilometers (" + prepareForOutput(aeiralDistMiles) + " miles)";
        document.querySelector("#aerialDistText").innerHTML = textForAerial;
        console.log(textForAerial);
        getCarDistance();
    }
}

function metersToMiles(meters) {
    return meters * 0.00062137;
}

function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

function getAerialDist() {
    //haversines formula from https://www.movable-type.co.uk/scripts/latlong.html
    var R = 6371e3; // metres
    var radLat1 = toRad(lat1);
    var radLat2 = toRad(lat2);
    var radDiff = toRad(lat2 - lat1);
    var radDiffLon = toRad(lon2 - lon1);

    var a = Math.sin(radDiff / 2) * Math.sin(radDiff / 2) +
        Math.cos(radLat1) * Math.cos(radLat2) *
        Math.sin(radDiffLon / 2) * Math.sin(radDiffLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;
    return d;
}

function checkAllNotDefault() {
    try {
        if (lat1 > -91) {
            if (lat2 > -91) {
                if (lon1 > -181) {
                    if (lon2 > -181) {
                        return true;
                    }
                }
            }
        }
        return false;
    } catch (ex) {
        return false;
    }
}

function prepareForOutput(output) {
    return output.toFixed(3);
}

function getCarDistance() {

    // Make a request for a user with a given ID
    var urlString = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + lat1.toString() + "," + lon1.toString() + "&destinations=" + lat2.toString() + "," + lon2.toString() + "&key=AIzaSyCPAZ1mgyT33HhGzyL-Pe2SXrnsqNlMVW4";
    var carInfo=d3.request(urlString)
    .mimeType("application/json")
    .response(function(xhr) { return JSON.parse(xhr.responseText); });
    console.log(carInfo);
}
},{}]},{},[1]);