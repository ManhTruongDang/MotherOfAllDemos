/**
 * Created by s2813995 on 3/08/2016.
 */

var liveTweetApp = angular.module('liveTweetApp', []);

liveTweetApp.controller('liveTweetCtrl', function($scope, $http, $interval) {

    var refreshLiveTweet =  function(){
        $http.get('/getLiveTweet').then(
            function (data, status, jqXHR) {
                $scope.liveTweets = data['data'];
            },
            function (response) {
                // Error happened, try again
                // TODO
            });
    };
    refreshLiveTweet();
    $interval( refreshLiveTweet, 1 * 30 * 1000);


    $scope.clickLiveTweet = function(liveTweet) {

        var createLabelIcon = function(labelClass, labelText){
            return L.divIcon({
                className: labelClass,
                html: labelText
            })
        }

        if (marker != undefined)
            map.removeLayer(marker);
        marker = new L.marker([liveTweet.coordinates.coordinates[1], liveTweet.coordinates.coordinates[0]]);
        map.addLayer(marker);

        map.panTo({
            lon: liveTweet.coordinates.coordinates[0],
            lat: liveTweet.coordinates.coordinates[1]
        });
    }

});
