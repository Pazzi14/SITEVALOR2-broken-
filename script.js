document.addEventListener('DOMContentLoaded', function() {
    // Slideshow
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("slide");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.opacity = "0";
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        slides[slideIndex-1].style.opacity = "1";
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }

    window.plusSlides = function(n) {
        showSlidesByIndex(slideIndex += n);
    }

    function showSlidesByIndex(n) {
        let i;
        let slides = document.getElementsByClassName("slide");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.opacity = "0";
        }
        slides[slideIndex-1].style.opacity = "1";
    }

    // Simulador de financiamento
    const simuladorForm = document.getElementById('simulador-form');
    simuladorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const valor = parseFloat(document.getElementById('valor').value);
        const prazo = parseInt(document.getElementById('prazo').value);
        const tipoFinanciamento = document.getElementById('tipo-financiamento').value;

        // Simulação simplificada (ajuste conforme necessário)
        let taxa;
        switch(tipoFinanciamento) {
            case 'pessoal':
                taxa = 0.02; // 2% ao mês
                break;
            case 'debito_conta':
                taxa = 0.018; // 1.8% ao mês
                break;
            case 'credluz':
                taxa = 0.015; // 1.5% ao mês
                break;
            case 'consignado_privado':
                taxa = 0.012; // 1.2% ao mês
                break;
            default:
                taxa = 0.02;
        }

        const parcela = (valor * taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
        const total = parcela * prazo;

        const resultadoDiv = document.getElementById('resultado-simulacao');
        resultadoDiv.innerHTML = `
            <h3>Resultado da Simulação</h3>
            <p>Valor financiado: R$ ${valor.toFixed(2)}</p>
            <p>Prazo: ${prazo} meses</p>
            <p>Parcela mensal: R$ ${parcela.toFixed(2)}</p>
            <p>Total a pagar: R$ ${total.toFixed(2)}</p>
        `;
        resultadoDiv.style.display = 'block';
    });

    // Formulário de contato
    const contatoForm = document.getElementById('contato-form');
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
