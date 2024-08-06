document.addEventListener('DOMContentLoaded', function() {
    const simuladorForm = document.getElementById('simulador-form');
    const contatoForm = document.getElementById('contato-form');
    const btnTopo = document.getElementById('btnTopo');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    simuladorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        simularFinanciamento();
    });

    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        enviarFormularioContato();
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            btnTopo.style.display = 'block';
        } else {
            btnTopo.style.display = 'none';
        }
    });

    btnTopo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
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
});

function simularFinanciamento() {
    const valor = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const taxaJuros = 0.015; // 1.5% ao mês (exemplo)

    if (isNaN(valor) || isNaN(prazo) || valor < 1000 || prazo < 1 || prazo > 120) {
        alert('Por favor, insira valores válidos. O valor mínimo é R$ 1.000 e o prazo deve ser entre 1 e 120 meses.');
        return;
    }

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
    resultadoDiv.style.display = 'block';
}

function enviarFormularioContato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    if (!validarEmail(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
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

// Animação de fade-in para elementos quando entram na viewport
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOptions = {
    threshold: 0.5
};

const fadeInObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
    });
}, fadeInOptions);

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Lazy loading para imagens
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoadOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px 500px 0px"
};

const lazyLoadObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
    });
}, lazyLoadOptions);

lazyImages.forEach(image => {
    lazyLoadObserver.observe(image);
});
