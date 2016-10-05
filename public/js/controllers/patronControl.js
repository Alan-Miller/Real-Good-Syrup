angular.module('syrupApp').controller('patronControl', function($scope, rgsService, $state) {

  $scope.user = rgsService.user;

  $scope.logout = function() {
    rgsService.logout().then(function(res) {
      rgsService.confirmLogout(res);
    });
  };

// FIN
});
