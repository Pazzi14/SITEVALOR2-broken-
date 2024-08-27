document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeSimulator();
    initializeContactForm();
    initializeBackToTop();
    initializeSmoothScroll();
    initializeLazyLoading();
    initializeDepoimentosSlider();
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
        simulatorForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const valor = parseFloat(document.getElementById('valor').value);
            const prazo = parseInt(document.getElementById('prazo').value);
            const tipoCredito = document.getElementById('tipo-credito').value;

            if (isNaN(valor) || isNaN(prazo) || valor <= 0 || prazo <= 0) {
                showError('Por favor, insira valores válidos para o financiamento.');
                return;
            }

            try {
                const resultado = await calcularFinanciamento(valor, prazo, tipoCredito);
                exibirResultadoSimulacao(resultado);
                salvarResultadoSimulacao(resultado);
            } catch (error) {
                showError('Ocorreu um erro ao calcular o financiamento. Por favor, tente novamente.');
            }
        });
    }
}

async function calcularFinanciamento(valor, prazo, tipoCredito) {
    // Simula uma chamada assíncrona para um serviço de cálculo
    return new Promise((resolve) => {
        setTimeout(() => {
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

            resolve({
                valor,
                prazo,
                tipoCredito,
                taxaJuros,
                parcela,
                totalPagar
            });
        }, 500); // Simula um atraso de 500ms
    });
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

    // Registrar evento no Google Analytics
    trackEvent('Simulador', 'Simulacao_Financiamento', resultado.tipoCredito);
}

function salvarResultadoSimulacao(resultado) {
    localStorage.setItem('ultimaSimulacao', JSON.stringify(resultado));
}

function initializeContactForm() {
    const contactForm = document.getElementById('contato-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
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

            try {
                await enviarFormularioContato({ nome, email, telefone, mensagem });
                alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
                contactForm.reset();
                trackEvent('Formulário', 'Envio_Formulario_Contato', 'Sucesso');
            } catch (error) {
                showError('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
                trackEvent('Formulário', 'Envio_Formulario_Contato', 'Erro');
            }
        });
    }
}

async function enviarFormularioContato(dados) {
    // Simula o envio do formulário para um servidor
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Dados do formulário:', dados);
            resolve();
        }, 1000);
    });
}

function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', throttle(function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }, 200));

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

function initializeDepoimentosSlider() {
    const slider = document.querySelector('.depoimentos-slider');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Adiciona controles de teclado
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                slider.scrollLeft -= 100;
            } else if (e.key === 'ArrowRight') {
                slider.scrollLeft += 100;
            }
        });
    }
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
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
