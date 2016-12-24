<?php
  require('../../includes/skynet.php');
  $thisProfileId = $_GET['id'];
  if (!empty($thisProfileId)) {
    $user = scruffGetUserProfile($thisProfileId);
    $user = $user['results'][0];
    if (isProd()) {
      if (!user_exists_scruff($thisProfileId)) {
        saveScruffUserProfile($user);
      }
      scruffUpdatePhotos($user);
      $shieldUserProfile = getShieldProfile("profiles_scruff", "profile_id", $thisProfileId);
      $photoArchive = getPhotoArchives($shieldUserProfile['protocol_id']);
    }
  }
    $showMap = false;
    $showRemoteMap = false;
    $user['miles']  = $user['dst'] * 0.000621371;
    $user['feet'] = $user['dst'] * 3.28084;
    $user['milesDisplay'] = number_format($user['miles'], 3, '.', '');
    $user['feetDisplay'] = number_format($user['feet']);
    if ($user['miles'] < 100) {
        $showMap = true;
    } else {
      if (!empty($shieldUserProfile['lat']) && !empty($shieldUserProfile['lon'])) {
        $showRemoteMap = true;
      }
    }
  $title = "Scruff Profile Detail";
  if (!empty($user['name'])) { $title = $user['name'];}
 ?>
 <div class="app-overylay-header">
   <div class="app-overlay-title"><?php echo $title; ?></div>
   <div class="app-overlay-close" data-target="cerebroProfile"><i class="fa fa-times"></i></div>
 </div>
 <div class="app-overlay-body">
   <div class="userPhotoWrapper">
     <div class="userPhotoContainer">
       <div class="userPhoto">
         <img src="<?php echo $user['image_url']; ?>" />
       </div>
     </div>
   </div>
   <div class="userInfoWrapper">
     <div class="userInfoContainer">
       <div class="userInfoTabs">
         <div class="infoTabTrigger default active" data-target="userProfileInfo">Profile</div>
         <div class="infoTabTrigger last" data-target="userLocation">Location</div>
       </div>
       <div class="userProfileInfo infoTab active">
         Profile Info
       </div>
       <div class="userLocation infoTab">
         Location History
       </div>
     </div>
   </div>
 </div>
