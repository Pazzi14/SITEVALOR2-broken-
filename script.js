document.addEventListener('DOMContentLoaded', function() {
    const simuladorForm = document.getElementById('simulador-form');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    simuladorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const tipo = document.getElementById('tipo-financiamento').value;
        const valor = parseFloat(document.getElementById('valor').value);
        const prazo = parseInt(document.getElementById('prazo').value);

        let taxa = 0.01; // 1% ao mês como padrão
        if (tipo === 'imovel') taxa = 0.008;
        else if (tipo === 'veiculo') taxa = 0.012;
        else if (tipo === 'empresa') taxa = 0.015;

        const parcela = (valor * taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
        const totalPagar = parcela * prazo;

        resultadoSimulacao.innerHTML = `
            <h3>Resultado da Simulação</h3>
            <p>Valor financiado: R$ ${valor.toFixed(2)}</p>
            <p>Prazo: ${prazo} meses</p>
            <p>Parcela mensal: R$ ${parcela.toFixed(2)}</p>
            <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
        `;
    });

    const contatoForm = document.getElementById('contato-form');
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Obrigado pelo contato! Retornaremos em breve.');
        contatoForm.reset();
    });
});
