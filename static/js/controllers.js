
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";

    $scope.zip = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 

        if(data.length > 1) {
            $http({
                method: "GET",
                url: '/api/v1/getWeather?zip=' + data
            }).then( function(response) {
                if(which === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                    addMarker(response.data.coord, which);
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                    addMarker(response.data.coord, which);
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                    addMarker(response.data.coord, which);
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                    addMarker(response.data.coord, which);
                } 
            });
        } else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                    removeMarker(which);
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                    removeMarker(which);
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                    removeMarker(which);
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                    removeMarker(which);
                } 
        }
    };
    
}]);

  var map;
  var markers= [];
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -36.8485, lng: 174.7633},
      zoom: 8
    });
    
	  map.addListener('click', function(event) {
	  	var emptyPinNum = 0;
	  	for(var i = 1; i < 5; i++) {
	  		if(markers[i] === null) {
	  			emptyPinNum = i;
	  			break;
	  		}
	  	}
	  	if(emptyPinNum !== 0) {
	  		addMarker(event.latLng, emptyPinNum);
  		}

	  });
  }
  
  function addMarker(latlng, pinNum) {
	  var marker = new google.maps.Marker({
	    position: { lat: latlng.lat, lng: latlng.lon },
	    map: map,
	    title: pinNum.toString()
	  });
	  markers[pinNum] = marker;
  }
  
  function removeMarker(pinNum) {
  		if(markers[pinNum] !== null){
	  		markers[pinNum].setMap(null);
	  		markers[pinNum] = null;
  		}

  }