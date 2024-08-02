document.addEventListener('DOMContentLoaded', function() {
    const simuladorForm = document.getElementById('simulador-form');
    const contatoForm = document.getElementById('contato-form');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotBody = document.getElementById('chatbot-body');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Inicializar AOS
    AOS.init();

    // Event Listeners
    simuladorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        simularFinanciamento();
    });

    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        enviarFormularioContato();
    });

    chatbotToggle.addEventListener('click', () => {
        chatbotBody.style.display = chatbotBody.style.display === 'none' ? 'block' : 'none';
        chatbotToggle.textContent = chatbotBody.style.display === 'none' ? '▼' : '▲';
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const userMessage = chatbotInput.value;
            addMessage('Você', userMessage);
            respondToUser(userMessage);
            chatbotInput.value = '';
        }
    });

    // Scroll suave
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
    const tipoFinanciamento = document.getElementById('tipo-financiamento').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    let taxaJuros;

    switch(tipoFinanciamento) {
        case 'pessoal':
            taxaJuros = 0.025; // 2.5% ao mês
            break;
        case 'veiculo':
            taxaJuros = 0.015; // 1.5% ao mês
            break;
        case 'imovel':
            taxaJuros = 0.008; // 0.8% ao mês
            break;
        default:
            alert('Por favor, selecione um tipo de financiamento.');
            return;
    }

    const parcela = (valor * taxaJuros * Math.pow(1 + taxaJuros, prazo)) / (Math.pow(1 + taxaJuros, prazo) - 1);
    const totalPagar = parcela * prazo;

    const resultadoDiv = document.getElementById('resultado-simulacao');
    resultadoDiv.innerHTML = `
        <h3>Resultado da Simulação</h3>
        <p>Tipo de Financiamento: ${tipoFinanciamento.charAt(0).toUpperCase() + tipoFinanciamento.slice(1)}</p>
        <p>Valor financiado: R$ ${valor.toFixed(2)}</p>
        <p>Prazo: ${prazo} meses</p>
        <p>Taxa de juros: ${(taxaJuros * 100).toFixed(2)}% ao mês</p>
        <p>Parcela mensal: R$ ${parcela.toFixed(2)}</p>
        <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
    `;
}

function enviarFormularioContato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    // Aqui você deve implementar o envio real do formulário para seu servidor
    // Por enquanto, vamos apenas simular um envio bem-sucedido

    alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
    document.getElementById('contato-form').reset();
}

function addMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function respondToUser(message) {
    const lowercaseMessage = message.toLowerCase();
    let response;

    if (lowercaseMessage.includes('olá') || lowercaseMessage.includes('oi')) {
        response = 'Olá! Como posso ajudar você hoje?';
    } else if (lowercaseMessage.includes('financiamento')) {
        response = 'Temos várias opções de financiamento. Você pode usar nosso simulador online ou falar com um de nossos consultores para mais informações.';
    } else if (lowercaseMessage.includes('contato')) {
        response = 'Você pode nos contatar pelo telefone (11) 3717-6415 ou pelo e-mail comercial@valorfinanciamentos.com.br.';
    } else if (lowercaseMessage.includes('endereço')) {
        response = 'Nosso endereço é Rua Augusta, 101. Você pode ver a localização no mapa em nossa página de contato.';
    } else if (lowercaseMessage.includes('taxa') || lowercaseMessage.includes('juros')) {
        response = 'Nossas taxas de juros variam de acordo com o tipo de financiamento e o perfil do cliente. Use nosso simulador online para ter uma estimativa ou entre em contato para uma avaliação personalizada.';
    } else if (lowercaseMessage.includes('prazo')) {
        response = 'Oferecemos prazos flexíveis que podem variar de 12 a 180 meses, dependendo do tipo de financiamento. Use nosso simulador para explorar diferentes opções de prazo.';
    } else {
        response = 'Desculpe, não entendi sua pergunta. Pode reformular ou perguntar sobre nossos serviços de financiamento, taxas, prazos ou formas de contato?';
    }

    setTimeout(() => {
        addMessage('Atendente', response);
    }, 500);
}
