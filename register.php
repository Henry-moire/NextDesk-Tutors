<?php
$servername = "localhost";
$username = "root";
$password = ""; // leave empty if using XAMPP default
$dbname = "tutoring_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $role = $_POST['role'];

  $otp = rand(100000, 999999);
  $otp_expiry = date("Y-m-d H:i:s", strtotime("+10 minutes"));

  $sql = "INSERT INTO users (name, email, password, role, otp_code, otp_expiry)
          VALUES ('$name', '$email', '$password', '$role', '$otp', '$otp_expiry')";

  if ($conn->query($sql) === TRUE) {
      // Send OTP to email
      $subject = "Your Tutor App Verification Code";
      $message = "Your verification code is: " . $otp;
      $headers = "From: no-reply@tutorapp.com";
      mail($email, $subject, $message, $headers);

      echo "Registration successful! Check your email for OTP.";
  } else {
      echo "Error: " . $conn->error;
  }
}

$conn->close();
?>
