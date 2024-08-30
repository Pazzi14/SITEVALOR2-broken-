<?php
session_start();
require_once 'config.php';
require_once 'funcoes.php';

$erro = '';
$sucesso = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_STRING);
    $assunto = filter_input(INPUT_POST, 'assunto', FILTER_SANITIZE_STRING);
    $mensagem = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_STRING);

    // Validações
    if (!$nome || !$email || !$telefone || !$assunto || !$mensagem) {
        $erro = "Por favor, preencha todos os campos.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $erro = "Por favor, insira um e-mail válido.";
    } else {
        // Conectar ao banco de dados
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if ($conn->connect_error) {
            die("Conexão falhou: " . $conn->connect_error);
        }

        // Inserir mensagem no banco de dados
        $stmt = $conn->prepare("INSERT INTO mensagens_contato (nome, email, telefone, assunto, mensagem, data_envio) VALUES (?, ?, ?, ?, ?, NOW())");
        $stmt->bind_param("sssss", $nome, $email, $telefone, $assunto, $mensagem);
        
        if ($stmt->execute()) {
            $sucesso = "Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.";
            
            // Enviar e-mail de confirmação
            $para = $email;
            $assunto_email = "Confirmação de recebimento - Valor Financiamentos";
            $corpo_email = "Olá $nome,\n\nRecebemos sua mensagem e entraremos em contato em breve.\n\nAtenciosamente,\nEquipe Valor Financiamentos";
            $headers = "From: contato@valorfinanciamentos.com.br";
            
            mail($para, $assunto_email, $corpo_email, $headers);

            // Limpar os campos do formulário após o envio bem-sucedido
            $nome = $email = $telefone = $assunto = $mensagem = '';
        } else {
            $erro = "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.";
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
    <title>Contato - Valor Financiamentos</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/contato.css">
    <script src="js/contato.js" defer></script>
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
        <section class="contato-hero">
            <div class="container">
                <h1>Entre em Contato</h1>
                <p>Estamos aqui para ajudar. Preencha o formulário abaixo ou use um de nossos canais de atendimento.</p>
            </div>
        </section>

        <section class="contato-form">
            <div class="container">
                <?php if (!empty($erro)): ?>
                    <div class="alert alert-error"><?php echo $erro; ?></div>
                <?php endif; ?>

                <?php if (!empty($sucesso)): ?>
                    <div class="alert alert-success"><?php echo $sucesso; ?></div>
                <?php endif; ?>

                <form action="contato.php" method="post" id="form-contato">
                    <div class="form-group">
                        <label for="nome">Nome Completo:</label>
                        <input type="text" id="nome" name="nome" value="<?php echo htmlspecialchars($nome ?? ''); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail:</label>
                        <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($email ?? ''); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="telefone">Telefone:</label>
                        <input type="tel" id="telefone" name="telefone" value="<?php echo htmlspecialchars($telefone ?? ''); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="assunto">Assunto:</label>
                        <select id="assunto" name="assunto" required>
                            <option value="">Selecione o assunto</option>
                            <option value="Dúvidas sobre empréstimos" <?php echo ($assunto ?? '') === 'Dúvidas sobre empréstimos' ? 'selected' : ''; ?>>Dúvidas sobre empréstimos</option>
                            <option value="Suporte técnico" <?php echo ($assunto ?? '') === 'Suporte técnico' ? 'selected' : ''; ?>>Suporte técnico</option>
                            <option value="Reclamações" <?php echo ($assunto ?? '') === 'Reclamações' ? 'selected' : ''; ?>>Reclamações</option>
                            <option value="Outros" <?php echo ($assunto ?? '') === 'Outros' ? 'selected' : ''; ?>>Outros</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mensagem">Mensagem:</label>
                        <textarea id="mensagem" name="mensagem" rows="5" required><?php echo htmlspecialchars($mensagem ?? ''); ?></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Enviar Mensagem</button>
                </form>
            </div>
        </section>

        <section class="canais-atendimento">
            <div class="container">
                <h2>Outros Canais de Atendimento</h2>
                <div class="canais-grid">
                    <div class="canal-item">
                        <img src="img/icon-phone.svg" alt="Ícone Telefone">
                        <h3>Telefone</h3>
                        <p>(XX) XXXX-XXXX</p>
                        <p>Seg a Sex, das 9h às 18h</p>
                    </div>
                    <div class="canal-item">
                        <img src="img/icon-whatsapp.svg" alt="Ícone WhatsApp">
                        <h3>WhatsApp</h3>
                        <p>(XX) XXXXX-XXXX</p>
                        <p>Atendimento 24/7</p>
                    </div>
                    <div class="canal-item">
                        <img src="img/icon-email.svg" alt="Ícone E-mail">
                        <h3>E-mail</h3>
                        <p>contato@valorfinanciamentos.com.br</p>
                        <p>Resposta em até 24h úteis</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="faq">
            <div class="container">
                <h2>Perguntas Frequentes</h2>
                <div class="faq-item">
                    <h3>Qual o prazo de resposta para mensagens enviadas pelo formulário de contato?</h3>
                    <p>Nosso compromisso é responder todas as mensagens em até 24 horas úteis.</p>
                </div>
                <div class="faq-item">
                    <h3>Posso solicitar um empréstimo pelo telefone ou WhatsApp?</h3>
                    <p>Sim, você pode iniciar o processo de solicitação de empréstimo por telefone ou WhatsApp. No entanto, para finalizar a solicitação, será necessário acessar sua conta online ou visitar uma de nossas agências.</p>
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
