document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeSimulator();
    initializeContactForm();
    initializeBackToTop();
    initializeSmoothScroll();
    initializeLazyLoading();
    initializeFadeInEffect();
});

function initializeMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                menuToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });
    }
}

function initializeSimulator() {
    const simulatorForm = document.getElementById('simulador-form');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    if (simulatorForm) {
        simulatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const valor = parseFloat(document.getElementById('valor').value);
            const prazo = parseInt(document.getElementById('prazo').value);
            const tipoCredito = document.getElementById('tipo-credito').value;

            if (isNaN(valor) || isNaN(prazo) || valor <= 0 || prazo <= 0) {
                showError('Por favor, insira valores válidos para o financiamento.');
                return;
            }

            const resultado = calcularFinanciamento(valor, prazo, tipoCredito);
            exibirResultadoSimulacao(resultado);
        });
    }
}

function calcularFinanciamento(valor, prazo, tipoCredito) {
    let taxaJuros;
    switch(tipoCredito) {
        case 'pessoal':
            taxaJuros = 0.025; // 2.5% ao mês
            break;
        case 'consignado-privado':
            taxaJuros = 0.018; // 1.8% ao mês
            break;
        case 'consignado-publico':
            taxaJuros = 0.015; // 1.5% ao mês
            break;
        default:
            taxaJuros = 0.02; // 2% ao mês (padrão)
    }

    const parcela = (valor * taxaJuros * Math.pow(1 + taxaJuros, prazo)) / (Math.pow(1 + taxaJuros, prazo) - 1);
    const totalPagar = parcela * prazo;

    return {
        valor,
        prazo,
        tipoCredito,
        taxaJuros,
        parcela,
        totalPagar
    };
}

function exibirResultadoSimulacao(resultado) {
    const resultadoSimulacao = document.getElementById('resultado-simulacao');
    resultadoSimulacao.innerHTML = `
        <h3>Resultado da Simulação</h3>
        <p>Valor financiado: R$ ${resultado.valor.toFixed(2)}</p>
        <p>Prazo: ${resultado.prazo} meses</p>
        <p>Taxa de juros: ${(resultado.taxaJuros * 100).toFixed(2)}% ao mês</p>
        <p>Parcela mensal: R$ ${resultado.parcela.toFixed(2)}</p>
        <p>Total a pagar: R$ ${resultado.totalPagar.toFixed(2)}</p>
    `;
    resultadoSimulacao.style.display = 'block';
}

function initializeContactForm() {
    const contactForm = document.getElementById('contato-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (nome === '' || email === '' || telefone === '' || mensagem === '') {
                showError('Por favor, preencha todos os campos do formulário.');
                return;
            }

            if (!isValidEmail(email)) {
                showError('Por favor, insira um endereço de e-mail válido.');
                return;
            }

            alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
            contactForm.reset();
        });
    }
}

function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyVideos = document.querySelectorAll('video[data-src]');

    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.tagName.toLowerCase() === 'img') {
                    element.src = element.dataset.src;
                } else if (element.tagName.toLowerCase() === 'video') {
                    element.src = element.dataset.src;
                    element.load();
                }
                element.removeAttribute('data-src');
                observer.unobserve(element);
            }
        });
    };

    const observer = new IntersectionObserver(lazyLoad, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    lazyImages.forEach(img => observer.observe(img));
    lazyVideos.forEach(video => observer.observe(video));
}

function initializeFadeInEffect() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    document.body.appendChild(errorElement);

    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Adiciona funcionalidade de chat ao vivo (simulado)
function initializeLiveChat() {
    const chatButton = document.createElement('button');
    chatButton.textContent = 'Chat ao Vivo';
    chatButton.classList.add('live-chat-button');
    document.body.appendChild(chatButton);

    chatButton.addEventListener('click', () => {
        alert('O chat ao vivo está em desenvolvimento. Por favor, entre em contato conosco por telefone ou e-mail.');
    });
}

initializeLiveChat();
