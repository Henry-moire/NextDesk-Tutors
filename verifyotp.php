<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tutoring_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST['email'];
  $otp = $_POST['otp'];

  $sql = "SELECT otp_code, otp_expiry FROM users WHERE email='$email'";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row['otp_code'] == $otp && strtotime($row['otp_expiry']) > time()) {
      $conn->query("UPDATE users SET verified=1 WHERE email='$email'");
      echo "Email verified successfully!";
    } else {
      echo "Invalid or expired OTP.";
    }
  } else {
    echo "User not found.";
  }
}

$conn->close();
?>
