document.addEventListener('DOMContentLoaded', function() {
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
            case 'pessoal':
                taxa = 0.025; // 2.5% ao mês
                break;
            case 'debito_conta':
                taxa = 0.02; // 2% ao mês
                break;
            case 'credluz':
                taxa = 0.018; // 1.8% ao mês
                break;
            case 'consignado_privado':
                taxa = 0.015; // 1.5% ao mês
                break;
            default:
                taxa = 0.02; // 2% ao mês como padrão
        }

        const parcela = (valor * taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
        const totalPagar = parcela * prazo;

        resultadoSimulacao.innerHTML = `
            <h3>Resultado da Simulação</h3>
            <p>Tipo de crédito: ${document.getElementById('tipo-financiamento').options[document.getElementById('tipo-financiamento').selectedIndex].text}</p>
            <p>Valor solicitado: R$ ${valor.toFixed(2)}</p>
            <p>Prazo: ${prazo} meses</p>
            <p>Taxa de juros: ${(taxa * 100).toFixed(2)}% ao mês</p>
            <p>Parcela mensal estimada: R$ ${parcela.toFixed(2)}</p>
            <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
            <p class="disclaimer">* Esta simulação é apenas uma estimativa. Para uma cotação precisa, entre em contato conosco.</p>
        `;
    });

    // Formulário de contato
    const contatoForm = document.getElementById('contato-form');
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contatoForm.reset();
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

    // Animação de fade-in para elementos quando entram na viewport
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
});
