<div id="grindrUser" class="app-overlay-window userItem">
  <div class="app-overylay-header">
    <div class="app-overlay-title">Title</div>
    <div class="app-overlay-close" data-target="grindrUser"><i class="fa fa-times"></i></div>
  </div>
  <div class="app-overlay-body">
      <div class="userPhotoWrapper">
        <div class="userPhotoContainer">
          <div class="userPhoto">
            <img src='' />
          </div>
        </div>
      </div>
      <div class="userInfoWrapper">
        <div class="userInfoContainer">
          <div class="userInfoTabs">
            <div class="infoTabTrigger default active" data-target="userPhotoStream">Photos</div>
            <div class="infoTabTrigger" data-target="userProfileInfo">Profile</div>
            <div class="infoTabTrigger last" data-target="userLocationHistory">Location History</div>
          </div>
          <div class="userPhotoStream infoTab active">
          </div>
          <div class="userProfileInfo infoTab userData">
            Profile Info
          </div>
          <div class="userLocationHistory infoTab userData">
            Location History
          </div>
        </div>
      </div>
      <div class="profileNav">
        <div class="navPrev" data-swap="prev"><i class="fa fa-chevron-circle-left fa-2x"></i></div>
        <div class="navNext" data-swap="next"><i class="fa fa-chevron-circle-right fa-2x"></i></div>
      </div>
      <?php if ($isAdmin) { ?>
        <div class="adminOptions">
          <div class="adminContainer">
            <div class="adminButton addFavorite last" data-app="grindr">Add to Favorites</div>
            <div class="adminButton removeFavorite last" data-app="grindr">Remove from Favorites</div>
          </div>
          <div class="adminToggle">
              <i class='fa fa-3x fa-cog'></i>
          </div>
        </div>
      <?php } ?>
  </div>
</div>
