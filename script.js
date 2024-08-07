document.addEventListener('DOMContentLoaded', function() {
    // Simulador de financiamento
    const simuladorForm = document.getElementById('simulador-form');
    const resultadoSimulacao = document.getElementById('resultado-simulacao');

    simuladorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const tipo = document.getElementById('tipo-financiamento').value;
        const valor = parseFloat(document.getElementById('valor').value);
        const prazo = parseInt(document.getElementById('prazo').value);

        let taxa;
        switch(tipo) {
            case 'pessoal':
                taxa = 0.025; // 2.5% ao mês
                break;
            case 'debito_conta':
                taxa = 0.02; // 2% ao mês
                break;
            case 'credluz':
                taxa = 0.018; // 1.8% ao mês
                break;
            case 'consignado_privado':
                taxa = 0.015; // 1.5% ao mês
                break;
            case 'consignado_publico':
                taxa = 0.012; // 1.2% ao mês
                break;
            default:
                taxa = 0.02; // 2% ao mês como padrão
        }

        const parcela = (valor * taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
        const totalPagar = parcela * prazo;

        resultadoSimulacao.innerHTML = `
            <h3>Resultado da Simulação</h3>
            <p>Tipo de crédito: ${document.getElementById('tipo-financiamento').options[document.getElementById('tipo-financiamento').selectedIndex].text}</p>
            <p>Valor solicitado: R$ ${valor.toFixed(2)}</p>
            <p>Prazo: ${prazo} meses</p>
            <p>Taxa de juros: ${(taxa * 100).toFixed(2)}% ao mês</p>
            <p>Parcela mensal estimada: R$ ${parcela.toFixed(2)}</p>
            <p>Total a pagar: R$ ${totalPagar.toFixed(2)}</p>
            <p class="disclaimer">* Esta simulação é apenas uma estimativa. Para uma cotação precisa, entre em contato conosco.</p>
        `;
    });

    // Slider de depoimentos
    let currentSlide = 0;
    const slides = document.querySelectorAll('.depoimento');
    const dots = document.querySelector('.depoimentos-dots');

    // Criar os pontos de navegação
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(index));
        dots.appendChild(dot);
    });

    const allDots = document.querySelectorAll('.dot');

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        allDots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        allDots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Iniciar o slider
    goToSlide(0);

    // Mudar slide a cada 5 segundos
    setInterval(nextSlide, 5000);

    // Funcionalidade do botão de denúncia
    document.querySelector('.btn-denuncia').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Você será redirecionado para o nosso canal seguro de denúncias. Todas as informações serão tratadas com sigilo.');
        // Aqui você pode adicionar o redirecionamento para o canal de denúncias real
    });

    // Animação para os cards de Missão, Visão e Valores
    const mvvCards = document.querySelectorAll('.mvv-card');

    mvvCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
