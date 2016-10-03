angular.module('syrupApp').controller('loginControl', function($scope, rgsService) {



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
AUTH
  Auth functions
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  function getUser() {
    rgsService.getUser().then(function(user) {
      if (user) $scope.user = user.username;
      else $scope.user = 'NOT LOGGED IN';
    });
  }

  getUser();

  $scope.loginLocal = function(username, password) {
    console.log('Logging in with', username, password);
    rgsService.loginLocal({
      username: username,
      password: password
    })
    .then(function(res) {
      getUser();
    });
  };

});
