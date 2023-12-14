<?php
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// require("database.php");

// $db_host = 'localhost';
// $db_username = 'root';
// $db_password = '';
// $db_name = 'cocineros';
// $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);


// $postdata = file_get_contents("php://input");
// $con = mysqli_connect("localhost", "root", "", "cocineros");

// $request = json_decode($postdata);
// $email = isset($request->email) ? mysqli_real_escape_string($con, $request->email) : null;

// $query = "SELECT id FROM users WHERE email='$email'";
// $result = mysqli_query($con, $query);

// $userData = mysqli_fetch_assoc($result);

// $userId = $userData['id'];
// // $userId = 1;

// $registros = mysqli_query($mysqli, "select * from recetas where user=$userId");
// $vec = [];
// while ($reg = mysqli_fetch_array($registros)) {
//     $vec[] = $reg;
// }
// // var_dump($vec);die();

// $cad = json_encode($vec);

// echo $cad;
include_once("database.php");

$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'cocineros';
$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

// $postdata = file_get_contents("php://input");
$con = mysqli_connect("localhost", "root", "", "cocineros");

// // Obtén el correo electrónico del cuerpo de la solicitud
// $request = json_decode($postdata);
// $email = isset($request->email) ? mysqli_real_escape_string($con, $request->email) : null;



// Obtén el correo electrónico desde el cuerpo de la solicitud o como parámetro de la URL
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$emailFromBody = isset($request->email) ? $request->email : null;

// Si no se proporciona en el cuerpo, intenta obtenerlo de la URL
if (empty($emailFromBody)) {
    $emailFromUrl = isset($_GET['email']) ? $_GET['email'] : null;
    $email = $emailFromUrl;
} else {
    $email = $emailFromBody;
}


if (!empty($email)) {
    // Verifica la conexión a la base de datos
    if ($con) {
        // Escapa el correo electrónico para evitar SQL injection
        $email = mysqli_real_escape_string($con, $email);

        // Query para obtener el ID del usuario
        $query = "SELECT id FROM users WHERE email='$email'";
        // $query = "SELECT id FROM users WHERE email='prueba@prueba.com'";
        $result = mysqli_query($con, $query);

        if ($result) {
            $userData = mysqli_fetch_assoc($result);

            if ($userData) {
                $userId = $userData['id'];

                // Consulta de recetas para el usuario
                $registros = mysqli_query($con, "SELECT * FROM recetas WHERE user=$userId");

                if ($registros) {
                    $vec = [];
                    while ($reg = mysqli_fetch_array($registros)) {
                        $vec[] = $reg;
                    }

                    $cad = json_encode($vec);
                    echo $cad;
                } else {
                    echo json_encode(['error' => 'Error en la consulta de recetas']);
                }
            } else {
                echo json_encode(['error' => 'Usuario no encontrado']);
            }

            // Cierra la conexión a la base de datos
            mysqli_close($con);
        } else {
            echo json_encode(['error' => 'Error en la consulta SQL']);
        }
    } else {
        echo json_encode(['error' => 'Error al conectar con la base de datos']);
    }
} else {
    echo json_encode(['error' => 'Correo electrónico no proporcionado']);
}
