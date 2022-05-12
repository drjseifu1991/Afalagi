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
$tefelagi->brother_name = $_POST['brother_name'];
$tefelagi->sister_name = $_POST['sister_name'];
$tefelagi->uncle_name = $_POST['uncle_name'];
$tefelagi->aunt_name = $_POST['aunt_name'];
$tefelagi->birth_place = $_POST['birth_place'];
$tefelagi->phone_number = $_POST['phone_number'];

// read the details of tefelagi
$stmt = $tefelagi->searchByCheck();
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