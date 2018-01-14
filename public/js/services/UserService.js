angular.module('UserService', []).service('UserService', ['$http', function() {

    var data;
    return {
        // call to get all nerds
        
        get : function() {
           
            return data;
        },

        set: function(value) {
            data = value;
        }
    };       

}]);
