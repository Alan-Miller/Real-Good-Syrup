angular.module('syrupApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
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
           controller: 'productsControl',
           templateUrl: 'views/products.html'
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
       views: {
         'first': {
           controller: 'adminControl',
           templateUrl: 'views/admin.html'
         },
         'second': {
           controller: 'productsControl',
           templateUrl: 'views/products.html'
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
       views: {
         'first': {
           controller: 'patronControl',
           templateUrl: 'views/patron.html'
         },
         'second': {
           controller: 'productsControl',
           templateUrl: 'views/products.html'
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
           controller: 'productsControl',
           templateUrl: 'views/products.html'
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
           controller: 'productsControl',
           templateUrl: 'views/products.html'
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
           controller: 'productsControl',
           templateUrl: 'views/products.html'
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
     .state('products', {
       url: '/products',
       templateUrl: './views/products.html',
       controller: 'productsControl',
       views: {
         'first': {
           controller: 'landingControl',
           templateUrl: 'views/landing.html'
         },
         'second': {
           controller: 'productsControl',
           templateUrl: 'views/products.html'
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
     .state('contact', {
       url: '/contact',
       templateUrl: './views/contact.html',
       controller: 'contactControl'
     });

   $urlRouterProvider.otherwise('/');
});
