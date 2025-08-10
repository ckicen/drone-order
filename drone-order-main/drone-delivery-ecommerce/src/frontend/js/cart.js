// src/frontend/js/cart.js

let cart = [];

// Get current user's cart key
function getCartKey() {
    const currentUser = window.currentUser;
    return currentUser ? `cart_${currentUser.id}` : 'cart_guest';
}

// Load cart from local storage
function loadCart() {
    console.log('loadCart called');
    const cartKey = getCartKey();
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) {
        cart = JSON.parse(storedCart);
    } else {
        cart = [];
    }
    updateCartDisplay();
    updateCartCount();
}

// Save cart to local storage
function saveCart() {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(productOrId) {
    console.log('Adding to cart:', productOrId);

    let product;

    // Check if it's a product object or just an ID
    if (typeof productOrId === 'object' && productOrId !== null) {
        product = productOrId;
    } else {
        // It's an ID, find the product from the products array
        const productId = productOrId;
        // Try to get products from main.js
        if (window.products && Array.isArray(window.products)) {
            product = window.products.find(p => p.id == productId);
        } else {
            // Fallback: get from main.js products constant
            const mainProducts = [
                {
                    id: 1,
                    name: "iPhone 15 Pro",
                    price: 25990000,
                    image: "fas fa-mobile-alt",
                    category: "electronics",
                    description: "Điện thoại thông minh cao cấp với chip A17 Pro"
                },
                {
                    id: 2,
                    name: "MacBook Pro M3",
                    price: 45990000,
                    image: "fas fa-laptop",
                    category: "electronics",
                    description: "Laptop chuyên nghiệp với chip M3 mạnh mẽ"
                },
                {
                    id: 3,
                    name: "AirPods Pro",
                    price: 5990000,
                    image: "fas fa-headphones",
                    category: "accessories",
                    description: "Tai nghe không dây với chống ồn chủ động"
                },
                {
                    id: 4,
                    name: "Canon EOS R5",
                    price: 89990000,
                    image: "fas fa-camera",
                    category: "camera",
                    description: "Máy ảnh mirrorless chuyên nghiệp"
                },
                {
                    id: 5,
                    name: "Samsung Galaxy S24",
                    price: 22990000,
                    image: "fas fa-mobile-alt",
                    category: "electronics",
                    description: "Điện thoại thông minh với AI tiên tiến"
                }
            ];
            product = mainProducts.find(p => p.id == productId);
        }
    }

    if (!product) {
        console.error('Product not found:', productOrId);
        alert('Sản phẩm không tìm thấy!');
        return;
    }

    const existingItem = cart.find(item => item.id == product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartDisplay();

    // Show notification
    if (typeof showNotification === 'function') {
        showNotification(`Đã thêm ${product.name} vào giỏ hàng!`, 'success');
    } else {
        alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
    } else if (item && newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    saveCart();
    updateCartDisplay();
}

// Update cart count in navigation
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        console.log('Cart count updated:', totalItems);
    }
}

// Update cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) {
        console.log('Cart container not found');
        return;
    }

    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Giỏ hàng trống</h3>
                <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                <button class="btn-primary" onclick="showPage('products')">Mua sắm ngay</button>
            </div>
        `;
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <i class="fas fa-mobile-alt"></i>
            </div>
            <div class="cart-item-info">
                <h4>${item.name || 'Sản phẩm'}</h4>
                <div class="cart-item-price">${(item.price || 0).toLocaleString('vi-VN')} đ</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display">${item.quantity || 1}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    // Update total
    const cartSummary = document.getElementById('cartSummary');
    if (cartSummary) {
        const total = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
        cartSummary.innerHTML = `
            <div class="cart-total">
                <h3>Tổng cộng: ${total.toLocaleString('vi-VN')} đ</h3>
                <button class="checkout-btn btn-primary" onclick="proceedToCheckout()">
                    Thanh toán
                </button>
            </div>
        `;
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }

    if (!window.currentUser) {
        alert('Vui lòng đăng nhập để thanh toán!');
        showLoginModal();
        return;
    }

    showPage('checkout');
}

// Clear all cart data (for logout)
function clearAllCartData() {
    cart = [];
    updateCartDisplay();
    updateCartCount();
}

// Make functions globally accessible
window.loadCart = loadCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.updateCartCount = updateCartCount;
window.updateCartDisplay = updateCartDisplay;
window.proceedToCheckout = proceedToCheckout;
window.clearAllCartData = clearAllCartData;

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log('Cart.js loaded');
    loadCart();
});