angular.module('syrupApp')
.directive('orderDetails', function() {
  return {
    restrict: 'AE',
    controller: function($scope, rgsService) {

      $scope.getOrderDetails = function(orderId) {
        rgsService.getOrderDetails(orderId).then(function(response) {
          $scope.details = response;
        });
      };

    },
    link: function(scope, element, attribute) {

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
        Get order details
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      element.on('click', function() {
        scope.getOrderDetails(pending.orders_id);
      });

    }
  };
});
