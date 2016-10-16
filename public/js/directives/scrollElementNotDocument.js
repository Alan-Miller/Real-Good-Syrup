angular.module('syrupApp')
.directive('scrollElementNotDocument', function() {
  return {
    restrict: 'AE',
    link: function(scope, element, attribute) {

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
        Scroll element only
          Does not scroll document when user scrolls to bottom of element
          To scroll the document, move mouse off element
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
          element.hover(function() {
            $(document.body).css('overflow', 'hidden');
          }, function() {
            $(document.body).css('overflow', 'auto');
          });


    }
  };
});








/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  Scrolling element does not scroll document body
    The code below can be inserted inline to elements elements to prevent scrolling
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// onmouseover="document.body.style.overflow='hidden';"onmouseout="document.body.style.overflow='auto';"
