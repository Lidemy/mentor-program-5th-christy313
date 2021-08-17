<?php  
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    exit();
  }

  $sql = "SELECT * FROM christy_blog_articles WHERE is_deleted=0 ORDER BY id DESC";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  $result = $stmt->get_result();
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
      <div class="admin-posts">
        <?php while($row = $result->fetch_assoc()) { ?>
          <div class="admin-post">
            <div class="admin-post__title">
              <?php echo escape($row['title']); ?>
            </div>
            <div class="admin-post__info">
              <div class="admin-post__created-at">
                <?php echo escape($row['created_at']); ?>
              </div>
              <a class="admin-post__btn" href="edit.php?id=<?php echo escape($row['id']); ?>">編輯</a>
              <a class="admin-post__btn" href="delete.php?id=<?php echo escape($row['id']); ?>">刪除</a>
            </div>
          </div>
        <?php } ?>  
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>