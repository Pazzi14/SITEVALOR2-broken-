document.addEventListener('DOMContentLoaded', function() {
    const simuladorForm = document.getElementById('simulador-form');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const valor = parseFloat(document.getElementById('valor').value);
            const prazo = parseInt(document.getElementById('prazo').value);
            const tipoCredito = document.getElementById('tipo-credito').value;

            let taxaJuros;
            switch (tipoCredito) {
                case 'pessoal':
                    taxaJuros = 0.025; // 2.5% ao mês
                    break;
                case 'consignado-privado':
                    taxaJuros = 0.018; // 1.8% ao mês
                    break;
                case 'consignado-publico':
                    taxaJuros = 0.015; // 1.5% ao mês
                    break;
                case 'fgts':
                    taxaJuros = 0.02; // 2% ao mês
                    break;
                default:
                    taxaJuros = 0.025;
            }

            const parcela = calcularParcela(valor, taxaJuros, prazo);
            const totalPagar = parcela * prazo;

            resultadoSimulacao.innerHTML = `
                <h3>Resultado da Simulação</h3>
                <p>Valor do empréstimo: R$ ${valor.toFixed(2)}</p>
                <p>Prazo: ${prazo} meses</p>
                <p>Taxa de juros: ${(taxaJuros * 100).toFixed(2)}% ao mês</p>
                <p>Valor da parcela: R$ ${parcela.toFixed(2)}</p>
                <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
            `;
        });
    }

    function calcularParcela(valor, taxaJuros, prazo) {
        return (valor * taxaJuros * Math.pow(1 + taxaJuros, prazo)) / (Math.pow(1 + taxaJuros, prazo) - 1);
    }

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mostrar/ocultar botão "Voltar ao topo"
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
