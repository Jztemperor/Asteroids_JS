<?php
/*
 * register.php
 * Handles user registration
 * Validates form data via xml requests, sends back json response with validation messages
 * 
 */

session_start();

// Check for post request
if($_SERVER["REQUEST_METHOD"] == "POST")
{
    // Import db conn
    require_once("db.php");

    // Get user input from POST request
    $username = trim($_POST["register_username"]);
    $email = trim(filter_var($_POST["register_email"], FILTER_VALIDATE_EMAIL));
    $password = trim($_POST["register_password"]);

    // Empty array to store errors
    $errors = array();

    // Validate
    if(!$email)
    {
        $errors[] = array("fieldName" => "email", "message" => "Valid email required!");
    }
    
    if(empty($username))
    {
        $errors[] = array("fieldName" => "username", "message" => "Username is required!");
    }
    
    if(empty($password))
    {
        $errors[] = array("fieldName" => "password", "message" => "Password is required!");
    }


 
        // Check if user already exists (email or username)
        $stmt = $conn->prepare("SELECT * FROM user WHERE email = ? OR username = ?");
        
        if($stmt)
        {
            // Bind parameters, execute query
            $stmt->bind_param("ss", $email, $username);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();

            $stmt->close();

            // If user exists return error json
            if($user)
            {
                $errors[] = array("fieldName" => "email", "message" => "Email or username in use!");                 
            }
            else if(empty($errors))
            {
                // Hash password, and save user to database
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                $stmt = $conn->prepare("INSERT INTO user (username,email,password) VALUES (?,?,?)");
                $stmt->bind_param("sss", $username, $email, $hashedPassword);
                $stmt->execute();

                // Get lastest inserted id
                $user_id = $conn->insert_id;

                $stmt->close();


                // Set session
                $_SESSION["user_id"] = $user_id;

                $successResponse = array("success" => true);
                header('Content-Type: application/json');
                echo json_encode($successResponse);
                
            }
        }

    // If there are erros, put them in an array and send to client
    if(!empty($errors))
    {
        $errorResponse = array("success" => false, "errors" => $errors);
        header('Content-Type: application/json');
        echo json_encode($errorResponse);
    }
    
}
