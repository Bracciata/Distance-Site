var lat1 = -91;
var lat2 = -91;
var long1 = -91;
var long2 = -91;
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
            long1 = place.geometry.location.lng();
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
            long2 = place.geometry.location.lng();
            this.address = place.name;
            trySubmit();
        },
        canSubmit: function () {}
    }
});

function trySubmit() {
    if (checkAllNotDefault()) {

    }
}

function checkAllNotDefault() {
    try {
        if (lat1 > -91) {
            if (lat2 > -91) {
                if (long1 > -91) {
                    if (long2 > -91) {
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