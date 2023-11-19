<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("database.php");

$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'cocineros';
$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

// $registros = mysqli_query($mysqli, "select id, nombre, user, descripcion, imagen from recetas"); //da problema la imagen
$registros = mysqli_query($mysqli, "select * from recetas"); //da problema la imagen
$vec = [];
while ($reg = mysqli_fetch_array($registros)) {
    $vec[] = $reg;
}
// var_dump($vec);die();

$cad = json_encode($vec);

echo $cad;
// header('Content-Type: application/json'); //esto da el fallo de header ykj
?>