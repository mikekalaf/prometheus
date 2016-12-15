var prometheus = {
  environment: {
    screen: {}
  },
  init: function() {
    this.environment.mobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    this.environment.screen.height = $(window).height();
    this.environment.screen.width = $(window).width();
    $(window).on('resize', prometheus.adjustViewPort);
    $('.appMenuTrigger').on('click', prometheus.toggleMenu);
    $('#prometheusSplash').on('click', prometheus.removeSlashScreen);
    $('#appView').on('click', prometheus.closeMenu);

  },
  loadDefaultView: function() {
    $('#appContainer').addClass('magictime vanishIn');
    $('.appBackground').particleground({
        dotColor: '#333',
        lineColor: '#333'
    });
  },
  adjustViewPort: function() {
    prometheus.environment.screen.height = $(window).height();
    prometheus.environment.screen.width = $(window).width();
    if(prometheus.environment.mobile) {$('body').attr('id', 'mobile-app');} else {$('body').attr('id','desktop-app');}
  },
  removeSlashScreen: function() {
    $('#loader').fadeOut();
    setTimeout(function(){ $('#prometheusSplash').addClass('fadeOut'); }, 200);
    $(this).fadeOut('slow');
    setTimeout(function(){ prometheus.loadDefaultView(); }, 500);
  },
  toggleMenu: function() {
    $('#appMenu, #appContainer').toggleClass('open');
  },
  closeMenu: function() {
    $('#appMenu, #appContainer').removeClass('open');
  }
};

$(function() {
    FastClick.attach(document.body);
});

prometheus.init();
