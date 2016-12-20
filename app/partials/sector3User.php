<div id="scruffUser" class="app-overlay-window userItem">
  <div class="app-overylay-header">
    <div class="app-overlay-title">Title</div>
    <div class="app-overlay-close" data-target="scruffUser"><i class="fa fa-times"></i></div>
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
          <div class="userInfoContainer">
            <div class="userInfoTabs">
              <div class="infoTabTrigger default active" data-target="userProfileInfo">Profile</div>
              <div class="infoTabTrigger last" data-target="userPhotoStream">Photos</div>
            </div>
            <div class="userPhotoStream infoTab">
            </div>
            <div class="userProfileInfo infoTab active userData">
            </div>
            <div class="userLocationHistory infoTab">
              <div id="scruffMap" class="locationMap"></div>
            </div>
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
            <div class="adminButton addFavorite last" data-app="scruff">Add to Favorites</div>
            <div class="adminButton removeFavorite last" data-app="scruff">Remove from Favorites</div>
          </div>
          <div class="adminToggle">
              <i class='fa fa-3x fa-cog'></i>
          </div>
        </div>
      <?php } ?>
  </div>
</div>
