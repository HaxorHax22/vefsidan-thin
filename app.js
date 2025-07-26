// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const logo = document.querySelector('.logo');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    logo.classList.toggle('is-active');
    body.classList.toggle('nav-open');
});

// Initialize Vanilla Tilt.js for pricing cards
document.addEventListener('DOMContentLoaded', (event) => {
    const tiltElements = document.querySelectorAll('.pricing-card.enhanced');
    if (tiltElements.length > 0) {
        VanillaTilt.init(tiltElements, {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            perspective: 1000,
            scale: 1.02
        });
    }
});


// MJÚK HREYFING FYRIR FAQ FLIPA
document.querySelectorAll('.faq-accordion details').forEach((detail) => {
    const summary = detail.querySelector('summary');
    const content = detail.querySelector('.faq-content');
    let isAnimating = false;

    summary.addEventListener('click', (event) => {
        event.preventDefault();
        if (isAnimating) return;

        if (detail.open) {
            isAnimating = true;
            const height = content.scrollHeight + 'px';
            content.style.maxHeight = height;

            requestAnimationFrame(() => {
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
            });

            setTimeout(() => {
                detail.removeAttribute('open');
                isAnimating = false;
            }, 400);

        } else {
            isAnimating = true;
            detail.setAttribute('open', '');
            const height = content.scrollHeight + 'px';
            content.style.maxHeight = height;
            content.style.opacity = '1';

            setTimeout(() => {
                isAnimating = false;
            }, 400);
        }
    });
});


// Premium Why-Us Section Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = window.innerWidth > 768 ? 8 : 4; // Fewer on mobile

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 12 + 's';
            particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Subtle mouse parallax effect (desktop only)
    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.professional-card');
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

            cards.forEach((card, index) => {
                const speed = (index + 1) * 0.3;
                const x = mouseX * speed;
                const y = mouseY * speed;
                
                card.style.transform += ` translate3d(${x}px, ${y}px, 0)`;
            });
        });
    }

    // Initialize particles
    createParticles();

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards for animations
    const cards = document.querySelectorAll('.professional-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});