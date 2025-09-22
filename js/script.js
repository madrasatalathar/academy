// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    console.log('Navbar elements found:', {
        hamburger: !!hamburger,
        navMenu: !!navMenu,
        navLinks: navLinks.length
    });

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            console.log('Hamburger clicked');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    } else {
        console.error('Navbar elements not found:', {
            hamburger: !!hamburger,
            navMenu: !!navMenu
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (hamburger && navMenu && !hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background Change on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    }
});

// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to course cards
    const courseCards = document.querySelectorAll('.course-card');
    const bookCards = document.querySelectorAll('.book-card');
    courseCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add animation classes to features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.classList.add('animate-on-scroll');
        feature.style.animationDelay = `${index * 0.1}s`;
    });

    // Add animation classes to section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('animate-on-scroll');
    });
});

// Trigger scroll animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Contact Form Handling - FormSubmit handles submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const modal = document.getElementById('scholarModal');
    const modalClose = document.querySelector('.modal .close');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Let FormSubmit handle the submission
            // Just show a loading message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Reset button after 3 seconds (in case of error)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Simple modal controls (if present on course pages)
    const startLearningBtn = document.getElementById('startLearningBtn');
    if (startLearningBtn && modal) {
        startLearningBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }
    if (modal && modalClose) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
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

// Course Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        // Add hover effect for course cards
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect for course buttons
        const courseBtn = card.querySelector('.course-btn');
        if (courseBtn) {
            courseBtn.addEventListener('click', function(e) {
                const href = courseBtn.getAttribute('href');
                // Only show notification if the button does not navigate anywhere
                if (!href || href === '#') {
                    e.preventDefault();
                    const courseTitle = card.querySelector('h3').textContent;
                    showNotification(`More information about ${courseTitle} will be available soon!`, 'info');
                }
                // Otherwise allow normal navigation
            });
        }
    });

    // Handle book/course selection in levels
    bookCards.forEach(book => {
        book.addEventListener('click', function(e) {
            const href = book.getAttribute('href');
            if (!href || href === '#') {
                e.preventDefault();
                const title = book.querySelector('.book-title')?.textContent || 'this course';
                showNotification(`Details for ${title} will be added soon.`, 'info');
            }
        });
    });
});

// Parallax Effect for Hero Section - DISABLED
// window.addEventListener('scroll', function() {
//     const scrolled = window.pageYOffset;
//     const heroBackground = document.querySelector('.hero-bg-image');
//     
//     if (heroBackground) {
//         const rate = scrolled * -0.5;
//         heroBackground.style.transform = `translateY(${rate}px)`;
//     }
// });

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Loading Animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
    });
});

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Header background change
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    }
    
    // Parallax effect - DISABLED
    // const scrolled = window.pageYOffset;
    // const heroBackground = document.querySelector('.hero-bg-image');
    // if (heroBackground) {
    //     const rate = scrolled * -0.5;
    //     heroBackground.style.transform = `translateY(${rate}px)`;
    // }
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);
