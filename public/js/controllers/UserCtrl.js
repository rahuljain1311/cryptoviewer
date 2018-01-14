angular.module('UserCtrl', []).controller('UserController', function($scope, $http) {

    $scope.tagline = 'copyright: CryptoCurrencyWorld';	
	
    // $scope.deleteUser = function (id) {
		
    //     return $http.delete('/api/user/'+ id)
    //         .then(function(response){ $scope.names = response.data; });
    // };

    $scope.loadText = 'Please wait while data is being fetched from the external API';
    $http.get('/api/allCurrencies').then(function(response){ 
        $scope.names = response.data;
        $scope.loadText = 'Data Loaded';
    });
});
