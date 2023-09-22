<?php
/*
 * scoreboard.php
 * Retrieves the top 15 users
 */

// Check for get request
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Import db conn
    require_once("db.php");

    // init arr for json response
    $response = array();

    // Get top 15 users who has a score
    $stmt = $conn->prepare("SELECT username,score FROM user WHERE score IS NOT NULL ORDER BY score DESC LIMIT 15");
    $stmt->execute();
    $result = $stmt->get_result();

    // Put each user into the response
    while ($row = $result->fetch_assoc()) {
        $username = $row["username"];
        $score = $row["score"];

        $response[] = array("username" => $username, "score" => $score);
    }
    $stmt->close();

    header('Content-Type: application/json');
    if (!empty($response)) {
        $okReponse = array("success" => true, "payload" => $response);
        echo json_encode($okReponse);
    } else {
        $errResponse = array("success" => false, "payload" => "No scores found in database!");
        echo json_encode($errResponse);
    }
}
