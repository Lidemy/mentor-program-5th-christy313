<?php
	session_start();
	require_once('conn.php');
	require_once('utils.php');

	$id = $_GET['id'];

	$username = NULL;
	$user = NULL;

	if (!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
		$user = getUserFromUsername($username);
  }

  $stmt = $conn->prepare(
  	'SELECT * FROM christy_w11_hw1_comments WHERE id = ?'
  );

  $stmt->bind_param('i', $id);
	$result = $stmt->execute();
	if (!$result) {
		die('error:' . $conn->error);
	}
	$result = $stmt->get_result();
	$row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>demo</title>
	<link rel="stylesheet" href="./style.css">
</head>
<body>
	<header class="warning">
		This is a practice for back end, please DO NOT register!
	</header>
	<main class="board">
		<h1 class="board__title">
			編輯留言
		</h1>
		<?php
			if (!empty($_GET['errCode']))  {
				$code = $_GET['errCode'];
				$msg =  'Error';
				if ($code === '1') {
					$msg = '資料不齊全';
				}
				echo '<h2 class="error">' . $msg . '</h2>';
			}
		?>
			<form class="board__new-comment-form" method="POST" action="handle_update_comment.php">
				<textarea name="content" id="" cols="30" rows="10"><?php echo $row['content']; ?></textarea>
					<input type="hidden" name="id" value="<?php echo $row['id']; ?>">
					<input class="board__submit-btn" type="submit" />
			</form>
	</main>
</body>
</html>