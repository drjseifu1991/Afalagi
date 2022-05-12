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

// read the details of Blog
$stmt = $completed->getAll();
if($stmt->rowCount()){
    // get retrieved row
    $completed_arr=array(
        "status" => true
    );
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // create array
        $completed_arr['completed'][] = $row;
    }
}
else{
    $completed_arr=array(
        "status" => false
    );
}
// make it json
echo json_encode($completed_arr);
?>