document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle navigation
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger animation
        burger.classList.toggle('toggle');
    });

    // Simulador de Financiamento
    const simuladorForm = document.getElementById('simulador-form');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    if (simuladorForm) {
        simuladorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const valor = parseFloat(document.getElementById('valor').value);
            const prazo = parseInt(document.getElementById('prazo').value);
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

            resultadoSimulacao.style.display = 'block';
        });
    }

    // Formulário de Contato
    const contatoForm = document.getElementById('contato-form');

    if (contatoForm) {
        contatoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;

            // Aqui você deve implementar o envio real do formulário para seu servidor
            // Por enquanto, vamos apenas simular um envio bem-sucedido

            alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
            contatoForm.reset();
        });
    }

    // Smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animação de fade-in para elementos quando entram na viewport
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeInOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const fadeInObserver = new IntersectionObserver(function(entries, fadeInObserver) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
});
