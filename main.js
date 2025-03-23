document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize store page if we're on it
    const storeContainer = document.getElementById('storeProducts');
    if (storeContainer) {
        initializeStore(storeContainer);
    }
});

function initializeStore(container) {
    container.innerHTML = products.map(product => `
        <div class="product-card bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl cursor-pointer"
             onclick="showProductModal(${product.id})">
            <div class="relative h-48 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <div class="flex items-center mb-2">
                    <i data-lucide="indian-rupee" class="w-4 h-4 mr-1"></i>
                    <span class="text-lg font-bold">${product.price.toLocaleString('en-IN')}</span>
                </div>
                <button
                    onclick="event.stopPropagation(); cart.addItem(${JSON.stringify(product).replace(/"/g, '&quot;')})"
                    class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Reinitialize icons for the new content
    lucide.createIcons();
}

function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-2xl w-full relative">
            <button onclick="this.closest('.fixed').remove()" class="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div class="relative h-64 md:h-full">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover rounded-lg">
                </div>
                <div>
                    <h2 class="text-2xl font-bold mb-4">${product.name}</h2>
                    <div class="flex items-center mb-4">
                        <i data-lucide="indian-rupee" class="w-5 h-5 mr-1"></i>
                        <span class="text-2xl font-bold">${product.price.toLocaleString('en-IN')}</span>
                    </div>
                    <p class="text-gray-600 mb-6">${product.description}</p>
                    <div class="space-y-4">
                        <p class="text-sm text-gray-500">Category: ${product.category}</p>
                        <button
                            onclick="cart.addItem(${JSON.stringify(product).replace(/"/g, '&quot;')}); this.closest('.fixed').remove()"
                            class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    lucide.createIcons();
}