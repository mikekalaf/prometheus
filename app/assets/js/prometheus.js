var prometheus = {
  environment: {
    screen: {}
  },
  init: function() {
    this.environment.mobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    this.environment.screen.height = $(window).height();
    this.environment.screen.width = $(window).width();
    $(window).on('resize', prometheus.adjustViewPort());
    $('#prometheusSplash').on('click', function() {
      $('#loader').fadeOut();
      setTimeout(function(){ $('#prometheusSplash').addClass('fadeOut'); }, 500);
    })
  },
  adjustViewPort: function() {
    this.environment.screen.height = $(window).height();
    this.environment.screen.width = $(window).width();
    if(this.environment.mobile) {$('body').attr('id', 'mobile-app');} else {$('body').attr('id','desktop-app');}
  }
};

prometheus.init();
