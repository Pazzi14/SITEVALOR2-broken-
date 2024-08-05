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

    // Animação de fade-in para os elementos da página Sobre Nós
    const sections = document.querySelectorAll('.page-section');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        fadeInObserver.observe(section);
    });
});

function simularFinanciamento() {
    const valor = document.getElementById('valor').value;
    const prazo = document.getElementById('prazo').value;
    // Lógica de simulação aqui
    alert(`Simulação para R$ ${valor} em ${prazo} meses realizada com sucesso!`);
}

function enviarFormularioContato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    // Lógica de envio de formulário aqui
    alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
}

// Função para verificar se estamos na página Sobre Nós
function isAboutPage() {
    return window.location.pathname.includes('sobre-nos.html');
}

// Executar código específico da página Sobre Nós apenas se estivermos nela
if (isAboutPage()) {
    console.log('Página Sobre Nós carregada');
    // Adicione aqui qualquer código específico para a página Sobre Nós
}
