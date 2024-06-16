<?php
include 'db_connection.php';

// Obter o ID do estado
$state_id = $_GET['state_id'];

// Consultar as cidades para o estado dado
$sql = "SELECT id, name FROM city WHERE state_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $state_id);
$stmt->execute();
$result = $stmt->get_result();

$cities = [];
while ($row = $result->fetch_assoc()) {
    $cities[] = $row;
}

$stmt->close();
$conn->close();

// Retornar as cidades em formato JSON
header('Content-Type: application/json');
echo json_encode($cities);
?>