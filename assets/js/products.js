// Configuração dos produtos
const products = [
    {
        id: 1,
        name: 'Pacote Básico',
        price: 19.90,
        robux: 400,
        image: 'assets/img/basic.svg',
        description: 'Ideal para iniciantes'
    },
    {
        id: 2,
        name: 'Pacote Premium',
        price: 49.90,
        robux: 1000,
        image: 'assets/img/premium.svg',
        description: 'Mais popular'
    },
    {
        id: 3,
        name: 'Pacote Pro',
        price: 99.90,
        robux: 2500,
        image: 'assets/img/pro.svg',
        description: 'Melhor custo-benefício'
    },
    {
        id: 4,
        name: 'Pacote Ultimate',
        price: 199.90,
        robux: 6000,
        image: 'assets/img/ultimate.svg',
        description: 'Para jogadores avançados'
    }
];

// Função para renderizar os produtos
function renderProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <div class="product-robux">${product.robux} Robux</div>
                <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');

    // Adicionar eventos aos botões
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
        });
    });
}

// Função para adicionar ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Animação de feedback
    const button = document.querySelector(`[data-product-id="${productId}"] .add-to-cart`);
    button.classList.add('adding');
    setTimeout(() => button.classList.remove('adding'), 1000);

    // Adicionar ao carrinho (implementar lógica do carrinho)
    console.log(`Produto ${product.name} adicionado ao carrinho`);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

// Animações de hover
document.addEventListener('mouseover', (e) => {
    const productCard = e.target.closest('.product-card');
    if (productCard) {
        const image = productCard.querySelector('.product-image');
        image.style.transform = 'scale(1.05)';
    }
});

document.addEventListener('mouseout', (e) => {
    const productCard = e.target.closest('.product-card');
    if (productCard) {
        const image = productCard.querySelector('.product-image');
        image.style.transform = 'scale(1)';
    }
}); 