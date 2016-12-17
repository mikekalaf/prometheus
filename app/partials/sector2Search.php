<?php
//Favorites
$favoriteOptions = ['Yes', 'No'];
$favoriteSelect = "";
foreach($favoriteOptions as $value) {
  $selected = "";
  if ($value == $favorites) { $selected = " selected"; }
  $favoriteSelect .= "<option value='".$value."'".$selected.">".$value."</option>";
}
 ?>
<div id="appSearch">
  <div class="appNav">
    <?php
      if (!empty($sectorData['prev_page_url'])) {
        echo "<div class='navButton navTrigger' data-url='partials/sector2.php?page=".$prevPage.$navQuery."'><i class='fa fa-chevron-left'></i></div>";
      }
        echo "<div class='navLabel'>".number_format($sectorData['from'])." to ".number_format($sectorData['to'])." of ".number_format($sectorData['total'])."</div>";
      if (!empty($sectorData['next_page_url'])) {
        echo "<div class='navButton navTrigger' data-url='partials/sector2.php?page=".$nextPage.$navQuery."'><i class='fa fa-chevron-right'></i></div>";
      }
      ?>
  </div>
  <div class="searchWrapper">
    <div class="searchCol leftCol">
      <select class="searchParam" data-param="favorites">
        <option value="">Favorites</option>
        <?php echo $favoriteSelect; ?>
      </select>
    </div>
    <div class="searchCol rightCol">
        <div id="appSearchSubmit" data-url="sector2.php">Search</div>
    </div>
  </div>
</div>
