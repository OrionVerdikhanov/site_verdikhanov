// ===================================
// NAVIGATION & MOBILE MENU
// ===================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');

            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// BACK TO TOP BUTTON
// ===================================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    // Phone number formatting
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
            if (value[0] === '8' || value[0] === '7') {
                value = '7' + value.substring(1);
            }

            let formatted = '+7';
            if (value.length > 1) {
                formatted += ' (' + value.substring(1, 4);
            }
            if (value.length >= 5) {
                formatted += ') ' + value.substring(4, 7);
            }
            if (value.length >= 8) {
                formatted += '-' + value.substring(7, 9);
            }
            if (value.length >= 10) {
                formatted += '-' + value.substring(9, 11);
            }

            e.target.value = formatted;
        }
    });

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Basic validation
        if (!formData.name || !formData.phone || !formData.service) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        // Check agreement checkbox
        const agreement = document.getElementById('agreement');
        if (!agreement.checked) {
            alert('Необходимо согласие на обработку персональных данных');
            return;
        }

        // Here you would normally send the data to your backend
        // For now, we'll simulate a successful submission
        console.log('Form data:', formData);

        // Show success message
        contactForm.style.display = 'none';
        formSuccess.classList.add('active');

        // Optional: Send to email service, database, etc.
        // await sendToServer(formData);

        // Reset form after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.classList.remove('active');
        }, 5000);

        // Send notification to Telegram (if you have a bot)
        // sendToTelegram(formData);
    });
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service__card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe advantage cards
document.querySelectorAll('.advantage__card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ===================================
// ACTIVE NAVIGATION HIGHLIGHT
// ===================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = '#2563eb';
            } else {
                navLink.style.color = '';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Function to send data to Telegram Bot (optional)
async function sendToTelegram(data) {
    const botToken = 'YOUR_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';

    const message = `
🏠 Новая заявка с сайта!

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
📧 Email: ${data.email || 'Не указан'}
🏢 Услуга: ${data.service}
💬 Сообщение: ${data.message || 'Не указано'}
⏰ Время: ${new Date(data.timestamp).toLocaleString('ru-RU')}
    `;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send to Telegram');
        }

        console.log('Message sent to Telegram successfully');
    } catch (error) {
        console.error('Error sending to Telegram:', error);
    }
}

// Function to send data to backend server (optional)
async function sendToServer(data) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to send to server');
        }

        const result = await response.json();
        console.log('Server response:', result);
        return result;
    } catch (error) {
        console.error('Error sending to server:', error);
        throw error;
    }
}

// ===================================
// LOADING ANIMATION
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===================================
// PARALLAX EFFECT ON HERO
// ===================================

const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ===================================
// CONSOLE GREETING
// ===================================

console.log('%c🏠 Фейтулла Вердиханов - Агент по недвижимости', 'font-size: 20px; color: #2563eb; font-weight: bold;');
console.log('%cСпасибо за посещение моего сайта!', 'font-size: 14px; color: #6b7280;');
console.log('%cТелефон: +7 (999) 999-99-99', 'font-size: 12px; color: #f59e0b;');

// ===================================
// PREVENT CONSOLE ERRORS ON PRODUCTION
// ===================================

if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // Disable console in production (optional)
    // console.log = function() {};
    // console.error = function() {};
    // console.warn = function() {};
}
