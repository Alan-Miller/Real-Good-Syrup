angular.module('syrupApp')
.directive('addSubtract', function() {
  return {
    restrict: 'AE',
    link: function(scope, element, attribute) {

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
        HOVER OVER ADD/SUB BUTTON
          Grow the add/subtract section
          Create highlight behind button
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      element.hover(function() {
        element.parent().find('.add').removeClass('add-sub-padding');
        element.addClass('add-sub-padding');
        element.parent().find('section').addClass('white-highlight');
      }, function() {
        $('.add').addClass('add-sub-padding');
        $('.sub').removeClass('add-sub-padding');
        element.parent().find('section').removeClass('white-highlight');
      });

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
        Add/subtract jars of syrup in cart
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      element.on('click', function() {
        var numJars = element.closest('.one-product').find('.num').html();
        // var numJars = element.parent().parent().parent().find('.i-want').find('.num').html();
        if (element.html() === '+') {
          numJars++;
        } else if (element.html() === '-' && numJars > 0) {
          numJars--;
        }
        element.closest('.one-product').find('.num').html(numJars);
      });

    }
  };
});
