angular.module('syrupApp').controller('adminControl', function($scope, rgsService, $state, $auth) {


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ADMIN LOCKOUT
      Locks admin out of other features and hides nav bar
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $('#first').scrollToStateContainer(); // Scrolls up again before locking position, in case window is scrolled then refreshed
  $('.admin-fade').fadeOut('fast');
  $('.logout-nav').fadeIn('fast');

  window.setTimeout(function() {
    $('body').addClass('no-scroll');
  }, 1000);



  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.user = rgsService.getCurrentUser();

  rgsService.getUsers().then(function(response) {
    $scope.users = response;
    response.forEach(function(eachUser) {
      if (eachUser.admin) {
        eachUser.admin = 'admin';
      } else eachUser.admin = 'not an admin';
    });
    // console.log(response);
  });


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.getAllOrders = function() {
    rgsService.getAllOrders().then(function(response) {
      $scope.orders = response;
    });
  };
  $scope.getAllOrders();


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    LOGOUT
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // $scope.logout = function() {
  //   rgsService.logout().then(function(res) {
  //     rgsService.confirmLogout(res);
  //   });
  // };

  $scope.logout = function() {
    $auth.logout().then(function(res) {
      $('#main-nav').find('.admin-fade').fadeIn('fast');
      $('body').removeClass('no-scroll');
      $state.go('landing');
      // rgsService.confirmLogout(res);
    });
  };

});
