document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simulador de Financiamento
    const simuladorForm = document.getElementById('simulador-form');
    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            e.preventDefault();
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
            resultadoDiv.classList.add('fade-in');
        });
    }

    // Formulário de Contato
    const contatoForm = document.getElementById('contato-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Obrigado pelo seu contato! Retornaremos em breve.');
            contatoForm.reset();
        });
    }

    // Animação de entrada para elementos
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.produto-item, .section-padding');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger on initial load

    // Menu mobile
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '&#9776;';
    document.querySelector('nav .container').prepend(menuToggle);

    menuToggle.addEventListener('click', function() {
        const navUl = document.querySelector('nav ul');
        navUl.classList.toggle('show');
    });
});
