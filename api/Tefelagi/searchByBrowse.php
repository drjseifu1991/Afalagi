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
$tefelagi->first_name = $_POST['first_name'];
$tefelagi->last_name = $_POST['father_name'];
$tefelagi->grand_father = $_POST['grand_father'];
$tefelagi->mother_name = $_POST['mother_name'];
$tefelagi->used_place = $_POST['used_place'];
$tefelagi->gender = $_POST['gender'];

// read the details of tefelagi
$stmt = $tefelagi->searchByBrowse();
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
print_r(json_encode($tefelagi_arr));
?> 