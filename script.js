document.addEventListener('DOMContentLoaded', function() {
    // Inicialização de componentes
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
        simulatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const valor = parseFloat(document.getElementById('valor').value);
            const prazo = parseInt(document.getElementById('prazo').value);
            const tipoCredito = document.getElementById('tipo-credito').value;

            if (isNaN(valor) || isNaN(prazo) || valor <= 0 || prazo <= 0) {
                showError('Por favor, insira valores válidos para o financiamento.');
                return;
            }

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

            resultadoSimulacao.innerHTML = `
                <h3>Resultado da Simulação</h3>
                <p>Valor financiado: R$ ${valor.toFixed(2)}</p>
                <p>Prazo: ${prazo} meses</p>
                <p>Taxa de juros: ${(taxaJuros * 100).toFixed(2)}% ao mês</p>
                <p>Parcela mensal: R$ ${parcela.toFixed(2)}</p>
                <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
            `;
            resultadoSimulacao.style.display = 'block';

            // Registrar evento no Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'simulacao_financiamento', {
                    'event_category': 'Simulador',
                    'event_label': tipoCredito,
                    'value': valor
                });
            }
        });
    }
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

            // Aqui você deve implementar o envio real do formulário para seu servidor
            // Por enquanto, vamos apenas simular um envio bem-sucedido
            alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
            contactForm.reset();

            // Registrar evento no Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'envio_formulario_contato', {
                    'event_category': 'Formulário',
                    'event_label': 'Contato'
                });
            }
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
    }
}

function showError(message) {
    alert(message); // Você pode substituir isso por uma implementação mais elegante
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Animações de entrada
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Adiciona funcionalidade para o FAQ (se existir na página)
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.maxHeight;

        faqQuestions.forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            }
        });

        question.classList.toggle('active');
        
        if (isOpen) {
            answer.style.maxHeight = null;
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

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

// Adiciona rastreamento de eventos (exemplo com Google Analytics)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Exemplo de uso:
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('CTA', 'Click', button.textContent);
    });
});

// Melhoria na acessibilidade para o menu de navegação
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('focus', () => {
        link.parentElement.classList.add('focus');
    });
    link.addEventListener('blur', () => {
        link.parentElement.classList.remove('focus');
    });
});
