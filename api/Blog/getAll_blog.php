<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/blog.php';


// get database connection
$database = new Database();$db = $database->getConnection();

// prepare user object
$blog = new Blog($db);

// read the details of Blog
$stmt = $blog->getAll();
if($stmt->rowCount()){
    // get retrieved row
    $blog_arr=array(
        "status" => true
    );
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // create array
        $blog_arr['blog'][] = $row;
    }
}
else{
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $blog_arr=array(
        "status" => false,
        'blog' => $row
    );
}
// make it json
echo json_encode($blog_arr);
?>