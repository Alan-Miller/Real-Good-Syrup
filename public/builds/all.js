'use strict';

angular.module('syrupApp', ['ui.router', 'satellizer', 'angular-stripe']).config(function ($stateProvider, $urlRouterProvider, $authProvider, stripeProvider) {

  stripeProvider.setPublishableKey('pk_test_hnF7JyUZM8nhb8nk1YSaJpuQ');

  var loginRequired = ['$q', '$location', '$auth', function ($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }];

  var requestUser = function requestUser($http, rgsService) {
    return $http({
      method: 'GET',
      url: '/api/me'
    }).then(function (response) {
      // console.log(response);
      return $http({
        method: 'GET',
        url: '/api/users/' + response.data
      }).then(function (response) {
        user = response.data;
        rgsService.setUser(user[0]);
        // console.log('here is the user', user);
        return user[0];
      });
      // console.log('user', user);
    });
  };

  $stateProvider.state('landing', {
    url: '/',
    templateUrl: './views/landing.html',
    controller: 'landingControl',
    views: {
      'first': {
        controller: 'landingControl',
        templateUrl: 'views/landing.html'
      },
      'second': {
        controller: 'cartControl',
        templateUrl: 'views/cart.html'
      },
      'third': {
        controller: 'processControl',
        templateUrl: 'views/process.html'
      },
      'fourth': {
        controller: 'contactControl',
        templateUrl: 'views/contact.html'
      }
    }
  }).state('admin', {
    url: '/admin',
    templateUrl: './views/admin.html',
    controller: 'adminControl',
    resolve: {
      loginRequired: loginRequired
    },
    views: {
      'first': {
        controller: 'adminControl',
        templateUrl: 'views/admin.html'
      },
      'second': {
        controller: 'cartControl',
        templateUrl: 'views/cart.html'
      },
      'third': {
        controller: 'processControl',
        templateUrl: 'views/process.html'
      },
      'fourth': {
        controller: 'contactControl',
        templateUrl: 'views/contact.html'
      }
    }
  }).state('patron', {
    url: '/patron',
    templateUrl: './views/patron.html',
    controller: 'patronControl',
    resolve: {
      loginRequired: loginRequired,
      requestUser: requestUser
    },
    views: {
      'first': {
        controller: 'patronControl',
        templateUrl: 'views/patron.html'
      },
      'second': {
        controller: 'cartControl',
        templateUrl: 'views/cart.html'
      },
      'third': {
        controller: 'processControl',
        templateUrl: 'views/process.html'
      },
      'fourth': {
        controller: 'contactControl',
        templateUrl: 'views/contact.html'
      }
    }
  }).state('about', {
    url: '/about',
    templateUrl: './views/about.html',
    controller: 'aboutControl',
    views: {
      'first': {
        controller: 'landingControl',
        templateUrl: 'views/landing.html'
      },
      'second': {
        controller: 'cartControl',
        templateUrl: 'views/cart.html'
      },
      'third': {
        controller: 'aboutControl',
        templateUrl: 'views/about.html'
      },
      'fourth': {
        controller: 'contactControl',
        templateUrl: 'views/contact.html'
      }
    }
  }).state('cart', {
    url: '/cart',
    templateUrl: './views/cart.html',
    controller: 'cartControl',
    views: {
      'first': {
        controller: 'landingControl',
        templateUrl: 'views/landing.html'
      },
      'second': {
        controller: 'cartControl',
        templateUrl: 'views/cart.html'
      },
      'third': {
        controller: 'processControl',
        templateUrl: 'views/process.html'
      },
      'fourth': {
        controller: 'contactControl',
        templateUrl: 'views/contact.html'
      }
    }
  }).state('login', {
    url: '/login',
    templateUrl: './views/login.html',
    controller: 'loginControl',
    views: {
      'first': {
        controller: 'loginControl',
        templateUrl: 'views/login.html'
      },
      'second': {
        controller: 'cartControl',
        templateUrl: 'views/cart.html'
      },
      'third': {
        controller: 'processControl',
        templateUrl: 'views/process.html'
      },
      'fourth': {
        controller: 'contactControl',
        templateUrl: 'views/contact.html'
      }
    }
  }).state('process', {
    url: '/process',
    templateUrl: './views/process.html',
    controller: 'processControl',
    views: {
      'first': {
        controller: 'landingControl',
        templateUrl: 'views/landing.html'
      },
      'second': {
        controller: 'cartControl',
        templateUrl: 'views/cart.html'
      },
      'third': {
        controller: 'processControl',
        templateUrl: 'views/process.html'
      },
      'fourth': {
        controller: 'contactControl',
        templateUrl: 'views/contact.html'
      }
    }
  })
  //  .state('products', {
  //    url: '/products',
  //    templateUrl: './views/products.html',
  //    controller: 'productsControl',
  //    views: {
  //      'first': {
  //        controller: 'landingControl',
  //        templateUrl: 'views/landing.html'
  //      },
  //      'second': {
  //        controller: 'productsControl',
  //        templateUrl: 'views/products.html'
  //      },
  //      'third': {
  //        controller: 'processControl',
  //        templateUrl: 'views/process.html'
  //      },
  //      'fourth': {
  //        controller: 'contactControl',
  //        templateUrl: 'views/contact.html'
  //      }
  //    }
  //  })
  .state('contact', {
    url: '/contact',
    templateUrl: './views/contact.html',
    controller: 'contactControl'
  });

  $urlRouterProvider.otherwise('/');

  $authProvider.loginUrl = '/auth/login';
  $authProvider.signupUrl = '/auth/signup';
});

