var prometheus = {
  activeApp: 'startup',
  overlayIn: 'magictime vanishIn',
  overlayOut: 'magictime vanishOut',
  gridData: [],
  environment: {
    screen: {}
  },
  init: function() {
    this.environment.mobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    this.environment.screen.height = $(window).height();
    this.environment.screen.width = $(window).width();
    prometheus.adjustViewPort();
    $(window).on('resize', prometheus.adjustViewPort);
    $('.appMenuTrigger').on('click', prometheus.toggleMenu);
    $('#prometheusSplash').on('click', prometheus.removeSlashScreen);
    $('#appView').on('click', prometheus.closeMenu);
    $('.appLink').on('click', prometheus.handleMenuClick);
    $('#prometheusWrapper').on('click', '.app-overlay-close', prometheus.closeOverlay);
    $('#prometheusWrapper').on('click', '.overlayLink', prometheus.openOverlay);
    $('#appView').on('click', '.grindrUser', prometheus.grindr.showUserProfile);
    $('#appContainer').scroll(prometheus.scrollHandler);
    $('#desktop-app #appContainer').on('mouseover', '.gridItem.loaded', prometheus.gridItemHover);
    $('#desktop-app #appContainer').on('mouseout', '.gridItem.loaded', prometheus.gridItemHoverOut);
  },
  loadData: function(dataUrl, dataCallback) {
    prometheus.showSpinner();
    $.ajax({
      type: "GET",
      timeout: 6000,
      url: dataUrl,
      error: function(data) {
        alert('Error:  Unable to retrieve data from source.');
        prometheus.hideSpinner();
      },
      success: function(data) {
        dataCallback(data);
      }
    });

  },
  displayAppViewData: function(htmlCode) {
    prometheus.showAppView();
    setTimeout(function(){
      $('#appView').html(htmlCode);
      prometheus.hideSpinner();
      prometheus.resizeGrid();
      setTimeout(function(){prometheus.scrollHandler();},1000);
      prometheus.runAjaxScripts();
    }, 500);
  },
  grindr: {
    launch: function() {
      prometheus.loadData('partials/sector1.php', prometheus.grindr.displayUserGrid);
    },
    displayUserGrid: function(data) {
      prometheus.gridData = [];
      prometheus.displayAppViewData(data);
    },
    showUserProfile: function() {
      var id = $(this).data('grid-id');
    }
  },
  jackd: {
    launch: function() {
    }
  },
  scruff: {
    launch: function() {
    }
  },
  junkcollector: {
    launch: function() {
    }
  },
  runAjaxScripts: function() {
    if ($("#appView #ajaxScript").length != 0) {
      eval($('#appView #ajaxScript'));
    }
  },
  showSpinner: function() {
    $('#ajaxLoader').fadeIn();
  },
  hideSpinner: function() {
    $('#ajaxLoader').fadeOut();
  },
  openOverlay: function() {
    prometheus.closeAllOverlays();
    var target = $(this).data('target');
    $('#'+target).removeClass(prometheus.overlayOut);
    setTimeout(function(){
      $('#'+target).show();
      $('#'+target).addClass(prometheus.overlayIn);
      prometheus.adjustViewPort();
    }, 250);
  },
  closeOverlay: function() {
    var target = $(this).data('target');
    $('#'+target).removeClass(prometheus.overlayIn);
    $('#'+target).addClass(prometheus.overlayOut);
    setTimeout(function(){$('#'+target).hide();}, 500);
    if (target == "skynetView") {
      $('.appLink').removeClass('active');
    }
  },
  closeAllOverlays: function() {
    $('.app-overlay-window').removeClass(prometheus.overlayIn);
    $('.app-overlay-window').addClass(prometheus.overlayOut);
    setTimeout(function(){$('.app-overlay-window').hide();}, 200);
  },
  clearAppView: function() {
    $('#appView').removeClass(prometheus.overlayIn);
    $('#appView').addClass(prometheus.overlayOut);
    setTimeout(function(){$('#appView').hide();}, 250);
  },
  showAppView: function() {
    $('#appView').removeClass(prometheus.overlayOut);
    setTimeout(function(){
      $('#appView').show();
      $('#appView').addClass(prometheus.overlayIn);
      prometheus.adjustViewPort();
    }, 500);
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
      if (appLink != "skynet") {
        prometheus[appLink].launch();
        prometheus.activeApp = appLink;
      } else {
        prometheus.activeApp = "skynet";
      }
    }
  },
  loadDefaultView: function() {
    $('#topBanner').fadeIn('slow');
    $('#appContainer').addClass(prometheus.overlayIn);
    $('.appBackground').particleground({
        dotColor: '#333',
        lineColor: '#333',
        density: 7500
    });
  },
  animateGridItem: function(el) {
    var delay = Math.random()*3000;
    $(el).addClass('animating');
    setTimeout(function() {$(el).addClass('loaded');}, delay);
  },
  slideInGrid: function() {
      var items = document.querySelectorAll('.gridItem');
      var totalDelay = (items.length *50);
      for ( var i=0; i < items.length; i++ ) {
        var moveGridItem = prometheus.getGridItem(items,i);
        var delay = (Math.floor(Math.random() * totalDelay) + 1) / 2;
        setTimeout(moveGridItem, delay);
      }
  },
  getGridItem: function(items, i) {
    var item = items[i];
     return function() {
       $(item).removeClass('grid-animation');
      }
  },
  getGridItemSize: function() {
    var columns, colWidth, marginSpace;
    if (prometheus.environment.screen.width > 768) {
      columns = 10;
    } else {
      columns = 5;
    }
    marginSpace = 0;
    colWidth = Math.floor((prometheus.environment.screen.width - marginSpace) / columns);
    return colWidth;
  },
  resizeGrid: function() {
    var colWidth = prometheus.getGridItemSize();
    $('.gridItem').css('width', colWidth);
    $('.gridItem').css('height', colWidth);
    prometheus.scrollHandler();
  },
  gridItemHover: function() {
    $(this).animate({  textIndent: 1.25 }, {
        step: function(now,fx) {
          $(this).css('transform','scale('+now+')');
          $(this).css('z-index', '500');
          $(this).css('box-shadow', '0px 1px 10px 1px #242424');
        },
        duration:0
    },'linear');
  },
  gridItemHoverOut: function() {
    $(this).animate({  textIndent: 1 }, {
        step: function(now,fx) {
          $(this).css('transform','scale('+now+')');
          $(this).css('z-index', 'auto');
          $(this).css('box-shadow', 'none');
        },
        duration:0
    },'linear');
  },
  adjustViewPort: function() {
    prometheus.environment.screen.height = $(window).height();
    prometheus.environment.screen.width = $(window).width();
    if(prometheus.environment.mobile) {$('body').attr('id', 'mobile-app');} else {$('body').attr('id','desktop-app');}
    if(prometheus.environment.screen.width < 768) {
      $('body').addClass('mobile-view');
    } else {
      $('body').removeClass('mobile-view');
    }
    prometheus.resizeGrid();
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
    $('#appMenu, #appContainer, #topBanner').toggleClass('open');
  },
  closeMenu: function() {
    $('#appMenu, #appContainer, #topBanner').removeClass('open');
  },
  isScrolledIntoView: function(elem) {
    var containerScroll = document.getElementById('appContainer').scrollTop;
    var containerView = $('#appContainer').height();
    var viewableArea = containerScroll + containerView;
    var elementTop = $(elem).position().top;
    var elementBottom = elementTop + ($(elem).height() / 2);
    var viewable = ((elementBottom <= viewableArea) && (elementTop >= containerScroll));
    return viewable;
  },
  scrollHandler: function () {
    $('.gridItem:not(.loaded)').each(function () {
      if (prometheus.isScrolledIntoView(this) === true) {
        prometheus.animateGridItem(this);
      }
    });
  }
};

$(function() {
    FastClick.attach(document.body);
});

prometheus.init();
