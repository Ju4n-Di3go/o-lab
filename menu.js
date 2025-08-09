document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    // Store scroll position
    let scrollPosition = 0;
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        const isOpening = !this.classList.contains('active');
        
        if (isOpening) {
            // Store current scroll position
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
            // Restore scroll position after menu closes
            requestAnimationFrame(() => {
                window.scrollTo(0, scrollPosition);
            });
        }
        
        this.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Toggle aria-expanded for accessibility
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && window.innerWidth <= 992) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Update aria-expanded on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});
