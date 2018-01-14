angular.module('StatsCtrl', []).controller('StatsController', function($scope, $http, UserService) {

    $scope.tagline = 'The square root of life is pi!';

    $scope.statsLoadText = 'Please wait while we load the data';

    $scope.myCurrency = UserService.get();

    // var myCurrency = UserService.get();

    $http.get('/api/oldCurrencyData/'+ UserService.get()).then(function(oldData){
            
        $http.get('/api/lastDayData/'+ UserService.get()).then(function(dayData){
            $scope.oldData = oldData.data; 
            $scope.dayData = dayData.data.lastDayData; 
            $scope.statsLoadText = 'Data loaded';
        });
    });
});
