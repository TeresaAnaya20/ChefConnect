<?php
// include_once("database.php");
// $postdata = file_get_contents("php://input");

// // $con = mysqli_connect("localhost", "root", "", "cocineros");
// // $email = mysqli_real_escape_string($con, $_GET['email']);
// $con = mysqli_connect("localhost", "root", "", "cocineros");
// // $email = mysqli_real_escape_string($con, $_POST['email']);
// $email = isset($_POST['email']) ? mysqli_real_escape_string($con, $_POST['email']) : null;
// // Query para obtener el ID del usuario
// // $query = "SELECT id FROM users WHERE email='$email'";
// // $query = "SELECT id FROM users WHERE email='teresaanaya2002@hotmail.com'";
// $query = "SELECT id FROM users WHERE email='$_GET[email]'";
// $result = mysqli_query($con, $query);

// $userData = mysqli_fetch_assoc($result);

// $userId = $userData['id'];

// if (isset($postdata) && !empty($postdata)) {
//     $request = json_decode($postdata);
//     $nombre = trim($request->nombre);
//     $tipo = trim($request->tipo);
//     $descripcion = trim($request->descripcion);
//     $imagen = trim($request->imagen);
//     // $user = trim($request->user);
//     $user = $userId;
//     $sql = "INSERT INTO recetas(nombre,tipo,descripcion,imagen,user) VALUES ('$nombre','$tipo','$descripcion','$imagen','$user')";
//     if ($mysqli->query($sql) === TRUE) {
//         $authdata = [
//             'nombre' => $nombre,
//             'tipo' => $tipo,
//             'descripcion' => $descripcion,
//             'imagen' => $imagen,
//             'user' => $user,
//             // 'Id' => mysqli_insert_id($mysqli),
//             'indice' => mysqli_insert_id($mysqli)
//             // 'Id' => 14
//         ];
//         echo json_encode($authdata);
//     }
// }

include_once("database.php");

$postdata = file_get_contents("php://input");
$con = mysqli_connect("localhost", "root", "", "cocineros");

// Obtén el email del cuerpo de la solicitud
$request = json_decode($postdata);
$email = isset($request->email) ? mysqli_real_escape_string($con, $request->email) : null;

// Query para obtener el ID del usuario
$query = "SELECT id FROM users WHERE email='$email'";
$result = mysqli_query($con, $query);

$userData = mysqli_fetch_assoc($result);

$userId = $userData['id'];

if (isset($postdata) && !empty($postdata)) {
    $nombre = trim($request->nombre);
    $tipo = trim($request->tipo);
    $descripcion = trim($request->descripcion);
    $imagen = trim($request->imagen);
    $user = $userId;

    $sql = "INSERT INTO recetas(nombre, tipo, descripcion, imagen, user) VALUES ('$nombre', '$tipo', '$descripcion', '$imagen', '$user')";

    if ($mysqli->query($sql) === TRUE) {
        $authdata = [
            'nombre' => $nombre,
            'tipo' => $tipo,
            'descripcion' => $descripcion,
            'imagen' => $imagen,
            'user' => $user,
            'indice' => mysqli_insert_id($mysqli)
        ];
        echo json_encode($authdata);
    }
}
?>
