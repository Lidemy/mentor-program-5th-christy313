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

  $page = 1;
  if (!empty($_GET['page'])) {
		$page = intval($_GET['page']);
  }

  $items_per_page = 3;
  $offset = ($page - 1) * $items_per_page;

  $stmt = $conn->prepare(
		'SELECT C.id as id, C.content as content, C.created_at as created_at, U.nickname as nickname, U.username as username FROM christy_w11_hw1_comments as C left join christy_w11_hw1_users as U on C.username = U.username WHERE C.is_deleted IS NULL ORDER BY C.id DESC limit ? offset ?'
  );

  $stmt->bind_param('ii', $items_per_page, $offset);
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
	<title>demo</title>
	<link rel="stylesheet" href="./style.css">
</head>
<body>
	<header class="warning">
		This is a practice for back end, please DO NOT register!
	</header>
	<main class="board">
		<?php if (!$username) { ?>
			<div>
				<a class="board__btn" href="register.php">註冊</a>
				<a class="board__btn" href="login.php">登入</a>
			</div>
		<?php } else { ?>
				<a class="board__btn" href="logout.php">登出</a>
				<span class="board__btn update-nickname">編輯暱稱</span>
				<?php if ($user && $user['role'] === 'ADMIN') { ?>
					<a class="board__btn" href="admin.php">管理後台</a>
				<?php } ?>
				<form class="board__nickname-form board__new-comment-form hide" method="POST" action="update_user.php">
					<div class="board__nickname">
						<span>新的暱稱：</span>
						<input type="text" name="nickname">
					</div>
					<input class="board__submit-btn" type="submit" />
				</form>
				<h3>你好！<?php echo $user['nickname']; ?></h3>
		<?php } ?>
		<h1 class="board__title">
			Comments
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
			<form class="board__new-comment-form" method="POST" action="handle_add_comment.php">
				<textarea name="content" id="" cols="30" rows="10"></textarea>
				<?php if ($username && !hasPermission($user, 'create', NULL)) { ?>
					<h3>你已被停權</h3>
				<?php } else if ($username) { ?>
					<input class="board__submit-btn" type="submit" />
				<?php } else { ?>
					<h3>請登入發布留言</h3>
				<?php } ?>
			</form>
			<div class="board__hr"></div>
		<section>
			<?php  while ($row = $result->fetch_assoc()) { ?>
				<div class="card">
				<div class="card__avatar">
				</div>
				<div class="card__body">
					<div class="card__info">
						<span class="card__author">
							<?php echo escape($row['nickname']); ?>
							(@<?php echo escape($row['username']); ?>)
						</span>
						<span class="card__time">
							<?php echo escape($row['created_at']); ?>
						</span>
						<?php if (hasPermission($user, 'modify', $row)) { ?>
              <a href="update_comment.php?id=<?php echo $row['id']; ?>">編輯</a>
              <a href="delete_comment.php?id=<?php echo $row['id']; ?>">刪除</a>
            <?php } ?>  
					</div>
					<p class="card__content"><?php echo escape($row['content']); ?></p>
				</div>
				</div>
			<?php } ?>
		</section>
		<div class="board__hr"></div>
		<?php  
			$stmt = $conn->prepare(
			'SELECT count(id) as count from christy_w11_hw1_comments where is_deleted is NULL'
			);

			$result = $stmt->execute();
			$result = $stmt->get_result();
			$row = $result->fetch_assoc();
			$count = $row['count'];
			$total_page = ceil($count / $items_per_page);
		?>
		<div class="page-info">
			<span>總共有 <?php echo $count?> 筆留言，分頁：</span>
			<span><?php echo $page ?> / <?php echo $total_page ?></span>
			分頁
		</div>
		<div class="paginator">
			<?php if ($page != 1) { ?>
				<a href="index.php?page=1">首頁</a>
				<a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
			<?php } ?>
			<?php if ($page != $total_page) { ?>
				<a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
				<a href="index.php?page=<?php echo $total_page ?>">最後一頁</a>
			<?php } ?>
		</div>
	</main>
	<script>
		var btn = document.querySelector('.update-nickname')
		btn.addEventListener('click', function() {
			var form = document.querySelector('.board__nickname-form')
			form.classList.toggle('hide')
		})
	</script>
</body>
</html>