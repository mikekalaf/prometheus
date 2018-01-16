<?php
  header("Access-Control-Allow-Origin: *");
  ob_start();
  session_start();
  ob_implicit_flush(true);
  ob_end_flush();
  error_reporting(E_ERROR);

  if (isProd()) {
    $hostname_ikiosk = "db587743234.db.1and1.com";
    $database_ikiosk = "db587743234";
    $username_ikiosk = "dbo587743234";
    $password_ikiosk = "remixceo01";
    $ikiosk = mysql_connect($hostname_ikiosk, $username_ikiosk, $password_ikiosk);
  }
  require('geohash.class.php');
  require('managedFields.php');

  function getCerebroStats() {
    $url = "http://phoenix.chasingthedrift.com/stats.php";
    $request_headers = [];
    $results = curl_handler($url, $request_headers, $data, "GET");
    return json_decode($results, true);
  }

  function getUserLocationHistory($id) {
    $locationHistory = array();
    global $ikiosk, $database_ikiosk;
    if (isProd()) {
      mysql_select_db($database_ikiosk, $ikiosk);
      $query_checkScan = "SELECT * FROM geo_tracking WHERE protocol_id = '".$id."' ORDER BY date_created DESC LIMIT 10";
      $checkScan = mysql_query($query_checkScan, $ikiosk) or die(mysql_error());
      $row_checkScan = mysql_fetch_assoc($checkScan);
      $totalLocations = mysql_num_rows($checkScan);
      if ($totalLocations != 0) {
        do {
          $timeConversion = strtotime($row_checkScan['date_created']);
          $locationDesc = getAddress($row_checkScan['lat'].",".$row_checkScan['lon']);
          $row_checkScan['timeDisplay'] = date('M j, Y g:ia', $timeConversion);
          $row_checkScan['locationDesc'] = $locationDesc['geo_location'];
          $locationHistory[] = $row_checkScan;
        } while ($row_checkScan = mysql_fetch_assoc($checkScan));
      }
      return $locationHistory;
    }
  }

  function getPhotoArchives($id) {
    global $ikiosk, $database_ikiosk;
    $photos = array();
    mysql_select_db($database_ikiosk, $ikiosk);
    $query_checkScan = "SELECT * FROM photo_tracking WHERE protocol_id = '".$id."'";
    $checkScan = mysql_query($query_checkScan, $ikiosk) or die(mysql_error());
    $row_checkScan = mysql_fetch_assoc($checkScan);
    $photos['count'] = mysql_num_rows($checkScan);
    do {
    $photos[] = $row_checkScan;
    } while ($row_checkScan = mysql_fetch_assoc($checkScan));
    return $photos;
  }

  function getUnlockedJackd() {
      global $ikiosk, $database_ikiosk;
      $unlocked = array();
      mysql_select_db($database_ikiosk, $ikiosk);
      $query_checkScan = "SELECT * FROM profiles_jackd WHERE (photo4 !='' OR photo5 !='') ORDER BY date_modified DESC LIMIT 100";
      $checkScan = mysql_query($query_checkScan, $ikiosk) or die(mysql_error());
      $row_checkScan = mysql_fetch_assoc($checkScan);
      do {
      $unlocked[] = $row_checkScan;
      } while ($row_checkScan = mysql_fetch_assoc($checkScan));
      return $unlocked;
  }

  function jackdUpdatePhotos($user) {
      global $ikiosk, $database_ikiosk;
      $trackingID = create_guid();
      $datemodified = date("Y-m-d H:i:s");

      if (!empty($user['userNo'])) {
          $localUser = getShieldProfile("profiles_jackd", "profile_no", $user['userNo']);

          $remote = array();
          $remotePrefix = "http://s.jackd.mobi/";
          $remote['photo1'] = $remotePrefix.$user['publicPicture1'];
          $remote['photo2'] = $remotePrefix.$user['publicPicture2'];
          $remote['photo3'] = $remotePrefix.$user['publicPicture3'];
          //$remote['photo4'] = $remotePrefix.$user['privatePicture1'];
          //$remote['photo5'] = $remotePrefix.$user['privatePicture2'];

          $local = array();
          $local['photo1'] = $localUser['photo1'];
          $local['photo2'] = $localUser['photo2'];
          $local['photo3'] = $localUser['photo3'];
          //$local['photo4'] = $localUser['photo4'];
          //$local['photo5'] = $localUser['photo5'];

          foreach ($remote as $key =>  $photo) {
            if (!empty($remote[$key]) && $remote[$key] != $remotePrefix."0") {
                  if($remote[$key] != $local[$key]) {
                    //Save Current Photo
                    // $photoArchive = "INSERT INTO photo_tracking (`tracking_id`, `protocol_id`, `photo_url`, `date_created`) VALUES ('".$trackingID."', '".$localUser['protocol_id']."', '".$local[$key]."', '".$datemodified."')";
                    // mysql_select_db($database_ikiosk, $ikiosk);
                    // $result = mysql_query($photoArchive, $ikiosk) or die(mysql_error());

                    //Update with Remote Photo
                    $updateSQL = "UPDATE profiles_jackd SET ".$key." = '".$remote[$key]."', date_modified = '" . $datemodified . "' WHERE protocol_id = '" . $localUser['protocol_id'] . "'";
                    mysql_select_db($database_ikiosk, $ikiosk);
                    $Result1 = mysql_query($updateSQL, $ikiosk) or die(mysql_error());
                  }
            }
          }
      }
  }

  function scruffUpdatePhotos($user) {
    global $ikiosk, $database_ikiosk;

    $trackingID = create_guid();
    $datemodified = date("Y-m-d H:i:s");

    if (!empty($user['id'])) {
      $localUser = getShieldProfile("profiles_scruff", "profile_id", $user['id']);
      $remotePhoto = $user['image_url'];
      if ($remotePhoto != $localUser['profile_photo']) {
        $photoArchive = "INSERT INTO photo_tracking (`tracking_id`, `protocol_id`, `photo_url`, `date_created`) VALUES ('".$trackingID."', '".$localUser['protocol_id']."', '".$localUser['profile_photo']."', '".$datemodified."')";
        mysql_select_db($database_ikiosk, $ikiosk);
        $result = mysql_query($photoArchive, $ikiosk) or die(mysql_error());

        $updateSQL = "UPDATE profiles_scruff SET profile_photo = '".$remotePhoto."', thumbnail = '".$user['thumbnail_url']."', date_modified = '" . $datemodified . "' WHERE protocol_id = '" . $localUser['protocol_id'] . "'";
        mysql_select_db($database_ikiosk, $ikiosk);
        $Result1 = mysql_query($updateSQL, $ikiosk) or die(mysql_error());
      }
    }
  }

  function grindrUpdatePhotos($user) {
      global $ikiosk, $database_ikiosk;

      $trackingID = create_guid();
      $datemodified = date("Y-m-d H:i:s");

      if (!empty($user['profileId'])) {
          $localUser = getShieldProfile("profiles_grindr", "profile_id", $user['profileId']);
          $remotePhoto = "https://cdns.grindr.com/images/profile/1024x1024/".$user['profileImageMediaHash'];
          if ($remotePhoto != $localUser['profile_photo']) {
              $photoArchive = "INSERT INTO photo_tracking (`tracking_id`, `protocol_id`, `photo_url`, `date_created`) VALUES ('".$trackingID."', '".$localUser['protocol_id']."', '".$localUser['profile_photo']."', '".$datemodified."')";
              mysql_select_db($database_ikiosk, $ikiosk);
              $result = mysql_query($photoArchive, $ikiosk) or die(mysql_error());

              $updateSQL = "UPDATE profiles_grindr SET profile_photo = 'https://cdns.grindr.com/images/profile/1024x1024/" . $user['profileImageMediaHash'] . "', thumbnail = 'https://cdns.grindr.com/images/thumb/320x320/" . $user['profileImageMediaHash'] . "', date_modified = '" . $datemodified . "' WHERE protocol_id = '" . $localUser['protocol_id'] . "'";
              mysql_select_db($database_ikiosk, $ikiosk);
              $Result1 = mysql_query($updateSQL, $ikiosk) or die(mysql_error());
          }
      }
  }


  function generateGeoMap($userLat, $userLon) {

      if (empty($userLat) && empty($userLon)) {
        $geoLat = floatval($_SESSION['lat']);
        $geoLong = floatval($_SESSION['long']);
      } else {
        $geoLat = floatval($userLat);
        $geoLong = floatval($userLon);
      }

      $geoMap = array();
      $geoMap[0]['lat'] = $geoLat;
      $geoMap[0]['lon'] = $geoLong;
      $geoMap[1]['lat'] = $geoLong + ((randomGeo() - 0.5) / 100);
      $geoMap[1]['lon'] = $geoLong + ((randomGeo() - 0.5) / 100);
      $geoMap[2]['lat'] = $geoLat + ((randomGeo() - 0.5) / 100);
      $geoMap[2]['lon'] = $geoLong + ((randomGeo() - 0.5) / 100);

      do {
          $geoMap[1]['lat'] = $geoLat + ((randomGeo() - 0.5) / 100);
      } while ($geoMap[1]['lat'] == $geoMap[2]['lat']);

      do {
          $geoMap[1]['lon'] = $geoLong + ((randomGeo() - 0.5) / 100);
      } while ($geoMap[1]['lon'] == $geoMap[2]['lon']);

      return $geoMap;
  }

  function getJackdGeoMapRemote($id, $lat, $lng) {
    $geoMap = generateGeoMap($lat, $lng);
    foreach($geoMap as $key => $value) {
        $loginQuery = "client_version=3.0.2&device_id=12E950F5-E1FC-4F62-B28E-D08529F27CA3&email=shieldos.jack%40gmail.com&lang=en&lat=" . $geoMap[$key]['lat'] . "&lng=" . $geoMap[$key]['lon'] . "&m=l&model=iPhone&osType=i&password=remixceo01&systemName=iPhone%20OS&systemVersion=8.4";
        $loginFetch = curl_handler($url, $request_headers, $loginQuery, "POST");
        $loginResponse = json_decode($loginFetch, true);

        //Load Grid
        $gridQuery = "email=shieldos.jack%40gmail.com&ethnicity=&face=NO&isLocal=YES&isMetric=YES&isUserSpecifiedLocation=NO&lat=" . $geoMap[$key]['lat'] . "&lng=" . $geoMap[$key]['lon'] . "&local=&m=ml5&maxAge=99&maxHeight=271&maxWeight=180&minAge=18&minHeight=121&minWeight=45&newUsers=NO&online=YES&password=remixceo01&range=0.000000&scene=0&userNo=11380012&withPictures=YES";
        $gridFetch = curl_handler($url, $request_headers, $gridQuery, "POST");
        $gridResponse = json_decode($gridFetch, true);

        $userSearch = "email=shieldos.jack%40gmail.com&m=up2&password=remixceo01&targetUserNo=".$id."&userNo=11380012";
        $userProfile = curl_handler($url, $request_headers, $userSearch, "POST");
        $userData = json_decode($userProfile, true);
        $geoMap[$key]['dist'] = floatval($userData['distance'] * 1.60934);
    }
    return $geoMap;

  }

  function getJackdGeoMap($id) {
      $geoMap = generateGeoMap();
      foreach($geoMap as $key => $value) {
          $loginQuery = "client_version=3.0.2&device_id=12E950F5-E1FC-4F62-B28E-D08529F27CA3&email=shieldos.jack%40gmail.com&lang=en&lat=" . $geoMap[$key]['lat'] . "&lng=" . $geoMap[$key]['lon'] . "&m=l&model=iPhone&osType=i&password=remixceo01&systemName=iPhone%20OS&systemVersion=8.4";
          $loginFetch = curl_handler($url, $request_headers, $loginQuery, "POST");
          $loginResponse = json_decode($loginFetch, true);

          //Load Grid
          $gridQuery = "email=shieldos.jack%40gmail.com&ethnicity=&face=NO&isLocal=YES&isMetric=YES&isUserSpecifiedLocation=NO&lat=" . $geoMap[$key]['lat'] . "&lng=" . $geoMap[$key]['lon'] . "&local=&m=ml5&maxAge=99&maxHeight=271&maxWeight=180&minAge=18&minHeight=121&minWeight=45&newUsers=NO&online=YES&password=remixceo01&range=0.000000&scene=0&userNo=11380012&withPictures=YES";
          $gridFetch = curl_handler($url, $request_headers, $gridQuery, "POST");
          $gridResponse = json_decode($gridFetch, true);

          $userSearch = "email=shieldos.jack%40gmail.com&m=up2&password=remixceo01&targetUserNo=".$id."&userNo=11380012";
          $userProfile = curl_handler($url, $request_headers, $userSearch, "POST");
          $userData = json_decode($userProfile, true);
          $geoMap[$key]['dist'] = floatval($userData['distance'] * 1.60934);
      }
      return $geoMap;
  }

  function getScruffGeoMap($id) {
    $geoMap = generateGeoMap();
    foreach($geoMap as $key => $value) {
      $url = "https://app.scruffapp.com/app/profile?longitude=" . $geoMap[$key]['lon'] . "&latitude=" . $geoMap[$key]['lat'] . "&device_type=1&client_version=5.0120&target=" . $id;
      $request_headers = scruffGetHeaders();
      $scruff = curl_handler($url, $request_headers, "", "GET");
      $scruffData = json_decode($scruff, true);
      $geoMap[$key]['dist'] = floatval($scruffData['results'][0]['dst'] * 0.001);
    }
    return $geoMap;
  }

  function getScruffGeoMapRemote($id, $lat, $lng) {
    $geoMap = generateGeoMap($lat, $lng);
    foreach($geoMap as $key => $value) {
      $url = "https://app.scruffapp.com/app/profile?longitude=" . $geoMap[$key]['lon'] . "&latitude=" . $geoMap[$key]['lat'] . "&device_type=1&client_version=5.0120&target=" . $id;
      $request_headers = scruffGetHeaders();
      $scruff = curl_handler($url, $request_headers, "", "GET");
      $scruffData = json_decode($scruff, true);
      $geoMap[$key]['dist'] = floatval($scruffData['results'][0]['dst'] * 0.001);
    }
    return $geoMap;
  }

  function getGrindrGeoMap($profileId) {
      $geoMap = generateGeoMap();
      foreach($geoMap as $key => $value) {
          $geohash=new GeoHash;
          $locationHash = $geohash->encode($geoMap[$key]['lon'], $geoMap[$key]['lat']);
          $url = "https://grindr.mobi/v3/locations/".$locationHash."4/profiles?photoOnly=true";
          $request_headers = grindrGetHeaders();
          $results = curl_handler($url, $request_headers, $data, "GET");
          $userData = grindrGetUserProfile($profileId);
          $geoMap[$key]['dist'] = floatval($userData['distance'] * 0.001);
      }
      return $geoMap;
  }

    function getFavorites($table) {
      global $ikiosk, $database_ikiosk, $SYSTEM, $SITE, $PAGE, $APPLICATION, $USER;

      $favorites = array();
      mysql_select_db($database_ikiosk, $ikiosk);
      $query_checkScan = "SELECT * FROM ".$table." WHERE favorite='Yes' ORDER BY date_modified DESC";
      $checkScan = mysql_query($query_checkScan, $ikiosk) or die(mysql_error());
      $row_checkScan = mysql_fetch_assoc($checkScan);
      do {
      $favorites[] = $row_checkScan;
      } while ($row_checkScan = mysql_fetch_assoc($checkScan));
      return $favorites;
    }

    function getShieldProfile($table, $field, $value) {
      global $ikiosk, $database_ikiosk, $SYSTEM, $SITE, $PAGE, $APPLICATION, $USER;
      mysql_select_db($database_ikiosk, $ikiosk);
      $query_checkScan = "SELECT * FROM ".$table." WHERE ".$field." = '".$value."'";
      $checkScan = mysql_query($query_checkScan, $ikiosk) or die(mysql_error());
      $row_checkScan = mysql_fetch_assoc($checkScan);
      $totalRows_checkScan = mysql_num_rows($checkScan);
      return $row_checkScan;
    }

    function getDataURI($image, $mime = '') {
    	return 'data: '.(function_exists('mime_content_type') ? mime_content_type($image) : $mime).';base64,'.base64_encode(urlFetch($image));
    }

    function isProd() {
      if ($_SERVER['HTTP_HOST'] == "prometheus.chasingthedrift.com") {
        return true;
      } else {
        return false;
      }
    }

    function userIsOnline($app, $timestamp) {
      if (!empty($timestamp)) {
          if ($app == "jackd" || $app == "scruff") {
              $timestamp = strtotime($timestamp);
              $timestamp = $timestamp * 1000;
          }
          $milliseconds = round(microtime(true) * 1000);
          $lastOnline = $milliseconds - $timestamp;
          $minutes = floor($lastOnline / 60000);
          $hours = floor($minutes / 24);

          if ($minutes <= 5) {
              return true;
          } else {
              return false;
          }

      }
    }

    function displayLastSeen($app, $timestamp) {
      if (!empty($timestamp)) {
        if ($app == "jackd" || $app == "scruff") {
          $timestamp = strtotime($timestamp);
          $timestamp = $timestamp * 1000;
        }
        $milliseconds = round(microtime(true) * 1000);
        $lastOnline = $milliseconds - $timestamp;
        $minutes = floor($lastOnline / 60000);
        $hours = floor($minutes / 24);
        if ($minutes <= 5) {
          $lastSeen = "Active Now";
        } else if ($minutes < 60) {
          $lastSeen = "Active ".$minutes." mins ago";
        } else if ($hours == 1) {
          $lastSeen = "Active 1 hour ago";
        } else if ($hours < 24) {
          $lastSeen = "Active ".$hours." hours ago";
        } else if ($hours < 48) {
          $lastSeen = "Active yesteday";
        } else {
          $lastSeen = "Active ".floor($hours/24)." days ago";
        }
        $display = "<p class='cerebro-header'>Last Online</p>";
        $display .= "<p class='cerebro-content'>".$lastSeen."</p>";
      }
      echo $display;
    }

    function displaySocialMedia($app, $socialLinks) {
      if (!empty($socialLinks)) {
        $content = "";
        if (!empty($socialLinks['facebook'])) {
          $content .= "<a href='http://www.facebook.com/".$socialLinks['facebook']."' target='_blank' class='external'><i class='fa fa-2x fa-facebook-square'></i></a> ";
        }
        if (!empty($socialLinks['instagram'])) {
          $content .= "<a href='http://www.instagram.com/".$socialLinks['instagram']."' target='_blank' class='external'><i class='fa fa-2x fa-instagram'></i></a> ";
        }
        if (!empty($socialLinks['twitter'])) {
          $content .= "<a href='http://www.twitter.com/".$socialLinks['twitter']."' target='_blank' class='external'><i class='fa fa-2x fa-twitter'></i></a> ";
        }
        if (!empty($content)) {
          $display = "<p class='cerebro-header'>Social Media</p>";
          $display .="<p class='cerebro-content'>".$content."</p>";
          echo $display;
        }
      }
    }

    function displayUserData($header, $content) {
      if (!empty($content)) {
        $display = "<p class='cerebro-header'>".$header."</p>";
        $display .="<p class='cerebro-content'>".$content."</p>";
        echo $display;
      }
    }

  function saveGrindrUserProfile($user) {
    global $ikiosk, $database_ikiosk, $SYSTEM, $SITE, $PAGE, $APPLICATION, $USER;

    $location = $_SESSION['lat'].",".$_SESSION['long'];
    $reverseGeoCode = getAddress($location);

    if ($user['profileId'] != ''  && isset($user['profileId'])) {
     $profile = array();
     $profile['protocol_id'] = create_guid();
     $profile['profile_id'] = $user['profileId'];
     $profile['display_name'] = addslashes($user['displayName']);
     $profile['about_me'] = addslashes($user['aboutMe']);
     $profile['headline'] = addslashes($user['headline']);
     $profile['profile_photo'] = "https://cdns.grindr.com/images/profile/1024x1024/" . $user['profileImageMediaHash'];
     $profile['age'] = addslashes($user['age']);
     $profile['ethnicity'] = addslashes($user['ethnicity']);
     $profile['relationship_status'] = addslashes($user['relationshipStatus']);
     $profile['height'] = addslashes($user['height']);
     $profile['weight'] = addslashes($user['weight']);
     $profile['facebook'] = addslashes($user['socialNetworks']['facebook']['userId']);
     $profile['twitter'] = addslashes($user['socialNetworks']['twitter']['userId']);
     $profile['instagram'] = addslashes($user['socialNetworks']['instagram']['userId']);
     $profile['distance'] = addslashes($user['distance']);
     $profile['thumbnail'] = "https://cdns.grindr.com/images/thumb/320x320/" . $user['profileImageMediaHash'];
     $datecreated = date("Y-m-d H:i:s");
     $datemodified = date("Y-m-d H:i:s");

     $insertSQL = "INSERT INTO profiles_grindr
                          (`protocol_id`,
                            `geo_id`,
                            `lat`,
                            `lon`,
                            `city`,
                            `state`,
                            `geo_location`,
                            `profile_id`,
                            `display_name`,
                            `about_me`,
                            `headline`,
                            `profile_photo`,
                            `thumbnail`,
                            `age`,
                            `ethnicity`,
                            `relationship_status`,
                            `hiv_status`,
                            `sexual_position`,
                            `height`,
                            `weight`,
                            `distance`,
                            `facebook`,
                            `instagram`,
                            `twitter`,
                            `date_created`,
                            `date_modified`)
                          VALUES
                          ( '" . $profile['protocol_id'] . "',
                            '" . $reverseGeoCode['zip'] . "',
                            '" . $_SESSION['lat'] . "',
                            '" . $_SESSION['long'] . "',
                            '" . addslashes($reverseGeoCode['city']) . "',
                            '" . addslashes($reverseGeoCode['state']) . "',
                            '" . addslashes($reverseGeoCode['geo_location']) . "',
                            '" . $profile['profile_id'] . "',
                            '" . $profile['display_name'] . "',
                            '" . $profile['about_me'] . "',
                            '" . $profile['headline'] . "',
                            '" . $profile['profile_photo'] . "',
                            '" . $profile['thumbnail'] . "',
                            '" . $profile['age'] . "',
                            '" . $profile['ethnicity'] . "',
                            '" . $profile['relationship_status'] . "',
                            '" . $profile['hiv_status'] . "',
                            '" . $profile['sexual_position'] . "',
                            '" . $profile['height'] . "',
                            '" . $profile['weight'] . "',
                            '" . $profile['distance'] . "',
                            '" . $profile['facebook'] . "',
                            '" . $profile['instagram'] . "',
                            '" . $profile['twitter'] . "',
                            '" . $datecreated . "',
                            '" . $datemodified . "')";
              $insertSQL = trim($insertSQL);
              mysql_select_db($database_ikiosk, $ikiosk);
              $Result1 = mysql_query($insertSQL, $ikiosk) or die(mysql_error());
            }
  }

    function grindrGetHeaders() {
      $headersGrindr = array();
      $headersGrindr[] = 'Content-Type: application/json; charset=utf-8';
      $headersGrindr[] = 'User-Agent: grindr3/3.0.1.4529;4529;Unknown;Android 4.4.4';
      $headersGrindr[] = 'Accept: */*';
      $headersGrindr[] = 'Authorization: Grindr3 '.$_SESSION['sessionId'];
      return $headersGrindr;
    }

    function grindrGetUserProfile($id) {
      $url = "https://grindr.mobi/v3/profiles/".$id;
      $request_headers = grindrGetHeaders();
      $grindrResults = curl_handler($url, $request_headers, $data, "GET");
      $user = json_decode($grindrResults, true);
      $thisUser = $user['profiles'][0];
      return $thisUser;
    }

    function jackdGetUserProfile($id) {
      $request_headers = jackdGetHeaders();
      $url = "https://www.jackd.mobi/j";
      $data = "email=shieldos.jack%40gmail.com&m=up2&password=remixceo01&targetUserNo=".$id."&userNo=11380012";
      $results = curl_handler($url, $request_headers, $data, "POST");
      $user = json_decode($results, true);
      return $user;
    }

    function scruffGetUserProfile($id) {
      $url = "https://app.scruffapp.com/app/profile?longitude=" . $_SESSION['long'] . "&latitude=" . $_SESSION['lat'] . "&device_type=1&client_version=5.0120&target=".$id;
      $request_headers = scruffGetHeaders();
      $results = curl_handler($url, $request_headers, $data, "GET");
      return json_decode($results, true);
    }

    function saveScruffUserProfile($user) {
      global $ikiosk, $database_ikiosk, $SYSTEM, $SITE, $PAGE, $APPLICATION, $USER;
      $location = $_SESSION['lat'].",".$_SESSION['long'];
      $reverseGeoCode = getAddress($location);

      $profile = array();
       $profile['protocol_id'] = create_guid();
       $profile['profile_id'] = $user['id'];
       $profile['display_name'] = addslashes($user['name']);
       $profile['about_me'] = addslashes($user['about']);
       $profile['ideal'] = addslashes($user['ideal']);
       $profile['fun'] = addslashes($user['fun']);
       $profile['geo_location'] = addslashes($user['city']);
       $profile['thumbnail'] = addslashes($user['thumbnail_url']);
       $profile['profile_photo'] = addslashes($user['image_url']);
       $profile['age'] = getAge($user['birthday']);
       $profile['birthday'] = addslashes($user['birthday']);
       $profile['body_hair'] = addslashes($user['body_hair']);
       $profile['ethnicity'] = addslashes($user['ethnicity']);
       $profile['relationship_status'] = addslashes($user['relationship_status']);
       $profile['height'] = addslashes($user['height']);
       $profile['weight'] = addslashes($user['weight']);
       $profile['facebook'] = addslashes($user['facebook_url']);
       $profile['homepage'] = addslashes($user['personal_url']);
       $profile['distance'] = addslashes($user['dst']);
       $datecreated = date("Y-m-d H:i:s");
       $datemodified = date("Y-m-d H:i:s");
         //Insert Into DB
         $insertSQL = "INSERT INTO profiles_scruff
                         (`protocol_id`,
                           `geo_id`,
                           `lat`,
                           `lon`,
                           `city`,
                           `state`,
                           `geo_location`,
                           `profile_id`,
                           `display_name`,
                           `about_me`,
                           `ideal`,
                           `fun`,
                           `profile_photo`,
                           `thumbnail`,
                           `age`,
                           `birthday`,
                           `body_hair`,
                           `ethnicity`,
                           `relationship_status`,
                           `height`,
                           `weight`,
                           `distance`,
                           `facebook`,
                           `homepage`,
                           `date_created`,
                           `date_modified`)
                         VALUES
                         ( '" . $profile['protocol_id'] . "',
                          '" . $reverseGeoCode['zip'] . "',
                           '" . $_SESSION['lat'] . "',
                           '" . $_SESSION['long'] . "',
                           '" . addslashes($reverseGeoCode['city']) . "',
                           '" . addslashes($reverseGeoCode['state']) . "',
                           '" . addslashes($reverseGeoCode['geo_location']) . "',
                           '" . $profile['profile_id'] . "',
                           '" . $profile['display_name'] . "',
                           '" . $profile['about_me'] . "',
                           '" . $profile['ideal'] . "',
                           '" . $profile['fun'] . "',
                           '" . $profile['profile_photo'] . "',
                           '" . $profile['thumbnail'] . "',
                           '" . $profile['age'] . "',
                           '" . $profile['birthday'] . "',
                           '" . $profile['body_hair'] . "',
                           '" . $profile['ethnicity'] . "',
                           '" . $profile['relationship_status'] . "',
                           '" . $profile['height'] . "',
                           '" . $profile['weight'] . "',
                           '" . $profile['distance'] . "',
                           '" . $profile['facebook'] . "',
                           '" . $profile['homepage'] . "',
                           '" . $datecreated . "',
                           '" . $datemodified . "')";
         $insertSQL = trim($insertSQL);
         mysql_select_db($database_ikiosk, $ikiosk);
         $Result1 = mysql_query($insertSQL, $ikiosk) or die(mysql_error());
    }

    function saveJackdUserProfile($user) {
      global $ikiosk, $database_ikiosk, $SYSTEM, $SITE, $PAGE, $APPLICATION, $USER;

      $location = $_SESSION['lat'].",".$_SESSION['long'];
      $reverseGeoCode = getAddress($location);

      $profile = array();
      $profile['protocol_id'] = create_guid();
      $profile['profile_no'] = $user['userNo'];
      $profile['first_name'] = addslashes($user['firstName']);
      $profile['last_name'] = addslashes($user['lastName']);
      $profile['location'] = addslashes($user['location']);
      $profile['distance'] = addslashes($user['distance']);
      $profile['weight'] = addslashes($user['weightInLb']);
      $profile['height'] = addslashes($user['heightInInch']);
      $profile['ethnicity'] = addslashes($user['ethnicity']);
      $profile['age'] = addslashes($user['age']);
      $profile['photo1'] = addslashes("http://s.jackd.mobi/" . $user['publicPicture1']);
      if (!empty($user['publicPicture2'])) {
          $profile['photo2'] = addslashes("http://s.jackd.mobi/" . $user['publicPicture2']);
      }
      if (!empty($user['publicPicture3'])) {
          $profile['photo3'] = addslashes("http://s.jackd.mobi/" . $user['publicPicture3']);
      }
      $profile['profile_text'] = addslashes($user['profileText']);
      $datecreated = date("Y-m-d H:i:s");
      $datemodified = date("Y-m-d H:i:s");
      //Insert Into DB
      $insertSQL = "INSERT INTO profiles_jackd
          (`protocol_id`,
            `geo_id`,
            `lat`,
            `lon`,
            `geo_location`,
            `profile_no`,
            `last_name`,
            `first_name`,
            `location`,
            `distance`,
            `weight`,
            `height`,
            `ethnicity`,
            `age`,
            `photo1`,
            `photo2`,
            `photo3`,
            `profile_text`,
            `interests`,
            `movies`,
            `activities`,
            `date_created`,
            `date_modified`)
          VALUES
          ( '" . $profile['protocol_id'] . "',
            '" . $row_geoScan['zip'] . "',
            '" . $_SESSION['lat'] . "',
            '" . $_SESSION['long'] . "',
            '" . addslashes($reverseGeoCode['geo_location']) . "',
            '" . $profile['profile_no'] . "',
            '" . $profile['last_name'] . "',
            '" . $profile['first_name'] . "',
            '" . $profile['location'] . "',
            '" . $profile['distance'] . "',
            '" . $profile['weight'] . "',
            '" . $profile['height'] . "',
            '" . $profile['ethnicity'] . "',
            '" . $profile['age'] . "',
            '" . $profile['photo1'] . "',
            '" . $profile['photo2'] . "',
            '" . $profile['photo3'] . "',
            '" . $profile['profile_text'] . "',
            '" . $profile['interests'] . "',
            '" . $profile['movies'] . "',
            '" . $profile['activities'] . "',
            '" . $datecreated . "',
            '" . $datemodified . "')";
            $insertSQL = trim($insertSQL);
            mysql_select_db($database_ikiosk, $ikiosk);
            $Result1 = mysql_query($insertSQL, $ikiosk) or die(mysql_error());
    }

    function jackdGetHeaders() {
      $request_headers = array();
      $request_headers[] = 'Host: www.jackd.mobi';
      $request_headers[] = 'Content-Type: application/x-www-form-urlencoded';
      $request_headers[] = 'User-Agent: Jack\'d/2.4.0 CFNetwork/711.3.18 Darwin/14.0.0';
      $request_headers[] = 'Accept: */*';
      return $request_headers;
    }

    function scruffGetHeaders() {
      $request_headers = array();
      $request_headers[] = 'Host: search.scruffapp.com';
      $request_headers[] = 'User-Agent: Scruff/5.0120 (iPhone; iOS 10.1.1; Scale/3.00)';
      $request_headers[] = 'Accept: */*';
      $request_headers[] = "X-Forwarded-For: 192.168.0.99";
      return $request_headers;
    }

    function scruffGetNearbyUsers($lat, $long) {
      $url = "https://search.scruffapp.com/app/location?client_version=5.0120&device_type=1&count=100&latitude=".$lat."&longitude=".$long."&offset=0&query_sort_type=0&request_id=526374096fd4dfbfcfb0b2c7910bee0c";
      $request_headers = scruffGetHeaders();
      $results = curl_handler($url, $request_headers, $data, "GET");
      return json_decode($results, true);
  }

    function jackdGetNearbyUsers($lat, $long) {
      $localMap = "";
      $request_headers = jackdGetHeaders();

      $loginQuery = "client_version=3.0.2&device_id=12E950F5-E1FC-4F62-B28E-D08529F27CA3&email=shieldos.jack%40gmail.com&lang=en&lat=" . $lat . "&lng=" . $long . "&m=l&model=iPhone&osType=i&password=remixceo01&systemName=iPhone%20OS&systemVersion=8.4";
      $loginFetch = curl_handler("https://www.jackd.mobi/j", $request_headers, $loginQuery, "POST");

      //Set 1
      $requestData = "m=ml5&userNo=11380012&email=shieldos.jack%40gmail.com&password=remixceo01&local=" . $localMap . "&range=0.000000&minAge=18&maxAge=99&ethnicity=0,1,2,3,4,5,6,7&minWeight=1&maxWeight=399&minHeight=1&maxHeight=272&online=NO&withPictures=YES&lat=" . $lat . "&lng=" . $long . "&scene=0&isLocal=YES&isUserSpecifiedLocation=YES";
      $userSet1 = curl_handler("https://www.jackd.mobi/j", $request_headers, $requestData, "POST");
      //Set 2
      $userMap1 = json_decode($userSet1, true);
      // foreach ($userMap1 as $user) {
      //     $prop = 'userNo';
      //     $localMap .= $user->$prop . ",";
      // }
      // $localMap = substr($localMap, 0, -1);
      // $requestData = "m=ml5&userNo=11380012&email=shieldos.jack%40gmail.com&password=remixceo01&local=" . $localMap . "&range=0.000000&minAge=18&maxAge=99&ethnicity=0,1,2,3,4,5,6,7&minWeight=1&maxWeight=399&minHeight=1&maxHeight=272&online=NO&withPictures=YES&lat=" . $lat . "&lng=" . $long . "&scene=0&isLocal=YES&isUserSpecifiedLocation=NO";
      // $userSet2 = curl_handler("https://www.jackd.mobi/j", $request_headers, $requestData, "POST");
      // //Set 3
      // $localMap .= ",";
      // $userMap2 = json_decode($userSet2, true);
      // foreach ($userMap2 as $user) {
      //     $prop = 'userNo';
      //     $localMap .= $user->$prop . ",";
      // }
      // $localMap = substr($localMap, 0, -1);
      // $requestData = "m=ml5&userNo=11380012&email=shieldos.jack%40gmail.com&password=remixceo01&local=" . $localMap . "&range=0.000000&minAge=18&maxAge=99&ethnicity=0,1,2,3,4,5,6,7&minWeight=1&maxWeight=399&minHeight=1&maxHeight=272&online=NO&withPictures=YES&lat=" . $lat . "&lng=" . $long . "&scene=0&isLocal=YES&isUserSpecifiedLocation=NO";
      // $userSet3 = curl_handler("https://www.jackd.mobi/j", $request_headers, $requestData, "POST");
      // //Set 4
      // $userMap3 = json_decode($userSet3);
      // foreach ($userMap3 as $user) {
      //     $prop = 'userNo';
      //     $localMap .= "," . $user->$prop;
      // }
      // $requestData = "m=ml5&userNo=11380012&email=shieldos.jack%40gmail.com&password=remixceo01&local=" . $localMap . "&range=0.000000&minAge=18&maxAge=99&ethnicity=0,1,2,3,4,5,6,7&minWeight=1&maxWeight=399&minHeight=1&maxHeight=272&online=NO&withPictures=YES&lat=" . $lat . "&lng=" . $long . "&scene=0&isLocal=YES&isUserSpecifiedLocation=NO";
      // $userSet4 = curl_handler("https://www.jackd.mobi/j", $request_headers, $requestData, "POST");
      // $userMap4 = json_decode($userSet4);
      $jackdUserMap = $userMap1;
      // $jackdUserMap = array_merge($userMap1, $userMap2);
      // $jackdUserMap = array_merge($jackdUserMap, $userMap3);
      // $jackdUserMap = array_merge($jackdUserMap, $userMap4);

      return $jackdUserMap;
    }

    function grindrGetNearbyUsers($lat, $long) {
      $geohash=new GeoHash;
      $locationHash = $geohash->encode($long, $lat);

      $url = "https://grindr.mobi/v3/locations/".$locationHash."4/profiles";
      $request_headers = grindrGetHeaders();
      $grindrResults = curl_handler($url, $request_headers, $data, "GET");
      return json_decode($grindrResults, true);
    }

      function getAddressReverse($address){
          $address = str_replace(" ", "+", $address);
          $url = "http://maps.google.com/maps/api/geocode/json?latlng=$address&sensor=false";
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
          $geoloc = json_decode(curl_exec($ch));
          $location = array();
          $formatted = explode(',', $geoloc->{'results'}[0]->{'formatted_address'});
          $location['long'] =  $geoloc->{'results'}[0]->{'geometry'}->{'location'}->{'lng'};
          $location['lat'] =  $geoloc->{'results'}[0]->{'geometry'}->{'location'}->{'lat'};
          $location['city'] =  ltrim($formatted[(count($formatted)-3)]);
          $location['state'] =  $formatted[(count($formatted)-2)];
          $state = explode(' ', $location['state']);
          $location['state'] = $state[1];
          $location['zip'] = $state[2];
          $location['geo_location'] = $geoloc->{'results'}[0]->{'formatted_address'};
          return $location;
      }

      function getAge($birthday) {
          $age = strtotime($birthday);
          if($age === false){
              return false;
          }
          list($y1,$m1,$d1) = explode("-",date("Y-m-d",$age));
          $now = strtotime("now");
          list($y2,$m2,$d2) = explode("-",date("Y-m-d",$now));
          $age = $y2 - $y1;
          if((int)($m2.$d2) < (int)($m1.$d1))
              $age -= 1;
          return $age;
  }

  function getAddress($address){
      $address = str_replace(" ", "+", $address);
      $url = "http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false";
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      $geoloc = json_decode(curl_exec($ch));
      $location = array();
      $formatted = explode(',', $geoloc->{'results'}[0]->{'formatted_address'});
      $location['long'] =  $geoloc->{'results'}[0]->{'geometry'}->{'location'}->{'lng'};
      $location['lat'] =  $geoloc->{'results'}[0]->{'geometry'}->{'location'}->{'lat'};
      $location['city'] =  ltrim($formatted[(count($formatted)-3)]);
      $location['state'] =  $formatted[(count($formatted)-2)];
      $state = explode(' ', $location['state']);
      $location['state'] = $state[1];
      $location['geo_location'] = $geoloc->{'results'}[0]->{'formatted_address'};
      return $location;
  }

  function curl_handler($url, $request_headers, $data, $method) {
      if (!isset($_GET['debug'])) {
          echo "<hr>" . $data . "<hr>";
      }
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $request_headers);
      curl_setopt($ch, CURLOPT_HEADER, true);
      curl_setopt($ch, CURLINFO_HEADER_OUT, true);
      $responseData = curl_exec($ch);
      $responseHeaders = curl_getinfo($ch);
      $err = curl_error($ch);
      if (!isset($_GET['debug'])) {
          print_r($responseHeaders);
          echo "<hr>";
      }
      curl_close($ch);
      return $responseData;
  }

  function login_grindr() {
        $payload = [];
        $payload['email'] = "cerebro.apps@gmail.com";
        $payload['password'] = "remixceo01";
        $payload['token'] = "fq922WqfbEo:APA91bH_bWl0AZp5z4B1fx39TjdmnbZsmwwz-jbj0ITTGOXeLTlsbqMvAWpFph2nO4VgscYCHnywsCK9QnXkaSjHtnP0jx5vfJ5UJs65Oyzd4f62R6vNSrNUy1U9rx5ASwOeS97YHQ9q";
        $requestPayload = json_encode($payload);
        $url = "https://grindr.mobi/v3/sessions";
        $request_headers = array();
        $request_headers[] = 'Content-Type: application/json; charset=utf-8';
        $request_headers[] = 'User-Agent: grindr3/3.13.0.5600;4529;Unknown;Android 4.4.4';
        $request_headers[] = 'Accept: */*';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $requestPayload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $request_headers);
        //curl_setopt($ch, CURLOPT_HEADER, true);
        $auth = curl_exec($ch);
        $authResponse = json_decode($auth);
        curl_close($ch);

        $_SESSION['authToken'] = $authResponse->{'authToken'};
        $_SESSION['sessionId'] = $authResponse->{'sessionId'};
        $_SESSION['grindrToken'] = "fq922WqfbEo:APA91bH_bWl0AZp5z4B1fx39TjdmnbZsmwwz-jbj0ITTGOXeLTlsbqMvAWpFph2nO4VgscYCHnywsCK9QnXkaSjHtnP0jx5vfJ5UJs65Oyzd4f62R6vNSrNUy1U9rx5ASwOeS97YHQ9q";
        if (isset($_GET['debug'])) {
            echo "<h3>Establishing Connection to Cerebro...</h3>";
            echo "<p>Auth Token: <span>".$_SESSION['authToken']."</span></p>";
            echo "<p>SessionId: <span>".$_SESSION['sessionId']."</span></p>";
            echo "<p>Connection successful...</p>";
            echo "<hr>";
            echo "<h3>Processing Login</h3>";
        }

  }

  function user_exists_jackd($id) {
      global $ikiosk, $database_ikiosk, $SYSTEM, $SITE, $PAGE, $APPLICATION, $USER;
      mysql_select_db($database_ikiosk, $ikiosk);
      $query_checkScan = "SELECT * FROM profiles_jackd WHERE profile_no = '".$id."'";
      $checkScan = mysql_query($query_checkScan, $ikiosk) or die(mysql_error());
      $row_checkScan = mysql_fetch_assoc($checkScan);
      $totalRows_checkScan = mysql_num_rows($checkScan);
      if ($totalRows_checkScan == 0) {
          return false;
      } else {
          return true;
      }
  }

  function user_exists_grindr($id) {
      global $ikiosk, $database_ikiosk, $SYSTEM, $SITE, $PAGE, $APPLICATION, $USER;
      mysql_select_db($database_ikiosk, $ikiosk);
      $query_checkScan = "SELECT * FROM profiles_grindr WHERE profile_id = '".$id."'";
      $checkScan = mysql_query($query_checkScan, $ikiosk) or die(mysql_error());
      $row_checkScan = mysql_fetch_assoc($checkScan);
      $totalRows_checkScan = mysql_num_rows($checkScan);
      if ($totalRows_checkScan == 0) {
          return false;
      } else {
          return true;
      }
  }

  function user_exists_scruff($id) {
      global $ikiosk, $database_ikiosk, $SYSTEM, $SITE, $PAGE, $APPLICATION, $USER;
      mysql_select_db($database_ikiosk, $ikiosk);
      $query_checkScan = "SELECT * FROM profiles_scruff WHERE profile_id = '".$id."'";
      $checkScan = mysql_query($query_checkScan, $ikiosk) or die(mysql_error());
      $row_checkScan = mysql_fetch_assoc($checkScan);
      $totalRows_checkScan = mysql_num_rows($checkScan);
      if ($totalRows_checkScan == 0) {
          return false;
      } else {
          return true;
      }
  }

  function urlFetch($remoteURL) {
      global $ikiosk, $database_ikiosk, $SYSTEM, $SITE, $PAGE, $APPLICATION, $USER;
      $content = file_get_contents($remoteURL);
      if ($content == "") {
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $remoteURL);
          curl_setopt($ch, CURLOPT_HEADER, 0);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
          $content = curl_exec($ch);
          curl_close($ch);
      }
      return $content;
  }

  function create_guid() {
      $microTime = microtime();
      list($a_dec, $a_sec) = explode(" ", $microTime);
      $dec_hex = sprintf("%x", $a_dec* 1000000);
      $sec_hex = sprintf("%x", $a_sec);
      ensure_length($dec_hex, 5);
      ensure_length($sec_hex, 6);
      $guid = "";
      $guid .= $dec_hex;
      $guid .= create_guid_section(3);
      $guid .= '-';
      $guid .= create_guid_section(4);
      $guid .= '-';
      $guid .= create_guid_section(4);
      $guid .= '-';
      $guid .= create_guid_section(4);
      $guid .= '-';
      $guid .= $sec_hex;
      $guid .= create_guid_section(6);
      return $guid;
  }

  function create_guid_section($characters) {
      $return = "";
      for($i=0; $i<$characters; $i++)
      {
          $return .= sprintf("%x", mt_rand(0,15));
      }
      return $return;
  }

  function ensure_length(&$string, $length) {
      $strlen = strlen($string);
      if($strlen < $length)
      {
          $string = str_pad($string,$length,"0");
      }
      else if($strlen > $length)
      {
          $string = substr($string, 0, $length);
      }
  }

  function microtime_diff($a, $b) {
      list($a_dec, $a_sec) = explode(" ", $a);
      list($b_dec, $b_sec) = explode(" ", $b);
      return $b_sec - $a_sec + $b_dec - $a_dec;
  }

  function randomGeo() {   // auxiliary function
      // returns random number with flat distribution from 0 to 1
      return (float)rand()/(float)getrandmax();
  }

  ?>
