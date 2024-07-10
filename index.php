<?php
require 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}

$sql = "SELECT * FROM tasks WHERE user_id = :user_id ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':user_id', $_SESSION['user_id']);
$stmt->execute();
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
    <title>To-Do App</title>
</head>
<body>
    <h1>To-Do List</h1>
    <button onclick="window.location.href='add_task.php'">Add Task</button>

    <h2>Tasks</h2>
    <ul>
        <?php foreach ($tasks as $task): ?>
            <li>
                <strong><?php echo htmlspecialchars($task['title']); ?></strong><br>
                <?php echo htmlspecialchars($task['description']); ?><br>
                <button onclick="window.location.href='edit_task.php?id=<?php echo $task['id']; ?>'">Edit</button>
                <button onclick="window.location.href='delete_task.php?id=<?php echo $task['id']; ?>'">Delete</button>
            </li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
