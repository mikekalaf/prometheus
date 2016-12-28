<?php
require('../../includes/skynet.php');

function recordTrack() {
  global $ikiosk, $database_ikiosk, $protocol_id, $thisLat, $thisLong;
  $trackingID = create_guid();
  $datecreated = date("Y-m-d H:i:s");

  $updateTracking = "INSERT INTO geo_tracking (`tracking_id`, `protocol_id`, `lat`, `lon`, `user_type`,`date_created`) VALUES ('".$trackingID."', '".$protocol_id."', '".$thisLat."', '".$thisLong."', '".$thisUserType."','".$datecreated."')";
  mysql_select_db($database_ikiosk, $ikiosk);
  $result = mysql_query($updateTracking, $ikiosk) or die(mysql_error());
  echo "User tracking complete";
}


if (isProd() && (!empty($_GET['protocol_id'])) && (!empty($_GET['lat'])) && (!empty($_GET['long']))) {

  $datecreated = date("Y-m-d H:i:s");
  $protocol_id = addslashes($_GET['protocol_id']);
  $thisLat = addslashes($_GET['lat']);
  $thisLong = addslashes($_GET['long']);
  $thisUserType = addslashes($_GET['user_type']);

  mysql_select_db($database_ikiosk, $ikiosk);
  $query_checkScan = "SELECT * FROM geo_tracking WHERE protocol_id = '".$protocol_id."' ORDER BY date_created DESC LIMIT 1";
  $checkScan = mysql_query($query_checkScan, $ikiosk) or die(mysql_error());
  $row_checkScan = mysql_fetch_assoc($checkScan);
  $totalRows_checkScan = mysql_num_rows($checkScan);

  if ($totalRows_checkScan == 0){
    recordTrack();
  } else {
    //Compare timestamp
    $currentTime = round(microtime(true) * 1000);
    $trackedTime = round(strtotime($row_checkScan['date_created']) * 1000);
    $timeDiff = $currentTime - $trackedTime;
    $minutes = floor($timeDiff / 60000);
    if ($minutes >= 60) {
      recordTrack();
    } else {
      echo "Tracking threshold not met.  Ignoring request.";
    }
  }
}
?>
