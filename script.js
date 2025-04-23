// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const backToTopButton = document.querySelector('.back-to-top');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopButton.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            backToTopButton.classList.remove('active');
        }
        
        // Update active navigation link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration purposes, we'll just show a success message
            
            // Create success message
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Thank you for your message, ${name}!</h3>
                <p>I'll get back to you as soon as possible.</p>
                <button class="btn primary-btn send-new">Send Another Message</button>
            `;
            
            // Apply styles to success message
            successMessage.style.textAlign = 'center';
            successMessage.style.padding = '30px';
            successMessage.style.backgroundColor = '#f5f5f7';
            successMessage.style.borderRadius = '8px';
            successMessage.style.marginTop = '20px';
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Add event listener to "Send Another Message" button
            document.querySelector('.send-new').addEventListener('click', function() {
                contactForm.style.display = 'block';
                successMessage.remove();
            });
        });
    }

    // Project hover effects with animations
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Skill items hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            this.style.backgroundColor = '#ffffff';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.backgroundColor = '#f5f5f7';
        });
    });

    // Adding animation to timeline items when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });

    // Typing effect for the hero section
    const typingElement = document.querySelector('.hero-content h2');
    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    const typingSpeed = 100; // Adjust for faster or slower typing
    
    function typeWriter() {
        if (i < originalText.length) {
            typingElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start the typing effect after a short delay
    setTimeout(typeWriter, 1000);

    // Preloader (optional)
    window.addEventListener('load', function() {
        // If you want to add a preloader, you can create and remove it here
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="loader"></div>
        `;
        
        // Apply styles
        preloader.style.position = 'fixed';
        preloader.style.top = '0';
        preloader.style.left = '0';
        preloader.style.width = '100%';
        preloader.style.height = '100%';
        preloader.style.backgroundColor = '#ffffff';
        preloader.style.display = 'flex';
        preloader.style.justifyContent = 'center';
        preloader.style.alignItems = 'center';
        preloader.style.zIndex = '9999';
        
        document.body.appendChild(preloader);
        
        // Remove preloader after a short delay
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
});