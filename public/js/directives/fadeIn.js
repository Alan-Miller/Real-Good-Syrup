angular.module('syrupApp')
.directive('fadeIn', function() {
  return {
    restrict: 'AE',
    link: function(scope, elem, attribute) {

      var elemOffset = elem.offset().top - 170;
      var elemOpacity = (Math.pow($(window).scrollTop(), 2) / Math.pow(elemOffset, 2));
      // alert(navOffset);

      $(window).resize(function() {
        elemOffset = elem.offset().top;
        elemOpacity = ($(window).scrollTop()) / elemOffset;
      });

      $(window).on('scroll', function() {
        // if ($(window).scrollTop() >= elem.offset().top - 400) {
          elemOpacity = (Math.pow($(window).scrollTop(), 12) / Math.pow(elemOffset, 12));
          // console.log('opacity', elemOpacity);
          elem.css({'opacity': elemOpacity});
        // } else elem.css({'opacity': 0});
      });


    }
  };
});
