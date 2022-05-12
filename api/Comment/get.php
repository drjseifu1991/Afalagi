<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/comment.php';


// get database connection
$database = new Database();$db = $database->getConnection();

// prepare comment object
$comment = new Comment($db);

// read the details of comment
$stmt = $comment->get();
if($stmt->rowCount()){
    // get retrieved row
    $comment_arr=array(
        "status" => true
    );
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // create array
        $comment_arr['comment'][] = $row;
    }
}
else{
    $comment_arr=array(
        "status" => false
    );
}
// make it json
print_r(json_encode($comment_arr));
?> 