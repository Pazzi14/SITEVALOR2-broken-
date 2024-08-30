<?php
require_once 'config.php';
require_once 'db_connect.php';

/**
 * Função para sanitizar dados de entrada
 * 
 * @param string $data Os dados a serem sanitizados
 * @return string Os dados sanitizados
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Função para gerar um token CSRF
 * 
 * @return string O token CSRF gerado
 */
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Função para verificar um token CSRF
 * 
 * @param string $token O token CSRF a ser verificado
 * @return bool True se o token for válido, false caso contrário
 */
function verifyCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Função para formatar um valor monetário
 * 
 * @param float $value O valor a ser formatado
 * @return string O valor formatado como moeda brasileira
 */
function formatCurrency($value) {
    return 'R$ ' . number_format($value, 2, ',', '.');
}

/**
 * Função para calcular o valor da parcela de um empréstimo
 * 
 * @param float $principal O valor principal do empréstimo
 * @param float $rate A taxa de juros mensal (em decimal)
 * @param int $term O prazo do empréstimo em meses
 * @return float O valor da parcela mensal
 */
function calculateLoanPayment($principal, $rate, $term) {
    $monthlyRate = $rate / 12;
    return $principal * ($monthlyRate * pow(1 + $monthlyRate, $term)) / (pow(1 + $monthlyRate, $term) - 1);
}

/**
 * Função para enviar um e-mail
 * 
 * @param string $to O endereço de e-mail do destinatário
 * @param string $subject O assunto do e-mail
 * @param string $message O corpo do e-mail
 * @return bool True se o e-mail for enviado com sucesso, false caso contrário
 */
function sendEmail($to, $subject, $message) {
    $headers = "From: " . EMAIL_FROM . "\r\n";
    $headers .= "Reply-To: " . EMAIL_FROM . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    return mail($to, $subject, $message, $headers);
}

/**
 * Função para gerar um log personalizado
 * 
 * @param string $message A mensagem de log
 * @param string $level O nível do log (e.g., 'INFO', 'ERROR')
 */
function customLog($message, $level = 'INFO') {
    $logMessage = date('Y-m-d H:i:s') . " [$level] $message\n";
    error_log($logMessage, 3, LOG_FILE);
}

/**
 * Função para verificar se um CPF é válido
 * 
 * @param string $cpf O CPF a ser validado
 * @return bool True se o CPF for válido, false caso contrário
 */
function validaCPF($cpf) {
    // Remove caracteres não numéricos
    $cpf = preg_replace('/[^0-9]/', '', $cpf);
    
    // Verifica se o CPF tem 11 dígitos
    if (strlen($cpf) != 11) {
        return false;
    }
    
    // Verifica se todos os dígitos são iguais
    if (preg_match('/(\d)\1{10}/', $cpf)) {
        return false;
    }
    
    // Calcula os dígitos verificadores
    for ($t = 9; $t < 11; $t++) {
        for ($d = 0, $c = 0; $c < $t; $c++) {
            $d += $cpf[$c] * (($t + 1) - $c);
        }
        $d = ((10 * $d) % 11) % 10;
        if ($cpf[$c] != $d) {
            return false;
        }
    }
    return true;
}

/**
 * Função para mascarar um CPF
 * 
 * @param string $cpf O CPF a ser mascarado
 * @return string O CPF mascarado
 */
function mascaraCPF($cpf) {
    $cpf = preg_replace('/[^0-9]/', '', $cpf);
    return substr($cpf, 0, 3) . '.' . substr($cpf, 3, 3) . '.' . substr($cpf, 6, 3) . '-' . substr($cpf, 9, 2);
}

/**
 * Função para verificar se um usuário está logado
 * 
 * @return bool True se o usuário estiver logado, false caso contrário
 */
function isLoggedIn() {
    return isset($_SESSION['usuario_id']);
}

/**
 * Função para redirecionar o usuário
 * 
 * @param string $url A URL para redirecionar
 */
function redirect($url) {
    header("Location: $url");
    exit();
}

/**
 * Função para gerar uma senha aleatória
 * 
 * @param int $length O comprimento da senha
 * @return string A senha gerada
 */
function generateRandomPassword($length = 12) {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    return substr(str_shuffle($chars), 0, $length);
}

/**
 * Função para limitar o número de tentativas de login
 * 
 * @param string $username O nome de usuário
 * @return bool True se o usuário pode tentar fazer login, false caso contrário
 */
function canAttemptLogin($username) {
    $conn = dbConnect();
    $stmt = $conn->prepare("SELECT COUNT(*) as attempts, MAX(timestamp) as last_attempt FROM login_attempts WHERE username = ? AND timestamp > (NOW() - INTERVAL ? SECOND)");
    $stmt->bind_param("si", $username, LOGIN_ATTEMPT_TIMEOUT);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if ($result['attempts'] >= MAX_LOGIN_ATTEMPTS) {
        return false;
    }
    return true;
}

/**
 * Função para registrar uma tentativa de login
 * 
 * @param string $username O nome de usuário
 */
function recordLoginAttempt($username) {
    $conn = dbConnect();
    $stmt = $conn->prepare("INSERT INTO login_attempts (username, timestamp) VALUES (?, NOW())");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->close();
}

/**
 * Função para verificar se um arquivo é uma imagem válida
 * 
 * @param string $file O caminho do arquivo
 * @return bool True se o arquivo for uma imagem válida, false caso contrário
 */
function isValidImage($file) {
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file);
    finfo_close($finfo);
    return in_array($mimeType, $allowedTypes);
}
