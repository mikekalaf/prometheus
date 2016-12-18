<?php
  ob_start();
  session_start();
  $blank = "";

  function curl_handler($url, $request_headers, $data, $method) {
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $request_headers);
      $responseData = curl_exec($ch);
      $responseHeaders = curl_getinfo($ch);
      $err = curl_error($ch);
      curl_close($ch);
      return $responseData;
  }

  if (isset($_GET['admin'])) {
    $isAdmin = true;
  } else {
    $isAdmin = false;
  }
 ?>
