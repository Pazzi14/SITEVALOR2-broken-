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
$usuario_nome = $_SESSION['usuario_nome'];

// Conectar ao banco de dados
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Obter empréstimos do usuário com paginação
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10; // Número de empréstimos por página
$offset = ($page - 1) * $limit;

$stmt = $conn->prepare("SELECT id, tipo, valor, data_contratacao, status, prazo FROM emprestimos WHERE usuario_id = ? ORDER BY data_contratacao DESC LIMIT ? OFFSET ?");
$stmt->bind_param("iii", $usuario_id, $limit, $offset);
$stmt->execute();
$result = $stmt->get_result();
$emprestimos = $result->fetch_all(MYSQLI_ASSOC);

// Obter o total de empréstimos para paginação
$stmt = $conn->prepare("SELECT COUNT(*) as total FROM emprestimos WHERE usuario_id = ?");
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$total_result = $stmt->get_result();
$total_emprestimos = $total_result->fetch_assoc()['total'];

$total_pages = ceil($total_emprestimos / $limit);

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meus Empréstimos - Valor Financiamentos</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/meus-emprestimos.css">
    <script src="js/meus-emprestimos.js" defer></script>
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
        <section class="emprestimos-section">
            <div class="container">
                <h1>Meus Empréstimos</h1>
                <p>Confira abaixo todos os seus empréstimos e financiamentos ativos.</p>

                <?php if (empty($emprestimos)): ?>
                    <p class="no-loans">Você ainda não possui empréstimos ativos.</p>
                <?php else: ?>
                    <table class="emprestimos-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Valor</th>
                                <th>Data de Contratação</th>
                                <th>Prazo (meses)</th>
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
                                    <td><?php echo htmlspecialchars($emprestimo['prazo']); ?></td>
                                    <td><?php echo htmlspecialchars($emprestimo['status']); ?></td>
                                    <td>
                                        <a href="detalhes-emprestimo.php?id=<?php echo $emprestimo['id']; ?>" class="btn-secondary">Detalhes</a>
                                        <?php if ($emprestimo['status'] == 'Em andamento'): ?>
                                            <a href="solicitar-quitacao.php?id=<?php echo $emprestimo['id']; ?>" class="btn-primary">Solicitar Quitação</a>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>

                    <!-- Paginação -->
                    <div class="pagination">
                        <?php if ($page > 1): ?>
                            <a href="?page=<?php echo $page - 1; ?>" class="btn-secondary">&laquo; Anterior</a>
                        <?php endif; ?>
                        
                        <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                            <?php if ($i == $page): ?>
                                <span class="current-page"><?php echo $i; ?></span>
                            <?php else: ?>
                                <a href="?page=<?php echo $i; ?>"><?php echo $i; ?></a>
                            <?php endif; ?>
                        <?php endfor; ?>

                        <?php if ($page < $total_pages): ?>
                            <a href="?page=<?php echo $page + 1; ?>" class="btn-secondary">Próximo &raquo;</a>
                        <?php endif; ?>
                    </div>
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
                </div>
            </div>
        </section>

        <section class="faq">
            <div class="container">
                <h2>Perguntas Frequentes</h2>
                <div class="faq-item">
                    <h3>Como solicito a quitação antecipada de um empréstimo?</h3>
                    <p>Para solicitar a quitação antecipada, clique no botão "Solicitar Quitação" ao lado do empréstimo desejado. Nossa equipe entrará em contato para fornecer as informações necessárias.</p>
                </div>
                <div class="faq-item">
                    <h3>Posso alterar a data de vencimento das minhas parcelas?</h3>
                    <p>Sim, é possível alterar a data de vencimento. Entre em contato com nossa equipe de atendimento para avaliar as opções disponíveis para o seu caso.</p>
                </div>
                <a href="faq.html" class="btn-secondary">Ver todas as perguntas</a>
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
