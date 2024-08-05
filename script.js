document.addEventListener('DOMContentLoaded', function() {
    // Navegação responsiva
    const menuToggle = document.createElement('button');
    menuToggle.textContent = 'Menu';
    menuToggle.classList.add('menu-toggle');
    document.querySelector('nav').prepend(menuToggle);

    menuToggle.addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('show');
    });

    // Simulador de financiamento
    const simuladorForm = document.getElementById('simulador-form');
    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            simularFinanciamento();
        });
    }

    // Formulário de contato
    const contatoForm = document.getElementById('contato-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            enviarFormularioContato();
        });
    }

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

function simularFinanciamento() {
    const valor = document.getElementById('valor').value;
    const prazo = document.getElementById('prazo').value;
    // Lógica de simulação aqui
    const resultado = document.getElementById('resultado-simulacao');
    resultado.innerHTML = `
        <h3>Resultado da Simulação</h3>
        <p>Valor: R$ ${valor}</p>
        <p>Prazo: ${prazo} meses</p>
        <p>Taxa de juros estimada: 1.5% ao mês</p>
        <p>Parcela estimada: R$ ${(valor / prazo * 1.015).toFixed(2)}</p>
    `;
}

function enviarFormularioContato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    // Lógica de envio de formulário aqui
    alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
    document.getElementById('contato-form').reset();
}
