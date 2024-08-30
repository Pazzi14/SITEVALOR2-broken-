<?php
session_start();
require_once 'config.php';
require_once 'funcoes.php';

// Verificar se o usuário está logado
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit();
}

$usuario_id = $_SESSION['usuario_id'];
$erro = '';
$sucesso = '';

// Conectar ao banco de dados
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Obter dados do usuário
$stmt = $conn->prepare("SELECT nome, email, telefone, endereco, cidade, estado, cep FROM usuarios WHERE id = ?");
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();
$usuario = $result->fetch_assoc();
$stmt->close();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_STRING);
    $endereco = filter_input(INPUT_POST, 'endereco', FILTER_SANITIZE_STRING);
    $cidade = filter_input(INPUT_POST, 'cidade', FILTER_SANITIZE_STRING);
    $estado = filter_input(INPUT_POST, 'estado', FILTER_SANITIZE_STRING);
    $cep = filter_input(INPUT_POST, 'cep', FILTER_SANITIZE_STRING);
    $senha_atual = filter_input(INPUT_POST, 'senha_atual', FILTER_SANITIZE_STRING);
    $nova_senha = filter_input(INPUT_POST, 'nova_senha', FILTER_SANITIZE_STRING);
    $confirmar_senha = filter_input(INPUT_POST, 'confirmar_senha', FILTER_SANITIZE_STRING);

    // Validações
    if (!$nome || !$email || !$telefone || !$endereco || !$cidade || !$estado || !$cep) {
        $erro = "Por favor, preencha todos os campos obrigatórios.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $erro = "Por favor, insira um e-mail válido.";
    } elseif ($nova_senha && $nova_senha !== $confirmar_senha) {
        $erro = "As senhas não coincidem.";
    } else {
        // Verificar se o e-mail já está em uso por outro usuário
        $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ? AND id != ?");
        $stmt->bind_param("si", $email, $usuario_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $erro = "Este e-mail já está em uso por outro usuário.";
        } else {
            // Atualizar perfil
            $stmt = $conn->prepare("UPDATE usuarios SET nome = ?, email = ?, telefone = ?, endereco = ?, cidade = ?, estado = ?, cep = ? WHERE id = ?");
            $stmt->bind_param("sssssssi", $nome, $email, $telefone, $endereco, $cidade, $estado, $cep, $usuario_id);
            
            if ($stmt->execute()) {
                $sucesso = "Perfil atualizado com sucesso!";
                // Atualizar dados da sessão
                $_SESSION['usuario_nome'] = $nome;
            } else {
                $erro = "Ocorreu um erro ao atualizar o perfil. Por favor, tente novamente.";
            }
            $stmt->close();

            // Atualizar senha, se fornecida
            if ($nova_senha) {
                $stmt = $conn->prepare("SELECT senha FROM usuarios WHERE id = ?");
                $stmt->bind_param("i", $usuario_id);
                $stmt->execute();
                $result = $stmt->get_result();
                $usuario_senha = $result->fetch_assoc()['senha'];
                $stmt->close();

                if (password_verify($senha_atual, $usuario_senha)) {
                    $nova_senha_hash = password_hash($nova_senha, PASSWORD_DEFAULT);
                    $stmt = $conn->prepare("UPDATE usuarios SET senha = ? WHERE id = ?");
                    $stmt->bind_param("si", $nova_senha_hash, $usuario_id);
                    if ($stmt->execute()) {
                        $sucesso .= " Senha atualizada com sucesso.";
                    } else {
                        $erro = "Ocorreu um erro ao atualizar a senha. Por favor, tente novamente.";
                    }
                    $stmt->close();
                } else {
                    $erro = "Senha atual incorreta.";
                }
            }
        }
    }

    // Recarregar dados do usuário após atualização
    $stmt = $conn->prepare("SELECT nome, email, telefone, endereco, cidade, estado, cep FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $usuario_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $usuario = $result->fetch_assoc();
    $stmt->close();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Perfil - Valor Financiamentos</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/editar-perfil.css">
    <script src="js/editar-perfil.js" defer></script>
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
                    <li><a href="logout.php" class="btn-primary">Sair</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="editar-perfil">
            <div class="container">
                <h1>Editar Perfil</h1>
                <p>Atualize suas informações pessoais abaixo.</p>

                <?php if (!empty($erro)): ?>
                    <div class="alert alert-error"><?php echo $erro; ?></div>
                <?php endif; ?>

                <?php if (!empty($sucesso)): ?>
                    <div class="alert alert-success"><?php echo $sucesso; ?></div>
                <?php endif; ?>

                <form action="editar-perfil.php" method="post" id="form-editar-perfil">
                    <div class="form-group">
                        <label for="nome">Nome Completo:</label>
                        <input type="text" id="nome" name="nome" value="<?php echo htmlspecialchars($usuario['nome']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail:</label>
                        <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($usuario['email']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="telefone">Telefone:</label>
                        <input type="tel" id="telefone" name="telefone" value="<?php echo htmlspecialchars($usuario['telefone']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="endereco">Endereço:</label>
                        <input type="text" id="endereco" name="endereco" value="<?php echo htmlspecialchars($usuario['endereco']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="cidade">Cidade:</label>
                        <input type="text" id="cidade" name="cidade" value="<?php echo htmlspecialchars($usuario['cidade']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="estado">Estado:</label>
                        <input type="text" id="estado" name="estado" value="<?php echo htmlspecialchars($usuario['estado']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="cep">CEP:</label>
                        <input type="text" id="cep" name="cep" value="<?php echo htmlspecialchars($usuario['cep']); ?>" required>
                    </div>
                    <h2>Alterar Senha</h2>
                    <p>Deixe em branco para manter a senha atual.</p>
                    <div class="form-group">
                        <label for="senha_atual">Senha Atual:</label>
                        <input type="password" id="senha_atual" name="senha_atual">
                    </div>
                    <div class="form-group">
                        <label for="nova_senha">Nova Senha:</label>
                        <input type="password" id="nova_senha" name="nova_senha">
                    </div>
                    <div class="form-group">
                        <label for="confirmar_senha">Confirmar Nova Senha:</label>
                        <input type="password" id="confirmar_senha" name="confirmar_senha">
                    </div>
                    <button type="submit" class="btn-primary">Atualizar Perfil</button>
                </form>
            </div>
        </section>

        <section class="seguranca-conta">
            <div class="container">
                <h2>Segurança da Conta</h2>
                <p>Mantenha sua conta segura seguindo estas dicas:</p>
                <ul>
                    <li>Use uma senha forte e única para sua conta na Valor Financiamentos.</li>
                    <li>Nunca compartilhe sua senha ou informações de login com ninguém.</li>
                    <li>Ative a autenticação de dois fatores para uma camada extra de segurança.</li>
                    <li>Mantenha seu e-mail e número de telefone atualizados para recuperação de conta.</li>
                </ul>
                <a href="configuracoes-seguranca.php" class="btn-secondary">Configurações de Segurança</a>
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
