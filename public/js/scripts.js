$(document).ready(function() {

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  STICKY NAV
    Nav scrolls to top and sticks
    When nav becomes fixed and leaves flow, #nav-buffer is displayed to fill the gap
    If window is resized, navOffset is reevaluated
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  var nav = $('#main-nav');
  var navOffset = nav.offset().top;
  // alert(navOffset);

  $(window).resize(function() {
    navOffset = nav.offset().top;
    // alert(navOffset);
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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  SCROLL TO STATE
    Click nav options to scroll to position of state
    setTimout function waits till state change before scrolling
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
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
  $('.small-logo, .login-nav, .my-info-nav').on('click', function() {
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



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PARALLAX EFFECTS
    Splash section
    Falling leaves and snowflakes
    Trees
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
   // var treeRoots = ($('#footer').offset().top + $('#footer').outerHeight(true)) -
  // $('.tree-right').css({'bottom': '-100%'});
 // var bottomOfPageOffset = $('#footer').offset().top + $('#footer').outerHeight(true);
// $('.tree-left').css({'bottom': '-' + 2 * bottomOfPageOffset + 'px'});


  $(window).scroll(function() {
    var winScroll = $(this).scrollTop();
    var navOffset = nav.offset().top;
    var bottomOfPageOffset = $('#footer').offset().top + $('#footer').outerHeight(true);
    // console.log(bottomOfPageOffset);
    var windowHeight = $(window).height();

    // SPLASH SECTION
    var splashOpacity = (navOffset - winScroll) / navOffset;
    // $('.splash-logo').css({'transform' :'translate(0px, ' + (winScroll) * 0.7 + '%)'});
    $('.splash-bg').css({'transform': 'translate(0px, ' + (winScroll) * 0.1 + '%)'});
    $('.splash-bg').css({'opacity': splashOpacity});
    $('.leaves-splash-bg').css({'transform': 'translate(0px, ' + (winScroll) / 10 + '%)'});

    // FALLING LEAVES AND SNOWFLAKES
    var leafFall = 'translate(0px, ' + (winScroll) * 1.1 + '%)';
    var leafSpin = 'rotate(-' + winScroll / 3 + 'deg)';
    var leaf = leafFall + ' ' + leafSpin;

    $('.leaf-one').css({'transform': 'translate(0px, ' + (winScroll) * 0.45 + '%)' + leafSpin});
    $('.leaf-two').css({'transform': leafFall + ' rotate(-' + winScroll / 5 + 'deg)'});
    $('.leaf-three').css({'transform': 'translate(0px, ' + (winScroll) * 1.4 + '%)' + leafSpin});

    $('.snowflake-one').css({'transform': 'translate(0px, ' + (winScroll) * 0.45 + '%)' + leafSpin});
    $('.snowflake-two').css({'transform': leafFall + ' rotate(-' + winScroll / 1.2 + 'deg)'});
    $('.snowflake-three').css({'transform': 'translate(0px, ' + (winScroll) * 0.65 + '%)' + leafSpin});

    // TREES
    $('.tree-left').css({'transform': 'translate(0px, ' + (winScroll) * -1.8 + 'px)'});
    $('.tree-right').css({'transform': 'translate(0px, ' + (winScroll) * -1.8 + 'px)'});
    $('.tree-left-back').css({'transform': 'translate(0px, ' + (winScroll) / -30 + '%)'});
    $('.tree-right-back').css({'transform': 'translate(0px, ' + (winScroll) / -30 + '%)'});
    $('.tree-deep').css({'transform': 'translate(0px, ' + (winScroll) / -40 + '%)'});

    // HILLS
    $('.hill-fg').css({'transform': 'translate(0px, ' + (winScroll) / -50 + '%)'});
    $('.hill-bg').css({'transform': 'translate(0px, ' + (winScroll) / -75 + '%)'});
    $('.hill-dbg').css({'transform': 'translate(0px, ' + (winScroll) / -95 + '%)'});


    // $('.hill').css({'transform': 'translate(0px, ' + (bottomOfPageOffset + winScroll) / -40 + '%)'});
    // $('.tree-center').css({'transform': 'translate(0px, ' + (bottomOfPageOffset + winScroll) / -30 + '%)'});
    // $('.tree-right').css({'transform' :'translate(0px, ' + (bottomOfPageOffset + winScroll) / -20 + 'vh)'});
    // $('.tree-left').css({'transform' :'translate(0px, ' + (bottomOfPageOffset + winScroll) / -20 + '%)'});


    // var doc = document.documentElement.clientHeight;
    // if (winScroll + doc >= bottomOfPageOffset) {
    //   $('.falling-leaf').css('display', 'none');
    // } else {
    //   $('.falling-leaf').css('display', 'block');
    // }


  });


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    OTHER SCRIPTS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // var gap = $('.rgs').offset().top;
  // $('.rgs').css('transform', 'translateY(-' + gap + 'px)');



});
