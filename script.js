document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const backToTopButton = document.getElementById('backToTop');
    const simuladorForm = document.getElementById('simulador-form');
    const contatoForm = document.getElementById('contato-form');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Fade-in effect
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

    // Simulador form submission
    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const valor = document.getElementById('valor').value;
            const prazo = document.getElementById('prazo').value;
            const tipoCredito = document.getElementById('tipo-credito').value;
            
            // Simulação básica (você pode ajustar conforme necessário)
            const taxa = 0.015; // 1.5% ao mês
            const parcela = (valor * (taxa * Math.pow(1 + taxa, prazo))) / (Math.pow(1 + taxa, prazo) - 1);
            const total = parcela * prazo;
            
            const resultado = `
                <h3>Resultado da Simulação</h3>
                <p>Tipo de Crédito: ${tipoCredito}</p>
                <p>Valor solicitado: R$ ${parseFloat(valor).toFixed(2)}</p>
                <p>Prazo: ${prazo} meses</p>
                <p>Valor da parcela: R$ ${parcela.toFixed(2)}</p>
                <p>Total a pagar: R$ ${total.toFixed(2)}</p>
            `;
            
            document.getElementById('resultado-simulacao').innerHTML = resultado;
        });
    }

    // Contato form submission
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Aqui você pode adicionar a lógica para enviar o formulário de contato
            // Por exemplo, usando fetch para enviar os dados para um servidor
            
            console.log('Formulário enviado:', { nome, email, telefone, mensagem });
            
            // Limpar o formulário após o envio
            contatoForm.reset();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        });
    }
});
