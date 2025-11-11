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

// --- Handle adding a new session ---
if (isset($_POST['addsession'])) {
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

// --- Handle deleting a session ---
if (isset($_GET['delete'])) {
  $id = intval($_GET['delete']);
  $conn->query("DELETE FROM sessions WHERE id=$id AND tutor_id=$tutor_id");
  header("Location: tutordashboard.php");
  exit();
}

// --- Fetch tutor's sessions ---
$sessions = $conn->query("SELECT * FROM sessions WHERE tutor_id = $tutor_id ORDER BY date, time");

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
  <h2>Add New Session</h2>
  <form method="POST">
    <input type="text" name="title" placeholder="Session Title" required>
    <input type="date" name="date" required>
    <input type="time" name="time" required>
    <textarea name="description" placeholder="Description" rows="3"></textarea>
    <button name="addsession" class="btn">Add Session</button>
  </form>

  <!-- List of tutor's sessions -->
  <h2>Your Sessions</h2>
  <table class="styled-table">
    <tr>
      <th>Title</th>
      <th>Date</th>
      <th>Time</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
    <?php if ($sessions->num_rows > 0): ?>
      <?php while ($row = $sessions->fetch_assoc()): ?>
        <tr>
          <td><?= htmlspecialchars($row['title']) ?></td>
          <td><?= htmlspecialchars($row['date']) ?></td>
          <td><?= htmlspecialchars($row['time']) ?></td>
          <td><?= htmlspecialchars($row['description']) ?></td>
          <td>
            <a href="updatesession.php?id=<?= $row['id'] ?>" class="btn btn-edit">Edit</a>
            <a href="?delete=<?= $row['id'] ?>" class="btn btn-danger">Delete</a>
          </td>
        </tr>
      <?php endwhile; ?>
    <?php else: ?>
      <tr><td colspan="5">No sessions found.</td></tr>
    <?php endif; ?>
  </table>
</div>

<footer>
  <p>&copy; 2025 NextDesk Tutor. All rights reserved.</p>
</footer>
</body>
</html>
