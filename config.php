<?php
// Configurações do Banco de Dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'valor_financiamentos');
define('DB_USER', 'usuario_db');
define('DB_PASS', 'senha_segura_db');

// Configurações de E-mail
define('EMAIL_HOST', 'smtp.exemplo.com');
define('EMAIL_PORT', 587);
define('EMAIL_USERNAME', 'noreply@valorfinanciamentos.com.br');
define('EMAIL_PASSWORD', 'senha_email_segura');
define('EMAIL_FROM', 'Valor Financiamentos <noreply@valorfinanciamentos.com.br>');

// Configurações de URL
define('BASE_URL', 'https://valorfinanciamentos.com.br');

// Configurações de Sessão
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', 1);

// Configurações de Segurança
define('SALT', 'um_salt_aleatorio_e_seguro_para_hash');
define('TOKEN_EXPIRATION', 3600); // 1 hora em segundos

// Configurações de API
define('API_KEY', 'chave_api_secreta');

// Configurações de Logging
define('LOG_FILE', '/var/log/valor_financiamentos/app.log');
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', LOG_FILE);

// Configurações de Fuso Horário
date_default_timezone_set('America/Sao_Paulo');

// Configurações de Upload
define('UPLOAD_DIR', '/var/www/valorfinanciamentos/uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5 MB

// Configurações de Paginação
define('ITEMS_PER_PAGE', 20);

// Configurações de Cache
define('CACHE_ENABLED', true);
define('CACHE_DIR', '/var/www/valorfinanciamentos/cache/');

// Configurações de Limite de Tentativas de Login
define('MAX_LOGIN_ATTEMPTS', 5);
define('LOGIN_ATTEMPT_TIMEOUT', 900); // 15 minutos em segundos

// Configurações de Empréstimo
define('MIN_LOAN_AMOUNT', 500);
define('MAX_LOAN_AMOUNT', 50000);
define('MIN_LOAN_TERM', 6); // 6 meses
define('MAX_LOAN_TERM', 60); // 60 meses

// Configurações de Versão
define('APP_VERSION', '1.0.0');

// Configurações de Ambiente
define('ENVIRONMENT', 'production'); // 'development', 'testing', ou 'production'

// Função para carregar configurações específicas do ambiente
function loadEnvironmentConfig() {
    $envFile = __DIR__ . '/.env.' . ENVIRONMENT;
    if (file_exists($envFile)) {
        $envConfig = parse_ini_file($envFile);
        foreach ($envConfig as $key => $value) {
            putenv("$key=$value");
            $_ENV[$key] = $value;
        }
    }
}

// Carrega configurações do ambiente
loadEnvironmentConfig();

// Função para obter uma configuração do ambiente
function env($key, $default = null) {
    $value = getenv($key);
    if ($value === false) {
        return $default;
    }
    return $value;
}

// Configurações adicionais baseadas no ambiente
if (ENVIRONMENT !== 'production') {
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
}

// Verificação de segurança para garantir que o arquivo não seja acessado diretamente
if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
    die('Acesso direto não permitido.');
}
