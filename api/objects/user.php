<?php

class User{

    // database connection and table name
    private $conn;
    private $table_name = "user";

    // object properties
    public $first_name;
    public $last_name;
    public $gender;
    public $phone_number;
    public $region;
    public $zone;
    public $woreda;
    public $town;
    public $password;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
      //user signup method
    function signup(){

        if($this->isAlreadyExist()){
            return false;
        }
        // query to insert record of new user signup
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    first_name=:first_name, last_name=:last_name, gender=:gender, phone_number=:phone_number, region=:region, zone=:zone, woreda=:woreda, password=:password, town=:town";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->first_name=htmlspecialchars(strip_tags($this->first_name));
        $this->last_name=htmlspecialchars(strip_tags($this->last_name));
        $this->gender=htmlspecialchars(strip_tags($this->gender));
        $this->phone_number=htmlspecialchars(strip_tags($this->phone_number));
        $this->region=htmlspecialchars(strip_tags($this->region));
        $this->zone=htmlspecialchars(strip_tags($this->zone));
        $this->woreda=htmlspecialchars(strip_tags($this->woreda));
        $this->town=htmlspecialchars(strip_tags($this->town));
        $this->password=htmlspecialchars(strip_tags($this->password));

        // bind values
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":gender", $this->gender);
        $stmt->bindParam(":phone_number", $this->phone_number);
        $stmt->bindParam(":region", $this->region);
        $stmt->bindParam(":zone", $this->zone);
        $stmt->bindParam(":woreda", $this->woreda);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":town", $this->town);

        // execute query
        if($stmt->execute()){
            $this->phone_number = $this->conn->lastInsertId();
            return true;
        }

        return false;

    }

    // login user method
    function login(){
        // select all query with user inputed phone number and password  
        $query = "SELECT phone_number,first_name,last_name,town FROM
                    " . $this->table_name . "
                WHERE
                    phone_number=:phone_number AND password=:password";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->phone_number=htmlspecialchars(strip_tags($this->phone_number));
        $this->password=htmlspecialchars(strip_tags($this->password));
        
        // bind values
        $stmt->bindParam(":phone_number", $this->phone_number);
        $stmt->bindParam(":password", $this->password);

        // execute query
        $stmt->execute();
        return $stmt;
    }

    // get all user
    function getAll(){
        $query = "SELECT * FROM
                    " . $this->table_name . "";
         // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    //Notify if User with given phone number Already exists during SignUp
    function isAlreadyExist(){
        $query = "SELECT *
    +251966016473        FROM
                " . $this->table_name . " 
            WHERE
                username='".$this->phone_number."'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        if($stmt->rowCount() > 0){
            return true;
        }
        else{
            return false;
        }
    }
}
?>