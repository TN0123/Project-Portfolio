// Scroll-triggered fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    // Fade in project cards, experience rows, skill groups, and other project rows
    const elements = document.querySelectorAll(
        '.project-card, .experience-row, .skill-group, .other-project-row'
    );

    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});
