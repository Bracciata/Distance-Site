var lat1;
var lat2;
var long1;
var long2;
new Vue({
    el: '#app',
    data: {
      googleMap: '',
      address: '',
      lat: '',
      lng: ''
    },
    mounted: function(){
      this.googleMap = new google.maps.places.Autocomplete((document.getElementById('autocomplete')),{types: ['geocode']});
      this.googleMap.addListener('place_changed', function() {
        this.fillInAddress(this.googleMap.getPlace());
      }.bind(this));
    },
    methods: {
      fillInAddress: function(place) {
        lat1 = place.geometry.location.lat();
        long1 = place.geometry.location.lng();
        this.address = place.name;
      },
      canSubmit: function() {}
    }
  });
  
new Vue({
    el: '#app2',
    data: {
      googleMap: '',
      address: '',
      lat: '',
      lng: ''
    },
    mounted: function(){
      this.googleMap = new google.maps.places.Autocomplete((document.getElementById('autocomplete')),{types: ['geocode']});
      this.googleMap.addListener('place_changed', function() {
        this.fillInAddress(this.googleMap.getPlace());
      }.bind(this));
    },
    methods: {
      fillInAddress: function(place) {
        lat2= place.geometry.location.lat();
        long2 = place.geometry.location.lng();
        this.address = place.name;

      },
      canSubmit: function() {}
    }
  });