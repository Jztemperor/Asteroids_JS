<?php
/*
 * login.php
 * Handles user auth
 * Validates form data via xml requests, sends back json response with validation messages
 * 
 */

session_start();

if($_SERVER["REQUEST_METHOD"] == "POST")
{
    // Import db conn
    require_once("db.php");

    // Get user input from POST request
    $username = trim($_POST["login_username"]);
    $password = trim($_POST["login_password"]);
    
    // Empty array to store errors
    $errors = array();

    // Validate input
    if(empty($username))
    {
        $errors[] = array("fieldName" => "username", "message" => "Username is required!");
    }

    if(empty($password))
    {
        $errors[] = array("fieldName" => "password", "message" => "Password is required!");
    }

    // Proceed with auht if there are no errors
    if(empty($errors))
    {
        // Check if user exists with this username
        $stmt = $conn->prepare("SELECT * FROM user WHERE username = ?");
        // Bind parameters, execute query
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        // If user exists and password checks out set session and success response
        if($user && password_verify($password, $user["password"]))
        {
            $_SESSION["user_id"] = $user["user_id"];
            $successResponse = array("success" => true);
            header('Content-Type: application/json');
            echo json_encode($successResponse);
        }
        else
        {
            $errors[] = array("fieldName" => "password", "message" => "Invalid credentials!");            
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
