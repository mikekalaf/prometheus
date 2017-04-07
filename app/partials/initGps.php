<?php
  include('../includes/skynet.php');
  if (isset($_GET['lat']) && isset($_GET['long'])) {
    $lat = $_GET['lat'];
    $long = $_GET['long'];
    $_SESSION['lat'] = $lat;
    $_SESSION['long'] = $long;
    echo "GPS: ".$lat.", ".$long;
  }
?>
