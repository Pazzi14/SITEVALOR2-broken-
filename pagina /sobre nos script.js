document.addEventListener('DOMContentLoaded', function() {
    // Código existente...

    // Adicionar animação de fade-in para os elementos da página Sobre Nós
    const sections = document.querySelectorAll('.page-section, #nossa-missao, #nossos-valores, #nossa-historia');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        fadeInObserver.observe(section);
    });
});

// Adicione esta classe ao seu CSS
.fade-in {
    animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
