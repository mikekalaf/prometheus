<?php
require('../includes/skynet.php');
login_grindr();

//GPS Data
 $lat = $_GET['lat'];
 $long = $_GET['long'];
 $_SESSION['lat'] = $lat;
 $_SESSION['long'] = $long;
 $tabSuffix = date("His");
 $title = "X-Gene Search";
 if (!empty($_GET['search'])) {
   $locationSearch = getAddress($_GET['search']);
   $lat = $locationSearch['lat'];
   $long = $locationSearch['long'];
   $_SESSION['lat'] = $lat;
   $_SESSION['long'] = $long;
   $title = $_GET['search'];
 }
 $grindrUsers = grindrGetNearbyUsers($lat, $long);
 $jackdUsers = jackdGetNearbyUsers($lat, $long);
 $scruffUsers = scruffGetNearbyUsers($lat, $long);
 ?>
 <div id="skynetSearch">
   <div class="searchInput">
     <input id="searchQuery" type="search" placeholder="Enter an address to search" value="<?php echo urldecode($_GET['search']); ?>">
   </div>
   <div class="searchSubmit">
     <div id="searchButton">Search</div>
   </div>
 </div>
 <div id="skynetNavigation">
   <div id="skynetGrindr" class="skynetTab default active" data-target="grindrGrid">Sector 1</div>
   <div id="skynetJackd" class="skynetTab" data-target="jackdGrid">Sector 2</div>
   <div id="skynetScruff" class="skynetTab last" data-target=scruffGrid>Sector 3</div>
</div>
<div id="skynetTabWrapper">
  <div id="grindrGrid" class="appGrid skynetTabContainer active">
    <?php include('grindrGrid.php'); ?>
  </div>
  <div id="jackdGrid" class="appGrid skynetTabContainer">
    <?php include('jackdGrid.php'); ?>
  </div>
  <div id="scruffGrid" class="appGrid skynetTabContainer">
    <?php include('scruffGrid.php'); ?>
  </div>
</div>
