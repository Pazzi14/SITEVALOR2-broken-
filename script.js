document.addEventListener('DOMContentLoaded', function() {
    const simuladorRapido = document.getElementById('simulador-rapido');
    const contatoForm = document.getElementById('contato-form');

    simuladorRapido.addEventListener('submit', function(e) {
        e.preventDefault();
        const valor = this.querySelector('input[type="number"]').value;
        const tipo = this.querySelector('select').value;
        simularFinanciamento(valor, tipo);
    });

    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        enviarFormularioContato();
    });    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

function simularFinanciamento(valor, tipo) {
    // Aqui você implementaria a lógica real de simulação
    // Por enquanto, vamos apenas exibir uma mensagem de alerta
    alert(`Simulação para ${tipo} no valor de R$ ${valor} realizada com sucesso! Um de nossos consultores entrará em contato em breve.`);
}

function enviarFormularioContato() {
    // Aqui você implementaria o envio real do formulário
    // Por enquanto, vamos apenas exibir uma mensagem de alerta
    alert('Mensagem enviada com sucesso! Retornaremos em breve.');
    document.getElementById('contato-form').reset();
}

// Adicione animações de rolagem, se desejar
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(elem => {
        if (isElementInViewport(elem)) {
            elem.classList.add('visible');
        }
    });
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Adicione aqui qualquer outra funcionalidade JavaScript que desejar
