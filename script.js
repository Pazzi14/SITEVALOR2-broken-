document.addEventListener('DOMContentLoaded', function() {
    const simuladorForm = document.getElementById('simulador-form');
    const contatoForm = document.getElementById('contato-form');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    simuladorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        simularFinanciamento();
    });

    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        enviarFormularioContato();
    });

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });
});

function simularFinanciamento() {
    const tipoFinanciamento = document.getElementById('tipo-financiamento').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const taxaJuros = obterTaxaJuros(tipoFinanciamento);

    if (isNaN(valor) || isNaN(prazo) || valor <= 0 || prazo <= 0) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    const parcela = (valor * taxaJuros * Math.pow(1 + taxaJuros, prazo)) / (Math.pow(1 + taxaJuros, prazo) - 1);
    const totalPagar = parcela * prazo;

    const resultadoDiv = document.getElementById('resultado-simulacao');
    resultadoDiv.innerHTML = `
        <h3>Resultado da Simulação</h3>
        <p>Tipo de Financiamento: ${tipoFinanciamento}</p>
        <p>Valor financiado: R$ ${valor.toFixed(2)}</p>
        <p>Prazo: ${prazo} meses</p>
        <p>Taxa de juros: ${(taxaJuros * 100).toFixed(2)}% ao mês</p>
        <p>Parcela mensal: R$ ${parcela.toFixed(2)}</p>
        <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
    `;
}

function obterTaxaJuros(tipoFinanciamento) {
    switch (tipoFinanciamento) {
        case 'imovel':
            return 0.008; // 0.8% ao mês
            case 'veiculo':
            return 0.012; // 1.2% ao mês
        case 'empresa':
            return 0.015; // 1.5% ao mês
        default:
            return 0.01; // 1% ao mês como padrão
    }
}

function enviarFormularioContato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    if (nome.trim() === '' || email.trim() === '' || mensagem.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Aqui você deve implementar o envio real do formulário para seu servidor
    // Por enquanto, vamos apenas simular um envio bem-sucedido

    alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
    document.getElementById('contato-form').reset();
}

// Função para scroll suave
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

const fadeInOptions = {
    threshold: 0.5
};

const fadeInObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
    });
}, fadeInOptions);

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Contador animado para as métricas
const metricas = document.querySelectorAll('.metrica h3');

const contadorAnimado = (elemento) => {
    const valor = parseInt(elemento.innerText);
    let contador = 0;
    const incremento = valor / 100;
    const duracao = 2000; // 2 segundos
    const intervalo = duracao / 100;

    const timer = setInterval(() => {
        contador += incremento;
        if (contador >= valor) {
            elemento.innerText = valor.toLocaleString();
            clearInterval(timer);
        } else {
            elemento.innerText = Math.floor(contador).toLocaleString();
        }
    }, intervalo);
};

const metricasObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            contadorAnimado(entry.target);
            metricasObserver.unobserve(entry.target);
        }
    });
});

metricas.forEach(metrica => {
    metricasObserver.observe(metrica);
});

// Validação de e-mail em tempo real
const emailInput = document.getElementById('email');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener('input', function() {
    if (emailRegex.test(this.value)) {
        this.style.borderColor = 'green';
    } else {
        this.style.borderColor = 'red';
    }
});

// Botão "Voltar ao topo"
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
scrollToTopBtn.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Adicionar estilos para o botão "Voltar ao topo"
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #0066cc;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        transition: opacity 0.3s, visibility 0.3s;
    }
    .scroll-to-top.show {
        display: block;
    }
`;
document.head.appendChild(style);

// Adicionar funcionalidade de busca
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Buscar...';
searchInput.classList.add('search-input');
document.querySelector('nav').appendChild(searchInput);

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const content = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');

    content.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            element.style.backgroundColor = 'yellow';
        } else {
            element.style.backgroundColor = '';
        }
    });
});

// Adicionar estilos para o campo de busca
const searchStyle = document.createElement('style');
searchStyle.textContent = `
    .search-input {
        padding: 5px 10px;
        margin-left: 20px;
        border-radius: 20px;
        border: none;
    }
`;
document.head.appendChild(searchStyle);
