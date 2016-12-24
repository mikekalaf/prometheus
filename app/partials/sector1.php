<?php
require('../includes/skynet.php');
if (!isset($_SESSION['authToken'])) {
  login_grindr();
}

$favorites = (isset($_GET['favorites']) ? $_GET['favorites'] : 'No');
$limit = (isset($_GET['limit']) ? $_GET['limit'] : '150');
$page = (isset($_GET['page']) ? $_GET['page'] : '1');
$ethnicity = (isset($_GET['ethnicity']) ? $_GET['ethnicity'] : '');
$relationship = (isset($_GET['relationship']) ? $_GET['relationship'] : '');
$search = (isset($_GET['search']) ? urlencode($_GET['search']) : '');
$age = (isset($_GET['age']) ? urlencode($_GET['age']) : '');
$city = (isset($_GET['city']) ? urlencode($_GET['city']) : '');
$state = (isset($_GET['state']) ? urlencode($_GET['state']) : '');

$prevPage = $page - 1;
$nextPage = $page + 1;
$navQuery = "&favorites=".$favorites."&limit=".$limit."&ethnicity=".$ethnicity."&relationship=".$relationship."&search=".$search."&city=".$city."&state=".$state."&age=".$age;

$url = "http://v9.ikioskcloudapps.com/shield/x-gene/sector1?page=".$page.$navQuery;
$request_headers = array();

$fetchData = curl_handler($url, $request_headers, $blank, "GET");
$sectorData = json_decode($fetchData ,true);
$ajaxScripts = "";

include ('sector1Search.php');
echo "<div class='appGrid'>";
$userCount = count($sectorData['data']) - 1;
$i = 0;
foreach($sectorData['data'] as $key => $user) {

  $indicators = "";
  $prev = "";
  $next = "";
  $loadNextPage = "";
  $loadPrevPage = "";
  if($i > 0) {
    $offset = $i-1;
    $prev = " data-prev='grindr-".$sectorData['data'][$offset]['profile_id']."' ";
  }
  if($i < $userCount) {
    $offset = $i+1;
    $next = " data-next='grindr-".$sectorData['data'][$offset]['profile_id']."' ";
  }
  if($i == $userCount) {
    $loadNextPage = " data-loadnextpage='Yes' ";
  }
  if($page > 1 && $i == 0) {
    $loadPrevPage = " data-loadprevpage='Yes' ";
  }
  $user['date_modified'] = date('M d Y, g:ia', strtotime($user['date_modified']));
  $userData = json_encode($user);
  echo "<div id='grindr-".$user['profile_id']."' class='gridItem cerebroProfile overlayLink' data-url='partials/cerebro/grindr.php?id=".$user['profile_id']."' ".$loadPrevPage.$loadNextPage.$prev.$next." data-target='cerebroProfile' style='background-image: url(".$user['thumbnail'].");'></div>";
  $i++;
}
echo "</div>";
?>
