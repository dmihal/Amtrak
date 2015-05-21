Amtrak = (function(){
  TRAINS_URL = "https://www.googleapis.com/mapsengine/v1/tables/01382379791355219452-08584582962951999356/features?version=published&maxResults=250&key=";

  function get(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var data = JSON.parse(this.response);
        callback(data);
      } else {
       throw "HTTP Status " + this.status;
      }
    };
    request.onerror = function() {
      throw "HTTP Error";
    };
    request.send();
  }

  var Train = function(data){
    this.routeName = data.properties.RouteName;
  };

  var amtrak = {
    google_key: null,
    getTrains: function(callback){
      var processResult = function(data){
        var trains = [];
        for (var i=0; i<data.features.length; i++){
          var trainData = data.features[i];
          var train = new Train(trainData);
          trains.push(train);
        }
        callback(trains);
      };

      var url = TRAINS_URL + getKey();
      get(url, processResult);
    }
  };

  var getKey = function(){
    var key = amtrak.google_key;
    if (!key){
      throw "Google Key not set. Set the key with `Amtrak.google_key = KEY`";
    }
    return key;
  };
  return amtrak;
})();
