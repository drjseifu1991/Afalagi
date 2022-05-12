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
$admin->phone_number = $_POST['phone_number'];

// delete the admin
if($admin->delete()){
    $admin_arr=array(
        "status" => true,
        "message" => "Successfully deleted!"
    );
    echo "true";
}
else{
    $admin_arr=array(
        "status" => false,
        "message" => "Unsuccessful!"
    );
    echo "false";
}

// make it json
print_r(json_encode($admin_arr));
?>
