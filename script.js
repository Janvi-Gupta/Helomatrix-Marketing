// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for anchor links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Table of Contents: active state tracking
const tocLinks = document.querySelectorAll('.toc-link');
const sections = [];

tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    const section = document.querySelector(href);
    if (section) sections.push({ link, section });
});

function updateTOC() {
    const scrollPos = window.scrollY + 120;

    let current = sections[0];
    for (const item of sections) {
        if (item.section.offsetTop <= scrollPos) {
            current = item;
        }
    }

    tocLinks.forEach(link => link.classList.remove('active'));
    if (current) {
        current.link.classList.add('active');
    }
}

window.addEventListener('scroll', updateTOC);
window.addEventListener('load', updateTOC);

// Scroll animations with IntersectionObserver
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate blog sections, cards, and illustrations on scroll
document.querySelectorAll(
    '.blog-section, .example-card, .challenge-item, .ft-item, .tool-group, .stat-inline, .related-card'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Copy link button
document.querySelectorAll('.share-btn[aria-label="Copy link"]').forEach(btn => {
    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const original = btn.innerHTML;
            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
            btn.style.borderColor = '#059669';
            btn.style.color = '#059669';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 2000);
        });
    });
});
