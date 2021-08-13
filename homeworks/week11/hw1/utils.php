<?php
	require_once('conn.php');

	function generateToken() {
		$s = '';
		for ($i=1; $i<=16; $i++) {
			$s .= chr(rand(65, 90));
		}
		return $s;
	}

	function getUserFromUsername($username) {
		global $conn;
		$sql = sprintf(
		"SELECT * from christy_w11_hw1_users WHERE username = '%s'", $username
		);
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();
		return $row;
	}

	function escape ($str) {
		return htmlspecialchars($str, ENT_QUOTES);
	}

	// $action: update, delete, create
	function hasPermission($user, $action, $comment) {
		if ($user['role'] === 'ADMIN') {
			return true;
		}

		if ($user['role'] === 'NORMAL') {
			if ($action === 'create') return true;
			return $comment['username'] === $user['username'];
		}

		if ($user['role'] === 'BANNED') {
			return $action !== 'create' && $comment['username'] === $user['username'];
		}
	}

	function isAdmin($user) {
		return $user['role'] === 'ADMIN';
	}
?>
