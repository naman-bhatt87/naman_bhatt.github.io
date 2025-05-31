// Naman Bhatt Portfolio - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling Navigation
    const navigationLinks = document.querySelectorAll('a[href^="#"]');
    
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Blog Category Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (filterButtons.length > 0 && blogCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter blog cards
                blogCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                        // Add fade-in animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Newsletter Form Handling
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            
            if (emailInput && emailInput.value) {
                // Validate email
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailPattern.test(emailInput.value)) {
                    // Simulate form submission
                    const originalText = submitButton.textContent;
                    submitButton.textContent = 'Subscribing...';
                    submitButton.disabled = true;
                    
                    setTimeout(() => {
                        submitButton.textContent = 'Subscribed!';
                        submitButton.style.backgroundColor = '#10b981';
                        emailInput.value = '';
                        
                        setTimeout(() => {
                            submitButton.textContent = originalText;
                            submitButton.disabled = false;
                            submitButton.style.backgroundColor = '';
                        }, 2000);
                    }, 1000);
                } else {
                    // Show error for invalid email
                    emailInput.style.borderColor = '#ef4444';
                    emailInput.placeholder = 'Please enter a valid email';
                    
                    setTimeout(() => {
                        emailInput.style.borderColor = '';
                        emailInput.placeholder = 'Enter your email';
                    }, 3000);
                }
            }
        });
    }

    // Dashboard Card Interactions
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    dashboardCards.forEach(card => {
        const viewButton = card.querySelector('.btn');
        
        if (viewButton) {
            viewButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Simulate dashboard loading
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = 'Dashboard Loaded!';
                    this.style.backgroundColor = '#10b981';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.disabled = false;
                        this.style.backgroundColor = '';
                    }, 2000);
                }, 1000);
            });
        }
    });

    // Animate Chart Elements on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Animate chart bars
                if (element.classList.contains('chart-mockup')) {
                    const bars = element.querySelectorAll('.chart-bar');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.transition = 'height 0.8s ease';
                            bar.style.height = bar.style.height || '60%';
                        }, index * 200);
                    });
                }
                
                // Animate timeline items
                if (element.classList.contains('timeline-content')) {
                    element.style.opacity = '0';
                    element.style.transform = 'translateX(50px)';
                    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                    }, 100);
                }
                
                // Animate skill categories
                if (element.classList.contains('skill-category')) {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 200);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe elements for animations
    document.querySelectorAll('.chart-mockup, .timeline-content, .skill-category').forEach(el => {
        observer.observe(el);
    });

    // Active Navigation Link Highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Read More Button Interactions
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate blog post loading
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            
            setTimeout(() => {
                this.textContent = 'Article Loaded!';
                
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            }, 800);
        });
    });

    // Contact Link Interactions
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        // Add click tracking for analytics (simulated)
        link.addEventListener('click', function() {
            const linkType = this.href.includes('mailto') ? 'Email' : 'LinkedIn';
            console.log(`Contact link clicked: ${linkType}`);
            
            // Add subtle feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Enter key on filter buttons
        if (e.key === 'Enter' && e.target.classList.contains('filter-btn')) {
            e.target.click();
        }
    });

    // Add focus states for better accessibility
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #2b6cb0';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Performance optimization: Throttle scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            updateActiveNavLink();
        }, 10);
    });

    // Initialize page
    console.log('Naman Bhatt Portfolio initialized successfully');
    
    // Set initial active nav link
    updateActiveNavLink();
    
    // Add loading complete class to body for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Export functions for potential external use
window.PortfolioApp = {
    debounce,
    safeQuerySelector
};