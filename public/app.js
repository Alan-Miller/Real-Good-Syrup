angular.module('syrupApp', ['ui.router', 'satellizer', 'angular-stripe'])
.config(function($stateProvider, $urlRouterProvider, $authProvider, stripeProvider) {

  stripeProvider.setPublishableKey('pk_test_hnF7JyUZM8nhb8nk1YSaJpuQ');

  var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
          deferred.resolve();
        } else {
          $location.path('/login');
        }
        return deferred.promise;
      }];

  var requestUser = function($http, rgsService) {
      return $http ({
        method: 'GET',
        url: '/api/me'
      }).then(function(response) {
        // console.log(response);
        return $http({
          method: 'GET',
          url: '/api/users/' + response.data
        }).then(function(response) {
          user = response.data;
          rgsService.setUser(user[0]);
          // console.log('here is the user', user);
          return user[0];
        });
        // console.log('user', user);
      });
  };


   $stateProvider
     .state('landing', {
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
     })
     .state('admin', {
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
     })
     .state('patron', {
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
     })
     .state('about', {
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
     })
     .state('cart', {
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
     })
     .state('login', {
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
     })
     .state('process', {
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
