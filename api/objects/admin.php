<?php

class Admin{

    // database connection and table name
    private $conn;
    private $table_name = "admin";

    // object properties
    public $first_name;
    public $last_name;
    public $phone_number;
    public $gender;
    public $role;
    public $password;
    public $old_phone_number;
    public $new_phone_number;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
      //admin signup method
    function signup(){

        if($this->isAlreadyExist()){
            return false;
        }
        // query to insert record of new admin signup
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    first_name=:first_name, last_name=:last_name, phone_number=:phone_number, gender=:gender, role=:role, password=:password";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->first_name=htmlspecialchars(strip_tags($this->first_name));
        $this->last_name=htmlspecialchars(strip_tags($this->last_name));
        $this->gender=htmlspecialchars(strip_tags($this->gender));
        $this->phone_number=htmlspecialchars(strip_tags($this->phone_number));
        $this->role=htmlspecialchars(strip_tags($this->role));
        $this->password=htmlspecialchars(strip_tags($this->password));

        // bind values
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":gender", $this->gender);
        $stmt->bindParam(":phone_number", $this->phone_number);
        $stmt->bindParam(":role", $this->role);
        $stmt->bindParam(":password", $this->password);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }

    // login admin method
    function login(){
        
        // select all query with admin inputed phone number and password  
        $query = "SELECT * FROM
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

    //Notify if Admin with given phone number Already exists during SignUp
    function isAlreadyExist(){
        $query = "SELECT *
            FROM
                " . $this->table_name . " 
            WHERE
                phone_number='".$this->phone_number."'";
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
    
    // DELETE
        function delete(){
            $sqlQuery = "DELETE FROM " . $this->table_name . "
            WHERE
                phone_number='".$this->phone_number."'";
            
            $stmt = $this->conn->prepare($sqlQuery);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }
    
      // UPDATE
        public function update(){
            $sqlQuery = "UPDATE
                        " . $this->table_name . "
                    SET
                        phone_number = :new_phone_number, 
                        first_name = :first_name, 
                        last_name = :last_name, 
                        gender = :gender, 
                        role = :role,
                        password = :password
                    WHERE 
                        phone_number = :old_phone_number";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->first_name=htmlspecialchars(strip_tags($this->first_name));
            $this->last_name=htmlspecialchars(strip_tags($this->last_name));
            $this->gender=htmlspecialchars(strip_tags($this->gender));
            $this->role=htmlspecialchars(strip_tags($this->role));
            $this->old_phone_number=htmlspecialchars(strip_tags($this->old_phone_number));
            $this->new_phone_number=htmlspecialchars(strip_tags($this->new_phone_number));
            $this->password=htmlspecialchars(strip_tags($this->password));
        
            // bind data
            $stmt->bindParam(":new_phone_number", $this->new_phone_number);
            $stmt->bindParam(":first_name", $this->first_name);
            $stmt->bindParam(":last_name", $this->last_name);
            $stmt->bindParam(":gender", $this->gender);
            $stmt->bindParam(":role", $this->role);
            $stmt->bindparam(":password", $this->password);
            $stmt->bindParam(":old_phone_number", $this->old_phone_number);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }
    
    // GET all admin
    public function getAll() {
        $query = "SELECT * FROM
                    " . $this->table_name . " WHERE role = 'Blog admin' OR role = 'User admin'";
         // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }

    }
?>