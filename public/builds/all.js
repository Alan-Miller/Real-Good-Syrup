'use strict';

angular.module('syrupApp', ['ui.router', 'satellizer']).config(function ($stateProvider, $urlRouterProvider, $authProvider) {

  var loginRequired = ['$q', '$location', '$auth', function ($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }];

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
      loginRequired: loginRequired
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

  $authProvider.loginUrl = 'http://localhost:8002/auth/login';
  $authProvider.signupUrl = 'http://localhost:8002/auth/signup';
});

angular.module('syrupApp').directive('cartDirective', function () {
  return {
    restrict: 'AE',
    link: function link(scope, element, attribute) {

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
        Grow the add/subtract button on hover
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      element.hover(function () {
        element.parent().find('.add').removeClass('add-sub-padding');
        element.addClass('add-sub-padding');
      }, function () {
        $('.add').addClass('add-sub-padding');
        $('.sub').removeClass('add-sub-padding');
      });

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
        Add/subtract jars of syrup in cart
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      element.on('click', function () {
        var numJars = element.parent().parent().parent().find('.i-want').find('.num').html();
        if (element.html() === '+') {
          numJars++;
        } else if (element.html() === '-' && numJars > 0) {
          numJars--;
        }
        element.parent().parent().parent().find('.i-want').find('.num').html(numJars);
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

  $(window).resize(function () {
    navOffset = nav.offset().top;
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
  $('.small-logo, .login-nav').on('click', function () {
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

  $('body').addClass('no-scroll');

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.user = rgsService.user;
  // rgsService.userId = $scope.user.id;

  rgsService.getUsers().then(function (response) {
    $scope.users = response;
    response.forEach(function (eachUser) {
      if (eachUser.admin) {
        eachUser.admin = 'admin';
      } else eachUser.admin = 'not an admin';
    });
    // console.log(response);
  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.getAllOrders = function () {
    rgsService.getAllOrders().then(function (response) {
      $scope.orders = response;
    });
  };
  $scope.getAllOrders();

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    LOGOUT
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // $scope.logout = function() {
  //   rgsService.logout().then(function(res) {
  //     rgsService.confirmLogout(res);
  //   });
  // };

  $scope.logout = function () {
    $auth.logout().then(function (res) {
      $('body').removeClass('no-scroll');
      $state.go('landing');
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

angular.module('syrupApp').controller('cartControl', function ($scope, rgsService) {

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PRODUCTS
      Get all products
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  rgsService.getProducts().then(function (response) {
    $scope.products = response;
  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
      Place order
        - Creates order object; key is based on product id and value is price
      Runs confirmOrder fn in service
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.placeOrder = function () {
    var orderObject = {};
    orderObject.userId = rgsService.user.id;

    $('.i-want').each(function (index, val) {

      /*  Remove '$' and convert product price to number, then total  */
      var productPrice = Number($(this).parent().find('.product-price').html().replace('$', ''));
      var productTotal = 0;

      var numOfEachSizeOfJar = $(this).find('.num').html();
      for (var i = 0; i < numOfEachSizeOfJar; i++) {
        productTotal += productPrice;
      }

      var productId = $(this).parent().find('.product-id').html();
      orderObject['product' + productId] = productTotal;

      for (var key in orderObject) {
        if (orderObject[key] === 0) {
          // delete orderObject[key];
          orderObject[key] = null;
        }
      }
    });

    console.log(orderObject);
    rgsService.checkUserIsLoggedIn(orderObject);
    // rgsService.confirmOrder(orderObject);
  };

  /*
  
  var numJars = 0;
  $scope.numJars = function(symbol) {
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

angular.module('syrupApp').controller('contactControl', function ($scope) {});

angular.module('syrupApp').controller('landingControl', function ($scope) {});

angular.module('syrupApp').controller('loginControl', function ($scope, rgsService, $state, $auth) {

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
        rgsService.user = response.data.user;
        var user = response.data.user;
        checkUser(user.admin);
      }
    }).catch(function (response) {});
  };

  function checkUser(isAdmin) {
    rgsService.getUser().then(function (user) {
      if (user && isAdmin) {
        $state.go('admin');
        window.setTimeout(function () {
          $('#first').scrollToStateContainer();
        });
        // $('body').addClass('no-scroll');
      } else if (user) {
        $state.go('patron');
      } else {
        $scope.loginHeading = 'Wrong name or password. Try again.';
      }
    });
  }

  $scope.logout = function () {
    $auth.logout().then(function (res) {
      $('body').removeClass('no-scroll');
      $state.go('landing');
      rgsService.confirmLogout(res);
    });
  };
});

angular.module('syrupApp').controller('patronControl', function ($scope, rgsService, $state, $auth) {

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.user = rgsService.user;
  rgsService.userId = $scope.user.id;
  console.log($scope.user);
  console.log(rgsService.userId);

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
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // $scope.logout = function() {
  //   rgsService.logout().then(function(res) {
  //     rgsService.confirmLogout(res);
  //   });
  // };


  $scope.logout = function () {
    $auth.logout().then(function (res) {
      $state.go('landing');
      rgsService.confirmLogout(res);
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

  var port = 8002;
  var serviceScope = this;
  this.user = { userId: null };

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
      Get all users (admin)
      Get this user's info
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  this.getUsers = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/users'
    }).then(function (response) {
      return response.data;
    });
  };

  this.getThisUser = function (id) {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/users' + id
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
      url: 'http://localhost:' + port + '/api/products'
    }).then(function (response) {
      return response.data;
    });
  };

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
      getAllOrders: show all orders (admin)
      getUserOrders: get this user's orders
      checkUserIsLoggedIn: check user is logged in, then call confirmOrder()
      confirmOrder: check order is not empty and confirm order, then call placeOrder()
      placeOrder: post order to db (and reset order to zeroes)
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  this.getAllOrders = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/orders'
    }).then(function (response) {
      return response.data;
    });
  };

  this.getUserOrders = function (id) {
    // console.log('ID is: ' + id);
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/orders/' + id
    }).then(function (response) {
      return response.data;
    });
  };

  this.checkUserIsLoggedIn = function (orderObj) {
    // alert(user.id);
    console.log('LOOK!:', orderObj.userId);
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
    if (!orderObj.product1 && !orderObj.product2 && !orderObj.product3) {
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
      console.log(orderObj.product1, orderObj.product2, orderObj.product3);
      if (!isNaN(orderObj.product1)) {
        quarts = orderObj.product1 / 22 + ' quarts ';
        // quarts === 1 ? quarts = ' quart, ' : quarts = ' quarts, ';
        quarts === 1 ? quarts = quarts.replace('quarts', 'quart') : quarts;
        total += orderObj.product1;
      } else quarts = 0;
      if (!isNaN(orderObj.product2)) {
        pints = orderObj.product2 / 12 + ' pints ';
        // pints === 1 ? pints = ' pint, ' : pints = ' pints, ';
        total += orderObj.product2;
      } else pints = 0;
      if (!isNaN(orderObj.product3)) {
        halfPints = orderObj.product3 / 8 + ' half pints ';
        // halfPints === 1 ? halfPints = ' half pint, ' : halfPints = ' half pints ';
        total += orderObj.product3;
      } else halfPints = 0;
      swal({
        title: 'Is this your order?',
        text: quarts + ',' + pints + ', and ' + halfPints + 'for $' + total + '.00?',
        type: 'question',
        showCancelButton: true,
        cancelButtonColor: 'RGB(217, 67, 98)',
        confirmButtonColor: 'RGB(153, 196, 210)',
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
  // this.loginLocal = function(credentials) {
  //   return $http({
  //     method: "POST",
  //     url: 'http://localhost:' + port + '/auth/local',
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
  //     url: 'http://localhost:' + port + '/auth/me'
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
  //     url: 'http://localhost:' + port + '/auth/logout'
  //   }).then(function(res) {
  //     return res.data;
  //   }).catch(function(err) {
  //     console.log(err);
  //   });
  // };


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  this.getUser = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/me'
    }).then(function (res) {
      // console.log(res);
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    Confirm logout with Sweet Alerts fn
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  this.confirmLogout = function (res) {
    if (res) {
      swal({
        title: 'Are you sure?',
        text: "This will log you out.",
        type: 'question',
        showCancelButton: true,
        cancelButtonColor: 'RGB(217, 67, 98)',
        confirmButtonColor: 'RGB(153, 196, 210)',
        confirmButtonText: 'Yes, log out!'
      }).then(function () {
        swal({
          title: 'Bye! Thanks for visiting!',
          // text: 'We\'ll miss you.',
          type: 'success',
          timer: 1100
        });
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