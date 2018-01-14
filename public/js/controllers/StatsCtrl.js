angular.module('StatsCtrl', []).controller('StatsController', function($scope, $http, UserService) {

    $scope.tagline = 'The square root of life is pi!';

    $scope.statsLoadText = 'Please wait while we load the data';

    $scope.myCurrency = UserService.get();

    var myCurrency = "btc";

    $http.get('/api/oldCurrencyData/'+ myCurrency).then(function(oldData){
            
        $http.get('/api/lastDayData/'+ myCurrency).then(function(dayData){
            $scope.oldData = oldData.data; 
            $scope.dayData = dayData.data.lastDayData; 
            $scope.statsLoadText = 'Data loaded';
        });
    });
});
