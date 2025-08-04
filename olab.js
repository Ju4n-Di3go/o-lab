
// Enhanced progress bar with smooth animation
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Enhanced intersection observer for staggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate manifesto points
            if (entry.target.classList.contains('about')) {
                setTimeout(() => {
                    const points = entry.target.querySelectorAll('.manifesto-points li');
                    points.forEach((point, index) => {
                        setTimeout(() => {
                            point.classList.add('animate');
                        }, index * 200);
                    });
                }, 500);
            }

            // Animate stats with counting effect
            if (entry.target.classList.contains('stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }

            // Animate features lists
            const features = entry.target.querySelectorAll('.citiverse-features li, .benefit-list li');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(0)';
                    feature.style.opacity = '1';
                }, index * 150);
            });
        }
    });
}, observerOptions);

// Counter animation function
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 50);
}

// Observe all sections and elements
document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(section => {
    observer.observe(section);
});

// Enhanced smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            
            // Smooth scroll with custom easing
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            const duration = 800;
            let start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percent = Math.min(progress / duration, 1);
                
                // Easing function (ease-out cubic)
                const easeOut = 1 - Math.pow(1 - percent, 3);
                
                window.scrollTo(0, startPosition + (distance * easeOut));
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            
            window.requestAnimationFrame(step);
        }
    });
});

// Enhanced grid background interaction with parallax effect
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    const intensity = 0.015 + Math.abs(x * y) * 0.03;
    
    const gridBg = document.querySelector('.grid-bg');
    gridBg.style.opacity = intensity;
    gridBg.style.transform = `translate(${x * 2}px, ${y * 2}px) scale(${1 + Math.abs(x * y) * 0.02})`;
});

document.addEventListener('mouseleave', () => {
    const gridBg = document.querySelector('.grid-bg');
    gridBg.style.opacity = 0.015;
    gridBg.style.transform = 'translate(0px, 0px) scale(1)';
});

// Particle system for labs section
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(37, 99, 235, 0.3)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.animation = `floatUp ${3 + Math.random() * 4}s linear forwards`;
    
    document.querySelector('.labs').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 7000);
}

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically when labs section is visible
let particleInterval;
const labsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            particleInterval = setInterval(createParticle, 800);
        } else {
            clearInterval(particleInterval);
        }
    });
});

const labsSection = document.querySelector('.labs');
if (labsSection) {
    labsObserver.observe(labsSection);
}

// Add subtle hover animations to all clickable elements
document.querySelectorAll('.btn, .contact-item, .stat-item, .coming-item').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = this.style.transform.includes('translateY') ? 
            this.style.transform : 'translateY(-3px)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = this.style.transform.replace('translateY(-3px)', '');
    });
});

// Add typing effect to manifesto
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                const tagEnd = text.indexOf('>', i);
                element.innerHTML += text.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when manifesto comes into view
const manifestoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const manifesto = entry.target.querySelector('.manifesto');
            if (manifesto && !manifesto.classList.contains('typed')) {
                manifesto.classList.add('typed');
                const originalText = manifesto.innerHTML;
                typeWriter(manifesto, originalText, 30);
            }
        }
    });
});

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    manifestoObserver.observe(aboutSection);
}
