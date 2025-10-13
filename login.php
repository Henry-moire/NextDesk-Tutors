<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tutoring_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $passwordInput = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($passwordInput, $user['password'])) {
            // Generate OTP
            $otp = rand(100000, 999999);
            $expiry = date("Y-m-d H:i:s", strtotime("+10 minutes"));
            $conn->query("UPDATE users SET otp_code='$otp', otp_expiry='$expiry' WHERE email='$email'");

            // Send OTP to email
            $subject = "NextDesk Tutor Login OTP";
            $message = "Your One-Time Password is: $otp\nThis code expires in 10 minutes.";
            $headers = "From: no-reply@nextdesktutor.com";

            mail($email, $subject, $message, $headers);

            $_SESSION['email'] = $email;
            echo "OTP sent to your email. <a href='verify_login_otp.html'>Verify here</a>";
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No account found with that email.";
    }
}
$conn->close();
?>
