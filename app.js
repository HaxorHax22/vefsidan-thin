// AOS (Animate on Scroll) Initialization
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
});

// Mobile Navigation (Hamburger Menu)
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const logo = document.querySelector(".logo");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.classList.toggle("nav-open");
    logo.classList.toggle("is-active"); // NÝTT: Bætir við klasa
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("nav-open");
        logo.classList.remove("is-active"); // NÝTT: Fjarlægir klasa
    });
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
