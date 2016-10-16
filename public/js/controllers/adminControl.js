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
      } else eachUser.admin = '';
    });
  });


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.getUnfilledOrders = function() {
    rgsService.getUnfilledOrders().then(function(response) {
      // console.log('THE RESPONSE:', response);
      $scope.unfilled = response;
    });
  };
  $scope.getUnfilledOrders();

  $scope.getFilledOrders = function() {
    rgsService.getFilledOrders().then(function(response) {
      $scope.filled = response;
    });
  };
  $scope.getFilledOrders();

  // The getOrderDetails fn is in orderDetails.js (directive)
  // $scope.getOrderDetails = function(orderId) {
  //   rgsService.getOrderDetails(orderId).then(function(response) {
  //     $scope.details = response;
  //   });
  // };

  $scope.markOrderFilled = function(orderId) {
    rgsService.markOrderFilled(orderId).then(function(response) {
      $state.reload();
    });
  };

  $scope.markOrderUnfilled = function(orderId) {
    rgsService.markOrderUnfilled(orderId).then(function(response) {
      $state.reload();
    });
  };

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
      $('.admin-fade').fadeIn('fast');
      $('.logout-nav').fadeOut('fast');
      $('body').removeClass('no-scroll');
      $state.go('landing');
      // rgsService.confirmLogout(res);
    });
  };

});
