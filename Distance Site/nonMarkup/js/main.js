
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
        this.fillInAddress(this.googleMap.getPlace(),0);
      }.bind(this));
      this.googleMap2 = new google.maps.places.Autocomplete((document.getElementById('autocomplete2')),{types: ['geocode']});
      this.googleMap2.addListener('place_changed', function() {
        this.fillInAddress(this.googleMap2.getPlace(),1);
      }.bind(this));
    },
    methods: {
      fillInAddress: function(place, locationNumber) {
          switch(locationNumber){
              case 0:
              this.lat = place.geometry.location.lat();
              this.lng = place.geometry.location.lng();
              this.address = place.name;
              break;
              case 1:
              break;
          }

      },
      canSubmit: function() {}
    }
  });