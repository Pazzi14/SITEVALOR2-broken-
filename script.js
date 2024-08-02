document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.classList.toggle('active');
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    const loanSimulator = document.getElementById('loan-simulator');
    const simulationResult = document.getElementById('simulation-result');
    const monthlyPaymentElement = document.getElementById('monthly-payment');
    const totalPaymentElement = document.getElementById('total-payment');
    const interestRateElement = document.getElementById('interest-rate');

    if (loanSimulator) {
        loanSimulator.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const loanAmount = parseFloat(document.getElementById('loan-amount').value);
            const loanTerm = parseInt(document.getElementById('loan-term').value);
            
            // Taxa de juros mensal (exemplo: 1.5% ao mês)
            const monthlyInterestRate = 0.015;
            
            // Cálculo da parcela mensal
            const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) / (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
            
            // Cálculo do total a pagar
            const totalPayment = monthlyPayment * loanTerm;
            
            // Cálculo da taxa de juros anual
            const annualInterestRate = (Math.pow(1 + monthlyInterestRate, 12) - 1) * 100;
            
            // Exibição dos resultados
            monthlyPaymentElement.textContent = `R$ ${monthlyPayment.toFixed(2)}`;
            totalPaymentElement.textContent = `R$ ${totalPayment.toFixed(2)}`;
            interestRateElement.textContent = `${annualInterestRate.toFixed(2)}% ao ano`;
            
            simulationResult.classList.remove('hidden');
        });
    }
});
