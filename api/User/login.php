<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';


// get database connection
$database = new Database();$db = $database->getConnection();

// prepare user object
$user = new User($db);

// set user property values
$user->phone_number = $_POST['phone_number'];
$user->password = base64_encode($_POST['password']);


// read the details of user
$stmt = $user->login();
if($stmt->rowCount()){
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // create array
    $user_arr=array(
        "status" => true,
        'user' => $row
    );
}
else{
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $user_arr=array(
        "status" => false,
        'user' => $row
    );
}
// make it json
echo json_encode($user_arr);
?> 