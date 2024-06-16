<?php
include 'db_connection.php';

$statistics = [];

// Consulta: Usuários por sabre
$sql = "SELECT s.name AS sabre, COUNT(us.user_id) AS total_usuarios, s.image_path
        FROM user_saber us
        INNER JOIN saber s ON us.saber_id = s.id
        GROUP BY s.id";
$result = $conn->query($sql);
$statistics['usuarios_por_sabre'] = $result->fetch_all(MYSQLI_ASSOC);

// Consulta: Usuários por cidade
$sql = "SELECT c.name AS cidade, COUNT(u.id) AS total_usuarios 
        FROM city c 
        INNER JOIN user u ON u.city_id = c.id 
        GROUP BY c.name";
$result = $conn->query($sql);
$statistics['usuarios_por_cidade'] = $result->fetch_all(MYSQLI_ASSOC);

// Consulta: Usuários por estado
$sql = "SELECT s.name AS estado, COUNT(u.id) AS total_usuarios 
        FROM state s 
        INNER JOIN city c ON c.state_id = s.id 
        INNER JOIN user u ON u.city_id = c.id 
        GROUP BY s.name";
$result = $conn->query($sql);
$statistics['usuarios_por_estado'] = $result->fetch_all(MYSQLI_ASSOC);

// Fechar conexão com o banco de dados
$conn->close();

// Retornar os dados em formato JSON
header('Content-Type: application/json');
echo json_encode($statistics);
?>
