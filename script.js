document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const simuladorForm = document.getElementById('simulador-form');
    const contatoForm = document.getElementById('contato-form');
    const faqItems = document.querySelectorAll('.faq-item');
    const backToTopButton = document.getElementById('backToTop');

    // Menu toggle para dispositivos móveis
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Simulador de financiamento
    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            simularFinanciamento();
        });
    }

    // Formulário de contato
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            enviarFormularioContato();
        });
    }

    // FAQ toggle
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            question.classList.toggle('active');
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to Top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // Inicializar o slider de depoimentos
    if (typeof $.fn.slick !== 'undefined') {
        $('.depoimentos-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    }

    // Animações ao scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if(elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez no carregamento da página
});

function simularFinanciamento() {
    const valor = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const tipoFinanciamento = document.getElementById('tipo-financiamento').value;
    
    let taxaJuros;
    switch(tipoFinanciamento) {
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
            alert('Por favor, selecione um tipo de financiamento.');
            return;
    }

    if (isNaN(valor) || isNaN(prazo) || valor <= 0 || prazo <= 0) {
        alert('Por favor, insira valores válidos para o financiamento.');
        return;
    }

    const parcela = (valor * taxaJuros * Math.pow(1 + taxaJuros, prazo)) / (Math.pow(1 + taxaJuros, prazo) - 1);
    const totalPagar = parcela * prazo;

    const resultadoDiv = document.getElementById('resultado-simulacao');
    resultadoDiv.innerHTML = `
        <h3>Resultado da Simulação</h3>
        <p>Valor financiado: R$ ${valor.toFixed(2)}</p>
        <p>Prazo: ${prazo} meses</p>
        <p>Taxa de juros: ${(taxaJuros * 100).toFixed(2)}% ao mês</p>
        <p>Parcela mensal: R$ ${parcela.toFixed(2)}</p>
        <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
    `;
    resultadoDiv.classList.remove('hidden');
}

function enviarFormularioContato() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (nome === '' || email === '' || telefone === '' || mensagem === '') {
        alert('Por favor, preencha todos os campos do formulário.');
        return;
    }

    if (!validarEmail(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
    }

    if (!validarTelefone(telefone)) {
        alert('Por favor, insira um número de telefone válido.');
        return;
    }

    // Aqui você deve implementar o envio real do formulário para seu servidor
    // Por enquanto, vamos apenas simular um envio bem-sucedido
    alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
    document.getElementById('contato-form').reset();
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarTelefone(telefone) {
    const re = /^(\+55|55)?(\d{2})?\d{8,9}$/;
    return re.test(telefone.replace(/\D/g, ''));
}

// Máscara para o campo de telefone
function mascaraTelefone(telefone) {
    const texto = telefone.value;
    const textoApenasNumeros = texto.replace(/\D/g, '').substring(0, 11);
    
    let telefoneFormatado = textoApenasNumeros.replace(/^(\d{2})(\d)/g, '($1) $2');
    telefoneFormatado = telefoneFormatado.replace(/(\d)(\d{4})$/, '$1-$2');
    
    telefone.value = telefoneFormatado;
}

// Aplicar máscara ao campo de telefone
const campoTelefone = document.getElementById('telefone');
if (campoTelefone) {
    campoTelefone.addEventListener('input', function() {
        mascaraTelefone(this);
    });
}

// Lazy loading para imagens
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback para navegadores que não suportam IntersectionObserver
        let active = false;

        const lazyLoad = function() {
            if (active === false) {
                active = true;

                setTimeout(function() {
                    lazyImages.forEach(function(lazyImage) {
                        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");

                            lazyImages = lazyImages.filter(function(image) {
                                return image !== lazyImage;
                            });

                            if (lazyImages.length === 0) {
                                document.removeEventListener("scroll", lazyLoad);
                                window.removeEventListener("resize", lazyLoad);
                                window.removeEventListener("orientationchange", lazyLoad);
                            }
                        }
                    });

                    active = false;
                }, 200);
            }
        };

        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
    }
});
