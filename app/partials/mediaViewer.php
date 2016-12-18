<div id="junkMedia" class="app-overlay-window">
  <div class="app-overylay-header">
    <div class="app-overlay-title">Media Viewer</div>
    <div class="app-overlay-close" data-target="junkMedia"><i class="fa fa-times"></i></div>
  </div>
  <div class="app-overlay-body">
      <div id="photoViewer">
        <img src="http://www.themarysue.com/wp-content/uploads/2015/07/Jean_Grey_Phoenix.jpg" />
      </div>
      <div id="videoViewer">
        <iframe></iframe>
        <div class="videoSwipe top"></div>
        <div class="videoSwipe bottom"></div>
      </div>
      <div id="galleryNav">
        <div class="navPrev" data-swap="prev"><i class="fa fa-chevron-circle-left fa-2x"></i></div>
        <div class="navNext" data-swap="next"><i class="fa fa-chevron-circle-right fa-2x"></i></div>
      </div>
      <?php if ($isAdmin) { ?>
        <div class="adminOptions">
          <div class="adminContainer">
            <div class="adminButton addFavorite" data-app="junkcollector">Add to Favorites</div>
            <div class="adminButton removeFavorite" data-app="junkcollector">Remove from Favorites</div>
            <div class="adminButton deleteItem last" data-app="junkcollector">Delete</div>
          </div>
          <div class="adminToggle">
              <i class='fa fa-3x fa-cog'></i>
          </div>
        </div>
      <?php } ?>
  </div>
</div>
