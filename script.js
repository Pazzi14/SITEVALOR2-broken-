document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const simuladorForm = document.getElementById('simulador-form');
    const contatoForm = document.getElementById('contato-form');
    const btnTopo = document.getElementById('btnTopo');

    // Menu toggle para dispositivos móveis
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Simulador de financiamento
    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            simularFinanciamento();
        });
    }

    // Formulário de contato
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validarFormulario()) {
                enviarFormularioContato();
            }
        });
    }

    // Botão voltar ao topo
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btnTopo.style.display = "block";
        } else {
            btnTopo.style.display = "none";
        }
    };

    btnTopo.onclick = function() {
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE e Opera
    };

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
    const valor = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const taxaJuros = 0.015; // 1.5% ao mês (exemplo)

    if (isNaN(valor) || isNaN(prazo) || valor < 1000 || prazo < 1 || prazo > 120) {
        mostrarAlerta('Por favor, insira valores válidos. O valor mínimo é R$ 1.000 e o prazo deve ser entre 1 e 120 meses.');
        return;
    }

    const parcela = (valor * taxaJuros * Math.pow(1 + taxaJuros, prazo)) / (Math.pow(1 + taxaJuros, prazo) - 1);
    const totalPagar = parcela * prazo;

    const resultadoDiv = document.getElementById('resultado-simulacao');
    resultadoDiv.innerHTML = `
        <h3>Resultado da Simulação</h3>
        <p>Valor financiado: R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p>Prazo: ${prazo} meses</p>
        document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const simuladorForm = document.getElementById('simulador-form');
    const contatoForm = document.getElementById('contato-form');
    const btnTopo = document.getElementById('btnTopo');

    // Menu toggle para dispositivos móveis
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Simulador de financiamento
    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            simularFinanciamento();
        });
    }

    // Formulário de contato
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validarFormulario()) {
                enviarFormularioContato();
            }
        });
    }

    // Botão voltar ao topo
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btnTopo.style.display = "block";
        } else {
            btnTopo.style.display = "none";
        }
    };

    btnTopo.onclick = function() {
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE e Opera
    };

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
    const valor = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const taxaJuros = 0.015; // 1.5% ao mês (exemplo)

    if (isNaN(valor) || isNaN(prazo) || valor < 1000 || prazo < 1 || prazo > 120) {
        mostrarAlerta('Por favor, insira valores válidos. O valor mínimo é R$ 1.000 e o prazo deve ser entre 1 e 120 meses.');
        return;
    }

    const parcela = (valor * taxaJuros * Math.pow(1 + taxaJuros, prazo)) / (Math.pow(1 + taxaJuros, prazo) - 1);
    const totalPagar = parcela * prazo;

    const resultadoDiv = document.getElementById('resultado-simulacao');
    resultadoDiv.innerHTML = `
        <h3>Resultado da Simulação</h3>
        <p>Valor financiado: R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p>Prazo: ${prazo} meses</p>
        <p>Parcela mensal: R$ ${parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p>Total a pagar: R$ ${totalPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    `;
    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
}

function validarFormulario() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (nome === '' || email === '' || mensagem === '') {
        mostrarAlerta('Por favor, preencha todos os campos do formulário.');
        return false;
    }

    if (!validarEmail(email)) {
        mostrarAlerta('Por favor, insira um endereço de e-mail válido.');
        return false;
    }

    return true;
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function enviarFormularioContato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    // Aqui você deve implementar o envio real do formulário para seu servidor
    // Por enquanto, vamos apenas simular um envio bem-sucedido
    mostrarAlerta(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`, 'sucesso');
    document.getElementById('contato-form').reset();
}

function mostrarAlerta(mensagem, tipo = 'erro') {
    const alertaDiv = document.createElement('div');
    alertaDiv.className = `alerta ${tipo}`;
    alertaDiv.textContent = mensagem;

    document.body.appendChild(alertaDiv);

    setTimeout(() => {
        alertaDiv.remove();
    }, 5000);
}

// Animações de entrada para os elementos
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.produto, .sobre, .contato');
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);
