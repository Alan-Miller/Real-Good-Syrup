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
         'contact': {
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
         'contact': {
           controller: 'contactControl',
           templateUrl: 'views/contact.html'
         }
       }
     })
     .state('cart', {
      //  parent: 'landing',
       url: '/cart',
       templateUrl: './views/cart.html',
       controller: 'cartControl',
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
         'contact': {
           controller: 'contactControl',
           templateUrl: 'views/contact.html'
         },
         'center-window': {
           controller: 'cartControl',
           templateUrl: 'views/cart.html'
         }
       }
     })
     .state('login', {
       url: '/login',
       templateUrl: './views/login.html',
       controller: 'loginControl',
       views: {
         'first': {
           controller: 'landingControl',
           templateUrl: 'views/landing.html'
         },
         'second': {
           controller: 'loginControl',
           templateUrl: 'views/login.html'
         },
         'third': {
           controller: 'processControl',
           templateUrl: 'views/process.html'
         },
         'contact': {
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
         'contact': {
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
         'contact': {
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
