<?php
  require('../../includes/skynet.php');
  $thisProfileId = $_GET['id'];
  if (!empty($thisProfileId)) {
    $user = jackdGetUserProfile($thisProfileId);
    if (isProd()) {
      if (!user_exists_jackd($thisProfileId)) {
        saveJackdUserProfile($user);
      }
      jackdUpdatePhotos($user);
      $shieldUserProfile = getShieldProfile("profiles_jackd", "profile_no", $thisProfileId);
    }
    if (!empty($user['publicPicture1'])) {
        $photo = $user['publicPicture1'];
    } else if (!empty($user['publicPicture2'])) {
        $photo = $user['publicPicture2'];
    } else {
        $photo = $user['publicPicture3'];
    }
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
  $title = "Profile Detail";
  if (!empty($user['firstName'])) { $title = $user['firstName']." ".$user['lastName'];}
 ?>
<div class="app-overylay-header">
  <div class="app-overlay-title"><?php echo $title; ?></div>
  <div class="app-overlay-close" data-target="cerebroProfile"><i class="fa fa-times"></i></div>
</div>
<div class="app-overlay-body">

</div>
