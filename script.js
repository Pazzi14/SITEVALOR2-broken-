// script.js - Scripts globais para o site da Valor Financiamentos

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização de funcionalidades globais
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initTooltips();
    initModalHandling();
});

// Função para inicializar o menu mobile
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        });

        // Fecha o menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mainNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Função para inicializar o scroll suave para links internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Função para inicializar a validação de formulários
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!validateForm(this)) {
                event.preventDefault();
            }
        });
    });
}

// Função auxiliar para validar formulários
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            showError(input, 'Este campo é obrigatório.');
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            isValid = false;
            showError(input, 'Por favor, insira um e-mail válido.');
        }
    });

    return isValid;
}

// Função auxiliar para mostrar erros de validação
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
    } else {
        const error = document.createElement('span');
        error.classList.add('error-message');
        error.textContent = message;
        input.parentNode.insertBefore(error, input.nextSibling);
    }
    input.classList.add('error');
}

// Função auxiliar para validar e-mail
function isValidEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
}

// Função para inicializar tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });
}

// Função auxiliar para mostrar tooltip
function showTooltip(event) {
    const tooltipText = event.target.getAttribute('data-tooltip');
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip');
    tooltipElement.textContent = tooltipText;
    document.body.appendChild(tooltipElement);

    const rect = event.target.getBoundingClientRect();
    tooltipElement.style.top = `${rect.bottom + window.scrollY + 5}px`;
    tooltipElement.style.left = `${rect.left + window.scrollX}px`;
}

// Função auxiliar para esconder tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Função para inicializar o tratamento de modais
function initModalHandling() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('[data-close-modal]');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modal = document.querySelector(trigger.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
}

// Função auxiliar para abrir modal
function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Função auxiliar para fechar modal
function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Função para formatar valores monetários
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// Função para formatar CPF
function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para formatar telefone
function formatPhone(phone) {
    phone = phone.replace(/\D/g, '');
    return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
}

// Função para fazer requisições AJAX
function ajaxRequest(url, method, data, successCallback, errorCallback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            successCallback(JSON.parse(xhr.responseText));
        } else {
            errorCallback(xhr.status);
        }
    };
    xhr.onerror = function() {
        errorCallback('Erro de rede');
    };
    xhr.send(JSON.stringify(data));
}
