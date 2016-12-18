<?php
//Favorites
$favoriteOptions = array();
$favoriteOptions['true'] = "Show Favorites";
$favoriteOptions['false'] = "Show All";

$favoriteSelect = "";
foreach($favoriteOptions as $key => $value) {
  $selected = "";
  if ($key == $favorites) { $selected = " selected"; }
  $favoriteSelect .= "<option value='".$key."'".$selected.">".$value."</option>";
}

//Media type
$mediaType = array();
$mediaType['gif'] = "GIF";
$mediaType['png'] = "PNG";
$mediaType['jpg'] = "JPG";
$mediaType['video'] = "Video";

$mediaSelect = "";
foreach($mediaType as $key => $value) {
  $selected = "";
  if ($key == $type) { $selected = " selected"; }
  $mediaSelect .= "<option value='".$key."'".$selected.">".$value."</option>";
}


 ?>
<div id="appSearch">
  <div class="appNav">
    <?php
      if (!empty($sectorData['prev_page_url'])) {
        echo "<div class='navButton navTrigger' data-url='partials/junkGrid.php?page=".$prevPage.$navQuery."'><i class='fa fa-chevron-left'></i></div>";
      }
        echo "<div class='navLabel'>".number_format($sectorData['from'])." to ".number_format($sectorData['to'])." of ".number_format($sectorData['total'])."</div>";
      if (!empty($sectorData['next_page_url'])) {
        echo "<div class='navButton navTrigger' data-url='partials/junkGrid.php?page=".$nextPage.$navQuery."'><i class='fa fa-chevron-right'></i></div>";
      }
      ?>
  </div>
  <div class="searchWrapper">
    <div class="searchCol leftCol">
      <select class="searchParam" data-param="favorites">
        <?php echo $favoriteSelect; ?>
      </select>
      <select class="searchParam" data-param="type">
        <option value="">Show All Media Types</option>
        <?php echo $mediaSelect; ?>
      </select>
    </div>
    <div class="searchCol rightCol">
        <input class="searchParam" data-param="search" placeholder="Query" value="<?php echo urldecode($search); ?>" />
        <div id="appSearchSubmit" data-url="junkGrid.php">Search</div>
    </div>
  </div>
</div>
