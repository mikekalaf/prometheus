<?php

//Page Filters
// $totalPages = $sectorData['last_page'];
// $currentPage = $sectorData['current_page'];
// $pageLimit = 6;
// $pageOptions = "";
//
// $lastFiveLimit = $totalPages - $pageLimit;
// $i = 1;
// do {
//   $selected = "";
//   if ($i == $currentPage) { $selected = " selected";}
//   $pageOptions .= "<option value='".$i."'".$selected.">".$i."</option>";
//   $i++;
// } while ($i <= $pageLimit);
//
// $i = $lastFiveLimit;
// do {
//   if ($i > 0) {
//     $selected = "";
//     if ($i == $currentPage) { $selected = " selected";}
//     $pageOptions .= "<option value='".$i."'".$selected.">".$i."</option>";
//   }
//   $i++;
// } while ($i < $totalPages);

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
$ethnicityOptions[4] = "Middle Eastern";
$ethnicityOptions[5] = "Mixed";
$ethnicityOptions[6] = "Native American";
$ethnicityOptions[7] = "White";
$ethnicityOptions[8] = "Other";
$ethnicityOptions[9] = "South Asian";

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
$relOptions[3] = "Exclusive";
$relOptions[4] = "Committed";
$relOptions[5] = "Partnered";
$relOptions[6] = "Engaged";
$relOptions[7] = "Married";
$relOptions[8] = "Open Relationship";

$relSelect = "";
foreach($relOptions as $key => $value) {
  $selected = "";
  if ($key == $relationship) { $selected = " selected"; }
  $relSelect .= "<option value='".$key."'".$selected.">".$value."</option>";
}


 ?>
<div id="appSearch">
  <div class="appNav">
    <?php
      if (!empty($sectorData['prev_page_url'])) {
        echo "<div class='navButton navTrigger' data-url='partials/sector1.php?page=".$prevPage.$navQuery."'><i class='fa fa-chevron-left'></i></div>";
      }
        echo "<div class='navLabel'>".number_format($sectorData['from'])." to ".number_format($sectorData['to'])." of ".number_format($sectorData['total'])."</div>";
      if (!empty($sectorData['next_page_url'])) {
        echo "<div class='navButton navTrigger' data-url='partials/sector1.php?page=".$nextPage.$navQuery."'><i class='fa fa-chevron-right'></i></div>";
      }
      ?>
  </div>
  <div class="searchWrapper">
    <div class="searchCol leftCol">
      <select class="searchParam" data-param="ethnicity">
        <option value=''>Ethnicity</option>
        <?php echo $ethnicitySelect; ?>
      </select>
      <select class="searchParam" data-param="relationship">
        <option value=''>Relationship Status</option>
        <?php echo $relSelect; ?>
      </select>
      <select class="searchParam" data-param="favorites">
        <?php echo $favoriteSelect; ?>
      </select>
      <input class="searchParam last" data-param="search" placeholder="Query" value="<?php echo urlencode($search); ?>" />
    </div>
    <div class="searchCol rightCol">
      <input class="searchParam" data-param="age" placeholder="Age" value="<?php echo urldecode($age); ?>" />
      <input class="searchParam" data-param="city" placeholder="City" value="<?php echo urldecode($city); ?>" />
      <input class="searchParam" data-param="state" placeholder="State" value="<?php echo urldecode($state); ?>" />
        <div id="appSearchSubmit" data-url="sector1.php">Search</div>
    </div>
  </div>
</div>
