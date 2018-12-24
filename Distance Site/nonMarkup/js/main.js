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
function getCarDistance(){
   
    const axios = require('axios');

    // Make a request for a user with a given ID
    var urlString = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&key=YOUR_API_KEY
    axios.get(urlString)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
}