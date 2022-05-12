<?php

class Blog{

    // database connection and table name
    private $conn;
    private $table_name = "blog";

    // object properties
    public $id;
    public $blog_title;
    public $blog_detail;
    public $blog_time;
    public $blog_image;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    
    function add() {
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    blog_title=:blog_title, blog_detail=:blog_detail, time=:blog_time, blog_image=:blog_image";
        
         // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->blog_title=htmlspecialchars(strip_tags($this->blog_title));
        $this->blog_detail=htmlspecialchars(strip_tags($this->blog_detail));
        $this->blog_time=htmlspecialchars(strip_tags($this->blog_time));
        $this->blog_image=htmlspecialchars(strip_tags($this->blog_image));

        // bind values
        $stmt->bindParam(":blog_title", $this->blog_title);
        $stmt->bindParam(":blog_detail", $this->blog_detail);
        $stmt->bindParam(":blog_time", $this->blog_time);
        $stmt->bindParam(":blog_image", $this->blog_image);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }
    function getAll() {
         $query = "SELECT * FROM
                    " . $this->table_name . "";
         // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
        }
    
    function getById()
    {
        $query = "SELECT * FROM
                " . $this->table_name . " 
             WHERE
                    id = :id";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        
        //sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));
        // bind values
        $stmt->bindParam(":id", $this->id);
        
        // execute query
        $stmt->execute();
        return $stmt;
        }
    }
?>