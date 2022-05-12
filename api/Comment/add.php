<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/comment.php';

$database = new Database();
$db = $database->getConnection();

// prepare comment object
$comment = new Comment($db);

// set comment property values
$comment->user_phone_number = $_POST['user_phone_number'];
$comment->comment_time = $_POST['comment_time'];
$comment->comment_message = $_POST['comment_message'];
$comment->user_last_name = $_POST['user_last_name'];
$comment->user_first_name = $_POST['user_first_name'];

// create the comment
if($comment->add()){
    
    // create array
    $comment_arr=array(
        "status" => true
    );
}
else{
    
    // create array
    $comment_arr=array(
        "status" => false
    );
}
// make it json
print_r(json_encode($comment_arr));
?>

