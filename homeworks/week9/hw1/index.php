<?php
	session_start();
	require_once('conn.php');
	$result = $conn->query('SELECT * FROM christy_w9_comments ORDER BY id DESC');

	if ($conn->error) {
		die($conn->error);
	}

	$username = NULL;
	if ($_SESSION['username']) {
		$username = $_SESSION['username'];
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
			<?php if ($username) { ?>
			  <a class="logout-btn" name="logout" href="logout.php">Log Out</a>
			<?php } else { ?>
				<a class="login-btn" name="login" href="login.php">Log In</a>
				<a class="signup-btn" name="sign-up" href="signup.php">Sign Up</a>
			<?php } ?>
		</div>
	</nav>

	<div class="bulletin">

		<form class="post" method="POST" action="handle_new_post.php">
			<h2>Hi! <?php echo $username; ?></h2>
			<h1>Comments</h1>

			<?php 
				if ($_GET['errCode']) {
					$code = $_GET['errCode'];
					$msg = 'error';
					if ($code === '1') {
 						$msg = 'Please Log In or Sign Up';
					} else if ($code === '2') {
 						$msg = 'Wanna leave something here?';
					}
					echo '<h2 class="error">' . $msg . '</h2>';
				}
			?>
			<!-- <div class="post-username">暱稱： <input type="text" name="username"></div> -->
				<div>
					<textarea class="new-post" type="text" name="content" rows="10" cols="48"></textarea>
				</div>
				<button>Submit</button>
		</form>

		<?php while ($row = $result->fetch_assoc()) { ?>
			<div class="comment">
				
					<div class="comment__avatar">
					</div>

				<div class="comment__info">

					<div class="comment__data">
						<div class="comment__user">
							<?php echo $row['username']; ?>
						</div>

						<div class="comment__time">
							<?php echo $row['created_at']; ?>
						</div>
					</div>		

					<div class="comment__cotent">
						<?php echo $row['content']; ?>
					</div>
				</div>			
			</div>
		<?php } ?>	
	</div>
	
</body>
</html>