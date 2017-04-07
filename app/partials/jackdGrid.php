<?php
 $jackdUserCount = count($jackdUsers) - 1;
 $i = 0;
 foreach ($jackdUsers as $key => $user) {
   $indicators = "";
   $prev = "";
   $next = "";
   if($i > 0) {
     $offset = $i-1;
     $prev = " data-prev='jackd-".$jackdUsers[$offset]['userNo']."' ";
   }
   if($i < $jackdUserCount) {
     $offset = $i+1;
     $next = " data-next='jackd-".$jackdUsers[$offset]['userNo']."' ";
   }
    if (!empty($user['publicPicture1'])) {
        $photo = $user['publicPicture1'];
    } else if (!empty($user['publicPicture2'])) {
        $photo = $user['publicPicture2'];
    } else {
        $photo = $user['publicPicture3'];
    }
    echo "<div id='jackd-".$user['userNo']."' class='gridInit cerebroProfile overlayLink' data-target='cerebroProfile' data-url='partials/cerebro/jackd.php?id=".$user['userNo']."' ".$prev.$next." style='background-image: url(https://skynet.chasingthedrift.com/pages/embed/imageProxy.php?image=http://s.jackd.mobi/".$photo."s)'></div>";
    $i++;
  }
?>
