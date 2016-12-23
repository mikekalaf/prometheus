<?php
$grindrUserCount = count($grindrUsers['profiles']);
$grindrUsers = $grindrUsers['profiles'];
foreach ($grindrUsers as $key => $user) {
  echo "<div class='gridInit' style='background-image: url(https://cdns.grindr.com/images/thumb/320x320/".$user['profileImageMediaHash'].");'></div>";
}
?>
