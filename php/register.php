<?php
include 'db_connection.php';

// Obter dados do formulário
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash da senha
$gender = $_POST['gender'];
$state_id = $_POST['state'];
$city_id = $_POST['city'];
$have = isset($_POST['have']) ? $_POST['have'] : [];

// Verificar se o email já existe
$sql = "SELECT id FROM user WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $response = [
        'success' => false,
        'message' => 'Erro: O email já está registrado.'
    ];
    echo json_encode($response);
    $stmt->close();
    $conn->close();
    exit();
}

// Verificar se o nome de usuário já existe
$sql = "SELECT id FROM user WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $response = [
        'success' => false,
        'message' => 'Erro: O nome de usuário já está registrado.'
    ];
    echo json_encode($response);
    $stmt->close();
    $conn->close();
    exit();
}

// Inserir dados na tabela User
$stmt->close();
$sql = "INSERT INTO user (fullname, email, username, password, gender, state_id, city_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $fullname, $email, $username, $password, $gender, $state_id, $city_id);

if ($stmt->execute()) {
    $user_id = $stmt->insert_id;

    // Verificar se os valores de saber_id são válidos
    $valid_saber_ids = [];
    $sql = "SELECT id FROM saber";
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        $valid_saber_ids[] = $row['id'];
    }

    // Inserir dados na tabela User_Saber
    foreach ($have as $saber_id) {
        if (in_array($saber_id, $valid_saber_ids)) {
            $sql = "INSERT INTO user_saber (user_id, saber_id) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ii", $user_id, $saber_id);
            $stmt->execute();
        } else {
            $response = [
                'success' => false,
                'message' => 'Erro: Valor inválido para saber_id.'
            ];
            echo json_encode($response);
            $stmt->close();
            $conn->close();
            exit();
        }
    }

    $response = [
        'success' => true,
        'message' => 'Registro realizado com sucesso!'
    ];
    echo json_encode($response);
} else {
    $response = [
        'success' => false,
        'message' => 'Erro: ' . $stmt->error
    ];
    echo json_encode($response);
}

$stmt->close();
$conn->close();
?>
