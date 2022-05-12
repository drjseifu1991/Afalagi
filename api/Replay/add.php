<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/replay.php';

$database = new Database();
$db = $database->getConnection();

// prepare replay object
$replay = new Replay($db);

// set replay property values
$replay->comment_id = $_POST['comment_id'];
$replay->replay_time = $_POST['replay_time'];
$replay->replay_message = $_POST['replay_message'];
$replay->admin = $_POST['admin'];

// create the replay
if($replay->add()){
    $replay_arr=array(
        "status" => "true"
    );
}
else{
    $replay_arr=array(
        "status" => "false"
    );
}

// make it json
print_r(json_encode($replay_arr));
?>