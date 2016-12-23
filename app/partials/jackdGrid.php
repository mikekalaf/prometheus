<?php
 $jackdUserCount = count($jackdUsers);
 foreach ($jackdUsers as $key => $user) {
   $user = get_object_vars($user);
    if (!empty($user['publicPicture1'])) {
        $photo = $user['publicPicture1'];
    } else if (!empty($user['publicPicture2'])) {
        $photo = $user['publicPicture2'];
    } else {
        $photo = $user['publicPicture3'];
    }
    echo "<div class='gridItem' style='background-image: url(https://skynet.chasingthedrift.com/pages/embed/imageProxy.php?image=http://s.jackd.mobi/".$photo."s)'></div>";
  }
?>