angular.module('syrupApp').directive('addSubtract', function () {
  return {
    restrict: 'AE',
    link: function link(scope, element, attribute) {

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
        HOVER OVER ADD/SUB BUTTON
          Grow the add/subtract section
          Create highlight behind button
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      element.hover(function () {
        element.parent().find('.add').removeClass('add-sub-padding');
        element.addClass('add-sub-padding');
        element.parent().find('section').addClass('white-highlight');
      }, function () {
        $('.add').addClass('add-sub-padding');
        $('.sub').removeClass('add-sub-padding');
        element.parent().find('section').removeClass('white-highlight');
      });

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
        Add/subtract jars of syrup in cart
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      element.on('click', function () {
        var numJars = element.closest('.one-product').find('.num').html();
        // var numJars = element.parent().parent().parent().find('.i-want').find('.num').html();
        if (element.html() === '+') {
          numJars++;
        } else if (element.html() === '-' && numJars > 0) {
          numJars--;
        }
        element.closest('.one-product').find('.num').html(numJars);
      });
    }
  };
});

angular.module('syrupApp').directive('navLogout', function (rgsService) {
  return {
    restrict: 'AE',
    controller: function controller($scope, $state, $auth) {

      $scope.logout = function () {
        $auth.logout().then(function (res) {
          $('.admin-fade').fadeIn('fast');
          $('.logout-nav').fadeOut('fast');
          $('.my-info-nav').fadeOut('fast');
          $('body').removeClass('no-scroll');
          rgsService.setUser({ id: false });
          $state.go('landing');
        });
      };

      $('.logout-nav').on('click', function () {
        $scope.logout();
      });
    }
  };
});

