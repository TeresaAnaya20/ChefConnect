<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("database.php");

$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'cocineros';
$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

if (isset($_GET['email'])) {
    $stmt = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $_GET['email']);
    $stmt->execute();
    $result = $stmt->get_result();
    $vec = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    $cad = json_encode($vec);
    header('Content-Type: application/json');

    echo $cad;
} else {
    echo json_encode(['error' => 'No se proporcionó el parámetro "email" en la solicitud.']);
}
