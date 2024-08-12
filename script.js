document.addEventListener('DOMContentLoaded', function() {
    // Simulador de Financiamento
    const simuladorForm = document.getElementById('simulador-form');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const valor = parseFloat(document.getElementById('valor').value);
            const prazo = parseInt(document.getElementById('prazo').value);
            const tipoCredito = document.getElementById('tipo-credito').value;

            let taxaJuros;
            switch(tipoCredito) {
                case 'pessoal':
                    taxaJuros = 0.02; // 2% ao mês
                    break;
                case 'consignado-privado':
                    taxaJuros = 0.015; // 1.5% ao mês
                    break;
                case 'consignado-publico':
                    taxaJuros = 0.01; // 1% ao mês
                    break;
                default:
                    taxaJuros = 0.02;
            }

            const parcela = (valor * taxaJuros * Math.pow(1 + taxaJuros, prazo)) / (Math.pow(1 + taxaJuros, prazo) - 1);
            const totalPagar = parcela * prazo;

            resultadoSimulacao.innerHTML = `
                <h3>Resultado da Simulação</h3>
                <p>Valor financiado: R$ ${valor.toFixed(2)}</p>
                <p>Prazo: ${prazo} meses</p>
                <p>Tipo de crédito: ${tipoCredito.replace('-', ' ').charAt(0).toUpperCase() + tipoCredito.replace('-', ' ').slice(1)}</p>
                <p>Parcela mensal: R$ ${parcela.toFixed(2)}</p>
                <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
            `;
        });
    }

    // Formulário de Contato
    const contatoForm = document.getElementById('contato-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;

            // Aqui você pode implementar o envio real do formulário para seu servidor
            // Por enquanto, vamos apenas simular um envio bem-sucedido
            alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
            contatoForm.reset();
        });
    }

    // Animações de scroll
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    animatedElements.forEach(el => observer.observe(el));

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Adicionar classe 'active' ao item de menu atual
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('nav ul li a');
    const menuLength = menuItems.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItems[i].href === currentLocation) {
            menuItems[i].className = 'active';
        }
    }

    // Animação para a página Sobre Nós
    const teamGrid = document.querySelector('.team-grid');
    if (teamGrid) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(teamGrid);
    }
});
