var lat1 = -91;
var lat2 = -91;
var lon1 = -91;
var lon2 = -91;
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
        canSubmit: function () {}
    }
});

new Vue({
    el: '#app2',
    data: {
        googleMap: '',
        address: ''
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
            lat2 = place.geometry.location.lat();
            lon2 = place.geometry.location.lng();
            this.address = place.name;
            trySubmit();
        },
        canSubmit: function () {}
    }
});

function trySubmit() {
    if (checkAllNotDefault()) {
        var aeiralDistMeters = getAerialDist();
        var aeiralDistMiles= metersToMiles(aeiralDistMeters);
        var textForAerial ="Birds Distance is "+(aeiralDistMeters/1000)+" kilometers ("+aeiralDistMiles+" miles)";
    }
}

function metersToMiles(meters) {
    return meters * 0.00062137;
}

function getAerialDist() {
    //haversines formula from https://www.movable-type.co.uk/scripts/latlong.html
    var R = 6371e3; // metres
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2 - lat1).toRadians();
    var Δλ = (lon2 - lon1).toRadians();

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;
    return d;
}

function checkAllNotDefault() {
    try {
        if (lat1 > -91) {
            if (lat2 > -91) {
                if (lon1 > -91) {
                    if (lon2 > -91) {
                        return true
                    }
                }
            }
        }
        return false;
    } catch (ex) {
        return false;
    }
}