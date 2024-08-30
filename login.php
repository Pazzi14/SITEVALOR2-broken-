<?php
session_start();
require_once 'config.php';
require_once 'funcoes.php';

// Verificar se o usuário já está logado
if (isset($_SESSION['usuario_id'])) {
    header("Location: area-cliente-logada.php");
    exit();
}

$erro = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cpf = filter_input(INPUT_POST, 'cpf', FILTER_SANITIZE_STRING);
    $senha = filter_input(INPUT_POST, 'senha', FILTER_SANITIZE_STRING);

    // Validar CPF
    if (!validarCPF($cpf)) {
        $erro = "CPF inválido.";
    } else {
        // Conectar ao banco de dados
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if ($conn->connect_error) {
            die("Conexão falhou: " . $conn->connect_error);
        }

        // Preparar a consulta SQL
        $stmt = $conn->prepare("SELECT id, nome, senha FROM usuarios WHERE cpf = ?");
        $stmt->bind_param("s", $cpf);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $usuario = $result->fetch_assoc();
            if (password_verify($senha, $usuario['senha'])) {
                // Login bem-sucedido
                $_SESSION['usuario_id'] = $usuario['id'];
                $_SESSION['usuario_nome'] = $usuario['nome'];
                
                // Registrar o login
                registrarLog($usuario['id'], 'login');

                header("Location: area-cliente-logada.php");
                exit();
            } else {
                $erro = "Senha incorreta.";
            }
        } else {
            $erro = "Usuário não encontrado.";
        }

        $stmt->close();
        $conn->close();
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Valor Financiamentos</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/login.css">
    <script src="js/validacoes.js" defer></script>
</head>
<body>
    <header>
        <div class="container">
            <a href="index.html" class="logo">
                <img src="img/logo.png" alt="Valor Financiamentos Logo" width="200" height="50">
            </a>
            <nav>
                <ul>
                    <li><a href="index.html">Início</a></li>
                    <li><a href="produtos.html">Produtos</a></li>
                    <li><a href="sobre-nos.html">Sobre Nós</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="contato.php">Contato</a></li>
                    <li><a href="area-cliente.html" class="btn-primary active">Área do Cliente</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="login-section">
            <div class="container">
                <h1>Login</h1>
                <?php
                if (!empty($erro)) {
                    echo "<p class='erro'>$erro</p>";
                }
                ?>
                <form action="login.php" method="post" id="login-form">
                    <div class="form-group">
                        <label for="cpf">CPF:</label>
                        <input type="text" id="cpf" name="cpf" required placeholder="000.000.000-00">
                    </div>
                    <div class="form-group">
                        <label for="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" required>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn-primary">Entrar</button>
                    </div>
                    <div class="form-links">
                        <a href="esqueci-senha.php">Esqueci minha senha</a>
                        <a href="primeiro-acesso.php">Primeiro acesso</a>
                    </div>
                </form>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>Valor Financiamentos</h4>
                    <p>Soluções financeiras personalizadas para realizar seus sonhos.</p>
                </div>
                <div class="footer-col">
                    <h4>Links Rápidos</h4>
                    <ul>
                        <li><a href="index.html">Início</a></li>
                        <li><a href="produtos.html">Produtos</a></li>
                        <li><a href="sobre-nos.html">Sobre Nós</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="contato.php">Contato</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Contato</h4>
                    <p>Telefone: (XX) XXXX-XXXX</p>
                    <p>Email: contato@valorfinanciamentos.com.br</p>
                    <p>Endereço: Rua Exemplo, 123 - Cidade, Estado</p>
                </div>
                <div class="footer-col">
                    <h4>Redes Sociais</h4>
                    <div class="social-links">
                        <a href="https://www.facebook.com/valorfinanciamentos" target="_blank" rel="noopener noreferrer">
                            <img src="img/icon-facebook.svg" alt="Facebook">
                        </a>
                        <a href="https://www.instagram.com/valorfinanciamentosoficial" target="_blank" rel="noopener noreferrer">
                            <img src="img/icon-instagram.svg" alt="Instagram">
                        </a>
                        <a href="https://www.linkedin.com/company/valorfinanciamentos" target="_blank" rel="noopener noreferrer">
                            <img src="img/icon-linkedin.svg" alt="LinkedIn">
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Valor Financiamentos. Todos os direitos reservados.</p>
                <ul>
                    <li><a href="termos-de-uso.html">Termos de Uso</a></li>
                    <li><a href="politica-de-privacidade.html">Política de Privacidade</a></li>
                </ul>
            </div>
        </div>
    </footer>
</body>
</html>
