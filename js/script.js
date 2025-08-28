// Nepal Institute of Technology - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initNavigation();
    initCounters();
    initModals();
    initAccordion();
    initTabs();
    initForms();
    initSliders();
    initScrollEffects();
    initCalendar();
    initForums();
});

// Particle Animation System
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    // Recreate particles periodically
    setInterval(() => {
        if (particlesContainer.children.length < particleCount) {
            createParticle(particlesContainer);
        }
    }, 200);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 6000);
}

// Navigation System
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Header background on scroll
    window.addEventListener('scroll', throttle(() => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(5, 5, 5, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }, 16));
    
    // Active nav link highlighting
    highlightActiveNavLink();
}

function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// js/script.js

// --- FIND AND REPLACE THIS ENTIRE FUNCTION ---
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal .close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                // MODIFICATION: Instead of style.display, add a class
                modal.classList.add('active'); 
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            closeModal(modal);
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

function closeModal(modal) {
    modal.classList.remove('active'); 
    document.body.style.overflow = 'auto';
}

// Accordion System
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordion = header.parentElement;
            const content = accordion.querySelector('.accordion-content');
            const isActive = content.classList.contains('active');  
            const group = header.closest('.accordion-group');
            if (group) {
                group.querySelectorAll('.accordion-content').forEach(otherContent => {
                    if (otherContent !== content) {
                        otherContent.classList.remove('active');
                        otherContent.previousElementSibling.querySelector('.accordion-icon').textContent = '+';
                    }
                });
            }
            
            content.classList.toggle('active');
            const icon = header.querySelector('.accordion-icon') || createAccordionIcon(header);
            icon.textContent = isActive ? '+' : '−';
        });
    });
}

function createAccordionIcon(header) {
    const icon = document.createElement('span');
    icon.className = 'accordion-icon';
    icon.textContent = '+';
    header.appendChild(icon);
    return icon;
}

// Tab System
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabGroup = button.closest('.tabs');
            const targetId = button.getAttribute('data-tab');
            
            tabGroup.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            tabGroup.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            const targetContent = tabGroup.querySelector(`#${targetId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Initialize first tab as active
    const tabGroups = document.querySelectorAll('.tabs');
    tabGroups.forEach(group => {
        const firstButton = group.querySelector('.tab-button');
        const firstContent = group.querySelector('.tab-content');
        if (firstButton && firstContent) {
            firstButton.classList.add('active');
            firstContent.classList.add('active');
        }
    });
}

// Form Validation and Handling
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const isValid = validateForm(form);
    
    if (isValid) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Form submitted successfully!', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Close modal if form is in a modal
            const modal = form.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        }, 2000);
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Required field check
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    // Email validation
    else if (type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    // Phone validation
    else if (type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }
    // Minimum length check
    else if (field.hasAttribute('minlength') && value.length < parseInt(field.getAttribute('minlength'))) {
        isValid = false;
        errorMessage = `Minimum ${field.getAttribute('minlength')} characters required`;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ff1493';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ff1493';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = 'rgba(0, 255, 255, 0.3)';
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Image Slider System
function initSliders() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        const indicators = slider.querySelectorAll('.indicator');
        
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });
        
        // Auto-play slider
        if (slider.hasAttribute('data-autoplay')) {
            setInterval(nextSlide, parseInt(slider.getAttribute('data-autoplay')) || 5000);
        }
        
        // Initialize first slide
        showSlide(0);
    });
}

// Scroll Effects
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Scroll animations
    const animatedElements = document.querySelectorAll('[data-animate]');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-animate');
                entry.target.classList.add('animate-' + animationType);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => scrollObserver.observe(el));
}

// Calendar System
function initCalendar() {
    const calendar = document.querySelector('.calendar');
    if (!calendar) return;
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    renderCalendar(calendar, currentYear, currentMonth);
    
    // Navigation buttons
    const prevBtn = calendar.querySelector('.calendar-prev');
    const nextBtn = calendar.querySelector('.calendar-next');
    
    if (prevBtn && nextBtn) {
        let displayMonth = currentMonth;
        let displayYear = currentYear;
        
        prevBtn.addEventListener('click', () => {
            displayMonth--;
            if (displayMonth < 0) {
                displayMonth = 11;
                displayYear--;
            }
            renderCalendar(calendar, displayYear, displayMonth);
        });
        
        nextBtn.addEventListener('click', () => {
            displayMonth++;
            if (displayMonth > 11) {
                displayMonth = 0;
                displayYear++;
            }
            renderCalendar(calendar, displayYear, displayMonth);
        });
    }
}

function renderCalendar(calendar, year, month) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Sample events data
    const events = {
        [`${year}-${month + 1}-15`]: 'Tech Conference',
        [`${year}-${month + 1}-22`]: 'MBA Workshop',
        [`${year}-${month + 1}-28`]: 'Programming Contest'
    };
    
    // Update header
    const header = calendar.querySelector('.calendar-header h3');
    if (header) {
        header.textContent = `${monthNames[month]} ${year}`;
    }
    
    // Clear and rebuild calendar grid
    let grid = calendar.querySelector('.calendar-grid');
    if (grid) {
        grid.innerHTML = '';
    } else {
        grid = document.createElement('div');
        grid.className = 'calendar-grid';
        calendar.appendChild(grid);
    }
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.color = 'var(--primary-cyan)';
        grid.appendChild(dayHeader);
    });
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        grid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        const dateKey = `${year}-${month + 1}-${day}`;
        if (events[dateKey]) {
            dayElement.classList.add('has-event');
            dayElement.title = events[dateKey];
        }
        
        // Highlight today
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayElement.classList.add('today');
            dayElement.style.background = 'var(--primary-cyan)';
            dayElement.style.color = 'var(--dark-bg)';
        }
        
        grid.appendChild(dayElement);
    }
}

// Forum System
function initForums() {
    const forumSections = document.querySelectorAll('.forum-section');
    const postButtons = document.querySelectorAll('.post-reply-btn');
    const threadToggles = document.querySelectorAll('.thread-toggle');
    
    // Toggle forum sections
    forumSections.forEach(section => {
        const header = section.querySelector('.forum-header');
        const content = section.querySelector('.forum-content');
        
        if (header && content) {
            header.addEventListener('click', () => {
                content.classList.toggle('active');
                const icon = header.querySelector('.toggle-icon');
                if (icon) {
                    icon.textContent = content.classList.contains('active') ? '−' : '+';
                }
            });
        }
    });
    
    // Handle reply buttons
    postButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const replyForm = button.nextElementSibling;
            if (replyForm && replyForm.classList.contains('reply-form')) {
                replyForm.classList.toggle('active');
            }
        });
    });
    
    // Handle thread toggles
    threadToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const thread = toggle.closest('.forum-thread');
            const replies = thread.querySelector('.thread-replies');
            if (replies) {
                replies.classList.toggle('active');
                toggle.textContent = replies.classList.contains('active') ? '▼' : '▶';
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 10px;
        background: var(--card-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--primary-cyan);
        border-radius: 10px;
        padding: 1rem 1.5rem;
        color: var(--text-light);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        box-shadow: var(--box-shadow-hover);
    `;
    
    // Type-specific styling
    if (type === 'success') {
        notification.style.borderColor = 'var(--neon-green)';
    } else if (type === 'error') {
        notification.style.borderColor = '#ff1493';
    }
    
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove
    if (duration > 0) {
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
    }
}

