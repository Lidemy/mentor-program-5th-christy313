<?php  
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $page = 1;
  $limit = 5;
  $offset = ($page - 1) * $limit;

  $sql = "SELECT * FROM christy_blog_articles WHERE is_deleted=0 ORDER BY id DESC limit ? offset ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $limit, $offset);
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
    <div class="posts">
      <?php while($row = $result->fetch_assoc()) { ?>
        <article class="post">
          <div class="post__header">
            <div><?php echo escape($row['title']); ?></div>
            <?php if (!empty($_SESSION['username'])) { ?>
              <div class="post__actions">
                <a class="post__action" href="edit.php?id=<?php echo escape($row['id']); ?>">編輯</a>
              </div>
            <?php } ?>
          </div>
          <div class="post__info">
            <?php echo escape($row['created_at']); ?>
          </div>
          <div class="post__content">
            <?php echo substr(escape($row['content']), 0, 200);?>
          </div>
          <a class="btn-read-more" href="post.php">READ MORE</a>
        </article>
      <?php } ?>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>