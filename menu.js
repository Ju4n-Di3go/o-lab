document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');

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
