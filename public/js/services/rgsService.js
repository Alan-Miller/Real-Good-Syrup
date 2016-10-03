angular.module('syrupApp').service('rgsService', function($http) {

  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: '/api/products'
    }).then(function(response) {
      return response.data;
    });
  };


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
AUTH
  Auth functions
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  this.loginLocal = function(credentials) {
    return $http({
      method: "POST",
      url: '/auth/local',
      data: credentials
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log('ERROR LOGGING IN!', err);
    });
  };

  this.getUser = function() {
    return $http({
      method: 'GET',
      url: '/auth/me'
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    });
  };




});
