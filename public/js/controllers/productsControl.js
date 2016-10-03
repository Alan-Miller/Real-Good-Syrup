angular.module('syrupApp').controller('productsControl', function($scope, rgsService) {

  rgsService.getProducts().then(function(response) {
    $scope.products = response;
    console.log(response);
  });

});
