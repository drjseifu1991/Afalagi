<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/blog.php';


// get database connection
$database = new Database();$db = $database->getConnection();

// prepare tefelagi object
$blog = new Blog($db);

// set tefelagi property values

$blog->id = $_POST['id'];

// read the details of tefelagi
$stmt = $blog->getById();
if($stmt->rowCount()){
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $blog_arr=array(
        "status" => true,
        "blog" => $row
    );
}
else{
    $blog_arr=array(
        "status" => false
    );
}
// make it json
print_r(json_encode($blog_arr));
?> 