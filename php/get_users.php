<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db_connection.php';

$sql = "
SELECT 
    user.id,
    user.fullname,
    user.email,
    user.username,
    user.gender,
    state.name AS state_name,
    city.name AS city_name,
    GROUP_CONCAT(saber.name) AS sabers,
    GROUP_CONCAT(saber.image_path) AS saber_image_paths
FROM 
    user
JOIN 
    state ON user.state_id = state.id
JOIN 
    city ON user.city_id = city.id
LEFT JOIN 
    user_saber ON user.id = user_saber.user_id
LEFT JOIN 
    saber ON user_saber.saber_id = saber.id
GROUP BY 
    user.id
";


$result = $conn->query($sql);

if (!$result) {
    die("Erro na consulta SQL: " . $conn->error);
}

$users = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
} else {
    echo "Nenhum usuário encontrado.";
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($users);
?>
