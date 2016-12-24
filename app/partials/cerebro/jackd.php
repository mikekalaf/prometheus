<?php
  require('../../includes/skynet.php');
  $thisProfileId = $_GET['id'];
  $useCDN = false;
  if (!empty($thisProfileId)) {
    $user = jackdGetUserProfile($thisProfileId);
    if (isProd()) {
      if (!user_exists_jackd($thisProfileId)) {
        saveJackdUserProfile($user);
      }
      jackdUpdatePhotos($user);
      $shieldUserProfile = getShieldProfile("profiles_jackd", "profile_no", $thisProfileId);
      //Download images
      if ($shieldUserProfile['image_scan'] == "0") {
          $cdn = "http://cdn.chasingthedrift.com/sector2download.php?id=".$shieldUserProfile['protocol_id'];
          $cdnHeaders = array();
          $cdnFetch = curl_handler($cdn, $cdnHeaders, "", "GET");
          $useCDN = true;
      } else {
        $useCDN = true;
      }
    }
    if (!empty($user['publicPicture1'])) {
        $photo = $user['publicPicture1'];
    } else if (!empty($user['publicPicture2'])) {
        $photo = $user['publicPicture2'];
    } else {
        $photo = $user['publicPicture3'];
    }
  }
    if ($useCDN) {
      $photoPrefix = "https://cdn.chasingthedrift.com/prometheus/jackd/";
      $shieldUserProfile['photo4'] = str_replace('http://s.jackd.mobi/','', $shieldUserProfile['photo4']);
      $shieldUserProfile['photo5'] = str_replace('http://s.jackd.mobi/','', $shieldUserProfile['photo5']);
    } else {
      $photoPrefix = "https://skynet.chasingthedrift.com/pages/embed/imageProxy.php?image=http://s.jackd.mobi/";
    }
     $showMap = false;
    $showRemoteMap = false;
    if ($user['distance'] != 0) {
        $user['feet'] = $user['distance'] * 5280;
        $user['milesDisplay'] = number_format($user['distance'], 2, '.', '');
        $user['feetDisplay'] = number_format($user['feet']);
        if ($user['milesDisplay'] < 100) {
            $showMap = true;
        } else {
          if (!empty($shieldUserProfile['lat']) && !empty($shieldUserProfile['lon'])) {
            $showRemoteMap = true;
          }
        }
    }
  $title = $user['userNo'];
  if (!empty($user['firstName'])) { $title = $user['firstName']." ".$user['lastName'];}
 ?>
<div class="app-overylay-header">
  <div class="app-overlay-title"><?php echo $title; ?></div>
  <div class="app-overlay-close" data-target="cerebroProfile"><i class="fa fa-times"></i></div>
</div>
<div class="app-overlay-body">
  <div class="userPhotoWrapper">
    <div class="userPhotoContainer">
      <div class="userPhoto">
        <img src="<?php echo $photoPrefix.$photo; ?>" />
      </div>
    </div>
  </div>
  <div class="userInfoWrapper">
    <div class="userInfoContainer">
      <?php if ($showMap || $showRemoteMap) { ?>
      <div class="userInfoTabs">
        <div class="infoTabTrigger default active" data-target="userProfileInfo">Profile</div>
        <div class="infoTabTrigger last" data-target="userLocation">Location</div>
      </div>
      <?php } ?>
      <div class="userProfileInfo infoTab active <?php if (!$showMap) { echo " nomap "; } ?>">
        <div class="cerebroPhotos">
          <?php if (!empty($user['publicPicture1'])) { ?>
             <a class="cerebro-thumb" data-image="<?php echo $photoPrefix.$user['publicPicture1']; ?>" style="background-image: url(<?php echo $photoPrefix.$user['publicPicture1']; ?>s)"></a>
           <?php } ?>
           <?php if (!empty($user['publicPicture2'])) { ?>
               <a class="cerebro-thumb" data-image="<?php echo $photoPrefix.$user['publicPicture2']; ?>" style="background-image: url(<?php echo $photoPrefix.$user['publicPicture2']; ?>s)"></a>
            <?php } ?>
            <?php if (!empty($user['publicPicture3'])) { ?>
                <a class="cerebro-thumb" data-image="<?php echo $photoPrefix.$user['publicPicture3']; ?>" style="background-image: url(<?php echo $photoPrefix.$user['publicPicture3']; ?>s)"></a>
             <?php } ?>
             <?php if (!empty($shieldUserProfile['photo4'])) { ?>
                 <a class="cerebro-thumb" data-image="<?php echo $photoPrefix.$shieldUserProfile['photo4']; ?>" style="background-image: url(<?php echo $photoPrefix.$shieldUserProfile['photo4']; ?>s)"></a>
             <?php } ?>
             <?php if (!empty($shieldUserProfile['photo5'])) { ?>
                 <a class="cerebro-thumb" data-image="<?php echo $photoPrefix.$shieldUserProfile['photo5']; ?>" style="background-image: url(<?php echo $photoPrefix.$shieldUserProfile['photo5']; ?>s)"></a>
             <?php } ?>
        </div>
        <div class="cerebroFavorite">
          <div class="favoriteToggle <?php if ($shieldUserProfile['favorite'] == "Yes") { echo " active "; }?>" data-url="https://api.chasingthedrift.com/shield/x-gene/sector2/favorite?protocol_id=<?php echo $shieldUserProfile['protocol_id']; ?>&action=Yes">Add to Favorites</div>
          <div class="favoriteToggle <?php if ($shieldUserProfile['favorite'] == "No") { echo " active "; }?>"  data-url="https://api.chasingthedrift.com/shield/x-gene/sector2/favorite?protocol_id=<?php echo $shieldUserProfile['protocol_id']; ?>&action=No">Remove from Favorites</div>
        </div>
        <div class="cerebroDetails">
          <?php
            displayLastSeen('jackd', $user['lastLoginDate']);
            displayUserData('Age', $user['age']);
            displayUserData('Location', $user['location']);
            displayUserData('About Me', $user['profileText']);
            displayUserData('Interests', $user['interests']);
            displayUserData('Movies', $user['movies']);
            displayUserData('Activities', $user['activities']);
            displayUserData('Music', $user['music']);
          ?>
        </div>
      </div>
      <div class="userLocation infoTab">
        <?php if ($showMap == true) { ?>
           <?php displayUserData('GPS Location', $user['feetDisplay']." ft / ".$user['milesDisplay']." miles away"); ?>
           <iframe class="cerebro-iframe" src="partials/cerebro/geoMap.php?app=jackd&id=<?php echo $user['userNo']; ?>&protocol_id=<?php echo $shieldUserProfile['protocol_id']; ?>"></iframe>
        <?php } ?>
           <!-- Remote Map -->
        <?php if ($showRemoteMap == true) { ?>
           <?php displayUserData('GPS Location', $user['feetDisplay']." ft / ".$user['milesDisplay']." miles away"); ?>
           <iframe class="cerebro-iframe" src="partials/cerebro/geoMapRemote.php?app=jackd&id=<?php echo $user['userNo']; ?>&protocol_id=<?php echo $shieldUserProfile['protocol_id']; ?>&lat=<?php echo $shieldUserProfile['lat']; ?>&lng=<?php echo $shieldUserProfile['lon']; ?>"></iframe>
        <?php } ?>
      </div>
    </div>
  </div>
</div>
