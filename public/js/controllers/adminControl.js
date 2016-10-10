angular.module('syrupApp').controller('adminControl', function($scope, rgsService, $state) {

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
      // console.log(response);
      // console.log('scope.user.id: ' + $scope.user.id);
      $scope.orders = response;
      console.log('response:', response);
    });
  };
  $scope.getAllOrders();


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    LOGOUT
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.logout = function() {
    rgsService.logout().then(function(res) {
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
