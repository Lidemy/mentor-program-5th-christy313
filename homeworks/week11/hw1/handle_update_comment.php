<?php
	session_start(); 
	require_once('conn.php');
	require_once('utils.php');

	if (empty($_POST['content'])) {
		header('Location: update_comment.php?errCode=1&id=' . $_POST['id']);
		die();
	}

	$username = $_SESSION['username'];
	$user = getUserFromUsername($username);
	$id = $_POST['id'];
	$content = $_POST['content'];

	$sql = "UPDATE christy_w11_hw1_comments set content=? WHERE id=? AND username=?";

	if (isAdmin($user)) {
		$sql = "UPDATE christy_w11_hw1_comments set content=? WHERE id=?";
	}

	$stmt = $conn->prepare($sql);

	if (isAdmin($user)) {
		$stmt->bind_param('si', $content, $id);
	} else {
		$stmt->bind_param('sis', $content, $id, $username);
	}
	
	$result = $stmt->execute();

	if (!$result) {
		die($conn->error);
	}

	header('Location: index.php');
	die();
?>