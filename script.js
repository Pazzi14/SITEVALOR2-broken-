document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    const simuladorForm = document.getElementById('simulador-form');
    const contatoForm = document.getElementById('contato-form');
    const backToTopButton = document.getElementById('backToTop');

    // Menu toggle para dispositivos móveis
    menuToggle.addEventListener('click', function() {
        navUl.classList.toggle('show');
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

    // Botão Voltar ao Topo
    window.onscroll = function() {
        scrollFunction();
    };

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animação de fade-in para elementos
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Funcionalidade para o FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });
});

function simularFinanciamento() {
    const valor = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const taxaJuros = 0.015; // 1.5% ao mês (exemplo)

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
        <p>Parcela mensal: R$ ${parcela.toFixed(2)}</p>
        <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
    `;
    resultadoDiv.style.display = 'block';
}

function enviarFormularioContato() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (nome === '' || email === '' || mensagem === '') {
        alert('Por favor, preencha todos os campos do formulário.');
        return;
    }

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

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('backToTop').style.display = 'block';
    } else {
        document.getElementById('backToTop').style.display = 'none';
    }
}

function topFunction() {
    document.body.scrollTop = 0; // Para Safari
    document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE e Opera
}

// Efeito parallax no hero
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});
