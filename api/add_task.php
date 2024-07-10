<?php
require 'db.php';
session_start();

// CORS izinleri
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

header('Content-Type: application/json');

// Preflight isteklerine boş yanıt döndürün.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];
        $title = $data['title'];
        $description = $data['description'];

        try {
            $sql = "INSERT INTO tasks (user_id, title, description) VALUES (:user_id, :title, :description)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->execute();

            // Eklenen görevin detaylarını al
            $lastId = $conn->lastInsertId();
            $sql = "SELECT * FROM tasks WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $lastId);
            $stmt->execute();
            $task = $stmt->fetch(PDO::FETCH_ASSOC);

            echo json_encode(["message" => "Task added successfully", "task" => $task]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "User not authenticated"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
