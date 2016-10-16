angular.module('syrupApp').controller('patronControl', function($scope, rgsService, $state, $auth, requestUser) {


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  ADMIN LOCKOUT
    Lock admin out of other areas of the site
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $('.login-nav').fadeOut('fast');
  $('.logout-nav').fadeIn('fast');
  $('.my-info-nav').fadeIn('fast');


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
      $scope.user: Get user
      updateUserInfo: Update user info
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  // $scope.user = rgsService.getCurrentUser();
  $scope.user = requestUser;
  console.log('$scope.user', $scope.user);
  var dog = 'happy';
  // console.log(rgsService.userId);


  $scope.updateUserInfo = function() {
    swal({
      title: 'Edit your account info',
      html:
        'First name: <input id="swal-input1" class="swal-input" onfocus="this.select()" autofocus placeholder="First name">' +
        'Last name: <input id="swal-input2" class="swal-input" onfocus="this.select()" placeholder="Last name">' +
        'Username: <input id="swal-input3" class="swal-input" onfocus="this.select()" placeholder="Username">' +
        'Shipping address: <input id="swal-input4" class="swal-input" onfocus="this.select()" placeholder="Address">' +
        'Zip code: <input id="swal-input5" class="swal-input" onfocus="this.select()" placeholder="Zip">',
      // type: 'info',
      onOpen: function() {
        $('#swal-input1').val($scope.user.firstname);
        $('#swal-input2').val($scope.user.lastname);
        $('#swal-input3').val($scope.user.username);
        $('#swal-input4').val($scope.user.address);
        $('#swal-input5').val($scope.user.zip);
      },
      showCancelButton: true,
      cancelButtonColor: 'RGB(204, 70, 77)',
      confirmButtonColor: 'RGB(80, 103, 129)',
      confirmButtonText: 'Looks good!'
    })
    .then(function() {
      var updatedUserInfo = {
        firstname: $('#swal-input1').val(),
        lastname: $('#swal-input2').val(),
        username: $('#swal-input3').val(),
        address: $('#swal-input4').val(),
        zip: $('#swal-input5').val(),
        id: $scope.user.id
      };
      rgsService.updateUserInfo(updatedUserInfo).then(function(response) {
        $state.reload();
      });
    });
  };


  $scope.updatePassword = function() {
    swal({
      title: 'Edit your password',
      html:
        'New password: <input id="swal-new1" class="swal-input" onfocus="this.select()" type="password" placeholder="Enter password" autofocus>' +
        'New password (again): <input id="swal-new2" class="swal-input" onfocus="this.select()" type="password" placeholder="Enter password again">',
      type: 'info',
      preConfirm: function() {
        return new Promise(function(resolve) {
          if ($('#swal-new1').val() === $('#swal-new2').val()) {
            resolve();
          } else {
            swal({
              title: 'Oops...',
              text: 'New password inputs do not match! Try again!',
              type: 'error'
            });
          }
        });
      },
      showCancelButton: true,
      cancelButtonColor: 'RGB(204, 70, 77)',
      confirmButtonColor: 'RGB(80, 103, 129)',
      confirmButtonText: 'Done!'
    })
    .then(function() {
      var updatedPassword = {
        newPassword: $('#swal-new1').val(),
        id: $scope.user.id
      };
      rgsService.updatePassword(updatedPassword).then(function(response) {
        swal({
          title: 'Success',
          text: 'Your password has been changed',
          type: 'success',
          timer: 2100
        });
      });
    });
  };



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
