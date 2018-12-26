<?php
$curl = curl_init();
echo($_GET["o"]);
curl_setopt_array($curl, array(
  CURLOPT_URL => "https://maps.googleapis.com/maps/api/distancematrix/json?origins=".$_GET["o"]."&destinations=".$_GET["d"]."&key=AIzaSyCPAZ1mgyT33HhGzyL-Pe2SXrnsqNlMVW4"  ,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);
$data = $response;
header('Content-Type: application/json');
echo json_encode($data);
?>