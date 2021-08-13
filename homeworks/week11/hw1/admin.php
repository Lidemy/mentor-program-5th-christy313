<?php
	session_start();
	require_once('conn.php');
	require_once('utils.php');

	$username = NULL;
	$user = NULL;

	if (!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
		$user = getUserFromUsername($username);
  }

  if ($user === NULL || $user['role']!== 'ADMIN') {
		header('Location: index.php');
		exit();
  }

  $stmt = $conn->prepare(
		'select id, role, nickname, username from christy_w11_hw1_users order by id asc'
  );

	$result = $stmt->execute();
	if (!$result) {
		die('error:' . $conn->error);
	}
	$result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>後台管理</title>
	<link rel="stylesheet" href="./style.css">
</head>
<body>
	<header class="warning">
		This is a practice for back end, please DO NOT register!
	</header>
	<main class="board">
		<section>
			<a class="back_to_index"href="index.php">回首頁</a>
			<table>
				<tr>
					<th>id</th>
					<th>role</th>
					<th>nickname</th>
					<th>username</th>
					<th>調整身份</th>
				</tr>
			<?php  while ($row = $result->fetch_assoc()) { ?>
				<tr>
					<td><?php echo escape($row['id']); ?></td>
					<td><?php echo escape($row['role']); ?></td>
					<td><?php echo escape($row['nickname']); ?></td>
					<td><?php echo escape($row['username']); ?></td>
					<td>
						<a href="handle_update_role.php?role=ADMIN&id=<?php echo escape($row['id']) ?>">管理員</a>
						<a href="handle_update_role.php?role=NORMAL&id=<?php echo escape($row['id']) ?>">使用者</a>
						<a href="handle_update_role.php?role=BANNED&id=<?php echo escape($row['id']) ?>">停權</a>
					</td>
				</tr>
			<?php } ?>
			</table>
		</section>
</body>
</html>