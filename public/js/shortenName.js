angular.module('syrupApp')
.directive('shortenName', function() {
  return {
    restrict: 'AE',
    link: function(scope, element, attribute) {

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
        Shorten product name
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        window.setTimeout(function() {
          var productName = element.html();
          productName = (productName.replace(/\s\(\d\d?\soz\.\)/g, '')).toLowerCase();
          element.html(productName);
        }, 88);

    }
  };
});
