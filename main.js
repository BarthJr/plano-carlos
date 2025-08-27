// Configurações principais
const CONFIG = {
    whatsappNumber: '5513999999999', // Número do WhatsApp (deve ser alterado pelo cliente)
    whatsappMessage: 'Olá! Vi o Plano de Marketing Local e gostaria de implementar em 7 dias. Vamos conversar?',
    qrCodeSize: 150,
    animationDuration: 1000
};

// Classe principal da aplicação
class PedreiroCarlosWebsite {
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
    }

    // Configurar event listeners
    setupEventListeners() {
        // Botões WhatsApp
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

        // Botão de download PDF
        const downloadBtn = document.getElementById('download-pdf');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadPDF();
            });
        }

        // Scroll suave para links internos
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

        // Redimensionamento da janela
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Scroll da página
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    // Gerar QR Code para WhatsApp
    generateQRCode() {
        const qrCanvas = document.getElementById('qr-code');
        if (!qrCanvas || typeof QRCode === 'undefined') return;

        const whatsappUrl = this.getWhatsAppURL();
        
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
                console.error('Erro ao gerar QR Code:', error);
                // Fallback: mostrar texto
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

    // Obter URL do WhatsApp
    getWhatsAppURL() {
        const message = encodeURIComponent(CONFIG.whatsappMessage);
        return `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    }

    // Abrir WhatsApp
    openWhatsApp() {
        const url = this.getWhatsAppURL();
        
        // Tentar abrir no app primeiro (mobile)
        if (this.isMobile()) {
            window.location.href = url;
        } else {
            // Desktop: abrir em nova aba
            window.open(url, '_blank');
        }

        // Analytics/tracking (opcional)
        this.trackEvent('whatsapp_click', {
            source: 'website',
            page: 'plano_marketing'
        });
    }

    // Verificar se é dispositivo móvel
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Download PDF (usar funcionalidade de impressão)
    downloadPDF() {
        // Adicionar classe para impressão
        document.body.classList.add('printing');
        
        // Configurar título do documento
        const originalTitle = document.title;
        document.title = 'Plano de Marketing Local - Pedreiro Carlos - Itanhaém SP';
        
        // Imprimir
        window.print();
        
        // Restaurar após impressão
        setTimeout(() => {
            document.body.classList.remove('printing');
            document.title = originalTitle;
        }, 1000);

        this.trackEvent('pdf_download', {
            source: 'website',
            page: 'plano_marketing'
        });
    }

    // Configurar animações de scroll
    setupScrollAnimations() {
        // Intersection Observer para animações
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

        // Observar elementos animáveis
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

    // Configurar scroll suave
    setupSmoothScrolling() {
        // Adicionar CSS para scroll suave se não estiver definido
        if (!document.documentElement.style.scrollBehavior) {
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    }

    // Scroll suave para elemento específico
    smoothScrollTo(element) {
        const offsetTop = element.offsetTop - 80; // Compensar header fixo
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    // Controlar visibilidade do CTA fixo
    handleFixedCTAVisibility() {
        const fixedCTA = document.getElementById('fixed-cta');
        const finalCTA = document.getElementById('cta-final');
        
        if (!fixedCTA || !finalCTA) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ocultar CTA fixo quando CTA final está visível
                    fixedCTA.style.opacity = '0';
                    fixedCTA.style.pointerEvents = 'none';
                } else {
                    // Mostrar CTA fixo quando CTA final não está visível
                    fixedCTA.style.opacity = '1';
                    fixedCTA.style.pointerEvents = 'auto';
                }
            });
        }, { threshold: 0.1 });

        observer.observe(finalCTA);
    }

    // Adicionar elementos interativos
    addInteractiveElements() {
        // Hover effects para cards
        this.addHoverEffects();
        
        // Tooltips para gráficos
        this.addTooltips();
        
        // Contador animado para números
        this.addCounterAnimations();
    }

    // Efeitos de hover
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

    // Tooltips informativos
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

    // Mostrar tooltip
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

    // Ocultar tooltip
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

    // Animações de contador
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

    // Animar contador
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

    // Manipular scroll da página
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Parallax effect para hero
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
        }

        // Mostrar/ocultar botão de voltar ao topo
        this.toggleBackToTop(scrollTop);
    }

    // Toggle botão voltar ao topo
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

    // Criar botão voltar ao topo
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

    // Manipular redimensionamento
    handleResize() {
        // Reposicionar tooltips se existirem
        if (this.currentTooltip) {
            this.hideTooltip();
        }

        // Regenerar QR code se necessário
        if (window.innerWidth < 768) {
            CONFIG.qrCodeSize = 120;
        } else {
            CONFIG.qrCodeSize = 150;
        }
    }

    // Tracking de eventos (para analytics)
    trackEvent(eventName, properties = {}) {
        // Implementar tracking aqui (Google Analytics, etc.)
        console.log('Event tracked:', eventName, properties);
        
        // Exemplo para Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
    }

    // Utilitários
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

// CSS para animações
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

// Adicionar CSS ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = animationCSS;
document.head.appendChild(styleSheet);

// Inicializar aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new PedreiroCarlosWebsite();
});

// Fallback para browsers mais antigos
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PedreiroCarlosWebsite();
    });
} else {
    new PedreiroCarlosWebsite();
}

