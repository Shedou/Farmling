<?php
/*
$host = 'localhost';
$dbname = 'farmling';
$user = 'root';
$password = '';

	$db=new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$db->exec("set names utf8");

//$db->exec("CREATE TABLE `test`(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(20) NOT NULL DEFAULT '', email VARCHAR(50) NOT NULL DEFAULT '')");

$players=[];
$skinHat = 0;
$skinSkirt = 0;
$skinPants = 0;
$skin = 0;


*/
?>
<!DOCTYPE HTML>
<html>
<head>
	<title>Farmling</title>
	<link rel="icon" href="/core/favicon.ico" type="image/x-icon">
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<link rel="stylesheet" href="core/css/css.css">
	<meta name="viewport" content="width=device-width">
	<link rel="image_src" href="/banner.jpg" />
</head>
<body onResize="shed_resize()">
	<div class="s_head"></div>
	<span>FPS: </span>  <span id="fps">cc</span>   <span> - Ticks: </span><span id="ticks">cc</span>  <span> - x: </span><span id="x">x</span>  <span> - y: </span><span id="y">y</span><br>
	<canvas id="glFarm">dsgf</canvas>


	<script src="game/js/matrix.js"></script>
	<script src="game/js/canvas.js"></script>
</body>
</html>
