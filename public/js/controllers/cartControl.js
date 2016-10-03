angular.module('syrupApp').controller('cartControl', function($scope, rgsService) {

  rgsService.getProducts().then(function(response) {
    $scope.products = response;
    console.log(response);
  });
  
});
