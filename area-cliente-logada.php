<?php
session_start();
require_once 'config.php';
require_once 'funcoes.php';

// Verificar se o usuário está logado
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit();
}

// Obter informações do usuário
$usuario_id = $_SESSION['usuario_id'];
$usuario_nome = $_SESSION['usuario_nome'];

// Conectar ao banco de dados
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Obter empréstimos do usuário
$stmt = $conn->prepare("SELECT id, tipo, valor, data_contratacao, status FROM emprestimos WHERE usuario_id = ?");
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();
$emprestimos = $result->fetch_all(MYSQLI_ASSOC);

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Área do Cliente - Valor Financiamentos</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/area-cliente-logada.css">
    <script src="js/area-cliente.js" defer></script>
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
        <section class="welcome-section">
            <div class="container">
                <h1>Bem-vindo, <?php echo htmlspecialchars($usuario_nome); ?>!</h1>
                <p>Gerencie seus empréstimos e explore novos produtos financeiros.</p>
            </div>
        </section>

        <section class="dashboard">
            <div class="container">
                <h2>Meus Empréstimos</h2>
                <?php if (empty($emprestimos)): ?>
                    <p>Você ainda não possui empréstimos ativos.</p>
                <?php else: ?>
                    <table class="emprestimos-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Valor</th>
                                <th>Data de Contratação</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($emprestimos as $emprestimo): ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($emprestimo['id']); ?></td>
                                    <td><?php echo htmlspecialchars($emprestimo['tipo']); ?></td>
                                    <td>R$ <?php echo number_format($emprestimo['valor'], 2, ',', '.'); ?></td>
                                    <td><?php echo date('d/m/Y', strtotime($emprestimo['data_contratacao'])); ?></td>
                                    <td><?php echo htmlspecialchars($emprestimo['status']); ?></td>
                                    <td>
                                        <a href="detalhes-emprestimo.php?id=<?php echo $emprestimo['id']; ?>" class="btn-secondary">Detalhes</a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php endif; ?>
            </div>
        </section>

        <section class="actions">
            <div class="container">
                <h2>Ações Rápidas</h2>
                <div class="actions-grid">
                    <a href="solicitar-emprestimo.php" class="action-item">
                        <img src="img/icon-new-loan.svg" alt="Ícone Novo Empréstimo">
                        <h3>Solicitar Novo Empréstimo</h3>
                    </a>
                    <a href="simular-emprestimo.php" class="action-item">
                        <img src="img/icon-simulate.svg" alt="Ícone Simular Empréstimo">
                        <h3>Simular Empréstimo</h3>
                    </a>
                    <a href="editar-perfil.php" class="action-item">
                        <img src="img/icon-profile.svg" alt="Ícone Editar Perfil">
                        <h3>Editar Perfil</h3>
                    </a>
                    <a href="documentos.php" class="action-item">
                        <img src="img/icon-documents.svg" alt="Ícone Documentos">
                        <h3>Meus Documentos</h3>
                    </a>
                </div>
            </div>
        </section>

        <section class="support">
            <div class="container">
                <h2>Precisa de Ajuda?</h2>
                <p>Nossa equipe de suporte está pronta para auxiliar você.</p>
                <a href="contato.php" class="btn-primary">Fale Conosco</a>
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
