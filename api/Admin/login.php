<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/admin.php';


// get database connection
$database = new Database();$db = $database->getConnection();

// prepare admin object
$admin = new Admin($db);

// set  admin property values
$admin->phone_number = $_POST['phone_number'];
$admin->password = base64_encode($_POST['password']);


// read the details of admin
$stmt = $admin->login();
if($stmt->rowCount()){
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // create array
    $admin_arr=array(
        "status" => true,
        'admin' => $row
    );
}
else{
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $admin_arr=array(
        "status" => false
    );
}
// make it json
print_r(json_encode($admin_arr));
?>