// Gerenciamento do Carrinho
const cart = {
    items: [],
    total: 0,

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        
        this.updateTotal();
        this.saveCart();
        this.updateCartUI();
    },

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.saveCart();
        this.updateCartUI();
    },

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.updateTotal();
            this.saveCart();
            this.updateCartUI();
        }
    },

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        localStorage.setItem('cartTotal', this.total);
    },

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        const savedTotal = localStorage.getItem('cartTotal');
        
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.total = parseFloat(savedTotal);
            this.updateCartUI();
        }
    },

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        if (cartTotal) {
            cartTotal.textContent = `R$ ${this.total.toFixed(2)}`;
        }
    }
};

// Gerenciamento de Produtos
const products = [
    {
        id: 1,
        name: '400 Robux',
        price: 19.90,
        image: 'assets/img/robux-400.png'
    },
    {
        id: 2,
        name: '800 Robux',
        price: 39.90,
        image: 'assets/img/robux-800.png'
    },
    {
        id: 3,
        name: '1700 Robux',
        price: 79.90,
        image: 'assets/img/robux-1700.png'
    },
    {
        id: 4,
        name: '2400 Robux',
        price: 99.90,
        image: 'assets/img/robux-2400.png'
    }
];

// Renderização dos Produtos
function renderProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="btn btn-primary" onclick="cart.addItem(${JSON.stringify(product)})">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');
}

// Gerenciamento de Tema
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        this.html = document.documentElement;
        this.theme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        // Aplicar tema salvo
        this.applyTheme(this.theme);
        
        // Adicionar evento de clique
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Adicionar evento de teclado para acessibilidade
        this.themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        
        // Adicionar animação de transição
        this.themeToggle.classList.add('theme-transitioning');
        setTimeout(() => {
            this.themeToggle.classList.remove('theme-transitioning');
        }, 300);
    }

    applyTheme(theme) {
        this.theme = theme;
        this.html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateIcon();
    }

    updateIcon() {
        const icon = this.theme === 'light' ? '🌙' : '☀️';
        this.themeIcon.textContent = icon;
        
        // Adicionar título para acessibilidade
        this.themeToggle.setAttribute('title', 
            this.theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
        );
    }
}

// Inicializar o gerenciador de tema
const themeManager = new ThemeManager();

// Scroll suave
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

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .feature-card').forEach(el => {
    observer.observe(el);
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll
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

    // Animação de entrada dos elementos
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.product-card, .feature-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Inicializar animações
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

// Validação de Formulários
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        let isValid = true;
        const errors = {};

        // Validação de campos
        for (const [key, value] of Object.entries(data)) {
            if (!value.trim()) {
                errors[key] = 'Este campo é obrigatório';
                isValid = false;
            }
        }

        // Validação específica de email
        if (data.email && !isValidEmail(data.email)) {
            errors.email = 'Email inválido';
            isValid = false;
        }

        if (isValid) {
            // Processar formulário
            console.log('Formulário válido:', data);
            form.submit();
        } else {
            // Mostrar erros
            showFormErrors(errors);
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormErrors(errors) {
    // Limpar erros anteriores
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());

    // Mostrar novos erros
    for (const [field, message] of Object.entries(errors)) {
        const input = document.querySelector(`[name="${field}"]`);
        if (input) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            input.parentNode.appendChild(errorDiv);
        }
    }
} 