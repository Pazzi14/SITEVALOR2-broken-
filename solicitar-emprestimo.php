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

$erro = '';
$sucesso = '';

// Conectar ao banco de dados
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Obter tipos de empréstimos disponíveis
$stmt = $conn->prepare("SELECT id, nome, taxa_juros, prazo_maximo FROM tipos_emprestimo WHERE ativo = 1");
$stmt->execute();
$result = $stmt->get_result();
$tipos_emprestimo = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $tipo_emprestimo_id = filter_input(INPUT_POST, 'tipo_emprestimo', FILTER_SANITIZE_NUMBER_INT);
    $valor = filter_input(INPUT_POST, 'valor', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    $prazo = filter_input(INPUT_POST, 'prazo', FILTER_SANITIZE_NUMBER_INT);

    // Validações
    if (!$tipo_emprestimo_id || !$valor || !$prazo) {
        $erro = "Por favor, preencha todos os campos.";
    } elseif ($valor < 500 || $valor > 50000) {
        $erro = "O valor do empréstimo deve estar entre R$ 500 e R$ 50.000.";
    } elseif ($prazo < 6 || $prazo > 60) {
        $erro = "O prazo deve estar entre 6 e 60 meses.";
    } else {
        // Inserir solicitação de empréstimo
        $stmt = $conn->prepare("INSERT INTO solicitacoes_emprestimo (usuario_id, tipo_emprestimo_id, valor, prazo, status) VALUES (?, ?, ?, ?, 'Pendente')");
        $stmt->bind_param("iidi", $usuario_id, $tipo_emprestimo_id, $valor, $prazo);
        
        if ($stmt->execute()) {
            $sucesso = "Sua solicitação de empréstimo foi enviada com sucesso! Nossa equipe entrará em contato em breve.";
            // Enviar e-mail de confirmação
            enviarEmailConfirmacaoSolicitacao($usuario_id, $valor, $prazo);
        } else {
            $erro = "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.";
        }
        $stmt->close();
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitar Empréstimo - Valor Financiamentos</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/solicitar-emprestimo.css">
    <script src="js/solicitar-emprestimo.js" defer></script>
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
        <section class="solicitar-emprestimo">
            <div class="container">
                <h1>Solicitar Empréstimo</h1>
                <p>Preencha o formulário abaixo para solicitar seu empréstimo.</p>

                <?php if (!empty($erro)): ?>
                    <div class="alert alert-error"><?php echo $erro; ?></div>
                <?php endif; ?>

                <?php if (!empty($sucesso)): ?>
                    <div class="alert alert-success"><?php echo $sucesso; ?></div>
                <?php else: ?>
                    <form action="solicitar-emprestimo.php" method="post" id="form-solicitar-emprestimo">
                        <div class="form-group">
                            <label for="tipo_emprestimo">Tipo de Empréstimo:</label>
                            <select name="tipo_emprestimo" id="tipo_emprestimo" required>
                                <option value="">Selecione o tipo de empréstimo</option>
                                <?php foreach ($tipos_emprestimo as $tipo): ?>
                                    <option value="<?php echo $tipo['id']; ?>" data-taxa="<?php echo $tipo['taxa_juros']; ?>" data-prazo-max="<?php echo $tipo['prazo_maximo']; ?>">
                                        <?php echo htmlspecialchars($tipo['nome']); ?> - Taxa: <?php echo number_format($tipo['taxa_juros'], 2); ?>% a.m.
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="valor">Valor do Empréstimo:</label>
                            <input type="number" id="valor" name="valor" min="500" max="50000" step="100" required>
                        </div>
                        <div class="form-group">
                            <label for="prazo">Prazo (em meses):</label>
                            <input type="number" id="prazo" name="prazo" min="6" max="60" required>
                        </div>
                        <div id="simulacao-resultado" class="hidden">
                            <h3>Simulação do Empréstimo</h3>
                            <p>Valor da Parcela: R$ <span id="valor-parcela"></span></p>
                            <p>Total a Pagar: R$ <span id="total-pagar"></span></p>
                        </div>
                        <button type="submit" class="btn-primary">Solicitar Empréstimo</button>
                    </form>
                <?php endif; ?>
            </div>
        </section>

        <section class="faq">
            <div class="container">
                <h2>Perguntas Frequentes</h2>
                <div class="faq-item">
                    <h3>Quais documentos preciso apresentar para solicitar um empréstimo?</h3>
                    <p>Geralmente, são necessários: RG, CPF, comprovante de residência e comprovante de renda. Documentos adicionais podem ser solicitados dependendo do tipo e valor do empréstimo.</p>
                </div>
                <div class="faq-item">
                    <h3>Quanto tempo leva para a aprovação do empréstimo?</h3>
                    <p>O tempo de aprovação pode variar, mas geralmente leva de 1 a 3 dias úteis. Após a aprovação, o valor é creditado em sua conta em até 24 horas.</p>
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
