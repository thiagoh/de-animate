$(document).ready(function(){

  $(".button-collapse").sideNav();
  $('.scrollspy').scrollSpy();

  $('.collapsible').collapsible();

  var _tcos = function(elem, aClass, tam) {
    var _activeScroll = function(){
      $(window).scrollTop() > tam ? $(elem).addClass(aClass) : $(elem).removeClass(aClass);
    }
    $(window).on('scroll', function(){
      _activeScroll();
    });
    _activeScroll();
  };

  _tcos('header nav', 'is-active', 250);
  _tcos('ul.section', 'fixed', 440);

  //load animation flip random
  var animations = ['flipInX', 'flipInY', 'bounceIn', 'fadeInDown', 'fadeInUp', 'rotateIn', 'zoomInDown'];
  var chooseAnimation = animations[Math.floor((Math.random() * 7) + 0)]
  $('.current-animation').html(chooseAnimation);
  $('#card-example').deAnimate({
    trigger:  'click',
    classIn:  chooseAnimation,
    parallel: false
  });

  //load image parallax random
  var imgRandom = 'img/' + Math.floor((Math.random() * 6) + 1) + '.jpg';
  $('.parallax img').attr('src', imgRandom);
  $('.parallax').parallax();

  //load collapsible all expandible
  $('.collapsible-body').show();
  $('ul.collapsible li, ul.collapsible .collapsible-header').addClass('active');

  //animatons demo
  $('#card-1').deAnimate({
    trigger: 'click',
    classIn: 'flipInY',
    parallel: false
  });

  $('#card-2').deAnimate({
    trigger: 'click',
    classIn: 'flipInX',
    parallel: false
  });

  $('#card-3').deAnimate({
    trigger: 'click',
    classIn: 'rotateIn',
    parallel: false
  });
  $('#card-4').deAnimate({
    trigger: 'click',
    classIn: 'fadeIn',
    parallel: false
  });

  $('#card-5').deAnimate({
    trigger: 'click',
    classIn: 'fadeInDown',
    parallel: false
  });

  $('#card-6').deAnimate({
    trigger: 'click',
    classIn: 'fadeInDownBig',
    parallel: false
  });

  $('#card-7').deAnimate({
    trigger: 'click',
    classIn: 'fadeInLeft',
    parallel: false
  });

  $('#card-8').deAnimate({
    trigger: 'click',
    classIn: 'fadeInLeftBig',
    parallel: false
  });

  $('#card-9').deAnimate({
    trigger: 'click',
    classIn: 'fadeInRight',
    parallel: false
  });

  $('#card-10').deAnimate({
    trigger: 'click',
    classIn: 'fadeInRightBig',
    parallel: false
  });

  $('#card-11').deAnimate({
    trigger: 'click',
    classIn: 'fadeInUp',
    parallel: false
  });

  $('#card-12').deAnimate({
    trigger: 'click',
    classIn: 'fadeInUpBig',
    parallel: false
  });

  $('#card-13').deAnimate({
    trigger: 'click',
    classIn: 'zoomIn',
    parallel: false
  });

  $('#card-14').deAnimate({
    trigger: 'click',
    classIn: 'zoomInLeft',
    parallel: false
  });

  $('#card-15').deAnimate({
    trigger: 'click',
    classIn: 'zoomInRight',
    parallel: false
  });

  $('#card-16').deAnimate({
    trigger: 'click',
    classIn: 'zoomInDown',
    parallel: false
  });

  $('#card-17').deAnimate({
    trigger: 'click',
    classIn: 'zoomInUp',
    parallel: false
  });

  $('#card-18').deAnimate({
    trigger: 'click',
    classIn: 'bounceIn',
    parallel: false
  });

  $('#card-19').deAnimate({
    trigger: 'click',
    classIn: 'bounceInLeft',
    parallel: false
  });

  $('#card-20').deAnimate({
    trigger: 'click',
    classIn: 'bounceInRight',
    parallel: false
  });

  $('#card-21').deAnimate({
    trigger: 'click',
    classIn: 'bounceInDown',
    parallel: false
  });

  $('#card-22').deAnimate({
    trigger: 'click',
    classIn: 'bounceInUp',
    parallel: false
  });

  $('#card-23').deAnimate({
    trigger: 'click',
    classIn: 'lightSpeedIn',
    parallel: false
  });

  $('#card-24').deAnimate({
    trigger: 'click',
    classIn: 'rollIn',
    parallel: false
  });

});
