angular.module('loc8rApp', []);

var _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function () {
  return function (distance) {
   var numDistance, unit;
  if (distance && _isNumeric(distance)) {
    if (distance > 1) {
      numDistance = parseFloat(distance).toFixed(1);
      unit = 'm';
    } else {
      numDistance = parseInt(distance * 1000,10);
      unit = 'km';
    }
    return numDistance + unit;
  } else {
    return "?";
  }
};
};

var ratingStars = function () {
	return {
		scope: {
			thisRating : '=rating'
		},
    templateUrl : '/angular/rating-stars.html',
    link: function(scope, element, attr) {
    }
	};
};
var geolocation = function () {
  var getPosition = function (cbSuccess, cbError, cbNoGeo) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    }
    else {
      cbNoGeo();
    }
  };
  return {
    getPosition : getPosition
  };
};

var leafletDirective = function (geolocation) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      point: '=point',
    },
    template: '<div></div>',
    link: function(scope, element, attrs) {
        var updatePositions = function(position) {
          var map = L.map(attrs.id).setView([55.815448, 37.352914], 4)
          L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            attribution: '© OpenStreetMap contributors',
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          }).addTo(map)
            var lat = position.coords.latitude,
                lng = position.coords.longitude;
            L.Routing.control({
              waypoints: [
                L.latLng(lat, lng),
                L.latLng(scope.point.coords.lat, scope.point.coords.lng)
              ],
              router: new L.Routing.OSRMv1({
                serviceUrl: 'http://router.project-osrm.org/route/v1'
            })
            }).addTo(map);
          }
          var showError = function(error) {
            console.log('ERROR', error)
          }
          var noGeo = function () {
            console.log('Geolocation is not supported by this browser.')
          };
          scope.$watch(attrs.point, function(value) {
            geolocation.getPosition(updatePositions, showError, noGeo);
          });
      }
  }
};



var locationListCtrl = function ($scope, loc8rData, geolocation) {
  $scope.message = "Checking your location";
  $scope.getData = function (position) {
    $scope.lat = position.coords.latitude,
    $scope.lng = position.coords.longitude;
    $scope.message = "Searching for nearby places";
    $scope.isRoute = false;
    loc8rData.locationByCoords($scope.lat, $scope.lng)
      .success(function(data) {
        $scope.message = data.length > 0 ? "" : "No locations found nearby";
        $scope.data = { locations: data };
      })
      .error(function (e) {
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });
  };

  $scope.showError = function (error) {
    $scope.$apply(function() {
      $scope.message = error.message;
    });
  };

  $scope.noGeo = function () {
    $scope.$apply(function() {
      $scope.message = "Geolocation is not supported by this browser.";
    });
  };

  geolocation.getPosition($scope.getData,$scope.showError,$scope.noGeo);
};

var loc8rData = function ($http) {
  var locationByCoords = function (lat, lng) {
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=50000');
  };
  return {
    locationByCoords : locationByCoords
  };

};

angular
 .module('loc8rApp', [])
 .controller('locationListCtrl', locationListCtrl)
 .filter('formatDistance', formatDistance)
 .directive('ratingStars', ratingStars)
 .directive('leafletDirective', leafletDirective)
 .service('loc8rData', loc8rData)
 .service('geolocation', geolocation);