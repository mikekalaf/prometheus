<?php
include('../includes/prometheus.php');

$favorites = (isset($_GET['favorites']) ? $_GET['favorites'] : 'No');
$limit = (isset($_GET['limit']) ? $_GET['limit'] : '150');
$page = (isset($_GET['page']) ? $_GET['page'] : '1');
$private = (isset($_GET['private']) ? $_GET['private'] : 'No');
$ethnicity = (isset($_GET['ethnicity']) ? $_GET['ethnicity'] : '');
$city = (isset($_GET['city']) ? urlencode($_GET['city']) : '');
$state = (isset($_GET['state']) ? urlencode($_GET['state']) : '');
$search = (isset($_GET['search']) ? urlencode($_GET['search']) : '');

$prevPage = $page - 1;
$nextPage = $page + 1;
$navQuery = "&favorites=".$favorites."&limit=".$limit."&private=".$private."&ethnicity=".$ethnicity."&city=".$city."&state=".$state."&search=".$search;

$url = "http://v9.ikioskcloudapps.com/shield/x-gene/sector2?page=".$page.$navQuery;
$request_headers = array();

$fetchData = curl_handler($url, $request_headers, $blank, "GET");
$sectorData = json_decode($fetchData ,true);
$ajaxScripts = "";

include ('sector2Search.php');
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
  if($page > 1) {
    $loadPrevPage = " data-loadprevpage='Yes' ";
  }
  $user['date_modified'] = date('M d Y, g:ia', strtotime($user['date_modified']));
  $user['profile_photo'] = "https://skynet.chasingthedrift.com/pages/embed/imageProxy.php?image=";
  if (!empty($user['photo1'])) {
    $user['profile_photo'] .= $user['photo1'];
  } else if (!empty($user['photo2'])) {
    $user['profile_photo'] .= $user['photo2'];
  } else if (!empty($user['photo3'])) {
    $user['profile_photo'] .= $user['photo3'];
  } else if (!empty($user['photo4'])) {
    $user['profile_photo'] .= $user['photo4'];
  } else if (!empty($user['photo5'])) {
    $user['profile_photo'] .= $user['photo5'];
  }
  $userData = json_encode($user);
  $favoriteUser = " data-favorite='".$user['favorite']."' ";
  echo "<div id='".$user['protocol_id']."' class='gridItem jackdUser overlayLink' ".$loadPrevPage.$loadNextPage.$prev.$next.$favoriteUser." data-target='jackdUser' data-grid-id='".$user['profile_no']."' style='background-image: url(".$user['profile_photo']."s);'></div>";
  //echo "<div class='gridItem grindrUser overlayLink' data-target='grindrUser' data-grid-id='".$user['profile_id']."'></div>";
  $ajaxScripts .= "prometheus.gridData['".$user['profile_no']."'] = ".$userData.";\r\n";
  $i++;
}
echo "</div>";
echo "<script id='ajaxScript'>\r\n";
echo $ajaxScripts;
echo "</script>\r\n";
//print_r($fetchData);
?>
