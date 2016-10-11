angular.module('syrupApp').controller('adminControl', function($scope, rgsService, $state, $auth) {

  window.setTimeout(function() {
    $('#first').scrollToStateContainer(); // Scrolls up again before locking position, in case window is scrolled then refreshed
  });
  $('body').addClass('no-scroll');
  $('#main-nav').fadeOut('fast');

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.user = rgsService.user;
  // rgsService.userId = $scope.user.id;

  rgsService.getUsers().then(function(response) {
    $scope.users = response;
    response.forEach(function(eachUser) {
      if (eachUser.admin) {
        eachUser.admin = 'admin';
      } else eachUser.admin = 'not an admin';
    });
    // console.log(response);
  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.getAllOrders = function() {
    rgsService.getAllOrders().then(function(response) {
      $scope.orders = response;
    });
  };
  $scope.getAllOrders();



  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    LOGOUT
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // $scope.logout = function() {
  //   rgsService.logout().then(function(res) {
  //     rgsService.confirmLogout(res);
  //   });
  // };

  $scope.logout = function() {
    $auth.logout().then(function(res) {
      $('#main-nav').fadeIn('slow');
      $('body').removeClass('no-scroll');
      $state.go('landing');
      rgsService.confirmLogout(res);
    });
  };

// FIN
});









/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  Code Graveyard ††
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// if (res) {
//   swal({
//     title: 'Are you sure?',
//     text: "This will log you out.",
//     type: 'question',
//     showCancelButton: true,
//     cancelButtonColor: 'RGB(217, 67, 98)',
//     confirmButtonColor: 'RGB(153, 196, 210)',
//     confirmButtonText: 'Yes, log out!'
//   }).then(function() {
//     swal({
//       title: 'Bye! Thanks for visiting!',
//       // text: 'We\'ll miss you.',
//       type: 'success',
//       timer: 1300
//       }
//     );
//     $state.go('landing');
//   });
// }
