<?php
session_start();
require_once 'db.php';
#require_once 'auth.php';

// Only tutors can access
if ($_SESSION['role'] != 'tutor') {
    header("Location: login.php");
    exit();
}

$tutor_id = $_SESSION['id'];

// Get session ID
$id = intval($_GET['id'] ?? 0);
$result = $conn->query("SELECT * FROM sessions WHERE id=$id AND tutor_id=$tutor_id");

if ($result->num_rows == 0) {
    echo "Session not found or you do not have permission.";
    exit();
}

$session = $result->fetch_assoc();

// Handle form submission
if (isset($_POST['update_session'])) {
    $title = $_POST['title'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $description = $_POST['description'];

    $stmt = $conn->prepare("UPDATE sessions SET title=?, date=?, time=?, description=? WHERE id=? AND tutor_id=?");
    $stmt->bind_param("ssssii", $title, $date, $time, $description, $id, $tutor_id);
    $stmt->execute();
    $stmt->close();

    header("Location: tutordashboard.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Session | NextDesk Tutor</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="dashboard-container container">
    <h2>Edit Session</h2>
    <form method="POST">
        <input type="text" name="title" value="<?= htmlspecialchars($session['title']) ?>" required>
        <input type="date" name="date" value="<?= htmlspecialchars($session['date']) ?>" required>
        <input type="time" name="time" value="<?= htmlspecialchars($session['time']) ?>" required>
        <textarea name="description" rows="3"><?= htmlspecialchars($session['description']) ?></textarea>
        <button name="updatesession" class="btn btn-edit">Update Session</button>
        <a href="tutordashboard.php" class="btn btn-danger">Cancel</a>
    </form>
</div>
</body>
</html>
