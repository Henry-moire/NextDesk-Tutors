<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "tutor_dashboard";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
