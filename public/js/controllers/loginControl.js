angular.module('syrupApp').controller('loginControl', function($scope, rgsService, $state) {


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  AUTHENTICATION
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
$scope.loginLocal = function(username, password) {
  // $scope.username = username;
  rgsService.loginLocal({
    username: username,
    password: password
  })
  .then(function(user) { // Here, response is the user sent from /auth/local endpoint
    rgsService.user = user;
    checkUser(user.admin); // Passes admin status into checkUser fn below
  });
};

function checkUser(isAdmin) {
    rgsService.getUser().then(function(user) {
      // console.log('Here is something: ' + $scope.admin);
      if (user && isAdmin)  {
        $state.go('admin');
        // console.log($scope.username[0].toUpperCase() + $scope.username.slice(1).toLowerCase() + ' is logged in');
      } else if (user) {
        $state.go('patron');
      }
      else {
        $scope.loginHeading = 'Wrong name or password. Try again.';
        console.log('Can\'t log in');
      }

    });
  }
  // getUser();


});
