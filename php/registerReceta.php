<?php
include_once("database.php");
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $nombre = trim($request->nombre);
    $tipo = trim($request->tipo);
    $descripcion = trim($request->descripcion);
    $imagen = trim($request->imagen);
    $user = trim($request->user);


    $sql = "INSERT INTO recetas(nombre,tipo,descripcion,imagen,user) VALUES ('$nombre','$tipo','$descripcion','$imagen','$user')";
    if ($mysqli->query($sql) === TRUE) {
        $authdata = [
            'nombre' => $nombre,
            'tipo' => $tipo,
            'descripcion' => $descripcion,
            'imagen' => $imagen,
            'user' => $user,
            // 'Id' => mysqli_insert_id($mysqli),
            'indice' => mysqli_insert_id($mysqli)
            // 'Id' => 14
        ];
        echo json_encode($authdata);
    }
}
?>