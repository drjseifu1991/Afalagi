<?php

class Tefelagi{

    // database connection and table name
    private $conn;
    private $table_name = "tefelagi";

    // object properties
    public $first_name;
    public $father_name;
    public $grand_father;
    public $mother_name;
    public $brother_name;
    public $sister_name;
    public $uncle_name;
    public $aunt_name;
    public $gender;
    public $birth_date;
    public $phone_number;
    public $birth_place;
    public $current_place;
    public $used_place;
    public $biography;
    public $user;
    public $picture;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    //tefelagi signup method
    function signup(){

//        if($this->isAlreadyExist()){
//            return false;
//        }
        // query to insert record of new tefelagi signup
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    first_name=:first_name, father_name=:father_name, grand_father=:grand_father, mother_name=:mother_name, brother_name=:brother_name, sister_name=:sister_name, uncle_name=:uncle_name, aunt_name=:aunt_name, gender=:gender, birth_date=:birth_date, phone_number=:phone_number, birth_place=:birth_place, current_place=:current_place, used_place=:used_place, biography=:biography, picture=:picture, user=:user";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->first_name=htmlspecialchars(strip_tags($this->first_name));
        $this->father_name=htmlspecialchars(strip_tags($this->father_name));
        $this->grand_father=htmlspecialchars(strip_tags($this->grand_father));
        $this->mother_name=htmlspecialchars(strip_tags($this->mother_name));
        $this->brother_name=htmlspecialchars(strip_tags($this->brother_name));
        $this->sister_name=htmlspecialchars(strip_tags($this->sister_name));
        $this->uncle_name=htmlspecialchars(strip_tags($this->uncle_name));
        $this->aunt_name=htmlspecialchars(strip_tags($this->aunt_name));
        $this->gender=htmlspecialchars(strip_tags($this->gender));
        $this->birth_date=htmlspecialchars(strip_tags($this->birth_date));
        $this->phone_number=htmlspecialchars(strip_tags($this->phone_number));
        $this->birth_place=htmlspecialchars(strip_tags($this->birth_place));
        $this->current_place=htmlspecialchars(strip_tags($this->current_place));
        $this->used_place=htmlspecialchars(strip_tags($this->used_place));
        $this->biography=htmlspecialchars(strip_tags($this->biography));
        $this->user=htmlspecialchars(strip_tags($this->user));
        $this->picture=htmlspecialchars(strip_tags($this->picture));

        // bind values
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":father_name", $this->father_name);
        $stmt->bindParam(":grand_father", $this->grand_father);
        $stmt->bindParam(":mother_name", $this->mother_name);
        $stmt->bindParam(":brother_name", $this->brother_name);
        $stmt->bindParam(":sister_name", $this->sister_name);
        $stmt->bindParam(":uncle_name", $this->uncle_name);
        $stmt->bindParam(":aunt_name", $this->aunt_name);
        $stmt->bindParam(":gender", $this->gender);
        $stmt->bindParam(":birth_date", $this->birth_date);
        $stmt->bindParam(":phone_number", $this->phone_number);
        $stmt->bindParam(":birth_place", $this->birth_place);
        $stmt->bindParam(":current_place", $this->current_place);
        $stmt->bindParam(":used_place", $this->used_place);
        $stmt->bindParam(":biography", $this->biography);
        $stmt->bindparam(":picture", $this->picture);
        $stmt->bindParam(":user", $this->user);

        

        // execute query
        if($stmt->execute()){
            //$this->phone_number = $this->conn->lastInsertId();
            return true;
        }

