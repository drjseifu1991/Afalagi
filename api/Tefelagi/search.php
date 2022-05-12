<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/tefelagi.php';


// get database connection
$database = new Database();$db = $database->getConnection();

// prepare user object
$tefelagi = new Tefelagi($db);

// set tefelagi property values
$tefelagi->user = $_POST['user'];
$tefelagi->current_place = $_POST['current_place'];

// read the details of tefelagi
$stmt = $tefelagi->search();
if($stmt->rowCount()){
    // get retrieved row
    $tefelagi_arr=array(
        "status" => true
    );
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // create array
        $tefelagi_arr['tefelagi'][] = $row;
    }
}
else{
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $tefelagi_arr=array(
        "status" => false
    );
}
// make it json
echo json_encode($tefelagi_arr);
?>