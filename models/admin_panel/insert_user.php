<?php

header('Content-Type: application/json');

if (isset($_POST['btnSave'])) {
    require_once '../../config/connection.php';

    
        $first_name = trim($_POST['tbAddName']);
        $last_name = trim($_POST['tbAddLast']);
        $email = trim($_POST['tbAddEmail']);
        $pass = $_POST['tbAddLozinka'];
        $role= $_POST['tbRole'];
        $reg_date = date("Y-m-d H:i:s"); 

        $pass=md5($pass);
        
        $result = $conn->prepare("INSERT INTO user VALUES ('', ?, ?, ?, ?, ?, ?)");
  
     
    try {
        
        $result->bindValue(1, $first_name);
        $result->bindValue(2, $last_name);
        $result->bindValue(3, $email);
        $result->bindValue(4, $pass);
        $result->bindValue(5, $reg_date);
        $result->bindValue(6, $role);
        $r=$result->execute();
             
         http_response_code(201);      
     
    }
    catch(PDOException $e){
        echo json_encode (["problem"=>"Problem with adding user!"]);
        http_response_code(500);
        header("Location: ../../index.php?page=admin");
    }}

    else {
        http_response_code(400);
     
    }