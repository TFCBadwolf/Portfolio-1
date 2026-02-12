/* ========================================
   ULTIMATE PORTFOLIO - COMPLETE JAVASCRIPT
   ========================================
   
   Features:
   - Preloader
   - Custom Cursor
   - Navigation
   - Three.js 3D Background
   - Particle System
   - Typing Effect
   - GSAP Animations
   - Parallax Effects
   - Stats Counter
   - Skills Section
   - Projects Filter
   - Experience Timeline
   - Testimonials Slider
   - Contact Form
   - AI Chatbot (Full Implementation)
   - Music Toggle
   - Back to Top
   - Utilities
   
======================================== */

// ==========================================
// INITIALIZATION - Wait for DOM to load
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Preloader.init();
    CustomCursor.init();
    Navigation.init();
    HeroCanvas.init();
    ParticleSystem.init();
    TypingEffect.init();
    GSAPAnimations.init();
    ParallaxEffects.init();
    StatsCounter.init();
    SkillsSection.init();
    ProjectsFilter.init();
    ExperienceTimeline.init();
    TestimonialsSlider.init();
    ContactForm.init();
    AIChatbot.init();
    MusicPlayer.init();
    ThemeToggle.init(); // Added ThemeToggle init
    BackToTop.init();
    Utilities.init();
});

// ==========================================
// 1. PRELOADER MODULE
// ==========================================
const Preloader = {
    init() {
        const preloader = document.getElementById('preloader');
        const progressBar = document.querySelector('.loader-progress');

        if (!preloader) return;

        let progress = 0;

        // Animate progress bar
        const progressInterval = setInterval(() => {
            progress += Math.random() * 25;

            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);

                // Hide preloader
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    document.body.style.overflow = 'auto';

                    // Trigger entrance animations
                    this.triggerEntranceAnimations();
                }, 500);
            }

            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
        }, 150);

        // Fallback - force hide after 5 seconds
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 5000);
    },

    triggerEntranceAnimations() {
        const heroElements = document.querySelectorAll('.hero-content [data-animate]');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
};

// ==========================================
// 2. CUSTOM CURSOR MODULE
// ==========================================
const CustomCursor = {
    cursor: null,
    follower: null,
    mouseX: 0,
    mouseY: 0,
    followerX: 0,
    followerY: 0,

    init() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');

        if (!this.cursor || !this.follower) return;

        // Check for touch devices
        if (this.isTouchDevice()) {
            this.cursor.style.display = 'none';
            this.follower.style.display = 'none';
            return;
        }

        this.bindEvents();
        this.animate();
    },

    isTouchDevice() {
        return ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0);
    },

    bindEvents() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            // Update cursor immediately
            this.cursor.style.left = `${this.mouseX}px`;
            this.cursor.style.top = `${this.mouseY}px`;
        });

        // Interactive elements hover effect
        const interactiveElements = document.querySelectorAll(
            'a, button, input, textarea, select, .project-card, .skill-card, .service-card, .nav-link'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('active');
                this.follower.classList.add('active');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('active');
                this.follower.classList.remove('active');
            });
        });

        // Hide when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
            this.follower.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
            this.follower.style.opacity = '0.5';
        });
    },

    animate() {
        // Smooth follower animation
        this.followerX += (this.mouseX - this.followerX) * 0.12;
        this.followerY += (this.mouseY - this.followerY) * 0.12;

        this.follower.style.left = `${this.followerX}px`;
        this.follower.style.top = `${this.followerY}px`;

        requestAnimationFrame(() => this.animate());
    }
};

