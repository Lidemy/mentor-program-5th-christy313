<?php
	require_once('conn.php');
	$result = $conn->query('SELECT * FROM christy_w9_comments ORDER BY id DESC');

	if ($conn->error) {
		die($conn->error);
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="style.css">
	<title>Bulletin</title>
</head>
<body>
	<div class="warning">
		This is a practice for back end, please DO NOT register!
	</div>
	<nav>
		<a href="index.php"><img src="./img/loud-speaker.png" alt="logo"></a>
		<div class="member-btn">
			<a class="login-btn" name="login" href="login.php">Log In</a>
			<a class="signup-btn" name="sign-up" href="signup.php">Sign Up</a>
		</div>
	</nav>

	<div class="bulletin">

		<form class="post" method="POST" action="handle_login.php">
			<h1>Log In</h1>

			<?php 
				if ($_GET['errCode']) {
					$code = $_GET['errCode'];
					$msg = 'error';
					if ($code === '1') {
 						$msg = 'Please fill out both columns';
					} else if ($code === '2') {
 						$msg = 'The user name or password is incorrect';
					}
					echo '<h2 class="error">' . $msg . '</h2>';
				}
			?>

			<div class="Signup">
				Username: <input class="signup-username" type="text" name="username"><br>
				Password: <input class="signup-password" type="password" name="password">
			</div>
			
			<button class="submit">Submit</button>
		</form>
	</div>
	
</body>
</html>