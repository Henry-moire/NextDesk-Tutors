<?php
session_start();
require_once 'includes/db.php';
require_once 'includes/auth.php';

// Only students can access
if ($_SESSION['role'] != 'student') {
    header("Location: login.php");
    exit();
}

$student_id = $_SESSION['id'];

// Get session ID
$session_id = intval($_GET['id'] ?? 0);

// Check if session exists and is available
$check = $conn->query("SELECT * FROM sessions WHERE id=$session_id AND id NOT IN (SELECT session_id FROM bookings)");
if ($check->num_rows == 0) {
    echo "Session not available or already booked.";
    exit();
}

// Insert booking
$stmt = $conn->prepare("INSERT INTO bookings (session_id, student_id, status) VALUES (?, ?, 'booked')");
$stmt->bind_param("ii", $session_id, $student_id);
$stmt->execute();
$stmt->close();

// Redirect back to dashboard
header("Location: studentdashboard.php");
exit();
