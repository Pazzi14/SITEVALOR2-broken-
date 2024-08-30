<?php
require_once 'config.php';
require_once 'funcoes.php';

// Inicia a sessão se ainda não estiver iniciada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Determina a página atual
$current_page = basename($_SERVER['PHP_SELF'], '.php');
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title ?? 'Valor Financiamentos'; ?></title>
    <meta name="description" content="<?php echo $page_description ?? 'Soluções financeiras personalizadas para você. Empréstimos, financiamentos e mais.'; ?>">
    <link rel="stylesheet" href="<?php echo BASE_URL; ?>/css/normalize.css">
    <link rel="stylesheet" href="<?php echo BASE_URL; ?>/css/style.css">
    <?php if (isset($additional_css)): ?>
        <?php foreach ($additional_css as $css_file): ?>
            <link rel="stylesheet" href="<?php echo BASE_URL; ?>/css/<?php echo $css_file; ?>">
        <?php endforeach; ?>
    <?php endif; ?>
    <link rel="icon" href="<?php echo BASE_URL; ?>/favicon.ico" type="image/x-icon">
    <script src="<?php echo BASE_URL; ?>/js/script.js" defer></script>
    <?php if (isset($additional_js)): ?>
        <?php foreach ($additional_js as $js_file): ?>
            <script src="<?php echo BASE_URL; ?>/js/<?php echo $js_file; ?>" defer></script>
        <?php endforeach; ?>
    <?php endif; ?>
</head>
<body>
    <header class="site-header">
        <div class="container">
            <div class="logo">
                <a href="<?php echo BASE_URL; ?>">
                    <img src="<?php echo BASE_URL; ?>/img/logo.png" alt="Valor Financiamentos Logo">
                </a>
            </div>
            <nav class="main-nav">
                <ul>
                    <li><a href="<?php echo BASE_URL; ?>" <?php echo $current_page == 'index' ? 'class="active"' : ''; ?>>Home</a></li>
                    <li><a href="<?php echo BASE_URL; ?>/produtos.php" <?php echo $current_page == 'produtos' ? 'class="active"' : ''; ?>>Produtos</a></li>
                    <li><a href="<?php echo BASE_URL; ?>/sobre-nos.php" <?php echo $current_page == 'sobre-nos' ? 'class="active"' : ''; ?>>Sobre Nós</a></li>
                    <li><a href="<?php echo BASE_URL; ?>/blog.php" <?php echo $current_page == 'blog' ? 'class="active"' : ''; ?>>Blog</a></li>
                    <li><a href="<?php echo BASE_URL; ?>/contato.php" <?php echo $current_page == 'contato' ? 'class="active"' : ''; ?>>Contato</a></li>
                </ul>
            </nav>
            <div class="user-actions">
                <?php if (isLoggedIn()): ?>
                    <a href="<?php echo BASE_URL; ?>/area-cliente.php" class="btn btn-primary">Área do Cliente</a>
                    <a href="<?php echo BASE_URL; ?>/logout.php" class="btn btn-secondary">Sair</a>
                <?php else: ?>
                    <a href="<?php echo BASE_URL; ?>/login.php" class="btn btn-primary">Login</a>
                    <a href="<?php echo BASE_URL; ?>/cadastro.php" class="btn btn-secondary">Cadastre-se</a>
                <?php endif; ?>
            </div>
            <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>
    <main>
