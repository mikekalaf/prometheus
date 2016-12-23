<?php

$scruffUserCount = count($scruffUsers['results']);
foreach ($scruffUsers['results'] as $key => $user) {
  echo "<div class='gridItem' style='background-image: url(".$user['thumbnail_url'].")'></div>";
}
 ?>
