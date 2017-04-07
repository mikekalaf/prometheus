<?php
$scruffUserCount = count($scruffUsers['results']) - 1;
$i = 0;
$scruffArray = $scruffUsers['results'];
foreach ($scruffUsers['results'] as $key => $user) {
  $indicators = "";
  $prev = "";
  $next = "";
  if($i > 0) {
    $offset = $i-1;
    $prev = " data-prev='scruff-".$scruffArray[$offset]['id']."' ";
  }
  if($i < $scruffUserCount) {
    $offset = $i+1;
    $next = " data-next='scruff-".$scruffArray[$offset]['id']."' ";
  }
  echo "<div id='scruff-".$user['id']."' class='gridInit cerebroProfile overlayLink' data-target='cerebroProfile' data-url='partials/cerebro/scruff.php?id=".$user['id']."' ".$prev.$next." style='background-image: url(https://cdn-profiles.scruffapp.com/".$user['id']."-thumbnail?version=14)'></div>";
  $i++;
}
 ?>
