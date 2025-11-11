<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Fetch user by email
    $stmt = $conn->prepare("SELECT id, name, password, role FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $name, $hash, $role);
        $stmt->fetch();

        // Check password
        if (password_verify($password, $hash)) {
            $_SESSION['id'] = $id;
            $_SESSION['name'] = $name;
            $_SESSION['role'] = $role;

            // Redirect based on role
            if ($role === 'student') {
                header("Location: studentdashboard.php");
            } else {
                header("Location: tutordashboard.php");
            }
            exit;
        } else {
            $error = "Invalid password.";
        }
    } else {
        $error = "No account found with that email.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Login</title>
<style>
body { font-family: Arial; background: #f8f8f8; display: flex; justify-content: center; align-items: center; height: 100vh; }
form { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); width: 300px; }
input { width: 100%; margin: 10px 0; padding: 8px; }
button { width: 100%; padding: 10px; background: #4CAF50; color: white; border: none; cursor: pointer; }
h2 { text-align: center; }
.error { color: red; text-align: center; }
</style>
</head>
<body>
<form method="POST">
<h2>Login</h2>
<?php if (!empty($error)) echo "<p class='error'>$error</p>"; ?>
<input type="email" name="email" placeholder="Email" required>
<input type="password" name="password" placeholder="Password" required>
<button type="submit">Login</button>
<p style="text-align:center;">Don’t have an account? <a href="signup.php">Sign Up</a></p>
</form>
</body>
</html>
