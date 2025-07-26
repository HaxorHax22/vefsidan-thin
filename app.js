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

document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize Vanilla Tilt.js for pricing cards and portfolio logos
    const tiltElements = document.querySelectorAll('.pricing-card.enhanced, .portfolio-logo-item');
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

    // Gegnsær haus á forsíðu sem verður sýnilegur við skrun
    const header = document.querySelector('header');
    const contactSection = document.querySelector('#contact'); // Ná í "Hefjum Samtal" hlutann
    const isTransparentOnLoad = document.body.classList.contains('header-transparent-on-load');

    if (isTransparentOnLoad && header) {
        const scrollOffset = 50; // Hversu langt þarf að skruna áður en hausinn birtist

        const handleScroll = () => {
            const contactRect = contactSection ? contactSection.getBoundingClientRect() : null;
            const headerHeight = header.offsetHeight;

            // Sjálfgefin hegðun: hausinn verður ógegnsær eftir smá skrun
            let isScrolled = window.scrollY > scrollOffset;

            // Einfölduð undantekning: Ef komið er að "Hefjum samtal" hlutanum, verður hausinn gegnsær
            if (contactRect && contactRect.top <= headerHeight) {
                isScrolled = false;
            }

            if (isScrolled) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Keyra í byrjun til að stilla rétt ástand
    }
    
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

    // A more performant mouse parallax effect (desktop only)
    if (window.innerWidth > 992) {
        const professionalSection = document.querySelector('.why-us-section');
        if (professionalSection) {
            let mouseX = 0;
            let mouseY = 0;
            let isTicking = false;

            const update = () => {
                const cards = professionalSection.querySelectorAll('.professional-card');
                const x = (mouseX / window.innerWidth - 0.5) * 2;
                const y = (mouseY / window.innerHeight - 0.5) * 2;

                cards.forEach((card, index) => {
                    const speed = (index + 1) * 2;
                    const xOffset = x * speed;
                    const yOffset = y * speed;
                    card.style.setProperty('--x', `${xOffset}px`);
                    card.style.setProperty('--y', `${yOffset}px`);
                });
                isTicking = false;
            };

            const requestTick = () => {
                if (!isTicking) {
                    requestAnimationFrame(update);
                    isTicking = true;
                }
            };
            
            professionalSection.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                requestTick();
            });
        }
    }

    // Initialize particles
    createParticles();
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