<?php
require 'db.php';
session_start();

// CORS izinleri
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['username_or_email']) && isset($data['password'])) {
        $username_or_email = $data['username_or_email'];
        $password = $data['password'];

        $sql = "SELECT * FROM users WHERE username = :username_or_email OR email = :username_or_email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username_or_email', $username_or_email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            echo json_encode(["message" => "Login successful"]);
        } else {
            echo json_encode(["error" => "Invalid username or password"]);
        }
    } else {
        echo json_encode(["error" => "Invalid input"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
