<?php
	session_start();
	require_once('conn.php');

	$username = $_SESSION['username'];

	if (!$_SESSION['username']) {
		header('Location: index.php?errCode=1');
		die();
	} else if (empty($_POST['content'])) {
		header('Location: index.php?errCode=2');
		die();
	}
	
	$content = $_POST['content'];

	$sql = sprintf("INSERT INTO christy_w9_comments (username, content) VALUES ('%s', '%s')", $username, $content);
	$result = $conn->query($sql);
	if (!$result) {
		die($conn->error);
	}

	header('Location: index.php');
?>