$(document).ready(function() {


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
STICKY NAV
  Nav scrolls to top and sticks
  When nav sticks and leaves flow, #nav-buffer is displayed to fill the gap
  If window is resized, navOffset is reevaluated
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  var nav = $('#main-nav');
  var navOffset = nav.offset().top;

  $(window).resize(function() {
    navOffset = nav.offset().top;
  });

  $(window).on('scroll', function() {
    if ($(window).scrollTop() >= navOffset) {
      nav.addClass('fixed-nav');
      nav.removeClass('scroll-nav');
      $('#nav-buffer').css('display', 'block');
    } else {
      nav.addClass('scroll-nav');
      nav.removeClass('fixed-nav');
      $('#nav-buffer').css('display', 'none');
    }
  });

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
SCROLL TO STATE
  Click nav options to scroll to position of state
  setTimout function waits till state change before scrolling
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  $.fn.scrollToStateContainer = function () {
      return this.each(function () {
          if ($(window).scrollTop() < navOffset) {
            $('html, body').animate({
                scrollTop: $(this).offset().top - 70
            }, 1000);
          } else {
            $('html, body').animate({
                scrollTop: $(this).offset().top - 70
            }, 1000);
          }
      });
  };
  $('.small-logo, .login-nav').on('click', function() {
    window.setTimeout(function() {
      $('#first').scrollToStateContainer();
    });
  });
  $('.products-nav, .cart-nav').on('click', function() {
    window.setTimeout(function() {
      $('#second').scrollToStateContainer();
    });
  });
  $('.process-nav, .about-nav').on('click', function() {
    window.setTimeout(function() {
      $('#third').scrollToStateContainer();
    });
  });
  $('.contact-nav').on('click', function() {
    window.setTimeout(function() {
      $('#fourth').scrollToStateContainer();
    });
  });



  $(window).scroll(function() {
    var winScroll = $(this).scrollTop();
    $('.splash-logo').css({'transform' :'translate(0px, ' + (winScroll) * 0.7 + '%)'});
    $('.layer1').css({'transform' :'translate(0px, ' + (winScroll - 2500) / 24 + '%)'});
    $('.layer4').css({'transform' :'translate(0px, ' + (winScroll - 2200) / 20 + '%)'});
    // $('.layer1').css({'transform' :'translate(0px, ' + winScroll / 80 + '%)'});
    $('.layer2').css({'transform' :'translate(0px, ' + (winScroll - 2250) / 30 + '%)'});
    $('.layer3').css({'transform' :'translate(0px, ' + (winScroll - 2250) / 30 + '%)'});
  });

  // $(window).scroll(function() {
  //   var winScroll = $(this).scrollTop();
  //   $('.vader').css({'transform': 'rotate(-' + winScroll / 40 + 'deg)'});
  //   $('.left-branch').css({'transform': 'translate(-' + winScroll / 80 + '%, 0px)'});
  //   $('.right-branch').css({'transform' :'translate(' + winScroll / 80 + '%, 0px)'});
  // });





});
