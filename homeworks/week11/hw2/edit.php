<?php  
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    exit();
  }

  $id = $_GET['id'];

  $sql = "SELECT * FROM christy_blog_articles WHERE is_deleted=0 AND id=? ORDER BY id DESC";
  $stmt = $conn->prepare($sql);
  $result = $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">

  <title>Blog</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <?php include_once('nav.php'); ?>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <form action="handle_edit.php" method="POST">
          <div class="edit-post__title">
            修改文章：
          </div>
          <div class="edit-post__input-wrapper">
            <input name="title" class="edit-post__input" value="<?php echo escape($row['title']);?>" />
          </div>
          <div class="edit-post__input-wrapper">
            <textarea name="content" rows="20" class="edit-post__content"><?php echo escape($row['content']); ?></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
            <input type="submit" value="送出"class="edit-post__btn"></input>
          </div>
          <input type="hidden" name="id" value="<?php echo escape($row['id']); ?>">
          <input type="hidden" name="page" value="<?php echo escape($_SERVER['HTTP_REFERER']); ?>">
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>