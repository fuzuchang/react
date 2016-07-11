<?php
include 'conn.php';



if ($_GET['action'] == 'comment-list'){
    $db = new db();
    $data = $db ->all("SELECT * FROM `comment` ORDER BY id DESC;");
    echoJson($data);
}


if ($_POST['action'] == 'comment'){
    $db = new db();
    $db ->query("INSERT INTO `react`.`comment` (`author`, `content`, `on_time`)
        VALUES ('{$_POST['author']}', '{$_POST['content']}', '".date('Y-m-d H:i:s')."')");
    $data = $db ->all("SELECT * FROM `comment` ORDER BY id DESC;");
    echoJson($data);
}


function echoJson($data){
    header('Content-type: application/json');
    die(json_encode($data));
}