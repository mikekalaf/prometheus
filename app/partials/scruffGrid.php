<?php

$scruffUserCount = count($scruffUsers['results']);
foreach ($scruffUsers['results'] as $key => $user) {
  echo "<div class='gridInit' style='background-image: url(https://cdn-profiles.scruffapp.com/".$user['id']."-thumbnail?version=14)'></div>";
}
 ?>
