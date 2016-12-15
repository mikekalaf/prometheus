var prometheus = {
  environment: {
    screen: {}
  },
  init: function() {
    this.environment.mobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    this.environment.screen.height = $(window).height();
    this.environment.screen.width = $(window).width();
    $(window).on('resize', prometheus.adjustViewPort());
  },
  loadDefaultView: function() {
    $('.appContainer').addClass('magictime vanishIn');
    $('.appContainer').particleground({
        dotColor: '#333',
        lineColor: '#333'
    });
  },
  adjustViewPort: function() {
    this.environment.screen.height = $(window).height();
    this.environment.screen.width = $(window).width();
    if(this.environment.mobile) {$('body').attr('id', 'mobile-app');} else {$('body').attr('id','desktop-app');}
    $('#prometheusSplash').on('click', prometheus.removeSlashScreen);
  },
  removeSlashScreen: function() {
    $('#loader').fadeOut();
    setTimeout(function(){ $('#prometheusSplash').addClass('fadeOut'); }, 200);
    $(this).fadeOut('slow');
    setTimeout(function(){ prometheus.loadDefaultView(); }, 500);
  }
};

prometheus.init();
