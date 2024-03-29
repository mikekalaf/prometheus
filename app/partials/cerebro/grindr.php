<?php
require('../../includes/skynet.php');
login_grindr();

$thisProfileId = $_GET['id'];
if (!empty($thisProfileId)) {
  $user = grindrGetUserProfile($thisProfileId);
  $user['fullsize'] = "https://cdns.grindr.com/images/profile/1024x1024/".$user['profileImageMediaHash'];
  if (isProd() && (isset($user['profileId']))) {
    if (!user_exists_grindr($thisProfileId)) {
      saveGrindrUserProfile($user);
    }
    grindrUpdatePhotos($user);
    $shieldUserProfile = getShieldProfile("profiles_grindr", "profile_id", $thisProfileId);
    $photoArchive = getPhotoArchives($shieldUserProfile['protocol_id']);
  }
}


if (isProd() && (!isset($user['profileId'])) && user_exists_grindr($thisProfileId)) {
  $user['fullsize'] = $shieldUserProfile['profile_photo'];
  $user['showDistance'] = 0;
  $user['profileId'] =  $shieldUserProfile['profile_id'];
  $user['displayName'] =  $shieldUserProfile['display_name'];
  $user['seen'] = '';
  $user['socialMediaLinks']['facebook'] = $shieldUserProfile['facebook'];
  $user['socialMediaLinks']['instagram'] = $shieldUserProfile['instagram'];
  $user['socialMediaLinks']['twitter'] = $shieldUserProfile['twitter'];
  $user['age'] = $shieldUserProfile['age'];
  $user['ethnicity'] = $shieldUserProfile['ethnicity'];
  $user['relationshipStatus'] = $shieldUserProfile['relationship_status'];
  $user['aboutMe'] = $shieldUserProfile['about_me'];
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
if (!empty($user['profileId'])) {
 ?>
 <div class="app-overylay-header">
   <div class="app-overlay-title"><?php echo $title; ?></div>
   <div class="app-overlay-close" data-target="cerebroProfile"><i class="fa fa-times"></i></div>
 </div>
 <div class="app-overlay-body">
   <div class="userPhotoWrapper">
     <div class="userPhotoContainer">
       <div class="userPhoto">
         <img src="<?php echo $user['fullsize']; ?>" />
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
       <div class="userProfileInfo infoTab active <?php if (!$showMap) { echo " nomap "; } ?>">
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
         <div class="cerebroFavorite">
           <div class="favoriteToggle <?php if ($shieldUserProfile['favorite'] == "No") { echo " active "; }?>" data-url="https://api.chasingthedrift.com/shield/x-gene/sector1/favorite?protocol_id=<?php echo $shieldUserProfile['protocol_id']; ?>&action=Yes">Add to Favorites</div>
           <div class="favoriteToggle <?php if ($shieldUserProfile['favorite'] == "Yes") { echo " active "; }?>"  data-url="https://api.chasingthedrift.com/shield/x-gene/sector1/favorite?protocol_id=<?php echo $shieldUserProfile['protocol_id']; ?>&action=No">Remove from Favorites</div>
         </div>
         <div class="cerebroDetails">
           <?php
           displayLastSeen('grindr', $user['seen']);
           $user['socialMediaLinks']['facebook'] = $user['socialNetworks']['facebook']['userId'];
           $user['socialMediaLinks']['instagram'] = $user['socialNetworks']['instagram']['userId'];
           $user['socialMediaLinks']['twitter'] = $user['socialNetworks']['twitter']['userId'];
           displayUserData('Age', $user['age']);
           displayUserData('Ethnicity', $managedFields['grindr'][ethnicity][$user['ethnicity']]);
           displayUserData('Relationship Status', $managedFields['grindr'][relationshipStatus][$user['relationshipStatus']]);
           displayUserData('Body Type', $managedFields['grindr'][bodyType][$user['bodyType']]);
           displayUserData('Sexual Position', $managedFields['grindr'][sexualPosition][$user['sexualPosition']]);
           displayUserData('HIV Status', $managedFields['grindr'][hivStatus][$user['hivStatus']]);
           displaySocialMedia('grindr', $user['socialMediaLinks']);
           displayUserData('About Me', $user['aboutMe']);
            ?>
         </div>
       </div>
       <?php if ($showMap == true) { ?>
       <div class="userLocation infoTab">
       <?php displayUserData('GPS Location', $user['feetDisplay']." ft / ".$user['milesDisplay']." miles away"); ?>
       <iframe class="cerebro-iframe" src="partials/cerebro/geoMap.php?app=grindr&id=<?php echo $user['profileId']; ?>&protocol_id=<?php echo $shieldUserProfile['protocol_id']; ?>"></iframe>
       </div>
       <?php } ?>
     </div>
   </div>
 </div>
<?php } else { ?>
  <div class="app-overylay-header">
    <div class="app-overlay-title">Connection Error</div>
    <div class="app-overlay-close" data-target="cerebroProfile"><i class="fa fa-times"></i></div>
  </div>
  <div class="app-overlay-body">
    <p>Opps, it looks like we were unable to connect to the server to retrieve this profile.  Please try again.</p>
  </div>
<?php } ?>
