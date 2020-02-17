<?php
 session_start();
include "access_functions.php"; 
include "../../config/connection.php";
  listOfAccess(); 
	if(isset($_POST['btnLogin'])){
		

		$email = $_POST['tbEmail'];
		$pass = $_POST['tbLozinka'];

		$errors = [];
		$reLozinka = "/^[\S]{5,}$/";

		if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
      $errors[] = "Email not ok";
      echo ("Email is not correct.");

		}

		if(!preg_match($reLozinka, $pass)){
      $errors[] = "Password not ok.";
      echo ("Password is not correct");
		}

		if(count($errors) > 0){
            $_SESSION['errors'] = $errors;
          
			header("Location: ../../index.php?page=login");
		}
		else {
			
      $pass = md5($pass);
      
      try{

			 $upit = "SELECT *, u.id FROM user u INNER JOIN user_role r
              ON u.role_id = r.id WHERE email = ? AND pass = ?";

			    $stmt = $conn->prepare($upit);
			    $stmt->bindValue(1, $email);
			    $stmt->bindValue(2, $pass);

			    $stmt->execute();
			    $user = $stmt->fetch();
			    if($user) {
              $_SESSION['user'] = $user; 
              getLogin($user->id);
              header("Location: ../../index.php?page=home"); 
            
			        
			    } else {
              $_SESSION['errors'] = "Wrong email or password.";
              echo ("Wrong email or password");
			        header("Location: ../../index.php?page=login");
			    }
    }
    
    catch(PDOException $ex){
      echo json_encode(['message'=> 'Problem with database ' . $ex->getMessage()]);
      errorsList($ex->getMessage());
      http_response_code(500);
  }
  }
}


if (isset($_SESSION['errors'])):
  echo "<div class='text-center'><br/>
  <strong>Please enter valid email and password.</strong>
  </div>";
  unset($_SESSION['errors']);
  ?>
  <?php endif;?>
  