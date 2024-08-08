document.addEventListener('DOMContentLoaded', function() {
    const simuladorForm = document.getElementById('simulador-form');
    const contatoForm = document.getElementById('contato-form');
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav ul');
    const faqItems = document.querySelectorAll('.faq-item');

    // Simulador de financiamento
    simuladorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const tipoFinanciamento = document.getElementById('tipo-financiamento').value;
        const valor = parseFloat(document.getElementById('valor').value);
        const prazo = parseInt(document.getElementById('prazo').value);

        if (!tipoFinanciamento || isNaN(valor) || isNaN(prazo)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        let taxa;
        switch(tipoFinanciamento) {
            case 'pessoal':
                taxa = 0.02; // 2% ao mês
                break;
            case 'consignado_publico':
                taxa = 0.015; // 1.5% ao mês
                break;
            case 'consignado_privado':
                taxa = 0.018; // 1.8% ao mês
                break;
            default:
                taxa = 0.02;
        }

        const parcela = (valor * taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
        const total = parcela * prazo;

        const resultadoDiv = document.getElementById('resultado-simulacao');
        resultadoDiv.innerHTML = `
            <h3>Resultado da Simulação</h3>
            <p>Tipo de Financiamento: ${document.getElementById('tipo-financiamento').options[document.getElementById('tipo-financiamento').selectedIndex].text}</p>
            <p>Valor financiado: R$ ${valor.toFixed(2)}</p>
            <p>Prazo: ${prazo} meses</p>
            <p>Taxa de juros: ${(taxa * 100).toFixed(2)}% ao mês</p>
            <p>Parcela mensal: R$ ${parcela.toFixed(2)}</p>
            <p>Total a pagar: R$ ${total.toFixed(2)}</p>
        `;
        resultadoDiv.classList.add('show');
    });

    // Formulário de contato
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;

        if (nome.trim() === '' || email.trim() === '' || mensagem.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        // Aqui você enviaria os dados para o servidor
        // Por enquanto, vamos apenas simular um envio bem-sucedido
        alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
        contatoForm.reset();
    });

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Navegação móvel
    navToggle.addEventListener('change', function() {
        if(this.checked) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    });

    // Fechar menu móvel ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.checked = false;
            nav.style.display = 'none';
        });
    });

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // FAQ toggle
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        question.addEventListener('click', () => {
            answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        });
    });
});
