document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeSimulator();
    initializeContactForm();
    initializeBackToTop();
    initializeSmoothScroll();
    initializeLazyLoading();
    initializeNewsletterForm();
    initializeLoginForm();
    checkHighContrastPreference();
    initializeBlogSearch();
    initializeBlogPagination();
    initializeClientAreaLogin();

    const contrastToggle = document.getElementById('contrast-toggle');
    if (contrastToggle) {
        contrastToggle.addEventListener('click', toggleHighContrast);
    }
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
    const valorInput = document.getElementById('valor');

    if (valorInput) {
        valorInput.addEventListener('input', function() {
            formatCurrency(this);
        });
    }

    if (simulatorForm) {
        simulatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const valor = parseFloat(valorInput.value.replace(/[^\d,]/g, '').replace(',', '.'));
            const prazo = parseInt(document.getElementById('prazo').value);
            const tipoCredito = document.getElementById('tipo-credito').value;

            if (isNaN(valor) || isNaN(prazo) || valor <= 0 || prazo <= 0) {
                showError('Por favor, insira valores válidos para o financiamento.', 'simulador-error');
                return;
            }

            debouncedSimulation(valor, prazo, tipoCredito);
        });
    }
}

const debouncedSimulation = debounce(async function(valor, prazo, tipoCredito) {
    try {
        const resultado = await calcularFinanciamento(valor, prazo, tipoCredito);
        exibirResultadoSimulacao(resultado);
        salvarResultadoSimulacao(resultado);
    } catch (error) {
        showError('Ocorreu um erro ao calcular o financiamento. Por favor, tente novamente.', 'simulador-error');
    }
}, 300);

async function calcularFinanciamento(valor, prazo, tipoCredito) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let taxaJuros;
            switch(tipoCredito) {
                case 'pessoal':
                    taxaJuros = 0.025;
                    break;
                case 'consignado-privado':
                    taxaJuros = 0.018;
                    break;
                case 'consignado-publico':
                    taxaJuros = 0.015;
                    break;
                default:
                    taxaJuros = 0.02;
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
        }, 500);
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

    trackEvent('Simulador', 'Simulacao_Financiamento', resultado.tipoCredito);
}

function salvarResultadoSimulacao(resultado) {
    localStorage.setItem('ultimaSimulacao', JSON.stringify(resultado));
}

function initializeContactForm() {
    const contactForm = document.getElementById('contato-form');

    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(this);
                if (this.id === 'telefone') {
                    maskTelefone(this);
                }
            });
        });

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (validateForm(contactForm)) {
                const formData = new FormData(contactForm);
                try {
                    await enviarFormularioContato(Object.fromEntries(formData));
                    alert(`Obrigado pelo contato, ${formData.get('nome')}! Responderemos em breve para ${formData.get('email')}.`);
                    contactForm.reset();
                    trackEvent('Formulário', 'Envio_Formulario_Contato', 'Sucesso');
                } catch (error) {
                    showError('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.', 'contato-error');
                    trackEvent('Formulário', 'Envio_Formulario_Contato', 'Erro');
                }
            }
        });
    }
}

async function enviarFormularioContato(dados) {
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
    if ('IntersectionObserver' in window) {
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
    } else {
        const lazyLoad = () => {
            const lazyImages = document.querySelectorAll('img[data-src]');
            const lazyVideos = document.querySelectorAll('video[data-src]');

            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });

            lazyVideos.forEach(video => {
                video.src = video.dataset.src;
                video.load();
                video.removeAttribute('data-src');
            });
        };

        window.addEventListener('load', lazyLoad);
        window.addEventListener('scroll', throttle(lazyLoad, 200));
    }
}

function showError(message, elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateInput(input) {
    const errorElement = input.nextElementSibling;
    
    if (input.value.trim() === '') {
        showInputError(input, 'Este campo é obrigatório', errorElement);
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
        showInputError(input, 'Por favor, insira um e-mail válido', errorElement);
    } else {
        hideInputError(input, errorElement);
    }
}

function showInputError(input, message, errorElement) {
    input.classList.add('error');
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        const newErrorElement = document.createElement('span');
        newErrorElement.classList.add('error-message');
        newErrorElement.textContent = message;
        input.parentNode.insertBefore(newErrorElement, input.nextSibling);
    }
}

function hideInputError(input, errorElement) {
    input.classList.remove('error');
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.style.display = 'none';
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    inputs.forEach(input => {
        if (input.type !== 'submit') {
            validateInput(input);
            if (input.classList.contains('error')) {
                isValid = false;
            }
        }
    });
    return isValid;
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

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email-newsletter').value;
            if (isValidEmail(email)) {
                alert('Obrigado por se inscrever em nossa newsletter!');
                newsletterForm.reset();
                trackEvent('Newsletter', 'Inscricao', 'Sucesso');
            } else {
                showError('Por favor, insira um endereço de e-mail válido.', 'newsletter-error');
            }
        });
    }
}

function initializeLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const cpf = document.getElementById('cpf').value;
            const senha = document.getElementById('senha').value;
            if (validateCPF(cpf) && senha) {
                alert('Função de login não implementada. Esta é apenas uma demonstração.');
                trackEvent('Login', 'Tentativa_Login', 'Sucesso');
            } else {
                showError('Por favor, preencha todos os campos corretamente.', 'login-error');
            }
        });

        const cpfInput = document.getElementById('cpf');
                if (cpfInput) {
            cpfInput.addEventListener('input', function() {
                maskCPF(this);
            });
        }
    }
}

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf == '') return false;
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;
    add = 0;
    for (i=0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

function maskCPF(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = value;
}

function maskTelefone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 5) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
        value = value.replace(/^(\d*)/, '($1');
    }
    input.value = value;
}

function formatCurrency(input) {
    let value = input.value.replace(/\D/g, '');
    value = (parseInt(value) / 100).toFixed(2) + '';
    value = value.replace(".", ",");
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    input.value = 'R$ ' + value;
}

function initializeBlogSearch() {
    const searchForm = document.getElementById('blog-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('blog-search').value;
            console.log('Pesquisando por:', searchTerm);
            // Implementar lógica de pesquisa aqui
        });
    }
}

function initializeBlogPagination() {
    const paginationLinks = document.querySelectorAll('.blog-pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            console.log('Carregando página:', page);
            // Implementar lógica de paginação aqui
        });
    });
}

function initializeClientAreaLogin() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const cpf = document.getElementById('cpf').value;
            const senha = document.getElementById('senha').value;
            
            if (validateCPF(cpf) && senha) {
                console.log('Tentativa de login com CPF:', cpf);
                alert('Login bem-sucedido! Redirecionando para o painel do cliente...');
                // Implementar redirecionamento para o painel do cliente aqui
            } else {
                showError('CPF ou senha inválidos. Por favor, tente novamente.', 'login-error');
            }
        });
    }
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
}

function checkHighContrastPreference() {
    const highContrast = localStorage.getItem('highContrast') === 'true';
    if (highContrast) {
        document.body.classList.add('high-contrast');
    }
}
