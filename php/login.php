<?php
include 'db_connection.php';

// Obter dados do formulário
$username = $_POST['username'];
$password = $_POST['password'];

// Consulta SQL para verificar as credenciais no banco de dados
$sql = "SELECT * FROM user WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // Verificar se a senha corresponde à senha armazenada no banco de dados
    if (password_verify($password, $user['password'])) {
        // Credenciais válidas, login bem-sucedido
        $response = [
            'success' => true,
            'message' => 'Login realizado com sucesso!',
            'fullName' => $user['fullname'] // Incluindo o nome completo do usuário na resposta
        ];
    } else {
        // Senha incorreta
        $response = [
            'success' => false,
            'message' => 'Senha incorreta. Por favor, tente novamente.'
        ];
    }
} else {
    // Usuário não encontrado
    $response = [
        'success' => false,
        'message' => 'Usuário não encontrado. Por favor, verifique seu usuário e senha.'
    ];
}


// Retornar resposta JSON
echo json_encode($response);

// Fechar conexão com o banco de dados
$stmt->close();
$conn->close();
?>
