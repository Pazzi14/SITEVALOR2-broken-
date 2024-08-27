document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Simulador de Financiamento
    const simuladorForm = document.getElementById('simulador-form');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const valor = parseFloat(document.getElementById('valor').value);
            const prazo = parseInt(document.getElementById('prazo').value);
            const tipoCredito = document.getElementById('tipo-credito').value;

            // Taxas de juros fictícias para cada tipo de crédito
            const taxas = {
                'pessoal': 0.025,
                'consignado': 0.015,
                'veiculo': 0.02,
                'imovel': 0.008
            };

            const taxa = taxas[tipoCredito];
            const parcela = calcularParcela(valor, taxa, prazo);

            resultadoSimulacao.innerHTML = `
                <h3>Resultado da Simulação</h3>
                <p>Valor financiado: R$ ${valor.toFixed(2)}</p>
                <p>Prazo: ${prazo} meses</p>
                <p>Taxa de juros mensal: ${(taxa * 100).toFixed(2)}%</p>
                <p>Valor da parcela: R$ ${parcela.toFixed(2)}</p>
            `;
        });
    }

    function calcularParcela(valor, taxa, prazo) {
        return (valor * taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
    }

    // Formulário de Contato
    const contatoForm = document.getElementById('contato-form');

    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const mensagem = document.getElementById('mensagem').value;

            // Aqui você pode adicionar a lógica para enviar os dados do formulário
            // Por exemplo, usando fetch para enviar uma requisição POST para seu servidor

            alert(`Obrigado pelo contato, ${nome}! Em breve entraremos em contato.`);
            contatoForm.reset();
        });
    }

    // Slider de Depoimentos
    const depoimentosSlider = document.querySelector('.depoimentos-slider');
    if (depoimentosSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        depoimentosSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - depoimentosSlider.offsetLeft;
            scrollLeft = depoimentosSlider.scrollLeft;
        });

        depoimentosSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });

        depoimentosSlider.addEventListener('mouseup', () => {
            isDown = false;
        });

        depoimentosSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - depoimentosSlider.offsetLeft;
            const walk = (x - startX) * 2;
            depoimentosSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // Animação de fade-in para elementos quando entram na viewport
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Validação de formulários
    function validateForm(form) {
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

        return isValid;
    }

    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }

    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
});
