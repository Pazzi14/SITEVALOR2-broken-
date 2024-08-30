<?php
session_start();
require_once 'config.php';
require_once 'funcoes.php';

// Verificar se o usuário está logado
if (isset($_SESSION['usuario_id'])) {
    // Registrar o logout
    registrarLog($_SESSION['usuario_id'], 'logout');

    // Destruir todas as variáveis de sessão
    $_SESSION = array();

    // Se for necessário matar a sessão completamente, apague também o cookie da sessão
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // Finalmente, destruir a sessão
    session_destroy();
}

// Redirecionar para a página inicial
header("Location: index.html");
exit();
?>
