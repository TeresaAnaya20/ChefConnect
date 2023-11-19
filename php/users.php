<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("database.php");

$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'cocineros';
$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

$registros = mysqli_query($mysqli, "select * from users");
$vec = [];
while ($reg = mysqli_fetch_array($registros)) {
    $vec[] = $reg;
}
// var_dump($vec);die();

$cad = json_encode($vec);

echo $cad;
header('Content-Type: application/json');
