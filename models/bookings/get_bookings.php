<?php


function getUsersBookings(){
    global $conn;
    try{
        $usr_id=$_SESSION['user']->id;
        $select = $conn->prepare("SELECT *, u.id AS id_user, d.name AS dest_name FROM booking b INNER JOIN user u ON b.user_id=u.id INNER JOIN destinations d ON b.destination_id=d.id WHERE u.id = :usr_id");
        $select->bindParam(":usr_id", $usr_id);
        $select->execute();

        return $select->fetchAll();

    } catch(PDOException $ex){

        echo json_encode(['message'=> 'Error occured- problem while getting your bookings ' . $ex->getMessage()]);
        errorsList($ex->getMessage());
        http_response_code(500);
    }
}




