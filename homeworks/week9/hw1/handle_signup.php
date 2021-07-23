<?php
	session_start();
	require_once('conn.php');

	if (empty($_POST['username']) || empty($_POST['password'])) {
		header('Location: signup.php?errCode=1');
		die();
	}

	$username = $_POST['username'];
	$password = $_POST['password'];

	$sql = sprintf("INSERT INTO christy_w9_users (username, password) VALUES ('%s', '%s')", $username, $password);
	$result = $conn->query($sql);

	if (!$result) {
		$code = $conn->errno;
		if ($code === 1062) {
			header('Location: signup.php?errCode=2');
		} else {
			die($conn->error);
		}
	}

	if ($result) {
		$_SESSION['username'] = $username;
		header('Location: index.php');
	}
?>