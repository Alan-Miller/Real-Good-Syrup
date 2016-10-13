angular.module('syrupApp').controller('patronControl', function($scope, rgsService, $state, $auth, requestUser) {


  $('.login-nav').fadeOut('fast');
  $('.logout-nav').fadeIn('fast');
  $('.my-info-nav').fadeIn('fast');

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // $scope.user = rgsService.getCurrentUser();
  $scope.user = requestUser;
  // console.log($scope.user);
  // console.log(rgsService.userId);


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
      Get this user's orders
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.getUserOrders = function() {
    rgsService.getUserOrders($scope.user.id).then(function(response) {
      $scope.orders = response;
    });
  };
  $scope.getUserOrders();


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    LOGOUT
      Runs confirmLogout fn
      Uses $auth
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // $scope.logout = function() {
  //   rgsService.logout().then(function(res) {
  //     rgsService.confirmLogout(res);
  //   });
  // };

  $scope.logout = function() {
    $auth.logout().then(function(res) {
      $('.login-nav').fadeIn('fast');
      $('.logout-nav').fadeOut('fast');
      $('.my-info-nav').fadeOut('fast');
      rgsService.setUser({id: false});
      $state.go('landing');
      // rgsService.confirmLogout(res);
    });
  };


// FIN
});
