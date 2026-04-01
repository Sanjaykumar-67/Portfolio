/**
 * ==================== PORTFOLIO JAVASCRIPT ====================
 * Sanjay Kumar S - AI & Full-Stack Developer Portfolio
 * 
 * Features:
 * - Typewriter animation
 * - Smooth scroll navigation
 * - Intersection Observer animations
 * - Navbar scroll effects
 * - Mobile menu toggle
 * - Active nav link highlighting
 * - Back to top button
 */

// ==================== DOM ELEMENTS ====================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinksContainer = document.getElementById('nav-links');
const backToTopBtn = document.getElementById('back-to-top');
const typewriterElement = document.getElementById('typewriter');

// ==================== TYPEWRITER ANIMATION ====================
class Typewriter {
    constructor(element, words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.words = words;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseTime = pauseTime;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            // Typing characters
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        // Determine typing speed
        let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        // Word completed
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typewriter with role titles
const typewriterWords = [
    'AI Developer',
    'Full-Stack Developer',
    'Data Science Enthusiast'
];

if (typewriterElement) {
    new Typewriter(typewriterElement, typewriterWords, 100, 50, 2000);
}

// ==================== NAVBAR SCROLL EFFECT ====================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ==================== MOBILE MENU TOGGLE ====================
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        
        // Toggle icon
        const icon = mobileMenuToggle.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ==================== ACTIVE NAV LINK HIGHLIGHTING ====================
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveNavLink);

// ==================== SMOOTH SCROLL FOR NAV LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== INTERSECTION OBSERVER - FADE IN ANIMATIONS ====================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    fadeInObserver.observe(element);
});

// ==================== BACK TO TOP BUTTON ====================
function handleBackToTopVisibility() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleBackToTopVisibility);

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== STAT CARDS ANIMATION - REMOVED ====================

// ==================== PROJECT CARDS HOVER EFFECT ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ==================== SKILL BADGES STAGGER ANIMATION ====================
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const badges = entry.target.querySelectorAll('.skill-badge');
            badges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.3 });

skillCards.forEach(card => {
    const badges = card.querySelectorAll('.skill-badge');
    badges.forEach(badge => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(10px)';
        badge.style.transition = 'all 0.3s ease';
    });
    skillObserver.observe(card);
});

// ==================== CERTIFICATE CARDS ANIMATION ====================
const certificateCards = document.querySelectorAll('.certificate-card');

const certObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        }
    });
}, { threshold: 0.2 });

certificateCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'all 0.5s ease';
    certObserver.observe(card);
});

// ==================== CERTIFICATE LIGHTBOX ====================
const certificateButtons = document.querySelectorAll('.cert-view-btn');
const certificateLightbox = document.getElementById('certificate-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');

function openCertificateLightbox(imagePath) {
    if (!certificateLightbox || !lightboxImage) return;
    lightboxImage.src = encodeURI(imagePath);
    certificateLightbox.classList.add('active');
    certificateLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeCertificateLightbox() {
    if (!certificateLightbox || !lightboxImage) return;
    certificateLightbox.classList.remove('active');
    certificateLightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    document.body.style.overflow = '';
}

certificateButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const imagePath = button.getAttribute('data-img');
        if (imagePath) {
            openCertificateLightbox(imagePath);
        }
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeCertificateLightbox);
}

if (certificateLightbox) {
    certificateLightbox.addEventListener('click', (event) => {
        if (event.target === certificateLightbox) {
            closeCertificateLightbox();
        }
    });
}

// ==================== CONTACT ICONS HOVER RIPPLE EFFECT ====================
const contactIcons = document.querySelectorAll('.contact-icon');

contactIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease';
    });
    
    icon.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// ==================== PARALLAX EFFECT FOR HERO ====================
const heroVisual = document.querySelector('.hero-visual');
const profileGlow = document.querySelector('.profile-glow');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    if (profileGlow && scrolled < window.innerHeight) {
        profileGlow.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0005})`;
    }
});

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});

// ==================== CONSOLE EASTER EGG ====================
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #8b5cf6;');
console.log('%c📧 Want to collaborate? Reach out to Sanjay!', 'font-size: 14px; color: #6e7681;');
console.log('%c🚀 Built with HTML, CSS & JavaScript', 'font-size: 12px; color: #6e7681;');

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }

    // Press 'Escape' to close certificate lightbox
    if (e.key === 'Escape' && certificateLightbox && certificateLightbox.classList.contains('active')) {
        closeCertificateLightbox();
    }
    
    // Press 'Home' to scroll to top
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ==================== PREFERS REDUCED MOTION ====================
// Respect user's preference for reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-medium', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
    
    // Make all fade-in elements visible immediately
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}