        return false;

    }
    
    //Notify if Tefelagi with given phone number Already exists during SignUp
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
    
    //Search user by given info
    function searchByBrowse(){
        $query = "SELECT first_name, father_name, current_place, picture, phone_number FROM
                " . $this->table_name . " 
             WHERE
                    gender = :gender AND (first_name LIKE :first_name OR father_name LIKE :father_name OR grand_father LIKE :grand_father OR mother_name LIKE :mother_name OR used_place LIKE :used_place)";
        
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->first_name = htmlspecialchars(strip_tags($this->first_name));
        $this->father_name = htmlspecialchars(strip_tags($this->father_name));
        $this->grand_father = htmlspecialchars(strip_tags($this->grand_father));
        $this->mother_name = htmlspecialchars(strip_tags($this->mother_name));
        $this->used_place = htmlspecialchars(strip_tags($this->used_place));
        $this->gender = htmlspecialchars(strip_tags($this->gender));
        
    
        // bind values
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":father_name", $this->father_name);
        $stmt->bindParam(":grand_father", $this->grand_father);
        $stmt->bindParam(":mother_name", $this->mother_name);
        $stmt->bindParam(":used_place", $this->used_place);
        $stmt->bindParam(":gender", $this->gender);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    
    // Search tefelagi for check
    function searchByCheck(){
        $query = "SELECT * FROM
                " . $this->table_name . " 
             WHERE
                    brother_name=:brother_name AND sister_name=:sister_name AND uncle_name=:uncle_name AND aunt_name=:aunt_name AND birth_place=:birth_place AND phone_number=:phone_number";
        
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->brother_name = htmlspecialchars(strip_tags($this->brother_name));
        $this->sister_name = htmlspecialchars(strip_tags($this->sister_name));
        $this->uncle_name = htmlspecialchars(strip_tags($this->uncle_name));
        $this->aunt_name = htmlspecialchars(strip_tags($this->aunt_name));
        $this->birth_place = htmlspecialchars(strip_tags($this->birth_place));
        $this->phone_number = htmlspecialchars(strip_tags($this->phone_number));
        
    
        // bind values
        $stmt->bindParam(":brother_name", $this->brother_name);
        $stmt->bindParam(":sister_name", $this->sister_name);
        $stmt->bindParam(":uncle_name", $this->uncle_name);
        $stmt->bindParam(":aunt_name", $this->aunt_name);
        $stmt->bindParam(":birth_place", $this->birth_place);
        $stmt->bindParam(":phone_number", $this->phone_number);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    // Search tefelagi by current address
    function search() {
         $query = "SELECT first_name, father_name, current_place, picture, phone_number FROM
                    " . $this->table_name . " WHERE user != :user AND ( current_place LIKE :current_place OR used_place LIKE :used_place OR birth_place LIKE :birth_place )";
         // prepare query statement
        $stmt = $this->conn->prepare($query);
        
        // sanitize 
        $this->user = htmlspecialchars(strip_tags($this->user));
        $this->current_place = htmlspecialchars(strip_tags($this->current_place));
        $this->used_place = htmlspecialchars(strip_tags($this->used_place));
        $this->birth_place = htmlspecialchars(strip_tags($this->birth_place));
        
        // bind values
        $stmt->bindParam(":user", $this->user);
        $stmt->bindParam(":current_place", $this->current_place);
        $stmt->bindParam(":used_place", $this->current_place);
        $stmt->bindParam(":birth_place", $this->current_place);
        
        // execute query
        $stmt->execute();
        return $stmt;
        }
    
    function searchByPhone() {
        $query = "SELECT * FROM
                " . $this->table_name . " 
             WHERE
                    phone_number = :phone_number";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        
        //sanitize
        $this->phone_number = htmlspecialchars(strip_tags($this->phone_number));
        // bind values
        $stmt->bindParam(":phone_number", $this->phone_number);
        
        // execute query
        $stmt->execute();
        return $stmt;
        
}

    function my_tefelagi() {
         $query = "SELECT first_name, father_name, current_place, picture, phone_number FROM
                    " . $this->table_name . " WHERE user = :user";
         // prepare query statement
        $stmt = $this->conn->prepare($query);
        
        // sanitize 
        $this->user = htmlspecialchars(strip_tags($this->user));
        
        // bind values
        $stmt->bindParam(":user", $this->user);
        // execute query
        $stmt->execute();
        return $stmt;
    }

// get all Tefelagi
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