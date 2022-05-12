<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/replay.php';


// get database connection
$database = new Database();$db = $database->getConnection();

// prepare tefelagi object
$replay = new Replay($db);

// set tefelagi property values

$replay->comment_id = $_POST['comment_id'];

// read the details of tefelagi
$stmt = $replay->getAllByID();
if($stmt->rowCount()){
    // get retrieved row
    $replay_arr=array(
        "status" => true
    );
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // create array
        $replay_arr['replay'][] = $row;
    }
}
else{
    $replay_arr=array(
        "status" => false
    );
}
// make it json
print_r(json_encode($replay_arr));
?> 