// Naman Bhatt Portfolio - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for ALL navigation links (including hero section)
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)';
            }
        }
    }

    // Scroll event listener
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
        handleScrollAnimations();
    });

    // Fade-in animations
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in');
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Add fade-in class to elements that should animate
    function initializeAnimations() {
        const elementsToAnimate = [
            '.achievement-item',
            '.timeline-item',
            '.skill-category',
            '.education-item',
            '.cert-item'
        ];

        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add('fade-in');
                // Add staggered delay for multiple elements
                element.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic form validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                showNotification('Thank you for your message! I will get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-family: var(--font-family-base);
            font-size: 14px;
            display: flex;
            align-items: center;
        `;

        // Set notification colors based on type
        switch (type) {
            case 'success':
                notification.style.background = '#10b981';
                notification.style.color = 'white';
                break;
            case 'error':
                notification.style.background = '#ef4444';
                notification.style.color = 'white';
                break;
            default:
                notification.style.background = '#3b82f6';
                notification.style.color = 'white';
        }

        // Add to document
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            margin-left: 12px;
            line-height: 1;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Handle footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('mailto:')) {
            link.addEventListener('click', function(e) {
                // Email links should work normally
                showNotification('Opening email client...', 'info');
            });
        } else if (href && href.includes('linkedin.com')) {
            link.addEventListener('click', function(e) {
                // LinkedIn links should work normally
                showNotification('Opening LinkedIn profile...', 'info');
            });
        }
    });

    // Smooth scroll to top functionality (if needed)
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Initialize everything
    initializeAnimations();
    updateActiveNavLink();
    updateNavbarBackground();
    handleScrollAnimations();

    // Handle resume/CV download (placeholder functionality)
    function handleResumeDownload() {
        showNotification('Resume download functionality would be implemented here.', 'info');
    }

    // Add click handlers for any download buttons if they exist
    const downloadButtons = document.querySelectorAll('[href*="download"], [href*="cv"], [href*="resume"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleResumeDownload();
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
    });

    // Performance optimization: Throttle scroll events
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            updateActiveNavLink();
            updateNavbarBackground();
            handleScrollAnimations();
        }, 10);
    });

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            handleScrollAnimations();
        }, 500);
    });

    // Console message for developers
    console.log('🚀 Naman Bhatt Portfolio - Loaded Successfully');
    console.log('💼 Enterprise Architect & MLOps Leader with 17+ Years Experience');
    console.log('📧 Contact: nmnbhatt@gmail.com');
    console.log('✅ Mobile number has been completely removed from all contact sections');
});