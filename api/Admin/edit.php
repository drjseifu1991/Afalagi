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
$admin->old_phone_number = $_POST['old_phone_number'];
$admin->new_phone_number = $_POST['new_phone_number'];
$admin->first_name = $_POST['first_name'];
$admin->last_name = $_POST['last_name'];
$admin->gender = $_POST['gender'];
$admin->role = $_POST['role'];
$admin->password = base64_encode($_POST['password']);

// update the admin
if($admin->update()){
    $admin_arr=array(
        "status" => true,
        "message" => "Successfully Updated!"
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
