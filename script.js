document.addEventListener('DOMContentLoaded', function() {
    // Simulador rápido
    const simuladorForm = document.getElementById('simulador-rapido');
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

    // Botão Voltar ao Topo
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
});

function simularFinanciamento() {
    const valor = document.querySelector('#simulador-rapido input[type="number"]').value;
    const tipo = document.querySelector('#simulador-rapido select').value;

    // Aqui você pode implementar a lógica real de simulação
    // Por enquanto, vamos apenas exibir uma mensagem de exemplo
    alert(`Simulação para ${tipo} no valor de R$ ${valor} realizada com sucesso! Um de nossos consultores entrará em contato em breve.`);
}

function enviarFormularioContato() {
    const nome = document.querySelector('#contato-form input[type="text"]').value;
    const email = document.querySelector('#contato-form input[type="email"]').value;
    const telefone = document.querySelector('#contato-form input[type="tel"]').value;
    const mensagem = document.querySelector('#contato-form textarea').value;

    // Aqui você deve implementar o envio real do formulário para seu servidor
    // Por enquanto, vamos apenas simular um envio bem-sucedido
    alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
    document.getElementById('contato-form').reset();
}
