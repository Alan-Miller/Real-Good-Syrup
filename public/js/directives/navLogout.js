angular.module('syrupApp')
.directive('navLogout', function(rgsService) {
  return {
    restrict: 'AE',
    controller: function($scope, $state, $auth) {

      $scope.logout = function() {
        $auth.logout().then(function(res) {
          $('.admin-fade').fadeIn('fast');
          $('.logout-nav').fadeOut('fast');
          $('.my-info-nav').fadeOut('fast');
          $('body').removeClass('no-scroll');
          rgsService.setUser({id: false});
          $state.go('landing');
        });
      };

      $('.logout-nav').on('click', function() {
        $scope.logout();
      });

    },
  };
});
