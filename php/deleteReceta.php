<?php

include_once("database.php");
$postdata = file_get_contents("php://input");
// include_once("database.php");
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// // header('Content-Type: application/json');
// require("database.php");
$con = mysqli_connect("localhost", "root", "", "cocineros");
// $indice = isset($_GET['indice']) ? $_GET['indice'] : null;

mysqli_query($con, "delete from recetas where indice=$_GET[indice]");
// mysqli_query($con, "delete from recetas where indice=$indice");


class Result
{
}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'receta borrado';

header('Content-Type: application/json');
echo json_encode($response);
