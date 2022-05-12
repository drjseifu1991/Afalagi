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

// read the details of Blog
$stmt = $user->getAll();
if($stmt->rowCount()){
    // get retrieved row
    $user_arr=array(
        "status" => true
    );
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // create array
        $user_arr['user'][] = $row;
    }
}
else{
    $user_arr=array(
        "status" => false
    );
}
// make it json
echo json_encode($user_arr);
?>