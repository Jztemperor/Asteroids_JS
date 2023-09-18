<?php
session_start();

if($_SERVER["REQUEST_METHOD"] == "POST")
{
    // Import db conn
    require_once("db.php");

    // Get user input from POST request
    $username = $_POST["register_username"];
    $email = filter_var($_POST["register_email"], FILTER_VALIDATE_EMAIL);
    $password = $_POST["register_password"];

    // Validate
    if(!$email)
    {
        $response = array("success" => false, "fieldName" => "email", "message" => "Invalid Email format!");
    }else if(empty($username))
    {
        $response = array("success" => false, "fieldName" => "username", "message" => "Username is required!");
    }else if(empty($password))
    {
        $response = array("success" => false, "fieldName" => "password", "message" => "Password is required!");
    }
    else
    {
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
                $response = array("success" => false, "fieldName" => "email", "message" => "Email or username already in use!");  
            }
            else
            {
                // Hash password, and save user to database
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                $stmt = $conn->prepare("INSERT INTO user (username,email,password) VALUES (?,?,?)");
                $stmt->bind_param("sss", $username, $email, $hashedPassword);
                $stmt->execute();
                $stmt->close();

                // Set session
                $_SESSION["username"] = $username;
                
                // Redirect user to the menu
                header("Location: index.html");
                exit();
            }
        }
    }
}
header('Content-Type: application/json');
echo json_encode($response);
?>