function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Search Functionality
function initSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    const searchButtons = document.querySelectorAll('.search-btn');
    
    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(input.value);
            }
        });
    });
    
    searchButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const input = button.parentElement.querySelector('.search-input');
            if (input) {
                performSearch(input.value);
            }
        });
    });
}

function performSearch(query) {
    if (!query.trim()) return;
    
    // Simulate search
    showNotification(`Searching for: "${query}"`, 'info');
    
    // Here you would typically make an API call
    // For demo purposes, we'll just show a mock result
    setTimeout(() => {
        showNotification(`Found 5 results for "${query}"`, 'success');
    }, 1500);
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

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

// Interactive Elements
function addInteractiveEffects() {
    // Floating shapes that follow mouse
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = mouseX * speed * 20;
            const y = mouseY * speed * 20;
            const rotation = Date.now() * 0.001 * (index + 1);
            
            shape.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}rad)`;
        });
    });
    
    // Card hover effects
    document.querySelectorAll('.card, .program-card, .profile-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button ripple effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            `;
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Initialize interactive effects after DOM is loaded
document.addEventListener('DOMContentLoaded', addInteractiveEffects);

// Page-specific initializations
function initPageSpecific() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            initHomepage();
            break;
        case 'events.html':
            initEventsPage();
            break;
        case 'forums.html':
            initForumsPage();
            break;
        case 'contact.html':
            initContactPage();
            break;
    }
}

function initHomepage() {
    // Hero typing effect
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        typeWriter(heroTitle, text, 100);
    }
}

function initEventsPage() {
    // Event filtering
    const filterButtons = document.querySelectorAll('.event-filter');
    const eventCards = document.querySelectorAll('.event-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            eventCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initForumsPage() {
    // Forum post sorting
    const sortSelect = document.querySelector('#forum-sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortBy = e.target.value;
            sortForumPosts(sortBy);
        });
    }
}

// ✅ NEW & CORRECTED JAVASCRIPT
function initContactPage() {
    // This function now correctly targets ONLY the placeholder div.
    // We can leave this function empty for now, as the placeholder
    // is already present in the HTML.
    // This is where you would add the actual Google Maps API code later.
    
    const mapPlaceholder = document.querySelector('#map-placeholder');
    if (mapPlaceholder) {
        console.log('Contact page map placeholder is ready for integration.');
    }
}

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function sortForumPosts(sortBy) {
    // Implementation for sorting forum posts
    console.log('Sorting forum posts by:', sortBy);
    // This would typically involve reordering DOM elements or making an API call
}

// CSS animations for notifications
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Add notification styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', initPageSpecific);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
}