<?php
include('../includes/prometheus.php');

$favorites = (isset($_GET['favorites']) ? $_GET['favorites'] : 'No');
$limit = (isset($_GET['limit']) ? $_GET['limit'] : '150');
$page = (isset($_GET['page']) ? $_GET['page'] : '1');

$prevPage = $page - 1;
$nextPage = $page + 1;
$navQuery = "&favorites=".$favorites."&limit=".$limit;

$url = "http://v9.ikioskcloudapps.com/shield/x-gene/sector3?favorites=".$favorites."&limit=".$limit."&page=".$page;
$request_headers = array();

$fetchData = curl_handler($url, $request_headers, $blank, "GET");
$sectorData = json_decode($fetchData ,true);
$ajaxScripts = "";

include ('sector3Search.php');
echo "<div class='appGrid'>";
foreach($sectorData['data'] as $key => $user) {
  $user['date_modified'] = date('M d Y, g:ia', strtotime($user['date_modified']));
  $userData = json_encode($user);
  echo "<div class='gridItem scruffUser overlayLink' data-target='scruffUser' data-grid-id='".$user['profile_id']."' style='background-image: url(".$user['thumbnail'].");'></div>";
  //echo "<div class='gridItem grindrUser overlayLink' data-target='grindrUser' data-grid-id='".$user['profile_id']."'></div>";
  $ajaxScripts .= "prometheus.gridData['".$user['profile_id']."'] = ".$userData.";\r\n";
}
echo "</div>";
echo "<script id='ajaxScript'>\r\n";
echo $ajaxScripts;
echo "</script>\r\n";
//print_r($fetchData);
?>
