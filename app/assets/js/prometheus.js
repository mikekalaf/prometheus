var prometheus = {
  activeApp: 'startup',
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
    $('.appLink').on('click', prometheus.handleMenuClick);
    $('.app-overlay-close').on('click', prometheus.closeOverlay);
    $('.overlayLink').on('click', prometheus.openOverlay);
  },
  openOverlay: function() {
    prometheus.closeAllOverlays();
    var target = $(this).data('target');
    $('#'+target).removeClass('magictime vanishOut').css('opacity', '0');
    setTimeout(function(){
      $('#'+target).show();
      $('#'+target).addClass('magictime vanishIn');
      prometheus.adjustViewPort();
    }, 250);
  },
  closeOverlay: function() {
    var target = $(this).data('target');
    $('#'+target).addClass('magictime vanishOut');
    setTimeout(function(){$('#'+target).hide();}, 500);
    if (target == "skynetView") {
      $('.appLink').removeClass('active');
    }
  },
  closeAllOverlays: function() {
    $('.app-overlay-window').addClass('magictime vanishOut');
    setTimeout(function(){$('.app-overlay-window').hide();}, 100);
  },
  clearAppView: function() {
    setTimeout(function(){$('#appView').addClass('magictime vanishOut');}, 500);
  },
  showAppView: function() {
    setTimeout(function(){$('#appView').addClass('magictime vanishIn').removeClass('vanishOut');}, 500);
  },
  handleMenuClick: function() {
    var appLink = $(this).data('app');
    if (appLink == prometheus.activeApp) {
      prometheus.closeMenu();
    } else {
      $('.appLink').removeClass('active');
      $(this).addClass('active');
      prometheus.closeMenu();
      prometheus.clearAppView();
      prometheus.closeAllOverlays();
    }
  },
  loadDefaultView: function() {
    $('#appContainer').addClass('magictime vanishIn');
    $('.appBackground').particleground({
        dotColor: '#333',
        lineColor: '#333',
        density: 7500
    });
  },
  adjustViewPort: function() {
    prometheus.environment.screen.height = $(window).height();
    prometheus.environment.screen.width = $(window).width();
    if(prometheus.environment.mobile) {$('body').attr('id', 'mobile-app');} else {$('body').attr('id','desktop-app');}
    var skynetHeight = $('#skynetView').height();
    var skynetFrameHeight = skynetHeight - 64;
    $('#skynetView .app-overlay-body').css('height', skynetFrameHeight);
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
