document.addEventListener('DOMContentLoaded', function() {
    // Simulador de empréstimo
    const simulacaoForm = document.getElementById('simulacao-form');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    if (simulacaoForm) {
        simulacaoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const valor = parseFloat(document.getElementById('valor').value);
            const prazo = parseInt(document.getElementById('prazo').value);
            const tipoCredito = document.getElementById('tipo-credito').value;

            let taxa;
            switch (tipoCredito) {
                case 'pessoal':
                    taxa = 0.0299; // 2.99% ao mês
                    break;
                case 'consignado-privado':
                    taxa = 0.0199; // 1.99% ao mês
                    break;
                case 'consignado-publico':
                    taxa = 0.0149; // 1.49% ao mês
                    break;
                case 'fgts':
                    taxa = 0.0179; // 1.79% ao mês
                    break;
                default:
                    taxa = 0.0249; // 2.49% ao mês (taxa padrão)
            }

            const parcela = (valor * (taxa * Math.pow(1 + taxa, prazo))) / (Math.pow(1 + taxa, prazo) - 1);
            const totalPago = parcela * prazo;

            resultadoSimulacao.innerHTML = `
                <h3>Resultado da Simulação</h3>
                <p>Valor do empréstimo: R$ ${valor.toFixed(2)}</p>
                <p>Prazo: ${prazo} meses</p>
                <p>Valor da parcela: R$ ${parcela.toFixed(2)}</p>
                <p>Total a pagar: R$ ${totalPago.toFixed(2)}</p>
                <p>Taxa de juros: ${(taxa * 100).toFixed(2)}% ao mês</p>
                <button class="btn-primary" onclick="solicitarEmprestimo()">Solicitar Empréstimo</button>
            `;
        });
    }

    // Função para solicitar empréstimo (placeholder)
    window.solicitarEmprestimo = function() {
        alert('Obrigado pelo seu interesse! Um de nossos consultores entrará em contato em breve.');
    };

    // Accordion para FAQ
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
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

    // Validação de formulário de contato (se existir)
    const contatoForm = document.getElementById('contato-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Adicione aqui a lógica de validação e envio do formulário
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contatoForm.reset();
        });
    }

    // Adicione mais funcionalidades conforme necessário
});
