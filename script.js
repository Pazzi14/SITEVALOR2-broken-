document.addEventListener('DOMContentLoaded', function() {
    // Navegação mobile
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

    // Simulador de financiamento
    const simuladorForm = document.getElementById('simulador-form');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    simuladorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const tipo = document.getElementById('tipo-financiamento').value;
        const valor = parseFloat(document.getElementById('valor').value);
        const prazo = parseInt(document.getElementById('prazo').value);

        let taxa;
        switch(tipo) {
            case 'imovel':
                taxa = 0.008; // 0.8% ao mês
                break;
            case 'veiculo':
                taxa = 0.012; // 1.2% ao mês
                break;
            case 'empresa':
                taxa = 0.015; // 1.5% ao mês
                break;
            default:
                taxa = 0.01; // 1% ao mês como padrão
        }

        const parcela = (valor * taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
        const totalPagar = parcela * prazo;

        resultadoSimulacao.innerHTML = `
            <h3>Resultado da Simulação</h3>
            <p>Valor financiado: R$ ${valor.toFixed(2)}</p>
            <p>Prazo: ${prazo} meses</p>
            <p>Taxa de juros: ${(taxa * 100).toFixed(2)}% ao mês</p>
            <p>Parcela mensal: R$ ${parcela.toFixed(2)}</p>
            <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
        `;
    });

    // Formulário de contato
    const contatoForm = document.getElementById('contato-form');
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aqui você adicionaria a lógica para enviar o formulário
        alert('Obrigado pelo contato! Retornaremos em breve.');
        contatoForm.reset();
    });

    // Cookie consent
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');

    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'true');
        cookieConsent.style.display = 'none';
    });

    if (!localStorage.getItem('cookieConsent')) {
        cookieConsent.style.display = 'block';
    }

    // Animação de fade-in
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});