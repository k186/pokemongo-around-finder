<?php
/**
 * Name: pokemon.php
 * Description:
 * User: K186
 * Date: 2016/7/24
 * Time: 16:35
 */
$Json=$_GET['pokemon'];
$result = json_decode($Json, true);
$Lat=$result['Lat'];//纬度
$Lng=$result['Lng'];//经度
$type=$result['type'];//type
$method='data';
if($type==1){
    $method='data';
}else{
    $method='scan';
}
$token_access_url = 'https://pokevision.com/map/'.$method.'/'.$Lat.'/'.$Lng;
$contextOptions = array(
    "ssl" => array(
        "verify_peer"      => false,
        "verify_peer_name" => false,
    ),
);
$res = file_get_contents($token_access_url, false, stream_context_create($contextOptions));
echo $res;
echo $Json
?>