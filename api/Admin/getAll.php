<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/admin.php';


// get database connection
$database = new Database();$db = $database->getConnection();

// prepare user object
$admin = new Admin($db);

// read the details of Blog
$stmt = $admin->getAll();
if($stmt->rowCount()){
    // get retrieved row
    $admin_arr=array(
        "status" => true
    );
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // create array
        $admin_arr['admin'][] = $row;
    }
}
else{
    $admin_arr=array(
        "status" => false
    );
}
// make it json
echo json_encode($admin_arr);
?>