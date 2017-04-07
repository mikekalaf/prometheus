<?php
//Favorites
$favoriteOptions = array();
$favoriteOptions['Yes'] = "Show Favorites";
$favoriteOptions['No'] = "Show All";

$favoriteSelect = "";
foreach($favoriteOptions as $key => $value) {
  $selected = "";
  if ($key == $favorites) { $selected = " selected"; }
  $favoriteSelect .= "<option value='".$key."'".$selected.">".$value."</option>";
}

//Unlocked
$unlockedOptions = array();
$unlockedOptions['Yes'] = "Unlocked Privates";
$unlockedOptions['No'] = "Show All";

$unlockedSelect = "";
foreach($unlockedOptions as $key => $value) {
  $selected = "";
  if ($key == $private) { $selected = " selected"; }
  $unlockedSelect .= "<option value='".$key."'".$selected.">".$value."</option>";
}

//Ethnicity
$ethnicityOptions = array();
$ethnicityOptions[1] = "Black";
$ethnicityOptions[2] = "White";
$ethnicityOptions[3] = "Latino";
$ethnicityOptions[4] = "Middle Eastern";
$ethnicityOptions[5] = "Mixed";
$ethnicityOptions[6] = "Pacific Islander";
$ethnicityOptions[7] = "Other";

$ethnicitySelect = "";
foreach($ethnicityOptions as $key => $value) {
  $selected = "";
  if ($key == $ethnicity) { $selected = " selected"; }
  $ethnicitySelect .= "<option value='".$key."'".$selected.">".$value."</option>";
}

 ?>
<div id="appSearch">
  <div class="appNav">
    <?php
      if (!empty($sectorData['prev_page_url'])) {
        echo "<div class='navButton navTrigger navPrevPage' data-url='partials/sector2.php?page=".$prevPage.$navQuery."'><i class='fa fa-chevron-left'></i></div>";
      }
        echo "<div class='navLabel'>".number_format($sectorData['from'])." to ".number_format($sectorData['to'])." of ".number_format($sectorData['total'])."</div>";
      if (!empty($sectorData['next_page_url'])) {
        echo "<div class='navButton navTrigger navNextPage' data-url='partials/sector2.php?page=".$nextPage.$navQuery."'><i class='fa fa-chevron-right'></i></div>";
      }
      ?>
  </div>
  <div class="searchWrapper">
    <div class="searchCol leftCol">
      <select class="searchParam" data-param="favorites">
        <?php echo $favoriteSelect; ?>
      </select>
      <select class="searchParam" data-param="private">
        <?php echo $unlockedSelect; ?>
      </select>
      <select class="searchParam last" data-param="ethnicity">
        <option value=''>Ethnicity</option>
        <?php echo $ethnicitySelect; ?>
      </select>
    </div>
    <div class="searchCol rightCol">
      <input class="searchParam" data-param="city" placeholder="City" value="<?php echo urldecode($city); ?>" />
      <input class="searchParam" data-param="state" placeholder="State" value="<?php echo urldecode($state); ?>" />
      <input class="searchParam" data-param="search" placeholder="Query" value="<?php echo urldecode($search); ?>" />
      <div id="appSearchSubmit" data-url="sector2.php">Search</div>
    </div>
  </div>
</div>
