angular.module('syrupApp').service('rgsService', function($http, $state) {

  var port = 8002;

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
      Get all users (admin)
      Get this user's info
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
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

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PRODUCTS
      Get all products
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/products'
    }).then(function(response) {
      return response.data;
    });
  };


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
      Get all orders
      Get this user's orders
      Confirm order using Sweet Alerts fn which then calls placeOrder fn
      Post order to db
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  this.getAllOrders = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/orders'
    }).then(function(response) {
      return response.data;
    });
  };

  this.getUserOrders = function(id) {
    // console.log('ID is: ' + id);
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/orders/' + id
    }).then(function(response) {
      return response.data;
    });
  };

  var serviceScope = this;
  this.confirmOrder = function(orderObj) {
    if (orderObj) {
      swal({
        title: 'Place order?',
        text: "This will finalize your order",
        type: 'question',
        showCancelButton: true,
        cancelButtonColor: 'RGB(217, 67, 98)',
        confirmButtonColor: 'RGB(153, 196, 210)',
        confirmButtonText: 'Yes, send me the syrup!'
      }).then(function() {
        swal({
          title: 'Thank you!',
          text: 'Your syrup will arrive soon',
          type: 'success',
          timer: 2100
          }
        );
        //NEED TO LOG OUT
        serviceScope.placeOrder(orderObj);
        // $state.go('patron');
      });
    }
  };

  this.user = {userId: null};
  this.placeOrder = function(orderObj) {
    return $http({
      method: 'POST',
      data: orderObj,
      url: '/api/orders'
    });
  };



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  AUTHENTICATION
    Auth functions
    Mostly pasted in from Brett's code, with Josh's tweaks
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
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
    }).catch(function(err) {
      console.log(err);
    });
  };

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    Confirm logout with Sweet Alerts fn
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
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
        //NEED TO LOG OUT
        $state.go('landing');
        // this.logout().then(function(res) {
        //   alert('Am I logged out yet?');
        // });
      });
    }
  };

// FIN
});
