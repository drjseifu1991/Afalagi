<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/tefelagi.php';


// get database connection
$database = new Database();$db = $database->getConnection();

// prepare tefelagi object
$tefelagi = new Tefelagi($db);

// set tefelagi property values

$tefelagi->phone_number = $_POST['phone_number'];

// read the details of tefelagi
$stmt = $tefelagi->searchByPhone();
if($stmt->rowCount()){
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $tefelagi_arr=array(
        "status" => true,
        "tefelagi" => $row
    );
}
else{
    $tefelagi_arr=array(
        "status" => false
    );
}
// make it json
print_r(json_encode($tefelagi_arr));
?> 