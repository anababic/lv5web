<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$name = $_POST['fname'];
$age = $_POST['age'];
$catInfo = $_POST['catinfo'];
$wins = $_POST['wins'];
$loss = $_POST['loss'];

$image = file_get_contents($_FILES['catimg']['name']);

$saveLocation="../../images/";
$saveLocationShort="images/";

$saveLocation=$saveLocation.basename($_FILES['catimg']['name']);
$saveLocationShort=$saveLocationShort.$_FILES['catimg']['name'];
move_uploaded_file($_FILES['catimg']['tmp_name'],$saveLocation);
$dbHandler = new DbHandler();
$dbHandler->insert("INSERT INTO catfighters(name,age,info,wins,loss,image) VALUES ('$name',$age,'$catInfo',$wins,$loss,'$saveLocationShort')");
