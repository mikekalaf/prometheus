<?php
require('../../includes/skynet.php');

if (isset($_GET['app']) && isset($_GET['id'])) {
    if ($_GET['app'] == "grindr") {
        $userGeoMap = json_encode(getGrindrGeoMap($_GET['id']));
    }
    if ($_GET['app'] == "jackd") {
        $userGeoMap = json_encode(getJackdGeoMap($_GET['id']));
    }
    if ($_GET['app'] == "scruff") {
        $userGeoMap = json_encode(getScruffGeoMap($_GET['id']));
    }
}
if ($userGeoMap) {
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>GeoLocation Protocol - S.H.I.E.L.D. Command</title>
    <script
        src="https://code.jquery.com/jquery-3.1.1.min.js"
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
        crossorigin="anonymous"></script>
    <script type="text/javascript" src="../../assets/js/math.js"></script>
    <script type="text/javascript" src="../../assets/js/geoLocation.js"></script>
    <script type="text/javascript">
        var cerebroBeacons = <?php echo $userGeoMap; ?>;
        console.log(cerebroBeacons);
        var userLocation = trilaterate(cerebroBeacons);
        console.log(userLocation);
    </script>
</head>
<body style="margin: 0px;">
<iframe id="geoLocation" style="border:none;width:100%; height:250px;"></iframe>
<script type="text/javascript">
    document.getElementById('geoLocation').src = "https://www.google.com/maps/embed/v1/search?key=AIzaSyCuVIyhoWZ0kI2uHPuBGjaXMLb6dmkMg-A&q=loc:" + userLocation.lat + ", " + userLocation.lon;
    $.ajax({url: "track.php?protocol_id=<?php echo $_GET['protocol_id']; ?>&lat="+userLocation.lat+"&long="+userLocation.lon, success: function(result){
            console.log('Tracking user location...')
        }});
</script>
</body>
</html>
<?php } ?>
