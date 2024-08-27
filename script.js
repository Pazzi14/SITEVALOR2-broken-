document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Botão "Voltar ao topo"
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Simulador de financiamento
    const simuladorForm = document.getElementById('simulador-form');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const valor = parseFloat(document.getElementById('valor').value);
            const prazo = parseInt(document.getElementById('prazo').value);
            
            // Simulação simplificada (ajuste conforme necessário)
            const taxaJuros = 0.015; // 1.5% ao mês
            const valorParcela = (valor * (taxaJuros * Math.pow(1 + taxaJuros, prazo))) / (Math.pow(1 + taxaJuros, prazo) - 1);
            
            resultadoSimulacao.innerHTML = `
                <h3>Resultado da Simulação</h3>
                <p>Valor solicitado: R$ ${valor.toFixed(2)}</p>
                <p>Prazo: ${prazo} meses</p>
                <p>Valor estimado da parcela: R$ ${valorParcela.toFixed(2)}</p>
                <p>Taxa de juros: 1.5% ao mês</p>
                <a href="#contato" class="cta-button">Fale com um consultor</a>
            `;
        });
    }

    // Animação suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Validação de formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                Array.from(form.elements).forEach(input => {
                    if (input.checkValidity()) {
                        input.classList.remove('invalid');
                    } else {
                        input.classList.add('invalid');
                    }
                });
            }
        });
    });

    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const config = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0
    };

    let observer = new IntersectionObserver(function(entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) { return; }
        img.src = src;
    }
});
