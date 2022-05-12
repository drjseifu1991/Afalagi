<?php

class Completed{

    // database connection and table name
    private $conn;
    private $table_name = "complited";

    // object properties
    public $user_first_name;
    public $user_last_name;
    public $user_phone_number;
    public $tefelagi_first_name;
    public $tefelagi_last_name;
    public $tefelagi_phone_number;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
      //add completed
    function add(){

        // query to insert record of add compited
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    user_first_name=:user_first_name, tefelagi_first_name=:tefelagi_first_name, user_last_name=:user_last_name,  
                    user_phone_number=:user_phone_number, tefelagi_last_name=:tefelagi_last_name, tefelagi_phone_number=:tefelagi_phone_number";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->user_first_name=htmlspecialchars(strip_tags($this->user_first_name));
        $this->user_last_name=htmlspecialchars(strip_tags($this->user_last_name));
        $this->user_phone_number=htmlspecialchars(strip_tags($this->user_phone_number));
        $this->tefelagi_first_name=htmlspecialchars(strip_tags($this->tefelagi_first_name));
        $this->tefelagi_last_name=htmlspecialchars(strip_tags($this->tefelagi_last_name));
        $this->tefelagi_phone_number=htmlspecialchars(strip_tags($this->tefelagi_phone_number));
            

        // bind values
        $stmt->bindParam(":user_first_name", $this->user_first_name);
        $stmt->bindParam(":user_last_name", $this->user_last_name);
        $stmt->bindParam(":user_phone_number", $this->user_phone_number);
        $stmt->bindParam(":tefelagi_first_name", $this->tefelagi_first_name);
        $stmt->bindParam(":tefelagi_last_name", $this->tefelagi_last_name);
        $stmt->bindParam(":tefelagi_phone_number", $this->tefelagi_phone_number);

        // execute query
        $stmt->execute();
        return $stmt;
    }
    
    // get all completed
    function getAll(){
        $query = "SELECT * FROM
                    " . $this->table_name . "";
         // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
}
?>