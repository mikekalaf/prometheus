<?php
include('../includes/prometheus.php');

$favorites = (isset($_GET['favorites']) ? $_GET['favorites'] : 'No');
$limit = (isset($_GET['limit']) ? $_GET['limit'] : '150');
$page = (isset($_GET['page']) ? $_GET['page'] : '1');
$ethnicity = (isset($_GET['ethnicity']) ? $_GET['ethnicity'] : '');
$relationship = (isset($_GET['relationship']) ? $_GET['relationship'] : '');
$search = (isset($_GET['search']) ? urlencode($_GET['search']) : '');
$age = (isset($_GET['age']) ? urlencode($_GET['age']) : '');
$city = (isset($_GET['city']) ? urlencode($_GET['city']) : '');
$state = (isset($_GET['state']) ? urlencode($_GET['state']) : '');
$body_hair = (isset($_GET['body_hair']) ? $_GET['body_hair'] : '');

$prevPage = $page - 1;
$nextPage = $page + 1;
$navQuery = "&favorites=".$favorites."&limit=".$limit."&ethnicity=".$ethnicity."&relationship=".$relationship."&search=".$search."&city=".$city."&state=".$state."&age=".$age."&body_hair=".$body_hair;

$url = "http://v9.ikioskcloudapps.com/shield/x-gene/sector3?page=".$page.$navQuery;
$request_headers = array();

$fetchData = curl_handler($url, $request_headers, $blank, "GET");
$sectorData = json_decode($fetchData ,true);
$ajaxScripts = "";

include ('sector3Search.php');
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
    $prev = " data-prev='".$sectorData['data'][$offset]['protocol_id']."' ";
  }
  if($i < $userCount) {
    $offset = $i+1;
    $next = " data-next='".$sectorData['data'][$offset]['protocol_id']."' ";
  }
  if($i == $userCount) {
    $loadNextPage = " data-loadnextpage='Yes' ";
  }
  if($page > 1 && $i == 0) {
    $loadPrevPage = " data-loadprevpage='Yes' ";
  }
  $user['date_modified'] = date('M d Y, g:ia', strtotime($user['date_modified']));
  $userData = json_encode($user);
  $favoriteUser = " data-favorite='".$user['favorite']."' ";
  echo "<div id='".$user['protocol_id']."' class='gridItem scruffUser overlayLink' ".$loadPrevPage.$loadNextPage.$prev.$next.$favoriteUser." data-target='scruffUser' data-grid-id='".$user['profile_id']."' style='background-image: url(".$user['thumbnail'].");'></div>";
  //echo "<div class='gridItem grindrUser overlayLink' data-target='grindrUser' data-grid-id='".$user['profile_id']."'></div>";
  $ajaxScripts .= "prometheus.gridData['".$user['profile_id']."'] = ".$userData.";\r\n";
  $i++;
}
echo "</div>";
echo "<script id='ajaxScript'>\r\n";
echo $ajaxScripts;
echo "</script>\r\n";
//print_r($fetchData);
?>
