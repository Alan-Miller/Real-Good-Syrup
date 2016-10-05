angular.module('syrupApp').service('rgsService', function($http, $state) {

  var port = 8002;

  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/products'
    }).then(function(response) {
      return response.data;
    });
  };

  this.getUsers = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/users'
    }).then(function(response) {
      return response.data;
    });
  };

  this.getThisUser = function(id) {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/users' + id
    }).then(function(response) {
      return response.data;
    });
  };

  this.confirmLogout = function(res) {
    if (res) {
      swal({
        title: 'Are you sure?',
        text: "This will log you out.",
        type: 'question',
        showCancelButton: true,
        cancelButtonColor: 'RGB(217, 67, 98)',
        confirmButtonColor: 'RGB(153, 196, 210)',
        confirmButtonText: 'Yes, log out!'
      }).then(function() {
        swal({
          title: 'Bye! Thanks for visiting!',
          // text: 'We\'ll miss you.',
          type: 'success',
          timer: 1100
          }
        );
        $state.go('landing');
      });
    }
  };





/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
AUTH
  Auth functions
  Mostly pasted in from Brett's code, with Josh's tweaks
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  this.loginLocal = function(credentials) {
    return $http({
      method: "POST",
      url: 'http://localhost:' + port + '/auth/local',
      data: credentials
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log('service loginLocal function caught error logging in!', err);
    });
  };

  this.getUser = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/auth/me'
    })
    .then(function(res) {
      // console.log(res);
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  this.logout = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/auth/logout'
    }).then(function(res) {
      return res.data;
    });
  };


// FIN
});
