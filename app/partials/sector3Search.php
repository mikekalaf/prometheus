<?php
//Favorites
$favoriteOptions = array();
$favoriteOptions['Yes'] = "Favorites";
$favoriteOptions['No'] = "Show All";

$favoriteSelect = "";
foreach($favoriteOptions as $key => $value) {
  $selected = "";
  if ($key == $favorites) { $selected = " selected"; }
  $favoriteSelect .= "<option value='".$key."'".$selected.">".$value."</option>";
}

//Ethnicity
$ethnicityOptions = array();
$ethnicityOptions[1] = "Asian";
$ethnicityOptions[2] = "Black";
$ethnicityOptions[3] = "Latino";
$ethnicityOptions[4] = "Indian";
$ethnicityOptions[5] = "Middle Eastern";
$ethnicityOptions[6] = "Pacific Islander";
$ethnicityOptions[7] = "White";
$ethnicityOptions[8] = "Multi-Racial";
$ethnicityOptions[9] = "Native American";

$ethnicitySelect = "";
foreach($ethnicityOptions as $key => $value) {
  $selected = "";
  if ($key == $ethnicity) { $selected = " selected"; }
  $ethnicitySelect .= "<option value='".$key."'".$selected.">".$value."</option>";
}

//relationship
$relOptions = array();
$relOptions[1] = "Single";
$relOptions[2] = "Dating";
$relOptions[3] = "Partnered";
$relOptions[4] = "Engaged";
$relOptions[5] = "Married";
$relOptions[6] = "Open Relationship";
$relOptions[7] = "In a Relationship";
$relOptions[8] = "Widowed";

$relSelect = "";
foreach($relOptions as $key => $value) {
  $selected = "";
  if ($key == $relationship) { $selected = " selected"; }
  $relSelect .= "<option value='".$key."'".$selected.">".$value."</option>";
}

//BodyHair
$hairOptions = array();
$hairOptions[1] = "Smooth";
$hairOptions[2] = "Some Hair";
$hairOptions[3] = "Hairy";
$hairOptions[4] = "Very Hairy";

$hairSelect = "";
foreach($hairOptions as $key => $value) {
  $selected = "";
  if ($key == $body_hair) { $selected = " selected"; }
  $hairSelect .= "<option value='".$key."'".$selected.">".$value."</option>";
}

 ?>
<div id="appSearch">
  <div class="appNav">
    <?php
      if (!empty($sectorData['prev_page_url'])) {
        echo "<div class='navButton navTrigger' data-url='partials/sector3.php?page=".$prevPage.$navQuery."'><i class='fa fa-chevron-left'></i></div>";
      }
        echo "<div class='navLabel'>".number_format($sectorData['from'])." to ".number_format($sectorData['to'])." of ".number_format($sectorData['total'])."</div>";
      if (!empty($sectorData['next_page_url'])) {
        echo "<div class='navButton navTrigger' data-url='partials/sector3.php?page=".$nextPage.$navQuery."'><i class='fa fa-chevron-right'></i></div>";
      }
      ?>
  </div>
  <div class="searchWrapper">
    <div class="searchCol leftCol">
      <select class="searchParam" data-param="favorites">
        <?php echo $favoriteSelect; ?>
      </select>
      <select class="searchParam" data-param="ethnicity">
        <option value=''>Ethnicity</option>
        <?php echo $ethnicitySelect; ?>
      </select>
      <select class="searchParam" data-param="relationship">
        <option value=''>Relationship Status</option>
        <?php echo $relSelect; ?>
      </select>
      <select class="searchParam" data-param="body_hair">
        <option value=''>Body Hair</option>
        <?php echo $hairSelect; ?>
      </select>
    </div>
    <div class="searchCol rightCol">
        <input class="searchParam" data-param="city" placeholder="City" value="<?php echo urldecode($city); ?>" />
        <input class="searchParam" data-param="state" placeholder="State" value="<?php echo urldecode($state); ?>" />
        <input class="searchParam" data-param="search" placeholder="Query" value="<?php echo urlencode($search); ?>" />
        <div id="appSearchSubmit" data-url="sector3.php">Search</div>
    </div>
  </div>
</div>
