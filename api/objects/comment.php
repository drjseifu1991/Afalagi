<?php

class Comment{

    // database connection and table name
    private $conn;
    private $table_name = "comment";

    // object properties
    public $user_phone_number;
    public $comment_time;
    public $comment_message;
    public $user_first_name;
    public $user_last_name;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
      //add comment
    function add(){

        // query to insert record of add comment
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    user_phone_number=:user_phone_number, comment_time=:comment_time, comment_message=:comment_message, user_last_name=:user_last_name, user_first_name=:user_first_name";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->user_phone_number=htmlspecialchars(strip_tags($this->user_phone_number));
        $this->comment_time=htmlspecialchars(strip_tags($this->comment_time));
        $this->comment_message=htmlspecialchars(strip_tags($this->comment_message));
        $this->user_last_name=htmlspecialchars(strip_tags($this->user_last_name));
        $this->user_first_name=htmlspecialchars(strip_tags($this->user_first_name));

        // bind values
        $stmt->bindParam(":user_phone_number", $this->user_phone_number);
        $stmt->bindParam(":comment_time", $this->comment_time);
        $stmt->bindParam(":comment_message", $this->comment_message);
        $stmt->bindParam(":user_last_name", $this->user_last_name);
        $stmt->bindParam(":user_first_name", $this->user_first_name);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }
    
    // fetch all comment
    function get(){
        
        // query to fetch all record
        $query = "SELECT * FROM " . $this->table_name . "";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
            
    }
?>