$(document).ready(function () {

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    STICKY NAV
      Nav scrolls to top and sticks
      When nav becomes fixed and leaves flow, #nav-buffer is displayed to fill the gap
      If window is resized, navOffset is reevaluated
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  var nav = $('#main-nav');
  var navOffset = nav.offset().top;
  // alert(navOffset);

  $(window).resize(function () {
    navOffset = nav.offset().top;
    // alert(navOffset);
  });

  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= navOffset) {
      nav.addClass('fixed-nav');
      nav.removeClass('scroll-nav');
      $('#nav-buffer').css('display', 'block');
    } else {
      nav.addClass('scroll-nav');
      nav.removeClass('fixed-nav');
      $('#nav-buffer').css('display', 'none');
    }
  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    SCROLL TO STATE
      Click nav options to scroll to position of state
      setTimout function waits till state change before scrolling
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $.fn.scrollToStateContainer = function () {
    return this.each(function () {
      if ($(window).scrollTop() < navOffset) {
        $('html, body').animate({
          scrollTop: $(this).offset().top - 70
        }, 1000);
      } else {
        $('html, body').animate({
          scrollTop: $(this).offset().top - 70
        }, 1000);
      }
    });
  };
  $('.small-logo, .login-nav, .my-info-nav').on('click', function () {
    window.setTimeout(function () {
      $('#first').scrollToStateContainer();
    });
  });
  $('.products-nav, .cart-nav').on('click', function () {
    window.setTimeout(function () {
      $('#second').scrollToStateContainer();
    });
  });
  $('.process-nav, .about-nav').on('click', function () {
    window.setTimeout(function () {
      $('#third').scrollToStateContainer();
    });
  });
  $('.contact-nav').on('click', function () {
    window.setTimeout(function () {
      $('#fourth').scrollToStateContainer();
    });
  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PARALLAX EFFECTS
      Splash section
      Falling leaves and snowflakes
      Trees
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // var treeRoots = ($('#footer').offset().top + $('#footer').outerHeight(true)) -
  // $('.tree-right').css({'bottom': '-100%'});
  // var bottomOfPageOffset = $('#footer').offset().top + $('#footer').outerHeight(true);
  // $('.tree-left').css({'bottom': '-' + 2 * bottomOfPageOffset + 'px'});


  $(window).scroll(function () {
    var winScroll = $(this).scrollTop();
    var navOffset = nav.offset().top;
    var bottomOfPageOffset = $('#footer').offset().top + $('#footer').outerHeight(true);
    // console.log(bottomOfPageOffset);
    var windowHeight = $(window).height();

    // SPLASH SECTION
    var splashOpacity = (navOffset - winScroll) / navOffset;
    // $('.splash-logo').css({'transform' :'translate(0px, ' + (winScroll) * 0.7 + '%)'});
    $('.splash-bg').css({ 'transform': 'translate(0px, ' + winScroll * 0.1 + '%)' });
    $('.splash-bg').css({ 'opacity': splashOpacity });
    $('.leaves-splash-bg').css({ 'transform': 'translate(0px, ' + winScroll / 10 + '%)' });

    // FALLING LEAVES AND SNOWFLAKES
    var leafFall = 'translate(0px, ' + winScroll * 1.1 + '%)';
    var leafSpin = 'rotate(-' + winScroll / 3 + 'deg)';
    var leaf = leafFall + ' ' + leafSpin;

    $('.leaf-one').css({ 'transform': 'translate(0px, ' + winScroll * 0.45 + '%)' + leafSpin });
    $('.leaf-two').css({ 'transform': leafFall + ' rotate(-' + winScroll / 5 + 'deg)' });
    $('.leaf-three').css({ 'transform': 'translate(0px, ' + winScroll * 1.4 + '%)' + leafSpin });

    $('.snowflake-one').css({ 'transform': 'translate(0px, ' + winScroll * 0.45 + '%)' + leafSpin });
    $('.snowflake-two').css({ 'transform': leafFall + ' rotate(-' + winScroll / 1.2 + 'deg)' });
    $('.snowflake-three').css({ 'transform': 'translate(0px, ' + winScroll * 0.65 + '%)' + leafSpin });

    // TREES
    $('.tree-left').css({ 'transform': 'translate(0px, ' + winScroll * -1.8 + 'px)' });
    $('.tree-right').css({ 'transform': 'translate(0px, ' + winScroll * -1.8 + 'px)' });
    $('.tree-left-back').css({ 'transform': 'translate(0px, ' + winScroll / -30 + '%)' });
    $('.tree-right-back').css({ 'transform': 'translate(0px, ' + winScroll / -30 + '%)' });
    $('.tree-deep').css({ 'transform': 'translate(0px, ' + winScroll / -40 + '%)' });

    // HILLS
    $('.hill-fg').css({ 'transform': 'translate(0px, ' + winScroll / -50 + '%)' });
    $('.hill-bg').css({ 'transform': 'translate(0px, ' + winScroll / -75 + '%)' });
    $('.hill-dbg').css({ 'transform': 'translate(0px, ' + winScroll / -95 + '%)' });

    // $('.hill').css({'transform': 'translate(0px, ' + (bottomOfPageOffset + winScroll) / -40 + '%)'});
    // $('.tree-center').css({'transform': 'translate(0px, ' + (bottomOfPageOffset + winScroll) / -30 + '%)'});
    // $('.tree-right').css({'transform' :'translate(0px, ' + (bottomOfPageOffset + winScroll) / -20 + 'vh)'});
    // $('.tree-left').css({'transform' :'translate(0px, ' + (bottomOfPageOffset + winScroll) / -20 + '%)'});


    // var doc = document.documentElement.clientHeight;
    // if (winScroll + doc >= bottomOfPageOffset) {
    //   $('.falling-leaf').css('display', 'none');
    // } else {
    //   $('.falling-leaf').css('display', 'block');
    // }

  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    OTHER SCRIPTS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // var gap = $('.rgs').offset().top;
  // $('.rgs').css('transform', 'translateY(-' + gap + 'px)');

});

angular.module('syrupApp').directive('shortenName', function () {
  return {
    restrict: 'AE',
    link: function link(scope, element, attribute) {

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
        Shorten product name
          Runs regex on db name
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      window.setTimeout(function () {
        var productName = element.html();
        productName = productName.replace(/\s\(\d\d?\soz\.\)/g, '').toLowerCase();
        element.html(productName);
      }, 88);
    }
  };
});

angular.module('syrupApp').controller('aboutControl', function ($scope) {});

angular.module('syrupApp').controller('adminControl', function ($scope, rgsService, $state, $auth) {

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ADMIN LOCKOUT
      Locks admin out of other features and hides nav bar
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $('#first').scrollToStateContainer(); // Scrolls up again before locking position, in case window is scrolled then refreshed
  $('.admin-fade').fadeOut('fast');
  $('.logout-nav').fadeIn('fast');

  window.setTimeout(function () {
    $('body').addClass('no-scroll');
  }, 1000);

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.user = rgsService.getCurrentUser();

  rgsService.getUsers().then(function (response) {
    $scope.users = response;
    response.forEach(function (eachUser) {
      if (eachUser.admin) {
        eachUser.admin = 'admin';
      } else eachUser.admin = 'not an admin';
    });
    // console.log(response);
  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.getUnfilledOrders = function () {
    rgsService.getUnfilledOrders().then(function (response) {
      // console.log('THE RESPONSE:', response);
      $scope.unfilled = response;
    });
  };
  $scope.getUnfilledOrders();

  $scope.getFilledOrders = function () {
    rgsService.getFilledOrders().then(function (response) {
      console.log('THE RESPONSE:', response);
      $scope.filled = response;
    });
  };
  $scope.getFilledOrders();

  $scope.markOrderFilled = function (orderId) {
    console.log('orderId:', orderId);
    rgsService.markOrderFilled(orderId).then(function (response) {
      $state.reload();
    });
  };

  $scope.markOrderUnfilled = function (orderId) {
    console.log('orderId:', orderId);
    rgsService.markOrderUnfilled(orderId).then(function (response) {
      $state.reload();
    });
  };

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    LOGOUT
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // $scope.logout = function() {
  //   rgsService.logout().then(function(res) {
  //     rgsService.confirmLogout(res);
  //   });
  // };

  $scope.logout = function () {
    $auth.logout().then(function (res) {
      $('.admin-fade').fadeIn('fast');
      $('.logout-nav').fadeOut('fast');
      $('body').removeClass('no-scroll');
      $state.go('landing');
      // rgsService.confirmLogout(res);
    });
  };
});

angular.module('syrupApp').controller('cartControl', function ($scope, rgsService, stripe, $http) {

  $scope.charge = function () {
    return stripe.card.createToken($scope.payment.card).then(function (response) {
      console.log('token created for card ending in ', response.card.last4);
      var payment = angular.copy($scope.payment);
      payment.card = void 0;
      payment.token = response.id;
      return $http.post('/api/payment', payment);
    }).then(function (payment) {
      console.log('successfully submitted payment for $', payment.amount);
    }).catch(function (err) {
      if (err.type && /^Stripe/.test(err.type)) {
        console.log('Stripe error: ', err.message);
      } else {
        console.log('Other error occurred, possibly with your API', err.message);
      }
    });
  };

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PRODUCTS
      Get all products
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  rgsService.getProducts().then(function (response) {
    $scope.products = response;
    console.log('$prod:', $scope.products);
  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
      Places order
        - Creates order object; key is based on product id and value is price
      Runs checkUserIsLoggedIn fn in service
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.placeOrder = function () {
    var orderObject = {};
    var user = rgsService.getCurrentUser();
    // console.log('THE USER', user);
    orderObject.userId = user.id;
    // console.log(orderObject.userId);

    $('.i-want').each(function (index, val) {

      /*  Remove '$' and convert product price to number, then total  */
      var productPrice = Number($(this).parent().find('.product-price').html().replace('$', ''));
      var productTotal = 0;

      var numOfEachSizeOfJar = Number($(this).find('.num').html());
      for (var i = 0; i < numOfEachSizeOfJar; i++) {
        productTotal += productPrice;
      }

      var productId = $(this).parent().find('.product-id').html();
      orderObject[$scope.products[productId - 1].short_name] = {};
      orderObject[$scope.products[productId - 1].short_name].productId = Number(productId);
      orderObject[$scope.products[productId - 1].short_name].qty = numOfEachSizeOfJar;
      orderObject[$scope.products[productId - 1].short_name].price = productTotal;

      // for (var key in orderObject[$scope.products[productId - 1].short_name]) {
      // if (orderObject[$scope.products[productId - 1].short_name].qty === 0) {
      // delete orderObject[key];
      // orderObject[$scope.products[productId - 1].short_name].qty = null;
      // }
      // }
    });
    orderObject.total = orderObject.quart.price + orderObject.pint.price + orderObject.half_pint.price;
    // console.log(orderObject);
    console.log('Here is your order:', orderObject);
    rgsService.checkUserIsLoggedIn(orderObject);
    // rgsService.confirmOrder(orderObject);
  };

  // Stripe.setPublishableKey('pk_test_hnF7JyUZM8nhb8nk1YSaJpuQ');

});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  †† CODE GRAVEYARD ††
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PLACE ORDER
    Dynamically create object with keys based on product types ordered
    Set keys equal to empty array
    Push in price for each item of each product
    Dynamically create object property based on product key, set value to empty array
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//
// for (var key in orderObject) {
//   if (orderObject[key].length < 1) {
//     delete orderObject[key];
//   }
// }


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  if (symbol === '+') {
    numJars++;
    console.log(numJars);
  } else if (symbol === '-' && numJars > 0) {
    numJars--;
    console.log(numJars);
  }
  // var spanOfJars = document.getElementById('i-want');
  $(this).parent().parent().parent().find('.i-want').find('.num').html(numJars);
  // $(this).closest('.one-product').find('.i-want').html(numJars);
  // $('.num').html(numJars);
};
// $scope.numJars();


//
// $scope.theorder = {};
//
// $scope.placeorder = function() {
//
// };

*/

angular.module('syrupApp').controller('contactControl', function ($scope) {});

angular.module('syrupApp').controller('landingControl', function ($scope) {});

angular.module('syrupApp').controller('loginControl', function ($scope, rgsService, $state, $auth) {

  $scope.createNew = function () {
    swal.setDefaults({
      confirmButtonText: 'Next &rarr;',
      confirmButtonColor: 'RGB(204, 70, 77)',
      showCancelButton: true,
      animation: false,
      progressSteps: ['1', '2', '3', '4', '5', '6']
    });

    var newUserArr = [];
    var saveNewUserInput = function saveNewUserInput(input) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          if (input === 'duh') {
            reject('no duh');
          } else {
            newUserArr.push(input);
            resolve();
          }
        }, 88);
      });
    };
    var steps = [{
      title: 'Step 1',
      text: 'Enter your first name',
      input: 'text',
      // preConfirm: saveNewUserInput(text),
      preConfirm: function preConfirm(text) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            if (text === 'duh') {
              reject('no duh');
            } else {
              newUserArr.push(text);
              resolve();
            }
          }, 88);
        });
      }
    }, {
      title: 'Step 2',
      text: 'Enter your last name',
      input: 'text',
      // preConfirm: saveNewUserInput(text),
      preConfirm: function preConfirm(text) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            if (text === 'duh') {
              reject('no duh');
            } else {
              newUserArr.push(text);
              resolve();
            }
          }, 88);
        });
      }
    }, {
      title: 'Step 3',
      text: 'Enter your address',
      input: 'text',
      // preConfirm: saveNewUserInput(text),
      preConfirm: function preConfirm(text) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            if (text === 'duh') {
              reject('no duh');
            } else {
              newUserArr.push(text);
              resolve();
            }
          }, 88);
        });
      }
    }, {
      title: 'Step 4',
      text: 'Enter your zip code',
      input: 'number',
      // preConfirm: saveNewUserInput(number),
      preConfirm: function preConfirm(number) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            if (number === 'duh') {
              reject('no duh');
            } else {
              newUserArr.push(number);
              resolve();
            }
          }, 88);
        });
      }
    }, {
      title: 'Step 5',
      text: 'Enter a username',
      input: 'text',
      // preConfirm: saveNewUserInput(text),
      preConfirm: function preConfirm(text) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            if (text === 'duh') {
              reject('no duh');
            } else {
              newUserArr.push(text);
              resolve();
            }
          }, 88);
        });
      }
    }, {
      title: 'Step 6',
      text: 'Enter a password',
      input: 'password',
      // preConfirm: saveNewUserInput(password),
      preConfirm: function preConfirm(password) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            if (password === 'duh') {
              reject('no duh');
            } else {
              newUserArr.push(password);
              resolve();
            }
          }, 88);
        });
      }
    }];

    swal.queue(steps).then(function () {
      console.log(newUserArr);
      var newUserObj = {
        firstname: newUserArr[0],
        lastname: newUserArr[1],
        address: newUserArr[2],
        zip: newUserArr[3],
        username: newUserArr[4],
        password: newUserArr[5]
      };
      console.log(newUserObj);
      rgsService.postUser(newUserObj);
      setTimeout(function () {
        $scope.loginLocal(newUserObj.username, newUserObj.password);
      }, 1000);
    }, function () {
      swal.resetDefaults();
      swal({
        title: 'Welcome!',
        confirmButtonText: 'Yay!',
        showCancelButton: false
      });
    }, function () {
      swal.resetDefaults();
    });
  };

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
  $scope.loginLocal = function (username, password) {
    $auth.login({
      username: username,
      password: password
    }).then(function (response) {
      if (response.status === 200) {
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
      });
    });
  };

  function checkUser(isAdmin) {
    rgsService.getUser().then(function (user) {
      if (user && isAdmin) {
        $state.go('admin');
        window.setTimeout(function () {
          $('#first').scrollToStateContainer(); // Scrolls to top in case window is not scroll to position when logging in
        });
        // $('body').addClass('no-scroll');
      } else if (user) {
        $state.go('patron');
      } else {
        // $scope.loginHeading = 'Wrong name or password. Try again.';
        // THIS NEVER GETS HIT SINCE AUTH IS REQUIRED BY LOGINLOCAL()
      }
    });
  }

  $scope.logout = function () {
    $auth.logout().then(function (res) {
      $('body').removeClass('no-scroll');
      $state.go('landing');
      // rgsService.confirmLogout(res);
    });
  };
});

