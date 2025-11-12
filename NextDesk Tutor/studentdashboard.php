<?php
session_start();
require_once 'db.php';

if ($_SESSION['role'] != 'student') {
  header("Location: login.php");
  exit();
}

$student_id = $_SESSION['id'];

// --- Handle book session ---
if (isset($_POST['book'])) {
    $session_id = intval($_POST['session_id']);
    $conn->query("INSERT INTO bookings (student_id, session_id, status) VALUES ($student_id, $session_id, 'booked')");
    header("Location: studentdashboard.php");
    exit();
}

// --- Handle update booking ---
if (isset($_POST['update'])) {
    $booking_id = intval($_POST['booking_id']);
    $date = $_POST['date'];
    $time = $_POST['time'];
    $conn->query("UPDATE sessions 
                  SET date='$date', time='$time' 
                  WHERE id=(SELECT session_id FROM bookings WHERE id=$booking_id AND student_id=$student_id)");
    header("Location: studentdashboard.php");
    exit();
}

// --- Handle cancel booking ---
if (isset($_GET['cancel'])) {
    $booking_id = intval($_GET['cancel']);
    $conn->query("DELETE FROM bookings WHERE id = $booking_id AND student_id = $student_id");
    header("Location: studentdashboard.php");
    exit();
}

// --- Get available sessions ---
$sessions = $conn->query("SELECT * FROM sessions WHERE id NOT IN (SELECT session_id FROM bookings WHERE student_id = $student_id) ORDER BY date, time");

// --- Get student bookings ---
$myBookings = $conn->query("
    SELECT b.id AS booking_id, s.title, s.date, s.time, s.description, b.status
    FROM bookings b
    JOIN sessions s ON b.session_id = s.id
    WHERE b.student_id = $student_id
");
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Student Dashboard | NextDesk Tutor</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header>
  <nav class="container">
    <h1>NextDesk Tutor</h1>
    <ul>
      <li><a href="studentdashboard.php" class="active">Dashboard</a></li>
      <li><a href="logout.php" class="cta-button">Logout</a></li>
    </ul>
  </nav>
</header>

<div class="dashboard-container container">

<h2>Available Sessions</h2>
<table class="styled-table">
<tr>
  <th>Title</th>
  <th>Date</th>
  <th>Time</th>
  <th>Description</th>
  <th>Action</th>
</tr>
<?php while($row = $sessions->fetch_assoc()): ?>
<tr>
  <td><?= htmlspecialchars($row['title']) ?></td>
  <td><?= htmlspecialchars($row['date']) ?></td>
  <td><?= htmlspecialchars($row['time']) ?></td>
  <td><?= htmlspecialchars($row['description']) ?></td>
  <td>
    <form method="POST" style="margin:0">
      <input type="hidden" name="session_id" value="<?= $row['id'] ?>">
      <button type="submit" name="book" class="btn">Book</button>
    </form>
  </td>
</tr>
<?php endwhile; ?>
</table>

<h2>Your Bookings</h2>
<table class="styled-table">
<tr>
  <th>Title</th>
  <th>Date</th>
  <th>Time</th>
  <th>Status</th>
  <th>Actions</th>
</tr>
<?php while($b = $myBookings->fetch_assoc()): ?>
<tr>
  <td><?= htmlspecialchars($b['title']) ?></td>
  <td>
    <form method="POST" style="margin:0; display:flex; gap:5px;">
      <input type="hidden" name="booking_id" value="<?= $b['booking_id'] ?>">
      <input type="date" name="date" value="<?= $b['date'] ?>" required>
  </td>
  <td><input type="time" name="time" value="<?= $b['time'] ?>" required></td>
  <td><?= htmlspecialchars($b['status']) ?></td>
  <td>
      <button type="submit" name="update" class="btn btn-edit">Update</button>
      <a href="?cancel=<?= $b['booking_id'] ?>" class="btn btn-danger">Cancel</a>
    </form>
  </td>
</tr>
<?php endwhile; ?>
</table>

</div>
<footer>
  <p>&copy; 2025 NextDesk Tutor. All rights reserved.</p>
</footer>
</body>
</html>
