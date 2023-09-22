<?php
/*
 * score.php
 * Saves / updates user's score if it is bigger than current score
 */

session_start();

// Check if user is authenticated, otherwise send back to auth (failsafe, they should be authed by this point)
if (!isset($_SESSION['user_id'])) {
    header("Location: auth.html");
    exit();
}

// Check for post request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Import db conn
    require_once("db.php");

    // Get user ID from session
    $user_id = (int)$_SESSION['user_id'];

    // Get score from post request
    $score = (int)$_POST['score'];

    if (!empty($score)) {
        // Get users stored score and compare it with current score
        $stmt = $conn->prepare("SELECT score FROM user WHERE user_id = ?");

        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $score_in_db = $result->fetch_assoc();
        $stmt->close();



        if ($score_in_db['score'] == null || $score > $score_in_db['score']) {
            $stmt = $conn->prepare("UPDATE user SET score = ? WHERE user_id = ?");
            $stmt->bind_param("ii", $score, $user_id);
            $stmt->execute();
            $stmt->close();
        }
    }
}