// ==========================================
// 3. NAVIGATION MODULE
// ==========================================
const Navigation = {
    navbar: null,
    menuToggle: null,
    mobileNav: null,
    navLinks: null,
    sections: null,
    lastScrollY: 0,

    init() {
        this.navbar = document.getElementById('navbar');
        this.menuToggle = document.getElementById('menu-toggle');
        this.mobileNav = document.querySelector('.mobile-nav');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        this.sections = document.querySelectorAll('section[id]');

        if (!this.navbar) return;

        this.bindEvents();
        this.updateActiveLink();
    },

    bindEvents() {
        // Scroll effect for navbar
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateActiveLink();
        });

        // Mobile menu toggle
        if (this.menuToggle && this.mobileNav) {
            this.menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Smooth scroll for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollTo(link.getAttribute('href'));

                // Close mobile menu if open
                if (this.mobileNav && this.mobileNav.classList.contains('active')) {
                    this.toggleMobileMenu();
                }
            });
        });
    },

    handleScroll() {
        const scrollY = window.scrollY;

        // Add scrolled class
        if (scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Optional: Hide/show on scroll direction
        // if (scrollY > this.lastScrollY && scrollY > 500) {
        //     this.navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     this.navbar.style.transform = 'translateY(0)';
        // }

        this.lastScrollY = scrollY;
    },

    toggleMobileMenu() {
        this.menuToggle.classList.toggle('active');
        this.mobileNav.classList.toggle('active');
        document.body.style.overflow = this.mobileNav.classList.contains('active') ? 'hidden' : '';
    },

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (!element) return;

        const offsetTop = element.offsetTop - 80;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    },

    updateActiveLink() {
        const scrollY = window.scrollY;

        this.sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

// ==========================================
// 4. THREE.JS 3D BACKGROUND MODULE
// ==========================================
const HeroCanvas = {
    scene: null,
    camera: null,
    renderer: null,
    icosahedron: null,
    particles: null,
    torus: null,
    torus2: null,
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0,

    init() {
        const container = document.getElementById('hero-canvas');

        // Check if Three.js is loaded and container exists
        if (!container || typeof THREE === 'undefined') {
            console.log('Three.js not loaded or container not found');
            return;
        }

        this.createScene(container);
        this.createGeometry();
        this.createParticles();
        this.createTorus();
        this.bindEvents();
        this.animate();
    },

    createScene(container) {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 4;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);
    },

    createGeometry() {
        // Main icosahedron
        const geometry = new THREE.IcosahedronGeometry(1, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x6c5ce7,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        this.icosahedron = new THREE.Mesh(geometry, material);
        this.scene.add(this.icosahedron);
    },

    createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 500;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xa29bfe,
            transparent: true,
            opacity: 0.8
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    },

    createTorus() {
        // First torus
        const torusGeometry = new THREE.TorusGeometry(2, 0.02, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({
            color: 0xfd79a8,
            transparent: true,
            opacity: 0.4
        });

        this.torus = new THREE.Mesh(torusGeometry, torusMaterial);
        this.torus.rotation.x = Math.PI / 3;
        this.scene.add(this.torus);

        // Second torus
        const torus2Geometry = new THREE.TorusGeometry(2.5, 0.01, 16, 100);
        const torus2Material = new THREE.MeshBasicMaterial({
            color: 0x6c5ce7,
            transparent: true,
            opacity: 0.3
        });

        this.torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
        this.torus2.rotation.x = Math.PI / 2;
        this.torus2.rotation.y = Math.PI / 4;
        this.scene.add(this.torus2);
    },

    bindEvents() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        });

        // Resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    },

    animate() {
        requestAnimationFrame(() => this.animate());

        // Smooth mouse follow
        this.targetX += (this.mouseX - this.targetX) * 0.05;
        this.targetY += (this.mouseY - this.targetY) * 0.05;

        // Animate icosahedron
        if (this.icosahedron) {
            this.icosahedron.rotation.x += 0.003;
            this.icosahedron.rotation.y += 0.005;
            this.icosahedron.position.x = this.targetX * 0.5;
            this.icosahedron.position.y = -this.targetY * 0.5;
        }

        // Animate torus
        if (this.torus) {
            this.torus.rotation.z += 0.002;
        }

        if (this.torus2) {
            this.torus2.rotation.z -= 0.001;
        }

        // Animate particles
        if (this.particles) {
            this.particles.rotation.y += 0.001;
            this.particles.rotation.x = this.targetY * 0.1;
        }

        this.renderer.render(this.scene, this.camera);
    }
};

