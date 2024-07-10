<?php
require 'db.php';
session_start();

// CORS izinleri
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

header('Content-Type: application/json');

// Preflight isteklerine boş yanıt döndürün.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    if (isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['id']) && isset($data['title']) && isset($data['description'])) {
            $id = $data['id'];
            $title = $data['title'];
            $description = $data['description'];

            $sql = "UPDATE tasks SET title = :title, description = :description WHERE id = :id AND user_id = :user_id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();

            echo json_encode(["message" => "Task updated successfully", "todo" => $data]);
        } else {
            echo json_encode(["error" => "Invalid input"]);
        }
    } else {
        echo json_encode(["error" => "User not authenticated"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
