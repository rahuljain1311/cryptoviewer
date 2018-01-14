
angular.module('UserCtrl', []).controller('UserController', function($scope, $http, UserService, $location) {

    $scope.tagline = 'copyright: CryptoCurrencyWorld';

    $scope.loadText = 'Please wait while data is being fetched from the external API';

    $scope.setCurrency = function (currency) {
		
        UserService.set(currency);
    };

    $scope.redirect = function(currency){
        UserService.set(currency);
        $location.url ("/stats");  
    };

    $http.get('/api/allCurrencies').then(function(response){ 
        $scope.names = response.data;
        $scope.loadText = 'Data Loaded';
    });
});
