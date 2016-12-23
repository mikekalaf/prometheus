<?php
$grindrUserCount = count($grindrUsers['profiles']) - 1;
$grindrUsers = $grindrUsers['profiles'];
$i = 0;
foreach ($grindrUsers as $key => $user) {
  $indicators = "";
  $prev = "";
  $next = "";
  if($i > 0) {
    $offset = $i-1;
    $prev = "&prev=".$grindrUsers[$offset]['profileId'];
  }
  if($i < $grindrUserCount) {
    $offset = $i+1;
    $next = "&next=".$grindrUsers[$offset]['profileId'];
  }
  echo "<div class='gridInit cerebroProfile' data-url='partials/cerebro/grindr.php?id=".$user['profileId'].$prev.$next."' style='background-image: url(https://cdns.grindr.com/images/thumb/320x320/".$user['profileImageMediaHash'].");'></div>";
  $i++;
}
?>
