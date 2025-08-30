// Main settings
const CONFIG = {
    whatsappNumber: '5513999999999', // WhatsApp number (should be changed by the client)
    whatsappMessage: 'Olá! Vi o Plano de Marketing Local e gostaria de implementar em 7 dias. Vamos conversar?',
    qrCodeSize: 150,
    animationDuration: 1000
};

// Main application class
class MarketingPlanWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateQRCode();
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
        this.handleFixedCTAVisibility();
        this.addInteractiveElements();

        // Initialize charts after the main setup
        if (typeof initializeCharts === 'function') {
            initializeCharts();
        }
    }

    // Set up event listeners
    setupEventListeners() {
        // WhatsApp buttons
        const whatsappButtons = [
            'whatsapp-btn',
            'hero-whatsapp',
            'final-whatsapp'
        ];

        whatsappButtons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openWhatsApp();
                });
            }
        });

        // PDF download button
        const downloadBtn = document.getElementById('download-pdf');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadPDF();
            });
        }

        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                }
            });
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Page scroll
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    // Generate QR Code for WhatsApp
    generateQRCode() {
        const qrCanvas = document.getElementById('qr-code');
        const whatsappUrl = this.getWhatsAppURL();

        if (typeof QRCode === 'undefined') {
            console.error('QRCode library is not loaded.');
            if (qrCanvas) {
                // Fallback: show text
                qrCanvas.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.innerHTML = `
                    <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #374151;">
                            QR Code indisponível (biblioteca não carregou).<br>
                            <a href="${whatsappUrl}" target="_blank" style="color: #0FA3B1;">Clique aqui para WhatsApp</a>
                        </p>
                    </div>
                `;
                qrCanvas.parentNode.appendChild(fallback);
            }
            return;
        }

        if (!qrCanvas) return;
        
        QRCode.toCanvas(qrCanvas, whatsappUrl, {
            width: CONFIG.qrCodeSize,
            height: CONFIG.qrCodeSize,
            margin: 2,
            color: {
                dark: '#111827',
                light: '#ffffff'
            },
            errorCorrectionLevel: 'M'
        }, (error) => {
            if (error) {
                console.error('Error generating QR Code:', error);
                // Fallback: show text
                qrCanvas.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.innerHTML = `
                    <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #374151;">
                            QR Code indisponível<br>
                            <a href="${whatsappUrl}" target="_blank" style="color: #0FA3B1;">Clique aqui para WhatsApp</a>
                        </p>
                    </div>
                `;
                qrCanvas.parentNode.appendChild(fallback);
            }
        });
    }

    // Get WhatsApp URL
    getWhatsAppURL() {
        const message = encodeURIComponent(CONFIG.whatsappMessage);
        return `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    }

    // Open WhatsApp
    openWhatsApp() {
        const url = this.getWhatsAppURL();
        
        // Try to open in the app first (mobile)
        if (this.isMobile()) {
            window.location.href = url;
        } else {
            // Desktop: open in a new tab
            window.open(url, '_blank');
        }

        // Analytics/tracking (optional)
        this.trackEvent('whatsapp_click', {
            source: 'website',
            page: 'marketing_plan'
        });
    }

    // Check if it's a mobile device
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Download PDF (use print functionality)
    downloadPDF() {
        // Add a class for printing
        document.body.classList.add('printing');
        
        // Set document title for printing
        const originalTitle = document.title;
        document.title = 'Plano de Marketing Local - Pedreiro Carlos - Itanhaém SP';
        
        // Print
        window.print();
        
        // Restore after printing
        setTimeout(() => {
            document.body.classList.remove('printing');
            document.title = originalTitle;
        }, 1000);

        this.trackEvent('pdf_download', {
            source: 'website',
            page: 'marketing_plan'
        });
    }

    // Set up scroll animations
    setupScrollAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe animatable elements
        const animatableElements = document.querySelectorAll(`
            .summary-card,
            .insight-card,
            .competitor-card,
            .keyword-cluster,
            .timeline-item,
            .budget-plan,
            .risk-card,
            .metric-card,
            .chart-container
        `);

        animatableElements.forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }

    // Set up smooth scrolling
    setupSmoothScrolling() {
        // Add CSS for smooth scrolling if not already defined
        if (!document.documentElement.style.scrollBehavior) {
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    }

    // Smooth scroll to a specific element
    smoothScrollTo(element) {
        const offsetTop = element.offsetTop - 80; // Offset for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    // Control visibility of the fixed CTA
    handleFixedCTAVisibility() {
        const fixedCTA = document.getElementById('fixed-cta');
        const finalCTA = document.getElementById('cta-final');
        
        if (!fixedCTA || !finalCTA) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hide fixed CTA when final CTA is visible
                    fixedCTA.style.opacity = '0';
                    fixedCTA.style.pointerEvents = 'none';
                } else {
                    // Show fixed CTA when final CTA is not visible
                    fixedCTA.style.opacity = '1';
                    fixedCTA.style.pointerEvents = 'auto';
                }
            });
        }, { threshold: 0.1 });

        observer.observe(finalCTA);
    }

    // Add interactive elements
    addInteractiveElements() {
        // Hover effects for cards
        this.addHoverEffects();
        
        // Tooltips for charts
        this.addTooltips();
        
        // Animated counter for numbers
        this.addCounterAnimations();
    }

    // Hover effects
    addHoverEffects() {
        const cards = document.querySelectorAll(`
            .summary-card,
            .insight-card,
            .competitor-card,
            .keyword-cluster,
            .budget-plan,
            .risk-card,
            .metric-card
        `);

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.transition = 'all 0.3s ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // Informational tooltips
    addTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.dataset.tooltip);
            });

            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    // Show tooltip
    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: #111827;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);

        this.currentTooltip = tooltip;
    }

    // Hide tooltip
    hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.style.opacity = '0';
            setTimeout(() => {
                if (this.currentTooltip && this.currentTooltip.parentNode) {
                    this.currentTooltip.parentNode.removeChild(this.currentTooltip);
                }
                this.currentTooltip = null;
            }, 300);
        }
    }

    // Counter animations
    addCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = parseInt(counter.dataset.duration) || 2000;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(counter, target, duration);
                        observer.unobserve(counter);
                    }
                });
            });

            observer.observe(counter);
        });
    }

    // Animate counter
    animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Handle page scroll
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
        }

        // Show/hide back-to-top button
        this.toggleBackToTop(scrollTop);
    }

    // Toggle back-to-top button
    toggleBackToTop(scrollTop) {
        let backToTopBtn = document.getElementById('back-to-top');
        
        if (!backToTopBtn) {
            backToTopBtn = this.createBackToTopButton();
        }

        if (scrollTop > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    }

    // Create back-to-top button
    createBackToTopButton() {
        const button = document.createElement('button');
        button.id = 'back-to-top';
        button.innerHTML = '↑';
        button.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #0FA3B1;
            color: white;
            border: none;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            z-index: 999;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(15, 163, 177, 0.3);
        `;

        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.background = '#0d8a96';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.background = '#0FA3B1';
        });

        document.body.appendChild(button);
        return button;
    }

    // Handle window resize
    handleResize() {
        // Reposition tooltips if they exist
        if (this.currentTooltip) {
            this.hideTooltip();
        }

        // Regenerate QR code if necessary
        if (window.innerWidth < 768) {
            CONFIG.qrCodeSize = 120;
        } else {
            CONFIG.qrCodeSize = 150;
        }
    }

    // Event tracking (for analytics)
    trackEvent(eventName, properties = {}) {
        // Implement tracking here (e.g., Google Analytics)
        console.log('Event tracked:', eventName, properties);
        
        // Example for Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
    }

    // Utilities
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// CSS for animations
const animationCSS = `
    .animate-ready {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .printing {
        overflow: visible !important;
    }

    .custom-tooltip {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        #back-to-top {
            bottom: 90px !important;
            right: 15px !important;
            width: 45px !important;
            height: 45px !important;
            font-size: 18px !important;
        }
    }
`;

// Add CSS to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = animationCSS;
document.head.appendChild(styleSheet);

// Initialize the application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MarketingPlanWebsite());
} else {
    new MarketingPlanWebsite();
}

