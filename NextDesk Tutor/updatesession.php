<?php
session_start();
require_once 'db.php';

if ($_SESSION['role'] != 'tutor') {
    header("Location: login.php");
    exit();
}

$tutor_id = $_SESSION['id'];

// --- Handle adding a new session ---
if (isset($_POST['add_session'])) {
    $title = $_POST['title'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $description = $_POST['description'];

    $stmt = $conn->prepare("INSERT INTO sessions (tutor_id, title, date, time, description) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issss", $tutor_id, $title, $date, $time, $description);
    $stmt->execute();
    $stmt->close();
    header("Location: tutordashboard.php");
    exit();
}

// --- Handle updating a session ---
if (isset($_POST['updatesession'])) {
    $session_id = intval($_POST['session_id']);
    $title = $_POST['title'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $description = $_POST['description'];

    $stmt = $conn->prepare("UPDATE sessions SET title=?, date=?, time=?, description=? WHERE id=? AND tutor_id=?");
    $stmt->bind_param("ssssii", $title, $date, $time, $description, $session_id, $tutor_id);
    $stmt->execute();
    $stmt->close();
    header("Location: tutordashboard.php");
    exit();
}

// --- Handle deleting a session ---
if (isset($_GET['delete'])) {
    $session_id = intval($_GET['delete']);
    $conn->query("DELETE FROM sessions WHERE id=$session_id AND tutor_id=$tutor_id");
    header("Location: tutordashboard.php");
    exit();
}

// --- Fetch tutor's sessions ---
$sessions = $conn->query("SELECT * FROM sessions WHERE tutor_id=$tutor_id ORDER BY date, time");
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tutor Dashboard | NextDesk Tutor</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header>
<nav class="container">
<h1>NextDesk Tutor</h1>
<ul>
<li><a href="tutordashboard.php" class="active">Dashboard</a></li>
<li><a href="logout.php" class="cta-button">Logout</a></li>
</ul>
</nav>
</header>

<div class="dashboard-container container">
<h2>Welcome, <?= htmlspecialchars($_SESSION['name']) ?></h2>

<!-- Add new session -->
<h3>Add New Session</h3>
<form method="POST">
<input type="text" name="title" placeholder="Session Title" required>
<input type="date" name="date" required>
<input type="time" name="time" required>
<textarea name="description" placeholder="Description" rows="3"></textarea>
<button type="submit" name="addsession" class="btn">Add Session</button>
</form>

<!-- List of tutor's sessions -->
<h3>Your Sessions</h3>
<table class="styled-table">
<tr>
<th>Title</th>
<th>Date</th>
<th>Time</th>
<th>Description</th>
<th>Actions</th>
</tr>
<?php while ($row = $sessions->fetch_assoc()): ?>
<tr>
<form method="POST" style="margin:0; display:flex; gap:5px;">
<td><input type="text" name="title" value="<?= htmlspecialchars($row['title']) ?>" required></td>
<td><input type="date" name="date" value="<?= $row['date'] ?>" required></td>
<td><input type="time" name="time" value="<?= $row['time'] ?>" required></td>
<td><input type="text" name="description" value="<?= htmlspecialchars($row['description']) ?>"></td>
<td>
<input type="hidden" name="session_id" value="<?= $row['id'] ?>">
<button type="submit" name="update_session" class="btn btn-edit">Update</button>
<a href="?delete=<?= $row['id'] ?>" class="btn btn-danger">Delete</a>
</td>
</form>
</tr>
<?php endwhile; ?>
</table>
</div>

<footer>
<p>&copy; 2025 NextDesk Tutor. All rights reserved.</p>
</footer>
</body>
</html>
