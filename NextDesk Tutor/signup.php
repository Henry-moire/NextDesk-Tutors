<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $role = $_POST['role'];

    $check = $conn->prepare("SELECT id FROM users WHERE email=?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        $error = "Email already registered.";
    } else {
        $stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $password, $role);
        if ($stmt->execute()) {
            $_SESSION['id'] = $stmt->insert_id;
            $_SESSION['name'] = $name;
            $_SESSION['role'] = $role;
            if ($role === 'student') {
                header("Location: studentdashboard.php");
            } else {
                header("Location: tutordashboard.php");
            }
            exit;
        } else {
            $error = "Registration failed. Please try again.";
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Sign Up</title>
<style>
body { font-family: Arial; background: #eef; display: flex; justify-content: center; align-items: center; height: 100vh; }
form { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); width: 300px; }
input, select { width: 100%; margin: 10px 0; padding: 8px; }
button { width: 100%; padding: 10px; background: #007BFF; color: white; border: none; cursor: pointer; }
h2 { text-align: center; }
.error { color: red; text-align: center; }
</style>
</head>
<body>
<form method="POST">
<h2>Sign Up</h2>
<?php if (!empty($error)) echo "<p class='error'>$error</p>"; ?>
<input type="text" name="name" placeholder="Full Name" required>
<input type="email" name="email" placeholder="Email" required>
<input type="password" name="password" placeholder="Password" required>
<select name="role" required>
  <option value="">-- Select Role --</option>
  <option value="student">Student</option>
  <option value="tutor">Tutor</option>
</select>
<button type="submit">Register</button>
<p style="text-align:center;">Already have an account? <a href="login.php">Login</a></p>
</form>
</body>
</html>
