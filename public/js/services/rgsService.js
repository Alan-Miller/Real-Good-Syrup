angular.module('syrupApp').service('rgsService', function($http, $state) {

  // var port = 8002;
  var serviceScope = this;
  var user = {};


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
      setUser: set user using loginLocal fn (in loginControl.js)
      getCurrentUser: get user fn allows views to access this service's user object
      getUsers: get all users endpoint (admin)
      getThisUser: get this user's info
      getUser: get user fn used by requestUser resolve fn in app.js
      postUser: create new user in login view
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  this.setUser = function(userObj) {
    user = userObj;
  };
  this.getCurrentUser = function() {
    return user;
  };

  this.getUsers = function() {
    return $http({
      method: 'GET',
      url: '/api/users'
    }).then(function(response) {
      return response.data;
    });
  };

  this.getThisUser = function(id) {
    return $http({
      method: 'GET',
      url: '/api/users' + id
    })
    .then(function(response) {
      return response.data;
    });
  }.bind(this);

  this.getUser = function() {
    return $http({
      method: 'GET',
      url: '/api/me'
    })
    .then(function(res) {
      console.log('is it the user', res);
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  this.postUser = function(newUserObject) {
    return $http({
      method: 'POST',
      data: newUserObject,
      url: '/api/users'
    })
    .then(function(response) {
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
      url: '/api/products'
    }).then(function(response) {
      return response.data;
    });
  };


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
      getUnfilledOrders: show all orders (admin)
      getUserOrders: get this user's orders
      checkUserIsLoggedIn: check user is logged in, then call confirmOrder()
      confirmOrder: check order is not empty and confirm order, then call placeOrder()
      placeOrder: post order to db (and reset order to zeroes)
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  this.getUnfilledOrders = function() {
    return $http({
      method: 'GET',
      url: '/api/orders/unfilled'
    }).then(function(response) {
      return response.data;
    });
  };

  this.getFilledOrders = function() {
    return $http({
      method: 'GET',
      url: '/api/orders/filled'
    }).then(function(response) {
      return response.data;
    });
  };

  this.markOrderFilled = function(id) {
    return $http({
      method: 'PUT',
      url: '/api/orders/mark/filled/' + id
    });
  };

  this.markOrderUnfilled = function(id) {
    return $http({
      method: 'PUT',
      url: '/api/orders/mark/unfilled/' + id
    });
  };


  this.getUserOrders = function(id) {
    // console.log('ID is: ' + id);
    return $http({
      method: 'GET',
      url: '/api/orders/' + id
    }).then(function(response) {
      return response.data;
    });
  };

  this.checkUserIsLoggedIn = function(orderObj) {
    // alert(user.id);
    if (!orderObj.userId) {
      swal({
        title: 'Oops...',
        text: 'Please log in before ordering!',
        // imageUrl: 'https://b.thumbs.redditmedia.com/oQFn0MTVrjaz2rYL2kFIif6sH4S9B1WBplgn-NuuQMg.jpg',
        // imageWidth: 300,
        // imageHeight: 200,
        type: 'error'
      });
    }
    else {
      this.confirmOrder(orderObj);
    }
  };

  this.confirmOrder = function(orderObj) {
    if (orderObj.quart.qty === 0 && orderObj.pint.qty === 0 && orderObj.half_pint.qty === 0) {
      swal.resetDefaults();
      swal({
        title: 'Your order is empty!',
        text: 'Click the syrup jar icon (+/-) to add to your order',
        type: 'error'
        }
      );
    }
    else {
      var quarts, pints, halfPints, total = 0;
      if (orderObj.quart.qty) {
        // quarts = orderObj.product1 / 22;
        quarts = orderObj.quart.qty;
        quarts === 1 ? quarts += ' quart' : quarts += ' quarts';
        // total += orderObj.product1;
        total += orderObj.quart.price;
      }
      // else quarts = 0;
      if (orderObj.pint.qty) {
        // pints = orderObj.product2 / 12;
        pints = orderObj.pint.qty;
        pints === 1 ? pints += ' pint' : pints += ' pints';
        // total += orderObj.product2;
        total += orderObj.pint.price;
      }
      // else pints = 0;
      if (orderObj.half_pint.qty) {
        // halfPints = orderObj.product3 / 8;
        halfPints = orderObj.half_pint.qty;
        halfPints === 1 ? halfPints += ' half pint' : halfPints += ' half pints';
        // total += orderObj.product3;
        total += orderObj.half_pint.price;
      }
      // else halfPints = 0;
      swal({
        title: 'Please confirm your order',
        text: quarts + '\n'  + pints + '\n' + halfPints + '\ntotal: $' + total + '.00',
        type: 'question',
        showCancelButton: true,
        cancelButtonColor: 'RGB(204, 70, 77)',
        confirmButtonColor: 'RGB(80, 103, 129)',
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

  this.placeOrder = function(orderObj) {
    $('.num').html(0); // Reset numbers to zero (so second order is not placed by accident)
    console.log('rgsService.placeOrder obj', orderObj);
    return $http({
      method: 'POST',
      data: orderObj,
      url: '/api/orders'
    });
  };






  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    AUTHENTICATION
      Auth functions are in server.js
      Below are unused functions pasted in from Brett's code, with Josh's tweaks
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // this.loginLocal = function(credentials) {
    //   return $http({
    //     method: "POST",
    //     url: '/auth/local',
    //     data: credentials
    //   })
    //   .then(function(res) {
    //     return res.data;
    //   })
    //   .catch(function(err) {
    //     console.log('service loginLocal function caught error logging in!', err);
    //   });
    // };
    //
    // this.getUser = function() {
    //   return $http({
    //     method: 'GET',
    //     url: '/auth/me'
    //   })
    //   .then(function(res) {
    //     // console.log(res);
    //     return res.data;
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
    // };
    //
    // this.logout = function() {
    //   return $http({
    //     method: 'GET',
    //     url: '/auth/logout'
    //   }).then(function(res) {
    //     return res.data;
    //   }).catch(function(err) {
    //     console.log(err);
    //   });
    // };


    // /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    //   Confirm logout with Sweet Alerts fn
    // /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // this.confirmLogout = function(res) {
    //   if (res) {
    //     swal({
    //       title: 'Are you sure?',
    //       text: "This will log you out.",
    //       type: 'question',
    //       showCancelButton: true,
    //       cancelButtonColor: 'RGB(217, 67, 98)',
    //       confirmButtonColor: 'RGB(153, 196, 210)',
    //       confirmButtonText: 'Yes, log out!'
    //     }).then(function() {
    //       swal({
    //         title: 'Bye! Thanks for visiting!',
    //         // text: 'We\'ll miss you.',
    //         type: 'success',
    //         timer: 1100
    //         }
    //       );
    //       //NEED TO LOG OUT
    //       $state.go('landing');
    //       // this.logout().then(function(res) {
    //       //   alert('Am I logged out yet?');
    //       // });
    //     });
    //   }
    // };

});
