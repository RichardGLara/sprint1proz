<?php
include 'db_connection.php';

// Obter todos os sabres da tabela Saber
$sabres = [];
$sql = "SELECT id, name FROM saber";
$result = $conn->query($sql);
while ($row = $result->fetch_assoc()) {
    $sabres[] = $row;
}

// Retornar os sabres em formato JSON
header('Content-Type: application/json');
echo json_encode($sabres);
?>
