<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/blog.php';

$database = new Database();
$db = $database->getConnection();

// prepare comment object
$blog = new Blog($db);

// set comment property values
$blog->blog_title = $_POST['blog_title'];
$blog->blog_detail = $_POST['blog_detail'];
$blog->blog_time = $_POST['blog_time'];

$blog_picture = $_FILES['blog_image']['name'];
$blog_picture_temp = $_FILES['blog_image']['tmp_name'];

$upload_dir = "../BlogImages/";
$picture_ext = strtolower(pathinfo($blog_picture,PATHINFO_EXTENSION));
$pic_picture = rand(1000,1000000).".".$picture_ext;
move_uploaded_file($blog_picture_temp,$upload_dir.$pic_picture);
$blog->blog_image = $pic_picture;
// create the comment
if($blog->add()){
    
    // create array
    $blog_arr=array(
        "status" => true,
        "message" => "Successfully added!"
    );
}
else{
    
    // create array
    $blog_arr=array(
        "status" => false,
        "message" => "Unsuccessful!"
    );
}
// make it json
print_r(json_encode($blog_arr));
?>

