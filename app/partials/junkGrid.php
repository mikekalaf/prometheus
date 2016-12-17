<?php
include('../includes/prometheus.php');
$favorites = (isset($_GET['favorites']) ? $_GET['favorites'] : 'false');
$limit = (isset($_GET['limit']) ? $_GET['limit'] : '150');
$page = (isset($_GET['page']) ? $_GET['page'] : '1');
$order = (isset($_GET['order']) ? $_GET['order'] : 'date_added');
$site = (isset($_GET['site']) ? $_GET['site'] : 'all');
$type = (isset($_GET['type']) ? $_GET['type'] : 'all');

$prevPage = $page - 1;
$nextPage = $page + 1;
$navQuery = "&favorites=".$favorites."&limit=".$limit;

$url = "http://v9.ikioskcloudapps.com/junkcollector/images?favorites=".$favorites."&limit=".$limit."&page=".$page."&order=".$order."&site=".$site."&type=".$type;
$request_headers = array();

$fetchData = curl_handler($url, $request_headers, $blank, "GET");
$sectorData = json_decode($fetchData ,true);

include ('junkSearch.php');
echo "<div class='appGrid'>";
foreach($sectorData['data'] as $key => $media) {
  $media['date_added'] = date('M d Y, g:ia', strtotime($media['date_added']));
  if ($media['media_type'] == "video") { $media['image_url'] = $media['video_poster'];};
  echo "<div class='gridItem junkMedia overlayLink' data-target='junkMedia' data-grid-id='".$media['image_id']."' style='background-image: url(".$media['image_url'].");'></div>";
}
echo "</div>";
?>
