angular.module('syrupApp').controller('loginControl', function($scope, rgsService, $state, $auth) {


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  AUTHENTICATION
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// $scope.loginLocal = function(username, password) {
//   // $scope.username = username;
//   rgsService.loginLocal({
//     username: username,
//     password: password
//   })
//   .then(function(user) { // Here, response is the user sent from /auth/local endpoint
//     rgsService.user = user;
//     checkUser(user.admin); // Passes admin status into checkUser fn below
//   });
// };


//login w/jsonwebtokens
   $scope.loginLocal = function(username, password) {
     $auth.login({
       username: username,
       password: password,
     }).then(function (response) {
       if(response.status === 200){
        $auth.setToken(response);
        // rgsService.user = response.data.user;
        rgsService.setUser(response.data.user);
        var user = response.data.user;
        checkUser(user.admin);
       }
     }).catch(function (response) {
       swal({
         title: 'Wrong username or password',
         text: 'Please try again',
         type: 'error',
         timer: 2100
         }
       );
     });
   };



  function checkUser(isAdmin) {
      rgsService.getUser().then(function(user) {
        if (user && isAdmin)  {
          $state.go('admin');
          window.setTimeout(function() {
            $('#first').scrollToStateContainer(); // Scrolls to top in case window is not scroll to position when logging in
          });
          // $('body').addClass('no-scroll');
        } else if (user) {
          $state.go('patron');
        }
        else {
          // $scope.loginHeading = 'Wrong name or password. Try again.';
          // THIS NEVER GETS HIT SINCE AUTH IS REQUIRED BY LOGINLOCAL()
        }

      });
    }

  $scope.logout = function() {
    $auth.logout().then(function(res) {
      $('body').removeClass('no-scroll');
      $state.go('landing');
      // rgsService.confirmLogout(res);
    });
  };


});
