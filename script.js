document.addEventListener('DOMContentLoaded', function() {
    // Menu de navegação móvel
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // Simulador de Financiamento
    const simuladorForm = document.getElementById('simulador-form');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    simuladorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const valor = parseFloat(document.getElementById('valor').value);
        const prazo = parseInt(document.getElementById('prazo').value);

        if (isNaN(valor) || isNaN(prazo) || valor < 1000 || prazo < 1 || prazo > 120) {
            resultadoSimulacao.innerHTML = '<p class="error">Por favor, preencha todos os campos corretamente.</p>';
            return;
        }

        const taxaJuros = 0.015; // 1.5% ao mês (exemplo)
        const parcela = (valor * taxaJuros * Math.pow(1 + taxaJuros, prazo)) / (Math.pow(1 + taxaJuros, prazo) - 1);
        const totalPagar = parcela * prazo;

        resultadoSimulacao.innerHTML = `
            <h3>Resultado da Simulação</h3>
            <p>Valor financiado: R$ ${valor.toFixed(2)}</p>
            <p>Prazo: ${prazo} meses</p>
            <p>Parcela mensal: R$ ${parcela.toFixed(2)}</p>
            <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
        `;
    });

    // Validação do formulário de contato
    const contatoForm = document.getElementById('contato-form');

    contatoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (nome === '' || email === '' || mensagem === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Aqui você pode adicionar o código para enviar o formulário
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contatoForm.reset();
    });

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Animação de fade-in
    const fadeElems = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    });

    fadeElems.forEach(elem => observer.observe(elem));
});
