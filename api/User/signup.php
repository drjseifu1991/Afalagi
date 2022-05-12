<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';

$database = new Database();
$db = $database->getConnection();

// prepare user object
$user = new User($db);

// set user property values
$user->first_name = $_POST['first_name'];
$user->last_name = $_POST['last_name'];
$user->gender = $_POST['gender'];
$user->phone_number = $_POST['phone_number'];
$user->region = $_POST['region'];
$user->zone = $_POST['zone'];
$user->woreda = $_POST['woreda'];
$user->town = $_POST['town'];
$user->password = base64_encode($_POST['password']);
$phone = $user->phone_number;


// create the user
if($user->signup()){
    $user_arr=array(
        "status" => true,
        "phone_number" => $phone,
        "first_name" => $user->first_name,
        "last_name" => $user->last_name,
        "town" => $user->town
    );
}
else{
    $user_arr=array(
        "status" => false
    );
}

// make it json
echo json_encode($user_arr);
?>