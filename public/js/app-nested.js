angular.module('syrupApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
   $stateProvider
     .state('landing', {
       url: '/landing',
       templateUrl: './views/landing.html',
       controller: 'landingControl',
      //  views: {
      //    'first': {
      //      controller: 'landingControl',
      //      templateUrl: 'views/landing.html'
      //    },
      //    'second': {
      //      controller: 'productsControl',
      //      templateUrl: 'views/products.html'
      //    },
      //    'third': {
      //      controller: 'processControl',
      //      templateUrl: 'views/process.html'
      //    },
      //    'contact': {
      //      controller: 'contactControl',
      //      templateUrl: 'views/contact.html'
      //    }
      //  }
     })
     .state('about', {
       parent: 'landing',
       url: '/about',
       templateUrl: './views/about.html',
       controller: 'aboutControl',
      //  views: {
      //    'first': {
      //      controller: 'landingControl',
      //      templateUrl: 'views/landing.html'
      //    },
      //    'second': {
      //      controller: 'productsControl',
      //      templateUrl: 'views/products.html'
      //    },
      //    'third': {
      //      controller: 'aboutControl',
      //      templateUrl: 'views/about.html'
      //    },
      //    'contact': {
      //      controller: 'contactControl',
      //      templateUrl: 'views/contact.html'
      //    }
      //  }
     })
     .state('cart', {
       parent: 'landing',
       url: '/cart',
       templateUrl: './views/cart.html',
       controller: 'cartControl',
      //  views: {
      //    'first': {
      //      controller: 'landingControl',
      //      templateUrl: 'views/landing.html'
      //    },
      //    'second': {
      //      controller: 'productsControl',
      //      templateUrl: 'views/products.html'
      //    },
      //    'third': {
      //      controller: 'processControl',
      //      templateUrl: 'views/process.html'
      //    },
      //    'contact': {
      //      controller: 'contactControl',
      //      templateUrl: 'views/contact.html'
      //    },
      //    'center-window': {
      //      controller: 'cartControl',
      //      templateUrl: 'views/cart.html'
      //    }
      //  }
     })
     .state('login', {
       parent: 'landing',
       url: '/login',
       templateUrl: './views/login.html',
       controller: 'loginControl',
      //  views: {
      //    'first': {
      //      controller: 'landingControl',
      //      templateUrl: 'views/landing.html'
      //    },
      //    'second': {
      //      controller: 'loginControl',
      //      templateUrl: 'views/login.html'
      //    },
      //    'third': {
      //      controller: 'processControl',
      //      templateUrl: 'views/process.html'
      //    },
      //    'contact': {
      //      controller: 'contactControl',
      //      templateUrl: 'views/contact.html'
      //    }
      //  }
     })
     .state('process', {
       parent: 'landing',
       url: '/process',
       templateUrl: './views/process.html',
       controller: 'processControl',
      //  views: {
      //    'first': {
      //      controller: 'landingControl',
      //      templateUrl: 'views/landing.html'
      //    },
      //    'second': {
      //      controller: 'productsControl',
      //      templateUrl: 'views/products.html'
      //    },
      //    'third': {
      //      controller: 'processControl',
      //      templateUrl: 'views/process.html'
      //    },
      //    'contact': {
      //      controller: 'contactControl',
      //      templateUrl: 'views/contact.html'
      //    }
      //  }
     })
     .state('products', {
       parent: 'landing',
       url: '/products',
       templateUrl: './views/products.html',
       controller: 'productsControl',
      //  views: {
      //    'first': {
      //      controller: 'landingControl',
      //      templateUrl: 'views/landing.html'
      //    },
      //    'second': {
      //      controller: 'productsControl',
      //      templateUrl: 'views/products.html'
      //    },
      //    'third': {
      //      controller: 'processControl',
      //      templateUrl: 'views/process.html'
      //    },
      //    'contact': {
      //      controller: 'contactControl',
      //      templateUrl: 'views/contact.html'
      //    }
      //  }
     })
     .state('contact', {
      //  parent: 'landing',
       url: '/contact',
       templateUrl: './views/contact.html',
       controller: 'contactControl'
     });

   $urlRouterProvider.otherwise('/');
});
