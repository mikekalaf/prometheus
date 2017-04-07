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
    $prev = " data-prev='jackd-".$sectorData['data'][$offset]['profile_no']."' ";
  }
  if($i < $userCount) {
    $offset = $i+1;
    $next = " data-next='jackd-".$sectorData['data'][$offset]['profile_no']."' ";
  }
  if($i == $userCount) {
    $loadNextPage = " data-loadnextpage='Yes' ";
  }
  if($page > 1 && $i == 0) {
    $loadPrevPage = " data-loadprevpage='Yes' ";
  }
  $user['date_modified'] = date('M d Y, g:ia', strtotime($user['date_modified']));
  $user['profile_photo'] = "";
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
  $cdnScan = "";
  $cdnData = "";
  if($user['image_scan'] == '0') {
    $cdnScan = " fetchcdn ";
    $cdnData = " data-cdn = '".$user['protocol_id']."'";
    $thumbnail = "https://skynet.chasingthedrift.com/pages/embed/imageProxy.php?image=".$user['profile_photo']."s";
  } else {
    $thumbnail = str_replace('http://s.jackd.mobi/','https://cdn.chasingthedrift.com/prometheus/jackd/', $user['profile_photo']);
    $thumbnail .= "s";
  }
  echo "<div id='jackd-".$user['profile_no']."' class='gridItem cerebroProfile overlayLink ".$cdnScan."' data-url='partials/cerebro/jackd.php?id=".$user['profile_no']."' ".$cdnData.$loadPrevPage.$loadNextPage.$prev.$next." data-target='cerebroProfile' style='background-image: url(".$thumbnail.");'></div>";
  $i++;
}
echo "</div>";
?>
