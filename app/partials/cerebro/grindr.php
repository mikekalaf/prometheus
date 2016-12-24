<?php
require('../../includes/skynet.php');
$thisProfileId = $_GET['id'];
if (!empty($thisProfileId)) {
  $user = grindrGetUserProfile($thisProfileId);
  if (isProd()) {
    if (!user_exists_grindr($thisProfileId)) {
      saveGrindrUserProfile($user);
    }
    grindrUpdatePhotos($user);
    $shieldUserProfile = getShieldProfile("profiles_grindr", "profile_id", $thisProfileId);
    $photoArchive = getPhotoArchives($shieldUserProfile['protocol_id']);
  }
}

$photoArchive[]['photo_url'] = "https://cdns.grindr.com/images/profile/1024x1024/".$user['profileImageMediaHash'];

$showMap = false;
if ($user['showDistance'] == 1  && $user['distance'] != 0) {
    $user['miles']  = $user['distance'] * 0.000621371;
    $user['feet'] = $user['distance'] * 3.28084;
    $user['milesDisplay'] = number_format($user['miles'], 3, '.', '');
    $user['feetDisplay'] = number_format($user['feet']);
    if ($user['miles'] < 100) {
      $showMap = true;
    }
}
$title = $user['profileId'];
if (!empty($user['displayName'])) { $title = $user['displayName'];}
 ?>
 <div class="app-overylay-header">
   <div class="app-overlay-title"><?php echo $title; ?></div>
   <div class="app-overlay-close" data-target="cerebroProfile"><i class="fa fa-times"></i></div>
 </div>
 <div class="app-overlay-body">
   <div class="userPhotoWrapper">
     <div class="userPhotoContainer">
       <div class="userPhoto">
         <img src="https://cdns.grindr.com/images/profile/1024x1024/<?php echo $user['profileImageMediaHash']; ?>" />
       </div>
     </div>
   </div>
   <div class="userInfoWrapper">
     <div class="userInfoContainer">
       <?php if ($showMap) { ?>
       <div class="userInfoTabs">
         <div class="infoTabTrigger default active" data-target="userProfileInfo">Profile</div>
         <div class="infoTabTrigger last" data-target="userLocation">Location</div>
       </div>
       <?php } ?>
       <div class="userProfileInfo infoTab active <?php if (!$showMap) { echo " nomap "; } ?>
">
         <?php if ($photoArchive['count'] > 0) { ?>
           <div class="cerebroPhotos">
             <?php
               foreach ($photoArchive as $key => $photo) {
                 if($photo['photo_url']) {
                   $photo['photo_url'] = str_replace("http:", "https:", $photo['photo_url']);
                   echo "<a class='cerebro-thumb' data-image='".$photo['photo_url']."' style='background-image: url(".$photo['photo_url'].")'></a>";
                 }
               }
             ?>
           </div>
         <?php } ?>
       </div>
       <div class="userLocation infoTab">
         Location History
       </div>
     </div>
   </div>
 </div>
