angular.module('syrupApp').controller('patronControl', function($scope, rgsService, $state) {

  $scope.user = rgsService.user;
  rgsService.userId = $scope.user.id;

  $scope.getUserOrders = function() {
    rgsService.getUserOrders($scope.user.id).then(function(response) {
      // console.log(response);
      console.log('scope.user.id: ' + $scope.user.id);
      $scope.orders = response;
    });
  };
  $scope.getUserOrders();


  $scope.logout = function() {
    rgsService.logout().then(function(res) {
      rgsService.confirmLogout(res);
    });
  };



// FIN
});
