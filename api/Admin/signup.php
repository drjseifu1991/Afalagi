<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/admin.php';

$database = new Database();
$db = $database->getConnection();

// prepare admin object
$admin = new Admin($db);

// set admin property values
$admin->first_name = $_POST['first_name'];
$admin->last_name = $_POST['last_name'];
$admin->gender = $_POST['gender'];
$admin->phone_number = $_POST['phone_number'];
$admin->role = $_POST['role'];
$admin->password = base64_encode($_POST['password']);

// create the admin
if($admin->signup()){
    
    // create array
    $admin_arr=array(
        "status" => "true"
    );
}
else{
    
    // create array
    $admin_arr=array(
        "status" => "false"
    );
}
// make it json
print_r(json_encode($admin_arr));
?>

