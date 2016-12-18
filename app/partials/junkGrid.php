<?php
include('../includes/prometheus.php');
$favorites = (isset($_GET['favorites']) ? $_GET['favorites'] : 'false');
$limit = (isset($_GET['limit']) ? $_GET['limit'] : '150');
$page = (isset($_GET['page']) ? $_GET['page'] : '1');
$order = (isset($_GET['order']) ? $_GET['order'] : 'date_added');
$site = (isset($_GET['site']) ? $_GET['site'] : 'all');
$type = (isset($_GET['type']) ? $_GET['type'] : 'all');
$search = (isset($_GET['search']) ? urlencode($_GET['search']) : '');

$prevPage = $page - 1;
$nextPage = $page + 1;
$navQuery = "&favorites=".$favorites."&limit=".$limit."&order=".$order."&site=".$site."&type=".$type."&search=".$search;

$url = "http://v9.ikioskcloudapps.com/junkcollector/images?page=".$page.$navQuery;
$request_headers = array();

$fetchData = curl_handler($url, $request_headers, $blank, "GET");
$sectorData = json_decode($fetchData ,true);

include ('junkSearch.php');
echo "<div class='appGrid'>";
$imageCount = count($sectorData['data']);
$i = 0;
foreach($sectorData['data'] as $key => $media) {
  $indicators = "";
  $prev = "";
  $next = "";
  if($i > 0) {
    $offset = $i-1;
    $prev = " data-prev='".$sectorData['data'][$offset]['image_id']."' data-prevtype='".$sectorData['data'][$offset]['media_type']."' ";
  }
  if($i < $imageCount) {
    $offset = $i+1;
    $next = " data-next='".$sectorData['data'][$offset]['image_id']."' data-nexttype='".$sectorData['data'][$offset]['media_type']."' ";
  }
  if($media['media_type'] == "video") {
    $media['image'] = $media['video_poster'];
    $indicators .= "<span class='indicator video'><i class='fa fa-video-camera'></i></span>";
  } else {
    $media['image'] =  str_replace('_500', '_250', $media['image_url']);
    $media['image'] =  str_replace('_400', '_250', $media['image_url']);
    $media['image'] =  str_replace('_1280', '_250', $media['image_url']);
  }
  $media['date_added'] = date('M d Y, g:ia', strtotime($media['date_added']));
  echo "<div id='".$media['image_id']."' class='gridItem junkMedia overlayLink' ".$prev.$next." data-favorite='".$media['favorite']."' data-url='".$media['image_url']."' data-type='".$media['media_type']."' data-target='junkMedia' data-grid-id='".$media['image_id']."' style='background-image: url(".$media['image'].");'>".$indicators."</div>";
  $i++;
}
echo "</div>";
?>
