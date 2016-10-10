'use strict';

angular.module('syrupApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
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
        Add/Subtract Jars of Syrup in Cart
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

  // var gap = $('.rgs').offset().top;
  // $('.rgs').css('transform', 'translateY(-' + gap + 'px)');


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PARALLAX EFFECTS
      Splash section
      Falling leaves and snowflakes
      Trees
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // var treeRoots = ($('#footer').offset().top + $('#footer').outerHeight(true)) -
  // $('.tree-right').css({'bottom': '-100%'});

  $(window).scroll(function () {
    var winScroll = $(this).scrollTop();
    var navOffset = nav.offset().top;
    var bottomOfPageOffset = $('#footer').offset().top + $('#footer').outerHeight(true);

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
    $('.tree-left').css({ 'transform': 'translate(0px, ' + winScroll / -20 + '%)' });
    $('.tree-right').css({ 'transform': 'translate(0px, ' + winScroll / -20 + '%)' });
    $('.tree-left-back').css({ 'transform': 'translate(0px, ' + winScroll / -30 + '%)' });
    $('.tree-right-back').css({ 'transform': 'translate(0px, ' + winScroll / -30 + '%)' });
    $('.tree-deep').css({ 'transform': 'translate(0px, ' + winScroll / -40 + '%)' });
    $('.hill').css({ 'transform': 'translate(0px, ' + winScroll / -50 + '%)' });

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

  // $(window).scroll(function() {
  //   var winScroll = $(this).scrollTop();
  //   $('.vader').css({'transform': 'rotate(-' + winScroll / 40 + 'deg)'});
  //   $('.left-branch').css({'transform': 'translate(-' + winScroll / 80 + '%, 0px)'});
  //   $('.right-branch').css({'transform' :'translate(' + winScroll / 80 + '%, 0px)'});
  // });

  // alert('okay')
  //
  // $('.past-orders').on('click', function() {
  //   alert('click');
  // });

});

angular.module('syrupApp').directive('shortenName', function () {
  return {
    restrict: 'AE',
    link: function link(scope, element, attribute) {

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
        Shorten product name
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      window.setTimeout(function () {
        var productName = element.html();
        productName = productName.replace(/\s\(\d\d?\soz\.\)/g, '').toLowerCase();
        element.html(productName);
      }, 88);
    }
  };
});

angular.module('syrupApp').controller('aboutControl', function ($scope) {});

angular.module('syrupApp').controller('adminControl', function ($scope, rgsService, $state) {

  rgsService.getUsers().then(function (response) {
    $scope.users = response;
    response.forEach(function (eachUser) {
      if (eachUser.admin) {
        eachUser.admin = 'admin';
      } else eachUser.admin = 'not an admin';
    });
    console.log(response);
  });

  $scope.logout = function () {
    rgsService.logout().then(function (res) {
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

  rgsService.getProducts().then(function (response) {
    $scope.products = response;
  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PLACE ORDER
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
    rgsService.placeOrder(orderObject);
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

angular.module('syrupApp').controller('loginControl', function ($scope, rgsService, $state) {

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  AUTH
    Auth functions
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  $scope.loginLocal = function (username, password) {
    // $scope.username = username;
    rgsService.loginLocal({
      username: username,
      password: password
    }).then(function (user) {
      // Here, response is the user sent from /auth/local endpoint
      rgsService.user = user;
      checkUser(user.admin); // Passes admin status into checkUser fn below
    });
  };

  function checkUser(isAdmin) {
    rgsService.getUser().then(function (user) {
      // console.log('Here is something: ' + $scope.admin);
      if (user && isAdmin) {
        $state.go('admin');
        // console.log($scope.username[0].toUpperCase() + $scope.username.slice(1).toLowerCase() + ' is logged in');
      } else if (user) {
        $state.go('patron');
      } else {
        $scope.loginHeading = 'Wrong name or password. Try again.';
        console.log('Can\'t log in');
      }
    });
  }
  // getUser();

});

angular.module('syrupApp').controller('patronControl', function ($scope, rgsService, $state) {

  $scope.user = rgsService.user;
  rgsService.userId = $scope.user.id;

  $scope.getUserOrders = function () {
    rgsService.getUserOrders($scope.user.id).then(function (response) {
      // console.log(response);
      console.log('scope.user.id: ' + $scope.user.id);
      $scope.things = response;
      // $scope.thing.date = new Date($scope.thing.date);
      // $scope.date = 'date';
    });
  };
  $scope.getUserOrders();

  $scope.logout = function () {
    rgsService.logout().then(function (res) {
      rgsService.confirmLogout(res);
    });
  };

  // $scope.logout = function() {
  //   rgsService.confirmLogout();
  // };


  // FIN
});

angular.module('syrupApp').controller('processControl', function ($scope) {});

angular.module('syrupApp').controller('productsControl', function ($scope, rgsService) {

  rgsService.getProducts().then(function (response) {
    $scope.products = response;
    // console.log(response);
  });
});

angular.module('syrupApp').service('rgsService', function ($http, $state) {

  var port = 8002;

  this.getProducts = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/products'
    }).then(function (response) {
      return response.data;
    });
  };

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

  this.getUserOrders = function (id) {
    // console.log('ID is: ' + id);
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/api/orders/' + id
    }).then(function (response) {
      return response.data;
    });
  };

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

  this.user = { userId: null };
  this.placeOrder = function (orderObj) {
    return $http({
      method: 'POST',
      data: orderObj,
      url: '/api/orders'
    });
  };

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    AUTH
      Auth functions
      Mostly pasted in from Brett's code, with Josh's tweaks
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  this.loginLocal = function (credentials) {
    return $http({
      method: "POST",
      url: 'http://localhost:' + port + '/auth/local',
      data: credentials
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log('service loginLocal function caught error logging in!', err);
    });
  };

  this.getUser = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/auth/me'
    }).then(function (res) {
      // console.log(res);
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.logout = function () {
    return $http({
      method: 'GET',
      url: 'http://localhost:' + port + '/auth/logout'
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  // FIN
});