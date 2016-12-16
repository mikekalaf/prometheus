<?php
include('../includes/prometheus.php');

$favorites = (isset($_GET['favorites']) ? $_GET['favorites'] : 'No');
$limit = (isset($_GET['limit']) ? $_GET['limit'] : '300');
$page = (isset($_GET['page']) ? $_GET['page'] : '1');
$url = "http://v9.ikioskcloudapps.com/shield/x-gene/sector1?favorites=".$favorites."&limit=".$limit."&page=".$page;
$request_headers = array();

$fetchData = curl_handler($url, $request_headers, $blank, "GET");
$sectorData = json_decode($fetchData);
//print_r($fetchData);
?>
