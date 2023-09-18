<?php
    // Create vars for connection
    $host = 'localhost';
    $database = 'asteroids';
    $username = 'jezzy';
    $password = 'pwd123';

    // Create connection
    $conn = new mysqli($host, $username, $password, $database);
    
    if($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }
?>