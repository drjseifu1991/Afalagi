<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/completed.php';


// get database connection
$database = new Database();$db = $database->getConnection();

// prepare user object
$completed = new Completed($db);

// set complited property values
$completed->user_first_name = $_POST['user_first_name'];
$completed->user_last_name = $_POST['user_last_name'];
$completed->user_phone_number = $_POST['user_phone_number'];
$completed->tefelagi_first_name = $_POST['tefelagi_first_name'];
$completed->tefelagi_last_name = $_POST['tefelagi_last_name'];
$completed->tefelagi_phone_number = $_POST['tefelagi_phone_number'];

// create the complited
if($completed->add()){
    $completed_arr=array(
        "status" => true
    );
}
else{
    $completed_arr=array(
        "status" => false
    );
}

// make it json
print_r(json_encode($completed_arr));
?>