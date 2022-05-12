<?php

class Replay{

    // database connection and table name
    private $conn;
    private $table_name = "replay";

    // object properties
    public $comment_id;
    public $replay_time;
    public $replay_message;
    public $admin;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
      //add replay
    function add(){

        // query to insert record of add replay
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    comment=:comment, time=:time, message=:message, admin=:admin";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->comment_id=htmlspecialchars(strip_tags($this->comment_id));
        $this->replay_time=htmlspecialchars(strip_tags($this->replay_time));
        $this->replay_message=htmlspecialchars(strip_tags($this->replay_message));
        $this->admin=htmlspecialchars(strip_tags($this->admin));;

        // bind values
        $stmt->bindParam(":comment", $this->comment_id);
        $stmt->bindParam(":time", $this->replay_time);
        $stmt->bindParam(":message", $this->replay_message);
        $stmt->bindParam(":admin", $this->admin);

        // execute query
        $stmt->execute();
        return $stmt;
    }
    
    //get all replay based on comment id
    function getAllByID(){
        $query = "SELECT * FROM
                " . $this->table_name . " 
             WHERE
                    comment = :comment";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        
        //sanitize
        $this->comment_id=htmlspecialchars(strip_tags($this->comment_id));
        // bind values
        $stmt->bindParam(":comment", $this->comment_id);
        
        // execute query
        $stmt->execute();
        return $stmt;
}
}
?>