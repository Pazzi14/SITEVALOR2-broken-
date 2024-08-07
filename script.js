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
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;

        if (nome.trim() === '' || email.trim() === '' || mensagem.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        // Aqui você enviaria os dados para o servidor
        // Por enquanto, vamos apenas simular um envio bem-sucedido
        alert(`Obrigado pelo contato, ${nome}! Responderemos em breve para ${email}.`);
        contatoForm.reset();
    });

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav ul');

    navToggle.addEventListener('change', function() {
        if(this.checked) {
            nav.style.clipPath = 'circle(150% at top right)';
        } else {
            nav.style.clipPath = 'circle(0 at top right)';
        }
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.checked = false;
            nav.style.clipPath = 'circle(0 at top right)';
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Animate on Scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => animationObserver.observe(el));

    // Slide Navigation
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const slides = document.querySelectorAll('.slide');

    prevButton.addEventListener('click', () => {
        slideIndex--;
        if (slideIndex < 1) {
            slideIndex = slides.length;
        }
        updateSlides();
    });

    nextButton.addEventListener('click', () => {
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        updateSlides();
    });

    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === slideIndex - 1) {
                slide.style.opacity = "1";
            } else {
                slide.style.opacity = "0";
            }
        });
    }
});
