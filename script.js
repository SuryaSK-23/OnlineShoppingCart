// Inventory data matching your Java Shop items & categories
let products = [
    { id: 1, name: "Formal Shirt", category: "Clothes", subCategory: "Shirt", price: 899, inStock: 10 },
    { id: 2, name: "Graphic T-shirt", category: "Clothes", subCategory: "T-shirt", price: 499, inStock: 10 },
    { id: 3, name: "Denim Pants", category: "Clothes", subCategory: "Pant", price: 999, inStock: 5 },
    { id: 4, name: "Suit Blazer", category: "Clothes", subCategory: "Formal", price: 2499, inStock: 4 },
    { id: 5, name: "Fresh Apples", category: "Foods", subCategory: "Fruits", price: 199, inStock: 15 },
    { id: 6, name: "Organic Carrots", category: "Foods", subCategory: "Vegetables", price: 90, inStock: 20 },
    { id: 7, name: "Canned Beans", category: "Foods", subCategory: "Canned Food", price: 150, inStock: 12 },
    { id: 8, name: "Rasgulla Box", category: "Foods", subCategory: "Sweets", price: 350, inStock: 8 },
    { id: 9, name: "Lenovo IdeaPad", category: "Electronics", subCategory: "Laptop", price: 60000, inStock: 5 },
    { id: 10, name: "iPhone 15", category: "Electronics", subCategory: "Phones", price: 79999, inStock: 7 },
    { id: 11, name: "Boat Earbuds", category: "Electronics", subCategory: "Ear-buds", price: 999, inStock: 15 },
    { id: 12, name: "Sony Headphones", category: "Electronics", subCategory: "Headphones", price: 2999, inStock: 6 },
    { id: 13, name: "Ballpoint Pen", category: "Stationery", subCategory: "Pen", price: 20, inStock: 50 },
    { id: 14, name: "Java Programming Book", category: "Stationery", subCategory: "Books", price: 450, inStock: 10 },
    { id: 15, name: "Graphite Pencil", category: "Stationery", subCategory: "Pencil", price: 10, inStock: 40 },
    { id: 16, name: "Watercolour Set", category: "Stationery", subCategory: "Colours", price: 250, inStock: 12 }
];

let cart = [];
let userBalance = 0;
let currentFilter = 'All';

// Handle initial balance input and enter store
function enterStore() {
    const inputVal = document.getElementById('initial-balance-input').value;
    const parsedBalance = parseFloat(inputVal);

    if (isNaN(parsedBalance) || parsedBalance < 0) {
        showToast("Please enter a valid wallet balance!", "❌");
        return;
    }

    userBalance = parsedBalance;
    document.getElementById('user-balance').innerText = `₹${userBalance.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
    
    // Hide the balance setup modal
    document.getElementById('balance-modal').classList.add('hidden');
    
    // Render store products
    renderProducts();
    showToast(`Welcome! Wallet loaded with ₹${userBalance.toLocaleString('en-IN')}`, "🎉");
}

// Render Products Grid
function renderProducts(category = 'All') {
    currentFilter = category;
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const filtered = category === 'All' ? products : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

    filtered.forEach(p => {
        const isOut = p.inStock <= 0;
        const card = document.createElement('div');
        card.className = `bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col justify-between shadow-lg hover:border-indigo-500 transition`;
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-2">
                    <span class="text-xs uppercase tracking-wider bg-indigo-900/60 text-indigo-300 px-2.5 py-1 rounded-md font-semibold">${p.category}</span>
                    <span class="text-xs text-slate-400">ID: ${p.id}</span>
                </div>
                <h3 class="text-lg font-bold text-white mb-1">${p.name}</h3>
                <p class="text-sm text-slate-400 mb-4">Sub: <span class="text-slate-200">${p.subCategory}</span></p>
            </div>
            <div>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-xl font-bold text-emerald-400">₹${p.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                    <span class="text-xs font-medium ${isOut ? 'text-rose-400 bg-rose-950/50 px-2 py-1 rounded' : 'text-slate-300'}">InStock: ${p.inStock}</span>
                </div>
                <button onclick="addToCart(${p.id})" ${isOut ? 'disabled' : ''} class="w-full py-2.5 rounded-lg font-medium transition ${isOut ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}">
                    ${isOut ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Category Filter Tabs Update
function filterCategory(cat) {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        if (btn.innerText.includes(cat) || (cat === 'All' && btn.innerText.includes('All'))) {
            btn.className = "cat-btn px-5 py-2 rounded-lg font-medium bg-indigo-600 text-white transition shadow";
        } else {
            btn.className = "cat-btn px-5 py-2 rounded-lg font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition";
        }
    });
    renderProducts(cat);
}

// Add to Cart logic with stock safeguard
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product || product.inStock <= 0) {
        showToast("Item is out of stock!", "❌");
        return;
    }

    product.inStock--;
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    renderProducts(currentFilter);
    showToast(`${product.name} added to cart successfully!`, "✅");
}

// Remove item from cart and return stock
function removeFromCart(id) {
    const cartIndex = cart.findIndex(item => item.id === id);
    if (cartIndex > -1) {
        const item = cart[cartIndex];
        const product = products.find(p => p.id === id);
        if (product) {
            product.inStock += item.quantity;
        }
        cart.splice(cartIndex, 1);
        updateCartUI();
        renderProducts(currentFilter);
        showToast("Item removed from cart.", "🗑️");
    }
}

// Clear entire cart
function clearCart() {
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) product.inStock += item.quantity;
    });
    cart = [];
    updateCartUI();
    renderProducts(currentFilter);
    showToast("Cart cleared.", "🧹");
}

// Update Cart Drawer UI
function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge');
    const totalEl = document.getElementById('cart-total');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = totalItems;

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-slate-400 text-center py-8">Your cart is empty.</p>`;
        totalEl.innerText = "₹0.00";
        return;
    }

    container.innerHTML = '';
    let grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        const div = document.createElement('div');
        div.className = "bg-slate-700/50 p-3 rounded-lg border border-slate-600 flex justify-between items-center";
        div.innerHTML = `
            <div>
                <h4 class="font-semibold text-white">${item.name}</h4>
                <p class="text-xs text-slate-400">Qty: ${item.quantity} × ₹${item.price}</p>
            </div>
            <div class="flex items-center space-x-3">
                <span class="font-bold text-emerald-400">₹${itemTotal.toLocaleString('en-IN')}</span>
                <button onclick="removeFromCart(${item.id})" class="text-rose-400 hover:text-rose-300 font-bold px-2 py-1">&times;</button>
            </div>
        `;
        container.appendChild(div);
    });

    totalEl.innerText = `₹${grandTotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
}

// Checkout Process with Balance Validation
function checkout() {
    if (cart.length === 0) {
        showToast("Your cart is empty!", "⚠️");
        return;
    }

    const grandTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (userBalance < grandTotal) {
        showToast("Not enough balance in wallet!", "❌");
        return;
    }

    userBalance -= grandTotal;
    document.getElementById('user-balance').innerText = `₹${userBalance.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
    
    cart = [];
    updateCartUI();
    renderProducts(currentFilter);
    toggleCartModal();
    showToast("Payment successful! Order placed.", "🎉");
}

// Toggle Cart Modal Sidebar
function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

// Toast Notification Helper
function showToast(message, icon = "✅") {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').innerText = message;
    document.getElementById('toast-icon').innerText = icon;

    toast.classList.remove('translate-y-32', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-32', 'opacity-0');
    }, 3000);
}