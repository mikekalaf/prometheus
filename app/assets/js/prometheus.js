var geoOptions = {
 enableHighAccuracy: true,
 timeout: 20000,
 maximumAge: 0
};

if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(cerebroScan, showError, geoOptions);
 }

var prometheus = {
  activeApp: 'startup',
  overlayIn: 'magictime vanishIn',
  overlayOut: 'magictime vanishOut',
  gridData: [],
  userMap: [],
  mapMarkers: [],
  activeItem: 'none',
  profileContainer: 'none',

  cerebro: {
    activeProfile: 'none'
  },
  testImages: [
    'http://67.media.tumblr.com/839b70392b1db50dfa79e96f0b6abf5a/tumblr_nkjak81tF51u845p1o1_1280.jpg',
    'http://www.wallpaperup.com/uploads/wallpapers/2013/12/23/203584/big_thumb_cbdf852aa89a5109d8cc404108c5152a.jpg',
    'http://www.themarysue.com/wp-content/uploads/2015/07/Jean_Grey_Phoenix.jpg',
    'http://www.themarysue.com/wp-content/uploads/2015/07/Jean_Grey_Phoenix.jpg'
  ],
  testVideos: [
    'https://www.youtube.com/embed/FN16QhUxV1I',
    'https://www.youtube.com/embed/DRFX6PEVsDw',
    'https://www.youtube.com/embed/4U2B0qZxmQI',
    'https://www.youtube.com/embed/zMK_X6GxYQo',
    'https://www.youtube.com/embed/ru-xwKDF5w4'
  ],
  environment: {
    screen: {}
  },
  getTestImage: function() {
    var randImage = prometheus.testImages[Math.floor(Math.random() * prometheus.testImages.length)];
    return randImage;
  },
  getTestVideo: function() {
    var randVideo = prometheus.testVideos[Math.floor(Math.random() * prometheus.testVideos.length)];
    return randVideo;
  },
  init: function() {
    this.environment.mobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    this.environment.screen.height = $(window).height();
    this.environment.screen.width = $(window).width();
    prometheus.adjustViewPort();
    $(window).on('resize', prometheus.adjustViewPort);
    $('.appMenuTrigger').on('click', prometheus.toggleMenu);
    $('.appSearchTrigger').on('click', prometheus.showSearch);
    $('#appView').on('click', prometheus.closeMenu);
    $('.appLink').on('click', prometheus.handleMenuClick);
    $('#prometheusWrapper').on('click', '.app-overlay-close', prometheus.closeOverlay);
    $('#prometheusWrapper').on('click', '.overlayLink', prometheus.openOverlay);
    $('#appView').on('click', '.grindrUser', prometheus.initUserProfile);
    $('#appView').on('click', '.jackdUser', prometheus.initUserProfile);
    $('#appView').on('click', '.scruffUser', prometheus.initUserProfile);
    $('#appView').on('click', '.junkMedia', prometheus.junkcollector.showMedia);
    $('#appContainer').scroll(prometheus.scrollHandler);
    $('#desktop-app #appContainer').on('mouseover', '.gridItem.loaded', prometheus.gridItemHover);
    $('#desktop-app #appContainer').on('mouseout', '.gridItem.loaded', prometheus.gridItemHoverOut);
    $('#appView').on('click', '.navTrigger', prometheus.handleNavTrigger);
    $('#appView').on('click', '#appSearchSubmit', prometheus.buildSearch);
    $('#junkMedia').on('click', '.navPrev', prometheus.junkcollector.gallerySwap);
    $('#junkMedia').on('click', '.navNext', prometheus.junkcollector.gallerySwap);
    $('#prometheusWrapper').on('click', '.loadNextPage', prometheus.loadNextPage);
    $('#prometheusWrapper').on('click', '.loadPrevPage', prometheus.loadPrevPage);
    $('#prometheusWrapper').on('click', '.adminToggle', prometheus.toggleAdmin);
    $('#prometheusWrapper').on('click', '.addFavorite', prometheus.addFavorite);
    $('#prometheusWrapper').on('click', '.removeFavorite', prometheus.removeFavorite);
    $('#prometheusWrapper').on('click', '.deleteItem', prometheus.deleteItem);
    $('#prometheusWrapper .userItem').on('click', '.navPrev, .navNext', prometheus.userSwap);
    $('#prometheusWrapper .userItem').on('click', '.loadNextPage', prometheus.loadNextPage);
    $('#prometheusWrapper .userItem').on('click', '.loadPrevPage', prometheus.loadNextPage);
    $('#prometheusWrapper .userItem').on('click', '.infoTabTrigger', prometheus.loadInfoTab);
    $('#prometheusWrapper .userItem').on('click', '.userPhotoTrigger', prometheus.swapUserPhoto);
    $('#prometheusWrapper').on('click', '.skynetTab', prometheus.loadSkynetTab);
    $('#prometheusWrapper').on('click', '.cerebroProfile', prometheus.loadUserProfile);
    $('#prometheusWrapper').on('click', '.cerebroNavPrev, .cerebroNavNext', prometheus.cerebroSwap);
    $('#prometheusWrapper').on('click', '.mapPhoto', prometheus.loadMapProfile);
    $('#prometheusWrapper').on('click', '.cerebro-thumb', prometheus.swapCerebroPhoto);
    $('#prometheusWrapper').on('click', '.favoriteToggle', prometheus.toggleFavorite);
    $('#prometheusWrapper').on('click', '#searchButton', prometheus.cerebroSearch);
  },
  router: function() {
    var hash = window.location.hash;
    hash = hash.replace('#', '');
    var sectorUrl;
    var locationParams = hash.split("/");
    var appPrefix = locationParams[0]+"-"+locationParams[1];
    var sectorPrefix = locationParams[0];
    switch(appPrefix) {
      case "cerebro-index":
        $('#app-cerebro').click();
        break;
      case "cerebro-map":
        $('#app-map').click();
        break;
      case "shield-sector1":
        $('#app-sector1').click();
        break;
      case "shield-sector2":
        $('#app-sector2').click();
        break;
      case "shield-sector3":
        $('#app-sector3').click();
        break;
      case "junk-index":
        $('#app-junk').click();
        break;
    }
    switch(sectorPrefix) {
      case "grindr":
        sectorUrl = "partials/cerebro/grindr.php?id="+locationParams[1];
        prometheus.loadProfileFromHash(sectorUrl);
        break;
      case "jackd":
        sectorUrl = "partials/cerebro/jackd.php?id="+locationParams[1];
        prometheus.loadProfileFromHash(sectorUrl);
        break;
      case "scruff":
        sectorUrl = "partials/cerebro/scruff.php?id="+locationParams[1];
        prometheus.loadProfileFromHash(sectorUrl);
        break;
    }

  },
  navigate: function(path) {
    var current = window.location.href;
    window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
  },
  cerebroSearch: function() {
    var searchQuery = $('#searchQuery').val();
    if(searchQuery != '' && searchQuery != undefined) {
      prometheus.clearAppView();
      prometheus.closeAllOverlays();
      prometheus.loadData('partials/skynet.php?search='+searchQuery, prometheus.cerebroSearchResponse);
    }
  },
  cerebroSearchResponse: function(data) {
    prometheus.displayAppViewData(data);
    setTimeout(function(){
      $('#skynetGrindr').click();
    },1000);
  },
  toggleFavorite: function() {
    var url = $(this).data('url');
    $('.favoriteToggle').toggleClass('active');
    prometheus.remotePing(url);
  },
  cerebroSwap: function() {
    event.stopPropagation();
    if (!$(this).hasClass("loadNextPage") && !$(this).hasClass("loadPrevPage")) {
      var swap = $(this).data('swap');
      var animation, targetId, next, prev;
      var activeProfile = prometheus.cerebro.activeProfile;
      var el = '#'+activeProfile;
      var prefix = $(el).data('prefix');
      next = $(el).data('next');
      prev = $(el).data('prev');
      if (swap == "prev") {
        animation = "magictime slideRight";
        targetId = prev;
      }
      if (swap == "next") {
        animation = "magictime slideLeft";
        targetId = next;
      }
      var e = '';
      if (targetId != '' && targetId != undefined) {
        $('#cerebroProfile .profileNav').hide();
        $('#ajaxContainer').addClass(animation);
        setTimeout(function(){
          $('#ajaxContainer').hide();
          $('#ajaxContainer').removeClass(animation);
          prometheus.loadUserProfile(e, targetId);
        },500);
      }
    }
  },
  cdnFetch: function() {
    $('.fetchcdn').each(function () {
      var id = $(this).data('cdn');
      var total = $('.fetchcdn').size();
      var delay = Math.random()*60000;
      setTimeout(function() {
        var url = "https://cdn.chasingthedrift.com/sector2download.php?id="+id;
        prometheus.remotePing(url);
      },delay);
    });
  },
  loadUserProfile: function(e, target) {
    if (target) {
      var targetId = target;
      var url = $('#'+target).data('url');
    } else {
      var url = $(this).data('url');
      var targetId = $(this).attr('id');
    }

    var router = targetId.split("-");
    var routerHash = router[0]+'/'+router[1];
    prometheus.navigate(routerHash);

    var el = '#'+targetId;
    var prev = $(el).data('prev');
    var next = $(el).data('next');
    var loadNextPage = $(el).data('loadnextpage');
    var loadPrevPage = $(el).data('loadprevpage');
    prometheus.cerebro.activeProfile = targetId;

    if (prev == undefined) {
      $('.cerebroNavPrev').hide();
    } else {
      $('.cerebroNavPrev').show();
    }
    if (next == undefined) {
      $('.cerebroNavNext').hide();
    } else {
      $('.cerebroNavNext').show();
    }
    if(loadNextPage == 'Yes') {
      $('.cerebroNavNext').addClass('loadNextPage').show();
    } else {
      $('.cerebroNavNext').removeClass('loadNextPage');
    }
    if(loadPrevPage == 'Yes') {
      $('.cerebroNavPrev').addClass('loadPrevPage').show();
    } else {
      $('.cerebroNavPrev').removeClass('loadPrevPage');
    }

    $('#ajaxContainer').html('');
    $('#ajaxContainer').fadeOut();
    $('#cerebroProfile .profileNav').hide();
    prometheus.showOverlaySpinner();
    $.ajax({
      type: "GET",
      timeout: 6000,
      url: url,
      error: function(data) {
        console.log('Error:  Unable to retrieve data from source.');
        prometheus.hideOverlaySpinner();
        prometheus.closeAllOverlays();
      },
      success: function(data) {
        prometheus.hideOverlaySpinner();
        $('#ajaxContainer').html(data);
        setTimeout(function() {
          $('.userPhoto img').fadeTo('slow',1);
          $('#ajaxContainer').fadeIn('slow');
          $('#cerebroProfile .profileNav').fadeIn();
          prometheus.adjustInfoTabs();
          prometheus.adjustOverlay();
          prometheus.filterPhotos();
        },500);
      }
    });
  },
  filterPhotos: function() {
    var seen = {};
    $('.cerebro-thumb').each(function() {
        var txt = $(this).data('image');
        if (seen[txt])
            $(this).remove();
        else
            seen[txt] = true;
    });
  },
  loadProfileFromHash: function(url) {
    prometheus.hideSearch();
    prometheus.closeAllOverlays();
    var target = "cerebroProfile";
    $('#'+target).removeClass(prometheus.overlayOut);
    setTimeout(function(){
      $('#'+target).show();
      $('#'+target).addClass(prometheus.overlayIn);
      prometheus.adjustViewPort();
    }, 250);
    $('#ajaxContainer').html('');
    $('#ajaxContainer').fadeOut();
    $('#cerebroProfile .profileNav').hide();
    prometheus.showOverlaySpinner();
    $.ajax({
      type: "GET",
      timeout: 6000,
      url: url,
      error: function(data) {
        console.log('Error:  Unable to retrieve data from source.');
        prometheus.hideOverlaySpinner();
        prometheus.closeAllOverlays();
      },
      success: function(data) {
        prometheus.hideOverlaySpinner();
        $('#ajaxContainer').html(data);
        setTimeout(function() {
          $('.userPhoto img').fadeTo('slow',1);
          $('#ajaxContainer').fadeIn('slow');
          prometheus.adjustInfoTabs();
          prometheus.adjustOverlay();
          prometheus.filterPhotos();
        },500);
      }
    });
  },
  loadMapProfile: function() {
    var url = $(this).data('url');
    $('#ajaxContainer').html('');
    $('#ajaxContainer').fadeOut();
    $('#cerebroProfile .profileNav').hide();
    prometheus.showOverlaySpinner();
    $.ajax({
      type: "GET",
      timeout: 6000,
      url: url,
      error: function(data) {
        console.log('Error:  Unable to retrieve data from source.');
        prometheus.hideOverlaySpinner();
        prometheus.closeAllOverlays();
      },
      success: function(data) {
        prometheus.hideOverlaySpinner();
        $('#ajaxContainer').html(data);
        setTimeout(function() {
          $('.userPhoto img').fadeTo('slow',1);
          $('#ajaxContainer').fadeIn('slow');
          prometheus.adjustInfoTabs();
          prometheus.adjustOverlay();
          prometheus.filterPhotos();
        },500);
      }
    });
  },
  swapCerebroPhoto: function() {
    var newImage = $(this).data('image');
    var animationOut = "magictime vanishOut";
    var animationIn = "magicTime vanishIn";
    $('.userPhotoWrapper img').addClass(animationOut);
    setTimeout(function(){
      $('.userPhotoWrapper img').attr('src', newImage);
      $('.userPhotoWrapper img').removeClass(animationOut);
      $('.userPhotoWrapper img').css('opacity', 0);
    },400);
    setTimeout(function(){
      $('.userPhotoWrapper img').fadeTo('slow',1);
    },800);
  },
  swapUserPhoto: function() {
    var newImage = $(this).data('fullsize');
    var container = prometheus.profileContainer;
    var animationOut = "magictime vanishOut";
    var animationIn = "magicTime vanishIn";
    $(container+'.userPhotoWrapper img').addClass(animationOut);
    setTimeout(function(){
      $(container+'.userPhotoWrapper img').attr('src', newImage);
      $(container+'.userPhotoWrapper img').removeClass(animationOut);
      $(container+'.userPhotoWrapper img').css('opacity', 0);
    },400);
    setTimeout(function(){
      $(container+'.userPhotoWrapper img').fadeTo('slow',1);
    },800);
  },
  loadInfoTab:function() {
    var tab = $(this).data('target');
    $('.infoTabTrigger').removeClass('active');
    $(this).addClass('active');
    $('.infoTab').removeClass('active');
    $('.'+tab).addClass('active');
    prometheus.adjustInfoTabs();
  },
  loadSkynetTab: function () {
    var tab = $(this).data('target');
    $('.skynetTab').removeClass('active');
    $(this).addClass('active');
    $('.skynetTabContainer').removeClass('active');
    $('#'+tab).addClass('active');
    $('#'+tab+' .gridInit').addClass('gridItem');
    setTimeout(function(){
      prometheus.adjustViewPort();
    },500)
  },
  initUserProfile: function() {
    var protocolId = $(this).attr('id');
    prometheus.setupProfileWindow(protocolId);
  },
  userSwap: function(event) {
    event.stopPropagation();
    if (!$(this).hasClass("loadNextPage") && !$(this).hasClass("loadPrevPage")) {
      var swap = $(this).data('swap');
      var animation;
      var target = $(this).attr('data-target');
      var container = prometheus.profileContainer;
      if (swap == "prev") { animation = "magictime slideRight"; }
      if (swap == "next") { animation = "magictime slideLeft"; }
      $(container+'.userPhotoWrapper, '+container+'.userInfoWrapper').addClass(animation);
      prometheus.setupProfileWindow(target);
      setTimeout(function(){
        $(container+'.userPhotoWrapper, '+container+'.userInfoWrapper').hide();
        $(container+'.userPhotoWrapper, '+container+'.userInfoWrapper').removeClass(animation);
      },500);
    }
  },
  setupProfileWindow: function(id) {
    var el = '#'+id;
    var prev = $(el).data('prev');
    var next = $(el).data('next');
    var prevType = $(el).data('prevtype');
    var nextType = $(el).data('nexttype');
    var loadNextPage = $(el).data('loadnextpage');
    var loadPrevPage = $(el).data('loadprevpage');
    var favorite = $(el).data('favorite');
    var container = prometheus.profileContainer;
    prometheus.activeItem = id;
    $('.adminContainer').fadeOut();
    $(container+'.navPrev').attr('data-target', prev);
    $(container+'.navNext').attr('data-target', next);
    $(container+'.navPrev').attr('data-type', prevType);
    $(container+'.navNext').attr('data-type', nextType);

    if(favorite == 'Yes') {
      $(container+'.adminButton.addFavorite').hide();
      $(container+'.adminButton.removeFavorite').show();
    } else {
      $(container+'.adminButton.addFavorite').show();
      $(container+'.adminButton.removeFavorite').hide();
    }
    if (prev == undefined) {
      $(container+'.navPrev').hide();
    } else {
      $(container+'.navPrev').show();
    }
    if (next == undefined) {
      $(container+'.navNext').hide();
    } else {
      $(container+'.navNext').show();
    }
    if(loadNextPage == 'Yes') {
      $(container+'.navNext').addClass('loadNextPage').show();
    } else {
      $(container+'.navNext').removeClass('loadNextPage');
    }
    if(loadPrevPage == 'Yes') {
      $(container+'.navPrev').addClass('loadPrevPage').show();
    } else {
      $(container+'.navPrev').removeClass('loadPrevPage');
    }

    setTimeout(function(){
      $(container+'.userPhotoStream').html('');
      $(container+'.userData').html('');
      $(container+'.userPhoto img').attr('src', '');
      prometheus[prometheus.activeApp].showUserProfile();
    },600);
    setTimeout(function(){
      $(container+'.userPhotoWrapper, '+container+'.userInfoWrapper').fadeIn();
    },750);
    setTimeout(function(){
      prometheus.adjustInfoTabs();
    },800);
    setTimeout(function(){
      prometheus.adjustInfoTabs();
    },1200);
  },
  deleteItem: function() {
    var confirmDelete = confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      prometheus.closeAllOverlays();
      $('#'+prometheus.activeItem).fadeOut();
      var thisApp = $(this).data('app');
      prometheus[thisApp].deleteItem();
    }
  },
  addFavorite: function() {
    $('.addFavorite').hide();
    $('.removeFavorite').show();
    var thisApp = $(this).data('app');
    prometheus[thisApp].addFavorite();
  },
  removeFavorite: function() {
    $('.addFavorite').show();
    $('.removeFavorite').hide();
    var thisApp = $(this).data('app');
    prometheus[thisApp].removeFavorite();
  },
  toggleAdmin: function(event) {
    event.stopPropagation();
    $('.adminContainer').fadeToggle();
  },
  buildSearch: function() {
    var pageBase = $(this).data('url');
    var searchString = "";
    $('.searchParam').each(function(){
      var param = $(this).data('param');
      var paramValue = $(this).val();
      searchString += '&'+param+'='+paramValue;
    });
    var searchUrl = "partials/"+pageBase+"?p=1"+searchString;
    var thisApp = prometheus.activeApp;
    $('#appSearch').fadeOut();
    prometheus.fadeOutGrid();
    prometheus.navigate("shield/"+pageBase+"/search/"+searchString);
    setTimeout(function(){
      prometheus.loadData(searchUrl, prometheus[thisApp].displayUserGrid);
    },1000);
  },
  remotePing: function(url) {
    $.ajax({
      type: "GET",
      timeout: 20000,
      url: url,
      error: function(data) {
        console.log('Unable to retrieve data from source: '+url);
      },
      success: function(data) {
      }
    });
  },
  loadData: function(dataUrl, dataCallback) {
    prometheus.showSpinner();
    $.ajax({
      type: "GET",
      timeout: 10000,
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
  getLocationList: function(id) {

  },
  getPhotoList: function(sector, id) {
    var dataUrl = "https://api.chasingthedrift.com/shield/x-gene/"+sector+"/photos?protocol_id="+id;
    $.ajax({
      type: "GET",
      timeout: 6000,
      url: dataUrl,
      dataType: 'json',
      jsonp: false,
      error: function(data) {
        alert('Error:  Unable to retrieve data from source.');
      },
      success: function(data) {
        prometheus.buildPhotoList(data.data);
      }
    });
  },
  buildPhotoList: function(list) {
    if(list.length > 0) {
      for (var i = 0; i < list.length; i++) {
        var fullsize = list[i].photo_url;
        var thumbnail = fullsize.replace('profile/1024x1024','thumb/320x320');
        prometheus.addUserPhoto(thumbnail,fullsize);
      }
    }
  },
  addUserPhoto: function(thumbnail, fullsize) {
    var container = prometheus.profileContainer;
    var $userPhoto = $("<div>",{"class": "userPhotoTrigger"});
    $userPhoto.attr('data-fullsize', fullsize);
    $userPhoto.css('background-image', 'url('+thumbnail+')');
    $(container+'.userPhotoStream').append($userPhoto);
    $userPhoto.fadeTo("slow",1);
    prometheus.adjustInfoTabs();
  },
  displayUserInfo: function(header, content) {
    var container = prometheus.profileContainer;
    if (content !='' && content != undefined) {
      var $userInfo = $("<div>",{"class": "userInfo"});
      $userInfo.append("<div class='userInfoHeader'>"+header+"</div>");
      $userInfo.append("<div class='userInfoContent'>"+content+"</div>");
      $(container+'.userProfileInfo').append($userInfo);
    }
  },
  displayAppViewData: function(htmlCode) {
    prometheus.showAppView();
    setTimeout(function(){
      $('#appView').html(htmlCode);
      prometheus.hideSpinner();
      prometheus.adjustViewPort();
      prometheus.resizeGrid();
      setTimeout(function(){prometheus.scrollHandler();},1000);
        prometheus.runAjaxScripts();
        prometheus.adjustViewPort();
        if(prometheus.activeApp == "jackd") {
          //prometheus.cdnFetch();
        }
      }, 500);
  },
  loadNextPage: function() {
    event.stopPropagation();
    prometheus.closeAllOverlays();
    $('.navNextPage').click();
  },
  loadPrevPage: function() {
    event.stopPropagation();
    prometheus.closeAllOverlays();
    $('.navPrevPage').click();
  },
  cerebromap: {
    launch: function() {
      prometheus.loadData('partials/map.php', prometheus.cerebromap.displayUserMap);
      prometheus.navigate('cerebro/map');
    },
    displayUserMap: function(data) {
      prometheus.mapData = [];
      prometheus.displayAppViewData(data);
    },
    drawBeacon: function(i) {
      return function() {
        var activeBeacon = prometheus.userMap[i];
        var marker = new google.maps.Marker({
             position: {lat: parseFloat(activeBeacon.lat),lng: parseFloat(activeBeacon.lon)},
             map: prometheus.googlemap
         });
         var photo = activeBeacon.thumbnail;
         var about = activeBeacon.about;
         var age = activeBeacon.age;
         var name = activeBeacon.display_name;
         var lat = parseFloat(activeBeacon.lat).toFixed(4);
         var lon = parseFloat(activeBeacon.lon).toFixed(4);
         var gps = lat+", "+lon;
         var url = activeBeacon.url;
         var content = "<div class='infoWindow'><div class='mapInfoWrapper'><div class='mapPhoto overlayLink' data-target='cerebroProfile' data-url='"+url+"'><img src='"+photo+"' /></div><div class='mapInfo'><div class='mapTitle'>"+name+"</div><div class='mapHeader'>Age</div><div class='mapData'>"+age+"</div><div class='mapHeader'>About Me</div><div class='mapData'>"+about+"</div><div class='mapHeader'>GPS Coordinates</div><div class='mapData'>"+gps+"</div><div class='mapHeader'>Timestamp</div><div class='mapData'>"+activeBeacon.trackingDate+"</div></div></div></div>";
         var infowindow = new google.maps.InfoWindow();

         google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
             return function() {
                 infowindow.setContent(content);
                 infowindow.open(prometheus.googlemap, marker);
             };
         })(marker,content,infowindow));

         prometheus.mapMarkers.push(marker);
      }
    },
    displayMapBeacons: function() {
      setTimeout(function() {
        var beaconArray = prometheus.userMap;
        for (var i = 0; i < beaconArray.length; i++) {
          var beacon = prometheus.cerebromap.drawBeacon(i);
          setTimeout(beacon, 0);
        }
      },1500);
      // setTimeout(function() {
      //   var markerCluster = new MarkerClusterer(prometheus.googlemap, prometheus.mapMarkers,{imagePath: 'assets/img/m/m'});
      // },2000);
    }
  },
  skynet: {
    launch:function() {
      var lat = prometheus.cerebro.lat;
      var long = prometheus.cerebro.long;
      prometheus.loadData('partials/skynet.php?lat='+lat+'&long='+long, prometheus.skynet.displayUserGrid);
      prometheus.navigate('cerebro/index');
    },
    displayUserGrid: function(data) {
      prometheus.gridData = [];
      prometheus.displayAppViewData(data);
      setTimeout(function(){
        $('#skynetGrindr').click();
      },1000);
    }
  },
  grindr: {
    launch: function() {
      prometheus.loadData('partials/sector1.php', prometheus.grindr.displayUserGrid);
      prometheus.navigate('shield/sector1');
    },
    displayUserGrid: function(data) {
      prometheus.gridData = [];
      prometheus.displayAppViewData(data);
    },
    showUserProfile: function() {
      var container = prometheus.profileContainer;
      var activeId = prometheus.activeItem;
      var dataSource = $('#'+activeId).data('grid-id');
      var userPhoto = prometheus.gridData[dataSource].profile_photo;
      var userThumbnail = prometheus.gridData[dataSource].thumbnail;
      var userData = prometheus.gridData[dataSource];
      //Set Username
      if (userData.display_name != '') {
        $(container+'.app-overlay-title').html(userData.display_name);
      } else {
        $(container+'.app-overlay-title').html('Sector 1 User');
      }
      if (window.location.hostname == "localhost") {
        userPhoto = prometheus.getTestImage();
      }
      $(container+'.userPhoto img').attr('src', userPhoto);
      $(container+'.infoTabTrigger.default').click();
      prometheus.addUserPhoto(userThumbnail, userPhoto);
      prometheus.getPhotoList('sector1', activeId);
      prometheus.displayUserInfo('Age', userData.age);
      prometheus.displayUserInfo('About Me', userData.about_me);
      prometheus.displayUserInfo('Last Updated', userData.date_modified);
    },
    addFavorite: function() {
      var url = "https://api.chasingthedrift.com/shield/x-gene/sector1/favorite?protocol_id="+prometheus.activeItem+"&action=Yes";
      prometheus.remotePing(url);
      $('#'+prometheus.activeItem).data('favorite', 'Yes');
    },
    removeFavorite: function() {
      var url = "https://api.chasingthedrift.com/shield/x-gene/sector1/favorite?protocol_id="+prometheus.activeItem+"&action=No";
      prometheus.remotePing(url);
      $('#'+prometheus.activeItem).data('favorite', 'No');
    },
    deleteItem: function() {

    }
  },
  jackd: {
    launch: function() {
      prometheus.loadData('partials/sector2.php', prometheus.jackd.displayUserGrid);
      prometheus.navigate('shield/sector2');
    },
    displayUserGrid: function(data) {
      prometheus.gridData = [];
      prometheus.displayAppViewData(data);
    },
    showUserProfile: function() {
      var container = prometheus.profileContainer;
      var activeId = prometheus.activeItem;
      var dataSource = $('#'+activeId).data('grid-id');
      var userPhoto = prometheus.gridData[dataSource].profile_photo;
      var userThumbnail = prometheus.gridData[dataSource].thumbnail;
      var userData = prometheus.gridData[dataSource];
      var photoArray = ['photo1','photo2','photo3','photo4','photo5'];
      if (window.location.hostname == "localhost") {
        userPhoto = prometheus.getTestImage();
      }
      //Set Username
      if (userData.first_name != '' || userData.last_name != '') {
        $(container+'.app-overlay-title').html(userData.first_name+' '+userData.last_name);
      } else {
        $(container+'.app-overlay-title').html('Sector 3 User');
      }
      $(container+'.userPhoto img').attr('src', userPhoto);
      $(container+'.infoTabTrigger.default').click();
      for (var i = 0; i < photoArray.length; i++) {
        if(userData[photoArray[i]] != '') {
          var thisThumb = userData[photoArray[i]];
          var thisPhoto = thisThumb;
          thisThumb += 's';
          prometheus.addUserPhoto(thisThumb, thisPhoto);
        }
      }
      prometheus.displayUserInfo('Age', userData.age);
      prometheus.displayUserInfo('Location', userData.location);
      prometheus.displayUserInfo('About Me', userData.profile_text);
      prometheus.displayUserInfo('Interests', userData.interests);
      prometheus.displayUserInfo('Activities', userData.activities);
      prometheus.displayUserInfo('Movies', userData.movies);
      prometheus.displayUserInfo('Last Updated', userData.date_modified);
    },
    addFavorite: function() {
      var url = "https://api.chasingthedrift.com/shield/x-gene/sector2/favorite?protocol_id="+prometheus.activeItem+"&action=Yes";
      prometheus.remotePing(url);
      $('#'+prometheus.activeItem).data('favorite', 'Yes');
    },
    removeFavorite: function() {
      var url = "https://api.chasingthedrift.com/shield/x-gene/sector2/favorite?protocol_id="+prometheus.activeItem+"&action=No";
      prometheus.remotePing(url);
      $('#'+prometheus.activeItem).data('favorite', 'No');
    },
    deleteItem: function() {

    }
  },
  scruff: {
    launch: function() {
      prometheus.loadData('partials/sector3.php', prometheus.scruff.displayUserGrid);
      prometheus.navigate('shield/sector3');
    },
    displayUserGrid: function(data) {
      prometheus.gridData = [];
      prometheus.displayAppViewData(data);
    },
    showUserProfile: function() {
      var container = prometheus.profileContainer;
      var activeId = prometheus.activeItem;
      var dataSource = $('#'+activeId).data('grid-id');
      var userPhoto = prometheus.gridData[dataSource].profile_photo;
      var userThumbnail = prometheus.gridData[dataSource].thumbnail;
      var userData = prometheus.gridData[dataSource];
      if (window.location.hostname == "localhost") {
        userPhoto = prometheus.getTestImage();
      }
      //Set Username
      if (userData.display_name != '') {
        $(container+'.app-overlay-title').html(userData.display_name);
      } else {
        $(container+'.app-overlay-title').html('Sector 2 User');
      }
      $(container+'.userPhoto img').attr('src', userPhoto);
      $(container+'.infoTabTrigger.default').click();
      prometheus.addUserPhoto(userThumbnail, userPhoto);
      prometheus.getPhotoList('sector1', activeId);
      prometheus.displayUserInfo('Age', userData.age);
      prometheus.displayUserInfo('About Me', userData.about_me);
      prometheus.displayUserInfo('Ideal Match', userData.ideal);
      prometheus.displayUserInfo('Last Updated', userData.date_modified);
    },
    addFavorite: function() {
      var url = "https://api.chasingthedrift.com/shield/x-gene/sector3/favorite?protocol_id="+prometheus.activeItem+"&action=Yes";
      prometheus.remotePing(url);
      $('#'+prometheus.activeItem).data('favorite', 'Yes');
    },
    removeFavorite: function() {
      var url = "https://api.chasingthedrift.com/shield/x-gene/sector3/favorite?protocol_id="+prometheus.activeItem+"&action=No";
      prometheus.remotePing(url);
      $('#'+prometheus.activeItem).data('favorite', 'No');
    },
    deleteItem: function() {

    }
  },
  junkcollector: {
    launch: function() {
      prometheus.loadData('partials/junkGrid.php', prometheus.junkcollector.displayUserGrid);
      prometheus.navigate('junk/index');
    },
    displayUserGrid: function(data) {
      prometheus.gridData = [];
      prometheus.displayAppViewData(data);
    },
    addFavorite: function() {
        var url = "https://api.chasingthedrift.com/junkcollector/favorite/"+prometheus.activeItem+"?favorite=Yes";
        prometheus.remotePing(url);
        $('#'+prometheus.activeItem).data('favorite', 'Yes');
    },
    removeFavorite: function() {
      var url = "https://api.chasingthedrift.com/junkcollector/favorite/"+prometheus.activeItem+"?favorite=No";
      prometheus.remotePing(url);
      $('#'+prometheus.activeItem).data('favorite', 'No');
    },
    deleteItem: function() {
      var url = "https://api.chasingthedrift.com/junkcollector/delete/"+prometheus.activeItem;
      prometheus.remotePing(url);
    },
    gallerySwap: function(event) {
      event.stopPropagation();
      var swap = $(this).data('swap');
      var animation, typeTarget;
      var target = $(this).attr('data-target');
      var type = $(this).attr('data-type');
      if (type == "video") { typeTarget = "#videoViewer"; } else {
        typeTarget = "#photoViewer";
      }
      if (swap == "prev") { animation = "magictime slideRight"; }
      if (swap == "next") { animation = "magictime slideLeft"; }
      $('#photoViewer, #videoViewer').addClass(animation);
      setTimeout(function(){
        $('#videoViewer iframe').attr('src', '');
        $('#photoViewer img').attr('src', '');
        $('#photoViewer, #videoViewer').hide();
        $('#photoViewer, #videoViewer').removeClass(animation);
        prometheus.junkcollector.showMedia(null, target);
      },400);
      $('.adminContainer').fadeOut();
    },
    showMedia: function(e, target) {
      if (target) {
        var el = '#'+target;
        var id = $(el).data('grid-id');
        var type = $(el).data('type');
        var url = $(el).data('url');
        var prev = $(el).data('prev');
        var next = $(el).data('next');
        var prevType = $(el).data('prevtype');
        var nextType = $(el).data('nexttype');
        var loadNextPage = $(el).data('loadnextpage');
        var loadPrevPage = $(el).data('loadprevpage');
        var favorite = $(el).data('favorite');

      } else {
        var id = $(this).data('grid-id');
        var type = $(this).data('type');
        var url = $(this).data('url');
        var prev = $(this).data('prev');
        var next = $(this).data('next');
        var prevType = $(this).data('prevtype');
        var nextType = $(this).data('nexttype');
        var loadNextPage = $(this).data('loadnextpage');
        var loadPrevPage = $(this).data('loadprevpage');
        var favorite = $(this).data('favorite');
      }

      prometheus.activeItem = id;

      $('.navPrev').attr('data-target', prev);
      $('.navNext').attr('data-target', next);
      $('.navPrev').attr('data-type', prevType);
      $('.navNext').attr('data-type', nextType);

      if(favorite == 'Yes') {
        $('.adminButton.addFavorite').hide();
        $('.adminButton.removeFavorite').show();
      } else {
        $('.adminButton.addFavorite').show();
        $('.adminButton.removeFavorite').hide();
      }
      if (prev == undefined) {
        $('.navPrev').hide();
      } else {
        $('.navPrev').show();
      }
      if (next == undefined) {
        $('.navNext').hide();
      } else {
        $('.navNext').show();
      }
      if(loadNextPage == 'Yes') {
        $('.navNext').addClass('loadNextPage').show();
      } else {
        $('.navNext').removeClass('loadNextPage');
      }
      if(loadPrevPage == 'Yes') {
        $('.navPrev').addClass('loadPrevPage').show();
      } else {
        $('.navPrev').removeClass('loadPrevPage');
      }
      if (type == "video") {
          $('#photoViewer').hide();
          $('#videoViewer iframe').css('opacity',0);
          $('#videoViewer').fadeIn();
          $('#videoViewer iframe').attr('src', url);
          setTimeout(function(){
            $('#videoViewer iframe').fadeTo("slow",1);
          },1000);
      } else {
          $('#videoViewer').hide();
          $('#photoViewer').fadeIn();
          $('#photoViewer img').attr('src', url);
          $('#photoViewer img').fadeIn();
      }
      if (window.location.hostname == "localhost") {
        $('#photoViewer img').attr('src', prometheus.getTestImage());
        $('#videoViewer iframe').attr('src', prometheus.getTestVideo());
      }
    }
  },
  handleNavTrigger: function() {
    event.stopPropagation();
    var thisApp = prometheus.activeApp;
    var thisUrl = $(this).data('url');
    $('#appSearch').fadeOut();
    prometheus.fadeOutGrid();
    setTimeout(function(){
      prometheus.loadData(thisUrl, prometheus[thisApp].displayUserGrid);
    },1000);
  },
  showSearch: function() {
    $('#appSearch').fadeToggle();
  },
  hideSearch: function() {
    $('#appSearch').fadeOut();
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
  showOverlaySpinner: function() {
    $('#overlayLoader').fadeIn();
  },
  hideOverlaySpinner: function() {
    $('#overlayLoader').fadeOut();
  },
  resetMedia: function() {
    //$('#photoViewer img').attr('src', '');
    //$('#photoViewer img').fadeOut();
    //$('#videoViewer iframe').attr('src', '');
  },
  openOverlay: function() {
    prometheus.hideSearch();
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
    $('.adminContainer').fadeOut();
  },
  closeAllOverlays: function() {
    $('.app-overlay-window').removeClass(prometheus.overlayIn);
    $('.app-overlay-window').addClass(prometheus.overlayOut);
    setTimeout(function(){$('.app-overlay-window').hide();}, 200);
    prometheus.resetMedia();
    $('.adminContainer').fadeOut();
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
    var profileContainer = $(this).data('profile');
    prometheus.profileContainer = '#'+profileContainer+" ";
    if (appLink == prometheus.activeApp) {
      prometheus.closeMenu();
    } else {
      $('.appLink').removeClass('active');
      $(this).addClass('active');
      prometheus.closeMenu();
      prometheus.clearAppView();
      prometheus.closeAllOverlays();
      if (appLink == "skynet") {
        $('.appSearchTrigger').hide();
      } else {
        $('.appSearchTrigger').show();
      }
      prometheus[appLink].launch();
      prometheus.activeApp = appLink;
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
    if (window.location.hostname == "localhost") {
      $(el).css('background-image', 'none');
    }
  },
  removeGridItem: function(items, i) {
    var item = items[i];
    return function() {
      $(item).addClass('fallOut');
    }
  },
  fadeOutGrid: function () {
    var items = document.querySelectorAll('.gridItem');
    for ( var i=0; i < items.length; i++ ) {
      var fadeGridItem = prometheus.removeGridItem(items,i);
      var delay = Math.random()*1000;
      setTimeout(fadeGridItem, delay);
    }
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
    colWidth = Math.floor((prometheus.environment.gridWidth / columns));
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
          $(this).css('z-index', '400');
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
  adjustInfoTabs: function() {
    var container = prometheus.profileContainer;
    var tabContainerWidth = $('#cerebroProfile .userInfoTabs').width();
    var tabWidth = Math.floor((tabContainerWidth - 12) / 2);
    var skynetTabContainer = $('#skynetNavigation').width();
    var skynetTabWidth = Math.floor((skynetTabContainer - 20) / 3);
    $('#cerebroProfile .infoTabTrigger').css('width', tabWidth);
    $(container+'.userPhotoTrigger').css('width', tabWidth);
    $(container+'.userPhotoTrigger').css('height', tabWidth);
    $('.skynetTab').css('width', skynetTabWidth);
  },
  adjustViewPort: function() {
    prometheus.environment.screen.height = $(window).height();
    prometheus.environment.screen.width = $(window).width();
    prometheus.environment.gridWidth = $('.appGrid').width();
    prometheus.environment.searchHeight = $('#appSearch').height();
    prometheus.environment.appContainerHeight = $('#appContainer').height();
    $('.appGrid').css('min-height', prometheus.environment.searchHeight + 60);
    if(prometheus.environment.mobile) {$('body').attr('id', 'mobile-app');} else {$('body').attr('id','desktop-app');}
    if(prometheus.environment.screen.width < 768) {
      $('body').addClass('mobile-view').removeClass('desktop-view');
    } else {
      $('body').addClass('desktop-view').removeClass('mobile-view');
    }
    if(prometheus.environment.screen.width > prometheus.environment.screen.height) {
      $('body').removeClass('portrait').addClass('landscape');
      prometheus.layout = 'landscape';
    } else {
      $('body').removeClass('landscape').addClass('portrait');
      prometheus.layout = 'portrait';
    }
    $('#cerebroMap').css('height', prometheus.environment.appContainerHeight - 55);
    prometheus.resizeGrid();
    prometheus.adjustOverlay();
  },
  adjustOverlay: function() {
    var overlayWindowHeight = $('.vanishIn.app-overlay-window').height();
    var overlayBodyHeight = overlayWindowHeight - 49;
    $('.vanishIn .app-overlay-body').css('height', overlayBodyHeight);
    prometheus.adjustInfoTabs();
  },
  removeSlashScreen: function() {
    $('#loader, #prometheusSplash').fadeOut();
    var lat = prometheus.cerebro.lat;
    var long = prometheus.cerebro.long;
    var url = "partials/initGps.php?lat="+lat+"&long="+long;
    prometheus.remotePing(url);
    setTimeout(function(){
      prometheus.loadDefaultView();
      prometheus.router();
    }, 500);
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
    clearTimeout($.data(this, 'scrollTimer'));
     $.data(this, 'scrollTimer', setTimeout(function() {
       var containerScroll = document.getElementById('appContainer').scrollTop;
       var searchPosition = containerScroll + 15;
       $('#appSearch').animate({
         top: searchPosition
       }, 500)
     }, 250));
    $('.gridItem:not(.loaded)').each(function () {
      if (prometheus.isScrolledIntoView(this) === true) {
        prometheus.animateGridItem(this);
      }
    });
  }
};

prometheus.init();

$(window).on( "orientationchange", function( event ) {
  setTimeout(function(){
    prometheus.adjustViewPort();
  },500);
});

$(function() {
    FastClick.attach(document.body);
});

$(function() {
   $("#junkMedia .app-overlay-body").swipe( {
     swipeLeft: appSwipeLeft,
     swipeRight: appSwipeRight,
     allowPageScroll: "vertical"
   });
   $("#ajaxContainer").swipe( {
     swipeLeft: appSwipeLeftCerebro,
     swipeRight: appSwipeRightCerebro,
     allowPageScroll: "vertical"
   });
   $(".userItem .app-overlay-body").swipe( {
     swipeLeft: appSwipeLeftExt,
     swipeRight: appSwipeRightExt,
     allowPageScroll: "vertical"
   });
   function appSwipeLeftCerebro(event, direction, distance, duration, fingerCount) {
     $('.cerebroNavNext').click();
   }
   function appSwipeRightCerebro(event, direction, distance, duration, fingerCount) {
     $('.cerebroNavPrev').click();
   }
   function appSwipeLeft(event, direction, distance, duration, fingerCount) {
     $('.navNext').click();
   }
   function appSwipeRight(event, direction, distance, duration, fingerCount) {
     $('.navPrev').click();
   }
   function appSwipeLeftExt(event, direction, distance, duration, fingerCount) {
     var container = prometheus.profileContainer;
     $(container+'.navNext').click();
   }
   function appSwipeRightExt(event, direction, distance, duration, fingerCount) {
     var container = prometheus.profileContainer;
     $(container+'.navPrev').click();
   }
 });

function cerebroScan(position) {
  prometheus.cerebro.lat = position.coords.latitude;
  prometheus.cerebro.long = position.coords.longitude;
  prometheus.removeSlashScreen();
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out')
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred');
            break;
    }
}
