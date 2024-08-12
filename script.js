document.addEventListener('DOMContentLoaded', function() {
    const simuladorForm = document.getElementById('simulador-form');
    const contatoForm = document.getElementById('contato-form');
    const faqItems = document.querySelectorAll('.faq-item h3');

    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            simularFinanciamento();
        });
    }

    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            enviarFormularioContato();
        });
    }

    faqItems.forEach(item => {
        item.addEventListener('click', toggleFAQ);
    });

    // Adiciona classe de animação aos elementos
    const fadeElements = document.querySelectorAll('.hero, section');
    fadeElements.forEach(el => el.classList.add('fade-in'));

    // Marca o item de menu ativo
    markActiveMenuItem();
});

function simularFinanciamento() {
    const valor = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const taxaJuros = 0.015; // 1.5% ao mês (exemplo)

    const parcela = (valor * taxaJuros * Math.pow(1 + taxaJuros, prazo)) / (Math.pow(1 + taxaJuros, prazo) - 1);
    const totalPagar = parcela * prazo;

    const resultadoDiv = document.getElementById('resultado-simulacao');
    resultadoDiv.innerHTML = `
        <h3>Resultado da Simulação</h3>
        <p>Valor financiado: R$ ${valor.toFixed(2)}</p>
        <p>Prazo: ${prazo} meses</p>
        <p>Parcela mensal: R$ ${parcela.toFixed(2)}</p>
        <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
    `;
}

function enviarFormularioContato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    // Aqui você deve implementar o envio real do formulário para seu servidor
    // Por enquanto, vamos apenas simular um envio bem-sucedido

    alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
    document.getElementById('contato-form').reset();
}

function toggleFAQ() {
    const answer = this.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}

function markActiveMenuItem() {
    const currentPage = window.location.pathname.split("/").pop();
    const menuItems = document.querySelectorAll('nav ul li a');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
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
