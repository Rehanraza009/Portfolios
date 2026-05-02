// Back to Top Logic
const backToTop = document.getElementById('back-to-top');
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;
}

window.addEventListener('scroll', () => {
    // Show/hide button
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    // Update progress ring
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    setProgress(scrollPercent);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // Navbar ScrollSpy
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function scrollSpy() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);

    // Initial call to set active link on load
    scrollSpy();

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else {
        body.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    if (navbarCollapse && navbarToggler) {
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            navbarToggler.classList.add('collapsed');
        });

        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            navbarToggler.classList.remove('collapsed');
        });

        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });
    }

    const revealElements = document.querySelectorAll('.animate-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursorDot && cursorRing && !isTouchDevice) {
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            const speed = 0.15;
            dotX += (mouseX - dotX) * speed;
            dotY += (mouseY - dotY) * speed;
            ringX += (mouseX - ringX) * speed * 0.5;
            ringY += (mouseY - ringY) * speed * 0.5;

            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        document.querySelectorAll('a, button, .project-card, .tool-item, .contact-item, .nav-link').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.classList.add('hover');
                cursorDot.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('hover');
                cursorDot.classList.remove('hover');
            });
        });
    } else {
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorRing) cursorRing.style.display = 'none';
    }

    const projectModal = document.getElementById('project-modal');
    const closeButton = projectModal ? projectModal.querySelector('.modal-close') : null;
    const projectCards = document.querySelectorAll('.project-card');

    const projectsData = {
        1: {
            title: "Kisan Setu Android App",
            description: "A specialized Android application for farmers to connect with experts, access market prices, and manage agricultural resources. This is my final year project still in development, aimed at revolutionizing agricultural trade in India.",
            tech: "Android, Java, Firebase, Google Maps API",
            github: "https://github.com/rehanraza099/Kisan-Setu",
            live: "#",
            image: "assets/images/kisan_setu.jpg"
        },
        2: {
            title: "Stock Bazaar Pro",
            description: "Advanced stock market analysis tool with real-time market data, portfolio tracking, and predictive analytics dashboard. Features machine learning models for stock price prediction and risk assessment.",
            tech: "Python, Pandas, React, Machine Learning, REST API",
            github: "https://github.com/rehanraza099/Stock-Bazaar-Pro",
            live: "#",
            image: "assets/images/stock_bazaar.jpg"
        },
        3: {
            title: "Online Examination System",
            description: "Comprehensive exam management platform with automated grading, anti-cheating measures, and detailed analytics. Supports multiple question types, timed exams, and real-time monitoring.",
            tech: "Java, MySQL, HTML5, CSS3, JavaScript",
            github: "https://github.com/rehanraza099/Online-Examination-System",
            live: "#",
            image: "online examinarion.jpeg"
        },
        4: {
            title: "Hangman Game",
            description: "Classic text-based Hangman game with replay features and engaging user interaction built in Python. A simple yet fun console application.",
            tech: "Python, CLI",
            github: "https://github.com/rehanraza099/Hangman-Game",
            live: "#",
            image: "assets/images/hangman.jpg"
        },
        5: {
            title: "Scientific Calculator",
            description: "Web-based scientific calculator with a clean user interface supporting real-time expression evaluation. Implemented using basic web technologies.",
            tech: "HTML, CSS, JavaScript",
            github: "https://github.com/rehanraza099/Scientific-Calculator",
            live: "#",
            image: "calculator.jpeg"
        },
        6: {
            title: "IPO Web App & REST API",
            description: "Full-stack application for managing IPO data with a Django backend, REST API, and a responsive Bootstrap frontend. Allows users to track and analyze IPOs.",
            tech: "Django, REST API, Python, Bootstrap",
            github: "https://github.com/rehanraza099/IPO-Web-App",
            live: "#",
            image: "assets/images/ipo_web_app.jpg"
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', (event) => {
            const projectId = card.dataset.projectId;
            const project = projectsData[projectId];

            if (project) {
                document.getElementById('modal-project-title').textContent = project.title;
                document.getElementById('modal-project-description').textContent = project.description;
                document.getElementById('modal-project-tech').textContent = project.tech;
                document.getElementById('modal-project-github').href = project.github;
                document.getElementById('modal-project-live').href = project.live;
                const modalImage = document.getElementById('modal-project-image');
                if (modalImage) {
                    modalImage.src = project.image;
                }

                if (project.live === '#') {
                    document.getElementById('modal-project-live').style.display = 'none';
                } else {
                    document.getElementById('modal-project-live').style.display = 'inline-flex';
                }

                projectModal.classList.add('show');
            }
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            projectModal.classList.remove('show');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.classList.remove('show');
        }
    });

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            formStatus.textContent = 'Sending message...';
            formStatus.style.color = 'orange';

            await new Promise(resolve => setTimeout(resolve, 2000));

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Form submitted:', data);

            formStatus.textContent = 'Message sent successfully!';
            formStatus.style.color = 'var(--secondary)';
            contactForm.reset();
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }

    document.getElementById('current-year').textContent = new Date().getFullYear();

    const animateElements = document.querySelectorAll('.animate-reveal');
    if (animateElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const animateOnScroll = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(animateOnScroll, observerOptions);
        animateElements.forEach(el => observer.observe(el));
    }

    const typeTextElement = document.querySelector('.type-text');
    if (typeTextElement) {
        const words = JSON.parse(typeTextElement.dataset.words);
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;

        function type() {
            const currentWord = words[wordIndex];
            const displayChar = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
            typeTextElement.textContent = displayChar;

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                typingSpeed = 150;
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                typingSpeed = 80;
            } else if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 300;
            }

            setTimeout(type, typingSpeed);
        }

        const heroTextContent = document.querySelector('.hero-text-content');
        if (heroTextContent) {
            const heroObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    type();
                    heroObserver.unobserve(heroTextContent);
                }
            }, { threshold: 0.5 });
            heroObserver.observe(heroTextContent);
        } else {
            type();
        }
    }

    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.dataset.width;
                progress.style.width = width + '%';
                skillObserver.unobserve(progress);
            }
        });
    }, { threshold: 0.5 });

    skillProgressBars.forEach(bar => skillObserver.observe(bar));

    const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.dataset.count);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 30);
                statObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statObserver.observe(stat));
});