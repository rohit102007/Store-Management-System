class Cart {
    constructor() {
        this.items = [];
        this.modal = document.getElementById('cartModal');
        this.itemsContainer = document.getElementById('cartItems');
        this.totalElement = document.getElementById('cartTotal');
        this.countElement = document.getElementById('cartCount');
        this.checkoutButton = document.getElementById('checkoutButton');
        
        // Initialize event listeners
        document.getElementById('cartButton').addEventListener('click', () => this.open());
        document.getElementById('closeCart').addEventListener('click', () => this.close());
        this.checkoutButton.addEventListener('click', () => this.checkout());
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ product, quantity: 1 });
        }
        
        this.updateCart();
        this.showToast('Added to cart');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateCart();
        this.showToast('Item removed from cart');
    }

    updateQuantity(productId, change) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity = Math.max(0, item.quantity + change);
            if (item.quantity === 0) {
                this.removeItem(productId);
            } else {
                this.updateCart();
            }
        }
    }

    updateCart() {
        // Update cart count
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        this.countElement.textContent = totalItems;
        this.countElement.classList.toggle('hidden', totalItems === 0);

        // Update cart items display
        this.itemsContainer.innerHTML = this.items.length === 0 
            ? '<p class="text-center text-gray-500">Your cart is empty</p>'
            : this.items.map(item => this.createCartItemHTML(item)).join('');

        // Update total
        const total = this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        this.totalElement.textContent = total.toLocaleString('en-IN');

        // Update checkout button state
        this.checkoutButton.disabled = this.items.length === 0;
    }

    createCartItemHTML(item) {
        return `
            <div class="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg mb-4">
                <img src="${item.product.image}" alt="${item.product.name}" class="w-20 h-20 object-cover rounded">
                <div class="flex-1">
                    <h3 class="font-semibold">${item.product.name}</h3>
                    <div class="flex items-center mt-1">
                        <i data-lucide="indian-rupee" class="w-4 h-4 mr-1"></i>
                        <span>${item.product.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="flex items-center mt-2">
                        <button onclick="cart.updateQuantity(${item.product.id}, -1)" class="p-1 hover:bg-gray-200 rounded">
                            <i data-lucide="minus" class="w-4 h-4"></i>
                        </button>
                        <span class="mx-2">${item.quantity}</span>
                        <button onclick="cart.updateQuantity(${item.product.id}, 1)" class="p-1 hover:bg-gray-200 rounded">
                            <i data-lucide="plus" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
                <button onclick="cart.removeItem(${item.product.id})" class="text-red-500 hover:text-red-700">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
        `;
    }

    open() {
        this.modal.classList.remove('hidden');
        this.updateCart();
    }

    close() {
        this.modal.classList.add('hidden');
    }

    checkout() {
        this.showToast('Redirecting to payment gateway...');
        setTimeout(() => {
            window.location.href = '';
        }, 2000);
        setTimeout(() => {
            this.items = [];
            this.updateCart();
            this.close();
            this.showToast('Thank you for your purchase!');
        }, 2000);
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

const cart = new Cart();