// ==========================================
// 5. PARTICLE SYSTEM MODULE
// ==========================================
const ParticleSystem = {
    container: null,
    particleCount: 50,
    colors: ['#6c5ce7', '#a29bfe', '#fd79a8', '#00cec9', '#ffeaa7'],

    init() {
        this.container = document.getElementById('particles-container');
        if (!this.container) return;

        this.createParticles();
    },

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    },

    createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.5 + 0.2;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            background: ${color};
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            opacity: ${opacity};
        `;

        this.container.appendChild(particle);
    }
};

// ==========================================
// 6. TYPING EFFECT MODULE
// ==========================================
const TypingEffect = {
    element: null,
    roles: [
        'Creative Developer',
        'UI/UX Designer',
        'Full Stack Engineer',
        'Problem Solver',
        'Tech Enthusiast'
    ],
    roleIndex: 0,
    charIndex: 0,
    isDeleting: false,
    typingSpeed: 100,

    init() {
        this.element = document.getElementById('typed-role');
        if (!this.element) return;

        // Start typing after a short delay
        setTimeout(() => this.type(), 1500);
    },

    type() {
        const currentRole = this.roles[this.roleIndex];

        if (this.isDeleting) {
            // Deleting text
            this.element.textContent = currentRole.substring(0, this.charIndex - 1);
            this.charIndex--;
            this.typingSpeed = 50;
        } else {
            // Typing text
            this.element.textContent = currentRole.substring(0, this.charIndex + 1);
            this.charIndex++;
            this.typingSpeed = 100;
        }

        // Word complete - start deleting
        if (!this.isDeleting && this.charIndex === currentRole.length) {
            this.isDeleting = true;
            this.typingSpeed = 2000; // Pause before deleting
        }

        // Word deleted - move to next word
        if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.roleIndex = (this.roleIndex + 1) % this.roles.length;
            this.typingSpeed = 500; // Pause before typing next
        }

        setTimeout(() => this.type(), this.typingSpeed);
    }
};

// ==========================================
// 7. GSAP ANIMATIONS MODULE
// ==========================================
const GSAPAnimations = {
    init() {
        // Check if GSAP is loaded
        if (typeof gsap === 'undefined') {
            console.log('GSAP not loaded - using fallback animations');
            this.initFallbackAnimations();
            return;
        }

        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        this.initScrollAnimations();
        this.initSectionHeaders();
        this.initSkillBars();
        this.initStatBars();
    },

    initScrollAnimations() {
        // Fade up animations
        const fadeUpElements = document.querySelectorAll('[data-animate="fade-up"]');
        fadeUpElements.forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Fade right animations
        const fadeRightElements = document.querySelectorAll('[data-animate="fade-right"]');
        fadeRightElements.forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, x: -60 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%'
                    }
                }
            );
        });

        // Fade left animations
        const fadeLeftElements = document.querySelectorAll('[data-animate="fade-left"]');
        fadeLeftElements.forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, x: 60 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%'
                    }
                }
            );
        });

        // Stagger animations
        const staggerContainers = document.querySelectorAll('[data-animate="stagger"]');
        staggerContainers.forEach(container => {
            const items = container.children;
            gsap.fromTo(items,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 80%'
                    }
                }
            );
        });
    },

    initSectionHeaders() {
        const headers = document.querySelectorAll('.section-header');

        headers.forEach(header => {
            const tag = header.querySelector('.section-tag');
            const title = header.querySelector('.section-title');
            const line = header.querySelector('.section-line');
            const description = header.querySelector('.section-description');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%'
                }
            });

            if (tag) tl.fromTo(tag, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
            if (title) tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
            if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, '-=0.3');
            if (description) tl.fromTo(description, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
        });
    },

    initSkillBars() {
        const skillsSection = document.querySelector('.skills-section');
        if (!skillsSection) return;

        ScrollTrigger.create({
            trigger: skillsSection,
            start: 'top 70%',
            onEnter: () => this.animateSkillBars()
        });
    },

    animateSkillBars() {
        const levelFills = document.querySelectorAll('.level-fill');
        levelFills.forEach(fill => {
            const level = fill.getAttribute('data-level');
            gsap.to(fill, {
                width: `${level}%`,
                duration: 1.5,
                ease: 'power3.out'
            });
        });
    },

    initStatBars() {
        const statsContainer = document.querySelector('.stats-container');
        if (!statsContainer) return;

        ScrollTrigger.create({
            trigger: statsContainer,
            start: 'top 80%',
            onEnter: () => {
                const statFills = document.querySelectorAll('.stat-fill');
                statFills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    gsap.to(fill, {
                        width: width,
                        duration: 1.5,
                        ease: 'power3.out'
                    });
                });
            }
        });
    },

    initFallbackAnimations() {
        // Simple CSS-based fallback animations
        const animatedElements = document.querySelectorAll('[data-animate]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0)';
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'all 0.8s ease';

            const animation = el.getAttribute('data-animate');
            if (animation === 'fade-up') el.style.transform = 'translateY(40px)';
            if (animation === 'fade-left') el.style.transform = 'translateX(40px)';
            if (animation === 'fade-right') el.style.transform = 'translateX(-40px)';

            observer.observe(el);
        });
    }
};

// ==========================================
// 8. PARALLAX EFFECTS MODULE
// ==========================================
const ParallaxEffects = {
    layers: null,
    heroSection: null,
    shapes: null,

    init() {
        this.layers = document.querySelectorAll('.parallax-layer');
        this.heroSection = document.querySelector('.hero-section');
        this.shapes = document.querySelectorAll('.floating-shapes .shape');

        if (this.layers.length > 0) {
            this.initScrollParallax();
        }

        if (this.heroSection && this.shapes.length > 0) {
            this.initMouseParallax();
        }
    },

    initScrollParallax() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            this.layers.forEach(layer => {
                const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
                const yPos = scrollY * speed;
                layer.style.transform = `translateY(${yPos}px)`;
            });
        });
    },

    initMouseParallax() {
        this.heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { width, height } = this.heroSection.getBoundingClientRect();

            const xPos = (clientX / width - 0.5) * 2;
            const yPos = (clientY / height - 0.5) * 2;

            this.shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                shape.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
            });
        });
    }
};

// ==========================================
// 9. STATS COUNTER MODULE
// ==========================================
const StatsCounter = {
    counters: null,
    observed: new Set(),

    init() {
        this.counters = document.querySelectorAll('[data-count]');
        if (this.counters.length === 0) return;

        this.initObserver();
    },

    initObserver() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.observed.has(entry.target)) {
                    this.observed.add(entry.target);
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    this.animateCounter(entry.target, target);
                }
            });
        }, options);

        this.counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(element, target) {
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);

        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = this.easeOutQuad(frame / totalFrames);
            const currentCount = Math.round(target * progress);

            element.textContent = this.formatNumber(currentCount);

            if (frame === totalFrames) {
                clearInterval(counter);
                element.textContent = this.formatNumber(target);
            }
        }, frameDuration);
    },

    easeOutQuad(t) {
        return t * (2 - t);
    },

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
        }
        return num.toLocaleString();
    }
};

// ==========================================
// 10. SKILLS SECTION MODULE
// ==========================================
const SkillsSection = {
    tabs: null,
    cards: null,

    init() {
        this.tabs = document.querySelectorAll('.skill-tab');
        this.cards = document.querySelectorAll('.skill-card');

        if (this.tabs.length === 0) return;

        this.bindEvents();
    },

    bindEvents() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                this.tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Filter skills
                const category = tab.getAttribute('data-category');
                this.filterSkills(category);
            });
        });
    },

    filterSkills(category) {
        this.cards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                card.classList.add('hidden');
            }
        });

        // Re-animate skill bars
        setTimeout(() => {
            const levelFills = document.querySelectorAll('.skill-card:not(.hidden) .level-fill');
            levelFills.forEach(fill => {
                const level = fill.getAttribute('data-level');
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.transition = 'width 1s ease';
                    fill.style.width = `${level}%`;
                }, 100);
            });
        }, 300);
    }
};

// ==========================================
// 11. PROJECTS FILTER MODULE
// ==========================================
const ProjectsFilter = {
    buttons: null,
    cards: null,

    init() {
        this.buttons = document.querySelectorAll('.filter-btn');
        this.cards = document.querySelectorAll('.project-card');

        if (this.buttons.length === 0) return;

        this.bindEvents();
    },

    bindEvents() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                this.buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter projects
                const filter = btn.getAttribute('data-filter');
                this.filterProjects(filter);
            });
        });
    },

    filterProjects(filter) {
        this.cards.forEach((card, index) => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';

                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 100);
            } else {
                card.classList.add('hidden');
            }
        });
    }
};

// ==========================================
// 12. EXPERIENCE TIMELINE MODULE
// ==========================================
const ExperienceTimeline = {
    toggleBtns: null,
    workTimeline: null,
    educationTimeline: null,

    init() {
        this.toggleBtns = document.querySelectorAll('.toggle-btn');
        this.workTimeline = document.getElementById('work-timeline');
        this.educationTimeline = document.getElementById('education-timeline');

        if (this.toggleBtns.length === 0) return;

        this.bindEvents();
    },

    bindEvents() {
        this.toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                this.toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Toggle timeline
                const type = btn.getAttribute('data-type');
                this.switchTimeline(type);
            });
        });
    },

    switchTimeline(type) {
        if (type === 'work') {
            this.workTimeline.setAttribute('data-active', 'true');
            this.educationTimeline.setAttribute('data-active', 'false');
        } else {
            this.workTimeline.setAttribute('data-active', 'false');
            this.educationTimeline.setAttribute('data-active', 'true');
        }

        // Animate visible timeline items
        const activeTimeline = document.querySelector('.timeline[data-active="true"]');
        if (activeTimeline) {
            const items = activeTimeline.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-30px)';

                setTimeout(() => {
                    item.style.transition = 'all 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 150);
            });
        }
    }
};

// ==========================================
// 13. TESTIMONIALS SLIDER MODULE
// ==========================================
const TestimonialsSlider = {
    track: null,
    cards: null,
    prevBtn: null,
    nextBtn: null,
    dotsContainer: null,
    currentIndex: 0,
    autoplayInterval: null,

    init() {
        this.track = document.querySelector('.testimonials-track');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.dotsContainer = document.querySelector('.slider-dots');

        if (!this.track || this.cards.length === 0) return;

        this.createDots();
        this.bindEvents();
        this.startAutoplay();
    },

    get slidesPerView() {
        return window.innerWidth >= 768 ? 2 : 1;
    },

    get maxIndex() {
        return Math.max(0, this.cards.length - this.slidesPerView);
    },

    createDots() {
        if (!this.dotsContainer) return;

        this.dotsContainer.innerHTML = '';

        for (let i = 0; i <= this.maxIndex; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    },

    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Pause autoplay on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoplay());
        this.track.addEventListener('mouseleave', () => this.startAutoplay());

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });

        // Handle resize
        window.addEventListener('resize', () => {
            this.createDots();
            if (this.currentIndex > this.maxIndex) {
                this.currentIndex = this.maxIndex;
            }
            this.updateSlider();
        });
    },

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (diff > threshold) {
            this.nextSlide();
        } else if (diff < -threshold) {
            this.prevSlide();
        }
    },

    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
        this.updateSlider();
    },

    nextSlide() {
        this.currentIndex = this.currentIndex >= this.maxIndex ? 0 : this.currentIndex + 1;
        this.updateSlider();
    },

    prevSlide() {
        this.currentIndex = this.currentIndex <= 0 ? this.maxIndex : this.currentIndex - 1;
        this.updateSlider();
    },

    updateSlider() {
        const cardWidth = this.cards[0].offsetWidth + 32; // Including gap
        this.track.style.transform = `translateX(-${this.currentIndex * cardWidth}px)`;

        // Update dots
        const dots = this.dotsContainer?.querySelectorAll('.dot');
        dots?.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    },

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
    },

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }
};

// ==========================================
// 14. CONTACT FORM MODULE
// ==========================================
const ContactForm = {
    form: null,
    statusDiv: null,

    init() {
        this.form = document.getElementById('contact-form');
        this.statusDiv = document.getElementById('form-status');

        if (!this.form) return;

        this.bindEvents();
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Input focus animations
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    },

    async handleSubmit(e) {
        e.preventDefault();

        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;

        // Loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        try {
            // Simulate API call (replace with actual endpoint)
            await this.sendFormData(data);

            this.showStatus('success', '✓ Message sent successfully! I\'ll get back to you soon.');
            this.form.reset();

        } catch (error) {
            this.showStatus('error', '✗ Oops! Something went wrong. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
        }
    },

    sendFormData(data) {
        // Simulate API call - replace with actual implementation
        return new Promise((resolve, reject) => {
            console.log('Form data submitted:', data);

            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() > 0.05) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });

        /*
        // Actual implementation example:
        return fetch('https://your-api.com/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json());
        */
    },

    showStatus(type, message) {
        if (!this.statusDiv) return;

        this.statusDiv.className = `form-status ${type}`;
        this.statusDiv.textContent = message;
        this.statusDiv.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.statusDiv.style.display = 'none';
        }, 5000);
    }
};

// ==========================================
// 15. AI CHATBOT MODULE - FULL IMPLEMENTATION
// ==========================================
const AIChatbot = {
    // DOM Elements
    container: null,
    toggleBtn: null,
    window: null,
    messagesContainer: null,
    inputField: null,
    sendBtn: null,
    typingIndicator: null,
    minimizeBtn: null,
    quickActions: null,
    notification: null,

    // Config
    botLogoUrl: 'discord_fake_avatar_decorations_1770640170390.gif',


    // State
    isOpen: false,
    isTyping: false,
    conversationHistory: [],

    // Configuration - EDIT THESE VALUES
    config: {
        botName: 'AI Assistant',
        ownerName: 'TFC BADWOLF',
        apiEndpoint: 'https://api.openai.com/v1/chat/completions', // Placeholder
        apiKey: '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', // User to replace
        serpApiKey: 'e2e594edbf62a1c259022e2eeaabecb6d5d83469646d1ccc39cae50fc1659e95', // User to replace
        useRealAI: true,
    },

    init() {
        // Get DOM elements
        this.container = document.getElementById('chatbot-container');
        this.toggleBtn = document.getElementById('chat-toggle');
        this.window = document.getElementById('chat-window');
        this.messagesContainer = document.getElementById('chat-messages');
        this.inputField = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('chat-send');
        this.typingIndicator = document.getElementById('typing-indicator');
        this.minimizeBtn = document.querySelector('.chat-minimize');
        this.quickActions = document.querySelectorAll('.quick-action');
        this.notification = document.querySelector('.chat-notification');

        if (!this.toggleBtn || !this.window) return;

        // Styles are now handling in style.css
        this.bindEvents();
    },



    bindEvents() {
        // Toggle chat window
        this.toggleBtn.addEventListener('click', () => this.toggle());

        // Minimize button
        if (this.minimizeBtn) {
            this.minimizeBtn.addEventListener('click', () => this.close());
        }

        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());

        // Enter key to send
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Quick action buttons
        this.quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const message = action.getAttribute('data-message');
                this.inputField.value = message;
                this.sendMessage();

                // Hide quick actions after first use
                const quickActionsContainer = document.querySelector('.quick-actions');
                if (quickActionsContainer) {
                    quickActionsContainer.style.display = 'none';
                }
            });
        });
    },

    toggle() {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            this.open();
        } else {
            this.close();
        }
    },

    open() {
        this.isOpen = true;
        this.window.classList.add('active');
        // this.toggleBtn.classList.add('active'); // Removing class toggle if needed, or keeping it


        // Hide notification
        if (this.notification) {
            this.notification.style.display = 'none';
        }

        // Focus input
        setTimeout(() => this.inputField.focus(), 300);
    },

    close() {
        this.isOpen = false;
        this.window.classList.remove('active');
        this.toggleBtn.classList.remove('active');
    },

    async sendMessage() {
        const message = this.inputField.value.trim();
        if (!message || this.isTyping) return;

        // Clear input
        this.inputField.value = '';

        // Add user message
        this.addMessage(message, 'user');

        // Add to conversation history
        this.conversationHistory.push({ role: 'user', content: message });

        // Show typing indicator
        this.showTyping();

        // Get AI response
        try {
            const response = await this.getAIResponse(message);
            this.hideTyping();
            this.addMessage(response, 'bot');

            // Add to conversation history
            this.conversationHistory.push({ role: 'assistant', content: response });

        } catch (error) {
            this.hideTyping();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            console.error('Chatbot error:', error);
        }
    },

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);

        messageDiv.innerHTML = `
            <div class="message-avatar">${sender === 'bot' ? 'AI' : 'You'}</div>
            <div class="message-content">
                <p>${this.formatMessage(text)}</p>
                <span class="message-time">${this.getCurrentTime()}</span>
            </div>
        `;

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    },

    formatMessage(text) {
        // Basic formatting - convert newlines to <br>
        return text.replace(/\n/g, '<br>');
    },

    showTyping() {
        this.isTyping = true;
        if (this.typingIndicator) {
            this.typingIndicator.classList.remove('hidden');
        }
        this.scrollToBottom();
    },

    hideTyping() {
        this.isTyping = false;
        if (this.typingIndicator) {
            this.typingIndicator.classList.add('hidden');
        }
    },

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    },

    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    },

    // =========================================
    // AI RESPONSE METHODS
    // =========================================

    async getAIResponse(message) {
        // Simulate typing delay
        await this.delay(1000 + Math.random() * 1000);

        // Check if real AI is configured
        if (this.config.useRealAI && this.config.apiEndpoint) {
            return await this.getRealAIResponse(message);
        }

        // Use local responses
        return this.getLocalResponse(message);
    },

    /**
     * =========================================
     * REAL AI INTEGRATION
     * =========================================
     * 
     * To connect to OpenAI or other AI services:
     * 
     * 1. Create a backend endpoint (NEVER expose API keys in frontend!)
     * 
     * Example backend (Node.js/Express):
     * 
     * app.post('/api/chat', async (req, res) => {
     *     const { message, history } = req.body;
     *     
     *     const response = await fetch('https://api.openai.com/v1/chat/completions', {
     *         method: 'POST',
     *         headers: {
     *             'Content-Type': 'application/json',
     *             'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
     *         },
     *         body: JSON.stringify({
     *             model: 'gpt-3.5-turbo',
     *             messages: [
     *                 { 
     *                     role: 'system', 
     *                     content: `You are ${ownerName}'s portfolio assistant. 
     *                               Help visitors learn about their work, skills, 
     *                               and how to hire them. Be friendly and helpful.`
     *                 },
     *                 ...history,
     *                 { role: 'user', content: message }
     *             ],
     *             max_tokens: 200,
     *             temperature: 0.7
     *         })
     *     });
     *     
     *     const data = await response.json();
     *     res.json({ reply: data.choices[0].message.content });
     * });
     * 
     * 2. Set config values:
     *    this.config.apiEndpoint = 'https://your-backend.com/api/chat';
     *    this.config.useRealAI = true;
     * 
     * =========================================
     */
    async getRealAIResponse(message) {
        try {
            // 1. Check for real-time information needs
            const isRealTimeQuery = /news|weather|current|latest|price|today|now/i.test(message);
            let context = "";

            if (isRealTimeQuery && this.config.serpApiKey && this.config.serpApiKey !== 'YOUR_SERP_API_KEY_HERE') {
                try {
                    const searchResults = await this.performInternetSearch(message);
                    if (searchResults) {
                        context = `Current Internet Info: ${JSON.stringify(searchResults)}\n\n`;
                    }
                } catch (e) {
                    console.warn("Search failed:", e);
                }
            }

            // 2. Call OpenAI with Context
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: `You are ${this.config.ownerName}'s AI assistant. Answer accurately. ${context ? "Use the provided Internet Info to answer the user's question." : ""}` },
                        { role: 'user', content: message }
                    ]
                })
            });

            const data = await response.json();

            if (data.error) {
                console.warn("OpenAI API Error:", data.error);

                // Specific handling for Quota Exceeded
                if (data.error.code === 'insufficient_quota') {
                    if (context) {
                        return `⚠️ **OpenAI Quota Exceeded**\n\nI couldn't generate a smart summary, but here is what I found on the web:\n\n${this.formatSearchFallback(context)}`;
                    }
                    return "⚠️ **OpenAI API Quota Exceeded**\n\nPlease check your billing details at platform.openai.com. In the meantime, I can answer questions about the portfolio from my local memory.";
                }

                return this.getLocalResponse(message);
            }
            return data.choices[0].message.content;

        } catch (error) {
            console.error('AI API Connection Error:', error);
            return this.getLocalResponse(message);
        }
    },

    async performInternetSearch(query) {
        // Note: Direct browser calls to SerpApi often get blocked by CORS.
        // In a production app, use a backend proxy. For this demo, we try direct or CORS proxy if available.
        const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${this.config.serpApiKey}&num=3`;

        // Using a CORS proxy is often necessary for client-side only apps
        // const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; 

        const response = await fetch(url);
        const data = await response.json();

        if (data.organic_results) {
            return data.organic_results.map(r => ({
                title: r.title,
                snippet: r.snippet,
                link: r.link
            }));
        }
        return null;
    },

    formatSearchFallback(context) {
        try {
            const data = JSON.parse(context.replace('Current Internet Info: ', '').trim());
            return data.map(item => `• **[${item.title}](${item.link})**\n${item.snippet}`).join('\n\n');
        } catch (e) {
            return "Could not format search results.";
        }
    },

    /**
     * =========================================
     * LOCAL RESPONSE SYSTEM
     * =========================================
     * EDIT: Customize these responses for your portfolio
     */
    getLocalResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Define response patterns
        const responses = {
            // Greetings
            greetings: {
                triggers: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
                response: `Hello! 👋 Welcome to ${this.config.ownerName}'s portfolio! I'm here to help you learn more about their work and skills. What would you like to know?

You can ask me about:
• Experience & Background
• Skills & Technologies
• Projects & Portfolio
• Services Offered
• How to Get in Touch`
            },

            // Experience
            experience: {
                triggers: ['experience', 'work history', 'background', 'career', 'job', 'worked'],
                response: `${this.config.ownerName} has over 5 years of professional experience in web development and design.

📌 Current Role: Senior Frontend Developer at Tech Innovators Inc.
• Leading frontend development team
• Architecting scalable web applications
• Mentoring junior developers

📌 Previous Experience:
• Full Stack Developer at Digital Solutions Agency (2020-2022)
• Junior Developer at StartUp Labs (2018-2020)
• Freelance Developer (2017-2018)

Would you like to know more about any specific role or project?`
            },

            // Skills
            skills: {
                triggers: ['skills', 'technologies', 'tech stack', 'programming', 'languages', 'what can you do', 'expertise'],
                response: `${this.config.ownerName} is proficient in a wide range of technologies:

💻 Frontend:
• React.js, Vue.js, Next.js
• JavaScript/TypeScript
• HTML5, CSS3, SASS
• Tailwind CSS, Bootstrap

⚙️ Backend:
• Node.js, Express
• Python, Django
• PostgreSQL, MongoDB
• REST APIs, GraphQL

🛠️ Tools & Others:
• Git, Docker, AWS
• Figma, Adobe XD
• Three.js, GSAP
• CI/CD, Testing

What specific technology would you like to know more about?`
            },

            // Projects
            projects: {
                triggers: ['projects', 'portfolio', 'work', 'examples', 'showcase', 'built', 'created'],
                response: `Here are some notable projects ${this.config.ownerName} has worked on:

🚀 E-Commerce Platform
Full-stack solution with React, Node.js & MongoDB

🤖 AI Content Generator
Vue.js app with OpenAI integration

📱 Fitness Tracker App
React Native mobile app with AWS backend

🎨 3D Product Showcase
Interactive Three.js & WebGL experience

💼 Banking App Redesign
Complete UI/UX redesign in Figma

Check out the Projects section for live demos and GitHub links!`
            },

            // Services
            services: {
                triggers: ['services', 'offer', 'help with', 'can you', 'do you do', 'available for'],
                response: `${this.config.ownerName} offers professional services in:

🌐 Web Development
• Custom websites & web applications
• E-commerce solutions
• CMS development
• Performance optimization

🎨 UI/UX Design
• User interface design
• User experience research
• Prototyping & wireframing
• Design systems

📱 Mobile Development
• React Native apps
• Cross-platform solutions
• App optimization

🤖 AI Integration
• Chatbot development
• AI-powered features
• Machine learning integration

Interested in any of these services?`
            },

            // Hiring / Contact
            hire: {
                triggers: ['hire', 'contact', 'reach', 'email', 'get in touch', 'work with', 'available', 'freelance'],
                response: `Great! ${this.config.ownerName} is currently available for new projects and opportunities! 🎉

📧 Email: hello@alexmorgan.dev
📱 Phone: +1 (234) 567-890
📍 Location: San Francisco, CA

You can also:
• Fill out the contact form on this page
• Connect on LinkedIn
• Check out GitHub for open source work

Response time is typically within 24 hours!`
            },

            // Pricing
            pricing: {
                triggers: ['price', 'cost', 'rate', 'budget', 'charge', 'fee', 'how much'],
                response: `Project pricing depends on scope and complexity. Here are typical ranges:

💡 Simple Website: $2,000 - $5,000
🌐 Web Application: $5,000 - $15,000
📱 Mobile App: $10,000 - $30,000
🎨 UI/UX Design: $1,500 - $5,000

For custom quotes, please:
1. Describe your project in the contact form
2. Select your budget range
3. Include timeline requirements

${this.config.ownerName} offers free initial consultations!`
            },

            // Location / Remote
            location: {
                triggers: ['location', 'where', 'based', 'remote', 'timezone', 'country'],
                response: `${this.config.ownerName} is based in San Francisco, CA (PST timezone) but works with clients globally!

🌍 Remote Work: Yes, fully remote-capable
⏰ Availability: Flexible hours for different timezones
💬 Communication: Slack, Zoom, Email, Discord

Previous clients from: USA, UK, Canada, Germany, Australia, and more!`
            },

            // Education
            education: {
                triggers: ['education', 'degree', 'university', 'study', 'school', 'certificate', 'certification'],
                response: `${this.config.ownerName}'s educational background:

🎓 BS in Computer Science
Stanford University (2014-2018)
• GPA: 3.8 | Dean's List
• Focus: Software Engineering & HCI

📜 Certifications:
• AWS Solutions Architect (2021)
• Google UX Design Professional (2022)
• Meta Frontend Developer (2023)

Continuous learner with 100+ online courses completed!`
            },

            // About
            about: {
                triggers: ['about', 'who', 'tell me about', 'yourself', 'bio', 'story'],
                response: `${this.config.ownerName} is a passionate creative developer with 5+ years of experience building modern web applications and immersive digital experiences.

🎯 Mission: Creating beautiful, functional digital experiences that make a difference.

❤️ Passions:
• Clean, maintainable code
• User-centered design
• Open source contribution
• Mentoring developers

🎮 Outside of coding:
• Photography enthusiast
• Coffee connoisseur
• Hiking & travel

Check out the About section for the full story!`
            },

            // Thanks
            thanks: {
                triggers: ['thank', 'thanks', 'appreciate', 'helpful', 'great'],
                response: `You're very welcome! 😊 I'm glad I could help!

Is there anything else you'd like to know about ${this.config.ownerName}'s work or services?

Feel free to:
• Explore the portfolio sections
• Fill out the contact form
• Reach out directly via email

Have a great day! 🌟`
            },

            // Goodbye
            goodbye: {
                triggers: ['bye', 'goodbye', 'see you', 'later', 'exit', 'close'],
                response: `Goodbye! 👋 Thanks for visiting ${this.config.ownerName}'s portfolio!

Feel free to come back anytime if you have more questions. Good luck with your project!

🌟 Don't forget to:
• Check out the projects
• Connect on social media
• Get in touch if you need help`
            }
        };

        // Find matching response
        for (const [key, data] of Object.entries(responses)) {
            for (const trigger of data.triggers) {
                if (lowerMessage.includes(trigger)) {
                    return data.response;
                }
            }
        }

        // Default response
        return `Thanks for your message! I'd be happy to help you learn more about ${this.config.ownerName}'s work.

You can ask me about:
• 💼 Experience & Background
• 🛠️ Skills & Technologies
• 📁 Projects & Portfolio
• 🎯 Services Offered
• 📞 How to Get in Touch
• 💰 Pricing & Availability

What would you like to know?`;
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// ==========================================
// 16. MUSIC PLAYER MODULE
// ==========================================
const MusicPlayer = {
    toggleBtn: null,
    audio: null,
    isPlaying: false,

    init() {
        this.toggleBtn = document.getElementById('music-toggle');
        if (!this.toggleBtn) return;

        // Create audio element
        this.audio = document.getElementById('bg-music');
        if (!this.audio) {
            this.audio = new Audio();
            this.audio.src = 'bg_music.mp3';
        }
        // this.audio.src = 'assets/audio/background-music.mp3';
        this.audio.loop = true;
        this.audio.volume = 0.3;

        this.bindEvents();
    },

    bindEvents() {
        this.toggleBtn.addEventListener('click', () => this.toggle());
    },

    toggle() {
        if (!this.audio.src) {
            alert('No background music configured. Add your audio file in script.js MusicPlayer module.');
            return;
        }

        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },

    play() {
        this.audio.play()
            .then(() => {
                this.isPlaying = true;
                this.toggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            })
            .catch(error => {
                console.error('Audio playback failed:', error);
            });
    },

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.toggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
};

// ==========================================
// 16.5. THEME TOGGLE MODULE
// ==========================================
const ThemeToggle = {
    toggleBtn: null,
    isDark: true,

    init() {
        this.toggleBtn = document.getElementById('theme-toggle');
        if (!this.toggleBtn) return;

        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.isDark = savedTheme === 'dark';
        } else {
            this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        this.applyTheme();
        this.bindEvents();
    },

    bindEvents() {
        this.toggleBtn.addEventListener('click', () => {
            this.isDark = !this.isDark;
            this.applyTheme();
            localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
        });
    },

    applyTheme() {
        const body = document.body;
        const icon = this.toggleBtn.querySelector('i');

        if (this.isDark) {
            body.classList.remove('light-mode');
            icon.className = 'fas fa-moon';
        } else {
            body.classList.add('light-mode');
            icon.className = 'fas fa-sun';
        }
    }
};

// ==========================================
// 17. BACK TO TOP MODULE
// ==========================================
const BackToTop = {
    button: null,

    init() {
        this.button = document.getElementById('back-to-top');
        if (!this.button) return;

        this.injectStyles();
        this.bindEvents();
    },

    injectStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 30px;
                left: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #6c5ce7, #a29bfe);
                border: none;
                color: white;
                font-size: 1.25rem;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.3s ease;
                z-index: 100;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .back-to-top:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 30px rgba(108, 92, 231, 0.5);
            }
            
            @media (max-width: 480px) {
                .back-to-top {
                    left: 20px;
                    bottom: 20px;
                    width: 46px;
                    height: 46px;
                }
            }
        `;
        document.head.appendChild(styles);
    },

    bindEvents() {
        // Show/hide based on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });

        // Scroll to top on click
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// ==========================================
// 18. UTILITIES MODULE
// ==========================================
const Utilities = {
    init() {
        this.setCurrentYear();
        this.initLazyLoading();
        this.handleReducedMotion();
        this.consoleMessage();
    },

    setCurrentYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    },

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    },

    handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        }
    },

    consoleMessage() {
        console.log(`
%c👋 Hey there, curious developer!
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%cThanks for checking out the code!
Built with ❤️ using HTML, CSS, JavaScript, GSAP & Three.js

🔗 Portfolio: yourwebsite.com
📧 Email: hello@yourwebsite.com
💼 LinkedIn: linkedin.com/in/yourprofile

Looking for a developer? Let's connect!
        `,
            'font-size: 24px; font-weight: bold; color: #6c5ce7;',
            'color: #a29bfe;',
            'font-size: 14px; color: #a0a0b0;'
        );
    }
};

// ==========================================
// EXPOSE MODULES GLOBALLY (Optional)
// ==========================================
window.PortfolioModules = {
    Preloader,
    CustomCursor,
    Navigation,
    HeroCanvas,
    ParticleSystem,
    TypingEffect,
    GSAPAnimations,
    ParallaxEffects,
    StatsCounter,
    SkillsSection,
    ProjectsFilter,
    ExperienceTimeline,
    TestimonialsSlider,
    ContactForm,
    AIChatbot,
    MusicPlayer,
    ThemeToggle,
    BackToTop,
    Utilities
};