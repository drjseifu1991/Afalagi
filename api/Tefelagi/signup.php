<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/tefelagi.php';

$database = new Database();
$db = $database->getConnection();

// prepare tefelagi object
$tefelagi = new Tefelagi($db);

// set tefelagi property values
$tefelagi->first_name = $_POST['first_name'];
$tefelagi->father_name = $_POST['father_name'];
$tefelagi->grand_father = $_POST['grand_father'];
$tefelagi->mother_name = $_POST['mother_name'];
$tefelagi->brother_name = $_POST['brother_name'];
$tefelagi->sister_name = $_POST['sister_name'];
$tefelagi->uncle_name = $_POST['uncle_name'];
$tefelagi->aunt_name = $_POST['aunt_name'];
$tefelagi->gender = $_POST['gender'];
$tefelagi->birth_date = $_POST['birth_date'];
$tefelagi->phone_number = $_POST['phone_number'];
$tefelagi->birth_place = $_POST['birth_place'];
$tefelagi->current_place = $_POST['current_place'];
$tefelagi->used_place = $_POST['used_place'];
$tefelagi->biography = $_POST['biography'];
$tefelagi->user = $_POST['user'];
$source = $_POST['source'];
if($source == "web") {
    $tefelagi_profile_name = $_FILES['profile']['name'];
    $tefelagi_profile_temp = $_FILES['profile']['tmp_name'];

    $upload_dir = "../uploads/";
    $profile_ext = strtolower(pathinfo($tefelagi_profile_name,PATHINFO_EXTENSION));
    $pic_profile = rand(1000,1000000).".".$profile_ext;
    move_uploaded_file($tefelagi_profile_temp,$upload_dir.$pic_profile);
    $tefelagi->picture = $pic_profile;
}
else {
    $encoded_img = $_POST['picture'];
    
    $upload_dir = "../uploads/";
    $profile_ext = "jpg";
    $pic_profile = rand(1000,1000000).".".$profile_ext;
    file_put_contents($upload_dir.$pic_profile, base64_decode($encoded_img));
    $tefelagi->picture = $pic_profile;
}

// create the tefelagi
if($tefelagi->signup()){
    $tefelagi_arr=array(
        "status" => true
    );
}
else{
    $tefelagi_arr=array(
        "status" => false
    );
}

// make it json
print_r(json_encode($tefelagi_arr));
?>