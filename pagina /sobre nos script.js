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
