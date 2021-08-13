<?php
	session_start();  
	require_once('conn.php');
	require_once('utils.php');

	if (empty($_SESSION['username'])) {
    header('Location: index.php');
    exit();
  }

	if (empty($_POST['id']) || empty($_POST['title']) || empty($_POST['content'])) {
		header('Location: ' . $page);
		die();
	}
	$page = $_POST['page'];
	$id = $_POST['id'];
	$title = $_POST['title'];
	$content = $_POST['content'];

	$sql = "UPDATE christy_blog_articles SET title=?, content=? WHERE id=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ssi', $title, $content, $id);
	$result = $stmt->execute();

	if (!$result) {
		die($conn->error);
	}

	header('Location: ' . $page);
	exit();
?>
