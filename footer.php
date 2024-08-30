    </main>
    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section about">
                    <h3>Sobre a Valor Financiamentos</h3>
                    <p>Somos uma empresa comprometida em oferecer soluções financeiras personalizadas para nossos clientes, com transparência e excelência no atendimento.</p>
                    <div class="contact-info">
                        <p><i class="fas fa-phone"></i> (11) 1234-5678</p>
                        <p><i class="fas fa-envelope"></i> contato@valorfinanciamentos.com.br</p>
                    </div>
                    <div class="social-links">
                        <a href="https://www.facebook.com/valorfinanciamentos" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/valorfinanciamentosoficial" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/company/valorfinanciamentos" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div class="footer-section links">
                    <h3>Links Rápidos</h3>
                    <ul>
                        <li><a href="<?php echo BASE_URL; ?>/produtos.php">Nossos Produtos</a></li>
                        <li><a href="<?php echo BASE_URL; ?>/sobre-nos.php">Sobre Nós</a></li>
                        <li><a href="<?php echo BASE_URL; ?>/blog.php">Blog</a></li>
                        <li><a href="<?php echo BASE_URL; ?>/faq.php">Perguntas Frequentes</a></li>
                        <li><a href="<?php echo BASE_URL; ?>/contato.php">Contato</a></li>
                    </ul>
                </div>
                <div class="footer-section newsletter">
                    <h3>Receba Nossas Novidades</h3>
                    <p>Inscreva-se para receber atualizações sobre nossos produtos e dicas financeiras.</p>
                    <form action="<?php echo BASE_URL; ?>/newsletter-subscribe.php" method="post" class="newsletter-form">
                        <input type="email" name="email" placeholder="Seu e-mail" required>
                        <button type="submit" class="btn btn-primary">Inscrever-se</button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <?php echo date("Y"); ?> Valor Financiamentos. Todos os direitos reservados.</p>
                <nav class="footer-nav">
                    <ul>
                        <li><a href="<?php echo BASE_URL; ?>/termos-de-uso.php">Termos de Uso</a></li>
                        <li><a href="<?php echo BASE_URL; ?>/politica-de-privacidade.php">Política de Privacidade</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </footer>

    <?php if (ENVIRONMENT !== 'production'): ?>
        <div class="debug-info">
            <p>Ambiente: <?php echo ENVIRONMENT; ?></p>
            <p>Versão: <?php echo APP_VERSION; ?></p>
        </div>
    <?php endif; ?>

    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const mainNav = document.querySelector('.main-nav');

            mobileMenuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
                this.classList.toggle('active');
            });
        });
    </script>

    <?php if (isset($page_specific_script)): ?>
        <script src="<?php echo BASE_URL; ?>/js/<?php echo $page_specific_script; ?>"></script>
    <?php endif; ?>

</body>
</html>
