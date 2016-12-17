<?php
include('../includes/prometheus.php');

$favorites = (isset($_GET['favorites']) ? $_GET['favorites'] : 'No');
$limit = (isset($_GET['limit']) ? $_GET['limit'] : '150');
$page = (isset($_GET['page']) ? $_GET['page'] : '1');
$url = "http://v9.ikioskcloudapps.com/shield/x-gene/sector2?favorites=".$favorites."&limit=".$limit."&page=".$page;
$request_headers = array();

$fetchData = curl_handler($url, $request_headers, $blank, "GET");
$sectorData = json_decode($fetchData ,true);
$ajaxScripts = "";
echo "<div class='appGrid'>";
foreach($sectorData['data'] as $key => $user) {
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
  echo "<div class='gridItem jackdUser overlayLink' data-target='jackdUser' data-grid-id='".$user['profile_no']."' style='background-image: url(".$user['profile_photo']."s);'></div>";
  //echo "<div class='gridItem grindrUser overlayLink' data-target='grindrUser' data-grid-id='".$user['profile_id']."'></div>";
  $ajaxScripts .= "prometheus.gridData['".$user['profile_no']."'] = ".$userData.";\r\n";
}
echo "</div>";
echo "<script id='ajaxScript'>\r\n";
echo $ajaxScripts;
echo "</script>\r\n";
//print_r($fetchData);
?>
