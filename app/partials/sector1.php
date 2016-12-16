<?php
include('../includes/prometheus.php');

$favorites = (isset($_GET['favorites']) ? $_GET['favorites'] : 'No');
$limit = (isset($_GET['limit']) ? $_GET['limit'] : '300');
$page = (isset($_GET['page']) ? $_GET['page'] : '1');
$url = "http://v9.ikioskcloudapps.com/shield/x-gene/sector1?favorites=".$favorites."&limit=".$limit."&page=".$page;
$request_headers = array();

$fetchData = curl_handler($url, $request_headers, $blank, "GET");
$sectorData = json_decode($fetchData ,true);
$ajaxScripts = "";
echo "<div class='appGrid'>";
foreach($sectorData['data'] as $key => $user) {
  $userData = json_encode($user);
  echo "<div class='gridItem grindrUser overlayLink' data-target='grindrUser' data-grid-id='".$user['profile_id']."'></div>";
  $ajaxScripts .= "prometheus.gridData['".$user['profile_id']."'] = ".$userData.";\r\n";
}
echo "</div>";
echo "<script id='ajaxScript'>\r\n";
echo $ajaxScripts;
echo "</script>\r\n";
//print_r($fetchData);
?>
