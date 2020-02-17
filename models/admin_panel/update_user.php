<?php
header('Content-Type: application/json');

if(isset($_POST['id'])){
    require_once '../../config/connection.php';

    $id = $_POST['id'];
    $first_name = trim($_POST['tbAddName']);
    $last_name= trim($_POST['tbAddLast']);
    $email= trim($_POST['tbAddEmail']);
     $pass= trim($_POST['tbAddLozinka']);
     $role= trim($_POST['tbRole']);
     $reg_date = date("Y-m-d H:i:s"); 
    
    $result= $conn->prepare("UPDATE user SET first_name = ?, last_name=?, email=?, pass=?, reg_date=?, role_id=? WHERE id = ?");


    $result->bindValue(1, $id);
    $result->bindValue(2, $first_name);
    $result->bindValue(3, $last_name);
    $result->bindValue(4, $email);
    $result->bindValue(5, $pass);
    $result->bindValue(6, $reg_date);
    $result->bindValue(7, $role);
    

   

    try {
        $result->execute();
    
        http_response_code(204); 
    }
    catch(PDOException $ex){
    
        errorsList($ex->getMessage());

        http_response_code(500);
    }
} else {
    http_response_code(400); 
    errorsList("Update user - 400");
}
