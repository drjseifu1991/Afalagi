<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/tefelagi.php';


// get database connection
$database = new Database();$db = $database->getConnection();

// prepare user object
$tefelagi = new Tefelagi($db);

// read the details of Blog
$stmt = $tefelagi->getAll();
if($stmt->rowCount()){
    // get retrieved row
    $tefelagi_arr=array(
        "status" => true
    );
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // create array
        $tefelagi_arr['tefelagi'][] = $row;
    }
}
else{
    $tefelagi_arr=array(
        "status" => false
    );
}
// make it json
echo json_encode($tefelagi_arr);
?>