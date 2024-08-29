// Função para validar formulários
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(event) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (!isValid) {
            event.preventDefault();
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
}

// Função para simular empréstimo
function simulateLoans() {
    const form = document.getElementById('simulacao-form');
    const resultDiv = document.getElementById('resultado-simulacao');

    if (!form || !resultDiv) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const valor = parseFloat(document.getElementById('valor').value);
        const prazo = parseInt(document.getElementById('prazo').value);
        const produto = document.getElementById('produto').value;

        // Lógica simplificada de simulação (ajuste conforme necessário)
        let taxa;
        switch(produto) {
            case 'credito-pessoal':
                taxa = 0.0299; // 2.99% ao mês
                break;
            case 'consignado-privado':
                taxa = 0.0199; // 1.99% ao mês
                break;
            case 'consignado-publico':
                taxa = 0.0129; // 1.29% ao mês
                break;
            case 'fgts':
                taxa = 0.0149; // 1.49% ao mês
                break;
            default:
                taxa = 0.0299;
        }

        const parcela = (valor * (taxa * Math.pow(1 + taxa, prazo))) / (Math.pow(1 + taxa, prazo) - 1);
        const total = parcela * prazo;

        resultDiv.innerHTML = `
            <h3>Resultado da Simulação</h3>
            <p>Valor solicitado: R$ ${valor.toFixed(2)}</p>
            <p>Prazo: ${prazo} meses</p>
            <p>Valor da parcela: R$ ${parcela.toFixed(2)}</p>
            <p>Total a pagar: R$ ${total.toFixed(2)}</p>
            <button onclick="solicitarEmprestimo()">Solicitar Empréstimo</button>
        `;
        resultDiv.style.display = 'block';
    });
}

// Função para solicitar empréstimo
function solicitarEmprestimo() {
    // Implemente a lógica para iniciar o processo de solicitação de empréstimo
    alert('Obrigado pelo seu interesse! Um de nossos consultores entrará em contato em breve.');
}

// Função para inicializar o carrossel de depoimentos
function initTestimonialCarousel() {
    const carousel = document.querySelector('.depoimentos-carousel');
    if (!carousel) return;

    // Implemente a lógica do carrossel aqui
    // Exemplo: usar uma biblioteca como Slick ou criar um carrossel personalizado
}

// Função para manipular o menu mobile
function handleMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Inicialização de funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    validateForm('simulacao-form');
    validateForm('contato-form');
    simulateLoans();
    initTestimonialCarousel();
    handleMobileMenu();
});

// Função para scroll suave
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Chamada da função de scroll suave
smoothScroll();