angular.module('syrupApp').controller('patronControl', function ($scope, rgsService, $state, $auth, requestUser) {

  $('.login-nav').fadeOut('fast');
  $('.logout-nav').fadeIn('fast');
  $('.my-info-nav').fadeIn('fast');

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // $scope.user = rgsService.getCurrentUser();
  $scope.user = requestUser;
  // console.log($scope.user);
  // console.log(rgsService.userId);


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
      Get this user's orders
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.getUserOrders = function () {
    rgsService.getUserOrders($scope.user.id).then(function (response) {
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

  $scope.logout = function () {
    $auth.logout().then(function (res) {
      $('.login-nav').fadeIn('fast');
      $('.logout-nav').fadeOut('fast');
      $('.my-info-nav').fadeOut('fast');
      rgsService.setUser({ id: false });
      $state.go('landing');
      // rgsService.confirmLogout(res);
    });
  };

  // FIN
});

angular.module('syrupApp').controller('processControl', function ($scope) {});

angular.module('syrupApp').controller('productsControl', function ($scope, rgsService) {

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PRODUCTS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  rgsService.getProducts().then(function (response) {
    $scope.products = response;
  });
});

angular.module('syrupApp').service('rgsService', function ($http, $state) {

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
  this.setUser = function (userObj) {
    user = userObj;
  };
  this.getCurrentUser = function () {
    return user;
  };

  this.getUsers = function () {
    return $http({
      method: 'GET',
      url: '/api/users'
    }).then(function (response) {
      return response.data;
    });
  };

  this.getThisUser = function (id) {
    return $http({
      method: 'GET',
      url: '/api/users' + id
    }).then(function (response) {
      return response.data;
    });
  }.bind(this);

  this.getUser = function () {
    return $http({
      method: 'GET',
      url: '/api/me'
    }).then(function (res) {
      console.log('is it the user', res);
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.postUser = function (newUserObject) {
    return $http({
      method: 'POST',
      data: newUserObject,
      url: '/api/users'
    }).then(function (response) {
      return response.data;
    });
  };

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PRODUCTS
      Get all products
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  this.getProducts = function () {
    return $http({
      method: 'GET',
      url: '/api/products'
    }).then(function (response) {
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
  this.getUnfilledOrders = function () {
    return $http({
      method: 'GET',
      url: '/api/orders/unfilled'
    }).then(function (response) {
      return response.data;
    });
  };

  this.getFilledOrders = function () {
    return $http({
      method: 'GET',
      url: '/api/orders/filled'
    }).then(function (response) {
      return response.data;
    });
  };

  this.markOrderFilled = function (id) {
    return $http({
      method: 'PUT',
      url: '/api/orders/mark/filled/' + id
    });
  };

  this.markOrderUnfilled = function (id) {
    return $http({
      method: 'PUT',
      url: '/api/orders/mark/unfilled/' + id
    });
  };

  this.getUserOrders = function (id) {
    // console.log('ID is: ' + id);
    return $http({
      method: 'GET',
      url: '/api/orders/' + id
    }).then(function (response) {
      return response.data;
    });
  };

  this.checkUserIsLoggedIn = function (orderObj) {
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
    } else {
      this.confirmOrder(orderObj);
    }
  };

  this.confirmOrder = function (orderObj) {
    if (orderObj.quart.qty === 0 && orderObj.pint.qty === 0 && orderObj.half_pint.qty === 0) {
      swal.resetDefaults();
      swal({
        title: 'Your order is empty!',
        text: 'Click the syrup jar icon (+/-) to add to your order',
        type: 'error'
      });
    } else {
      var quarts,
          pints,
          halfPints,
          total = 0;
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
        text: quarts + '\n' + pints + '\n' + halfPints + '\ntotal: $' + total + '.00',
        type: 'question',
        showCancelButton: true,
        cancelButtonColor: 'RGB(204, 70, 77)',
        confirmButtonColor: 'RGB(80, 103, 129)',
        confirmButtonText: 'Yes, send me the syrup!'
      }).then(function () {
        swal({
          title: 'Thank you!',
          text: 'Your syrup will arrive soon',
          type: 'success',
          timer: 2100
        });
        //NEED TO LOG OUT
        serviceScope.placeOrder(orderObj);
        // $state.go('patron');
      });
    }
  };

  this.placeOrder = function (orderObj) {
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