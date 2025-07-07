// Gerenciamento de autenticação
const auth = {
    // Estado do usuário
    user: null,
    
    // Inicialização
    init() {
        this.loadUser();
        this.setupAuthListeners();
    },
    
    // Carregar usuário do localStorage
    loadUser() {
        const userData = localStorage.getItem('user');
        if (userData) {
            this.user = JSON.parse(userData);
            this.updateUI();
        }
    },
    
    // Configurar listeners de autenticação
    setupAuthListeners() {
        // Login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.login();
            });
        }
        
        // Registro
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.register();
            });
        }
        
        // Logout
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }
    },
    
    // Login
    async login() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            // Simulação de API
            const response = await this.mockLoginAPI(email, password);
            
            if (response.success) {
                this.user = response.user;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.updateUI();
                window.location.href = '/';
            } else {
                this.showError(response.message);
            }
        } catch (error) {
            this.showError('Erro ao fazer login. Tente novamente.');
        }
    },
    
    // Registro
    async register() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            this.showError('As senhas não coincidem.');
            return;
        }
        
        try {
            // Simulação de API
            const response = await this.mockRegisterAPI(name, email, password);
            
            if (response.success) {
                this.user = response.user;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.updateUI();
                window.location.href = '/';
            } else {
                this.showError(response.message);
            }
        } catch (error) {
            this.showError('Erro ao criar conta. Tente novamente.');
        }
    },
    
    // Logout
    logout() {
        this.user = null;
        localStorage.removeItem('user');
        this.updateUI();
        window.location.href = '/';
    },
    
    // Atualizar UI baseado no estado de autenticação
    updateUI() {
        const authButtons = document.querySelector('.nav-buttons');
        if (!authButtons) return;
        
        if (this.user) {
            authButtons.innerHTML = `
                <span class="user-name">Olá, ${this.user.name}</span>
                <a href="pages/cart.html" class="btn btn-outline">Carrinho</a>
                <button class="btn btn-primary logout-btn">Sair</button>
            `;
        } else {
            authButtons.innerHTML = `
                <a href="pages/cart.html" class="btn btn-outline">Carrinho</a>
                <a href="pages/login.html" class="btn btn-primary">Login</a>
            `;
        }
    },
    
    // Mostrar erro
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const form = document.querySelector('form');
        form.insertBefore(errorDiv, form.firstChild);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    },
    
    // Simulação de API de login
    mockLoginAPI(email, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulação de validação
                if (email === 'teste@teste.com' && password === '123456') {
                    resolve({
                        success: true,
                        user: {
                            id: 1,
                            name: 'Usuário Teste',
                            email: email
                        }
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Email ou senha inválidos.'
                    });
                }
            }, 1000);
        });
    },
    
    // Simulação de API de registro
    mockRegisterAPI(name, email, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulação de validação
                if (email && password) {
                    resolve({
                        success: true,
                        user: {
                            id: Date.now(),
                            name: name,
                            email: email
                        }
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Dados inválidos.'
                    });
                }
            }, 1000);
        });
    }
};

// Inicializar autenticação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    auth.init();
}); 