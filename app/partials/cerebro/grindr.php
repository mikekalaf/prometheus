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
$title = "Profile Detail";
if (!empty($user['displayName'])) { $title = $user['displayName'];}
 ?>
 <div class="app-overylay-header">
   <div class="app-overlay-title"><?php echo $title; ?></div>
   <div class="app-overlay-close" data-target="cerebroProfile"><i class="fa fa-times"></i></div>
 </div>
 <div class="app-overlay-body">

 </div>
