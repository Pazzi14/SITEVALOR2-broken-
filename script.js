// Importação de módulos
import { simularFinanciamento } from './modules/simulador.js';
import { validarFormulario } from './modules/validacao.js';
import { inicializarAnimacoes } from './modules/animacoes.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização de componentes
    inicializarMenu();
    inicializarSimulador();
    inicializarFormularioContato();
    inicializarFAQ();
    inicializarDepoimentos();
    inicializarBackToTop();
    inicializarAnimacoes();
});

function inicializarMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
            menuToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
        );
    });
}

function inicializarSimulador() {
    const simuladorForm = document.getElementById('simulador-form');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    if (simuladorForm) {
        simuladorForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const valor = parseFloat(document.getElementById('valor').value);
            const prazo = parseInt(document.getElementById('prazo').value);
            const tipo = document.getElementById('tipo-financiamento').value;

            try {
                const resultado = await simularFinanciamento(valor, prazo, tipo);
                exibirResultadoSimulacao(resultado);
            } catch (erro) {
                console.error('Erro ao simular financiamento:', erro);
                exibirMensagemErro('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
            }
        });
    }

    function exibirResultadoSimulacao(resultado) {
        resultadoSimulacao.innerHTML = `
            <h3>Resultado da Simulação</h3>
            <p>Valor financiado: R$ ${resultado.valorFinanciado.toFixed(2)}</p>
            <p>Prazo: ${resultado.prazo} meses</p>
            <p>Taxa de juros: ${resultado.taxaJuros.toFixed(2)}% ao mês</p>
            <p>Parcela mensal: R$ ${resultado.parcelaMensal.toFixed(2)}</p>
            <p>Total a pagar: R$ ${resultado.totalPagar.toFixed(2)}</p>
        `;
        resultadoSimulacao.classList.remove('hidden');
        resultadoSimulacao.scrollIntoView({ behavior: 'smooth' });
    }

    function exibirMensagemErro(mensagem) {
        resultadoSimulacao.innerHTML = `<p class="erro">${mensagem}</p>`;
        resultadoSimulacao.classList.remove('hidden');
    }
}

function inicializarFormularioContato() {
    const contatoForm = document.getElementById('contato-form');

    if (contatoForm) {
        contatoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (validarFormulario(contatoForm)) {
                try {
                    await enviarFormularioContato();
                    exibirMensagemSucesso('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    contatoForm.reset();
                } catch (erro) {
                    console.error('Erro ao enviar formulário:', erro);
                    exibirMensagemErro('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
                }
            }
        });
    }

    async function enviarFormularioContato() {
        // Simula o envio do formulário (substitua por uma chamada real à API)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    function exibirMensagemSucesso(mensagem) {
        alert(mensagem);
    }

    function exibirMensagemErro(mensagem) {
        alert(mensagem);
    }
}

function inicializarFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            question.setAttribute('aria-expanded', 
                question.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });
    });
}

function inicializarDepoimentos() {
    $('.depoimentos-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000
    });
}

function inicializarBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration.scope);
            })
            .catch(error => {
                console.log('Falha ao registrar o Service Worker:', error);
            });
    });
}

// Tratamento de erros global
window.addEventListener('error', function(event) {
    console.error('Erro capturado:', event.error);
    // Aqui você pode implementar o envio do erro para um serviço de monitoramento
});

// Detecção de conexão offline
window.addEventListener('offline', () => {
    alert('Você está offline. Algumas funcionalidades podem não estar disponíveis.');
});

window.addEventListener('online', () => {
    alert('Você está online novamente. Todas as funcionalidades estão disponíveis.');
});
