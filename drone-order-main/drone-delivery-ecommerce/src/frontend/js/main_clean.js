// Fixed main.js - Navigation and Cart functions
console.log('Loading main.js with fixes...');

// --- Chọn vị trí giao hàng trên bản đồ (checkout) ---
let deliveryMap, deliveryMarker, selectedLatLng;

function openDeliveryMapPopup() {
    document.getElementById('deliveryMapPopup').style.display = 'flex';
    setTimeout(() => {
        if (!deliveryMap) {
            deliveryMap = L.map('deliveryMap').setView([21.0285, 105.8542], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(deliveryMap);
            deliveryMap.on('click', function(e) {
                if (deliveryMarker) deliveryMap.removeLayer(deliveryMarker);
                deliveryMarker = L.marker(e.latlng).addTo(deliveryMap);
                selectedLatLng = e.latlng;
            });
        } else {
            deliveryMap.invalidateSize();
        }
    }, 200);
}

function closeDeliveryMapPopup() {
    document.getElementById('deliveryMapPopup').style.display = 'none';
}

function confirmDeliveryLocation() {
    if (selectedLatLng) {
        document.getElementById('deliveryLat').value = selectedLatLng.lat.toFixed(6);
        document.getElementById('deliveryLng').value = selectedLatLng.lng.toFixed(6);
        closeDeliveryMapPopup();
    } else {
        alert('Vui lòng chọn vị trí trên bản đồ!');
    }
}

// Products data
const products = [
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
    },
    {
        id: 6,
        name: "iPad Pro M2",
        price: 29990000,
        image: "fas fa-tablet-alt",
        category: "electronics",
        description: "Máy tính bảng chuyên nghiệp"
    },
    {
        id: 7,
        name: "Sony WH-1000XM5",
        price: 8990000,
        image: "fas fa-headphones",
        category: "accessories",
        description: "Tai nghe chống ồn hàng đầu"
    },
    {
        id: 8,
        name: "Apple Watch Series 9",
        price: 9990000,
        image: "fas fa-clock",
        category: "accessories",
        description: "Đồng hồ thông minh với tính năng sức khỏe"
    }
];

// Drones data
const drones = [
    {
        id: 'drone-001',
        name: "SkyDelivery Pro X1",
        manufacturer: "TechCorp",
        status: "available",
        battery: 85,
        speed: "45 km/h",
        altitude: "500m",
        range: "25 km",
        maxWeight: 5,
        homeBase: "Sân bay Tân Sơn Nhất",
        baseAddress: "Đường Trường Sơn, Phường 2, Quận Tân Bình, TP.HCM",
        baseCoords: [10.8188, 106.6519]
    },
    {
        id: 'drone-002',
        name: "AeroCarrier MAX",
        manufacturer: "SkyTech",
        status: "available",
        battery: 92,
        speed: "40 km/h",
        altitude: "600m",
        range: "30 km",
        maxWeight: 10,
        homeBase: "Trung tâm Logistics Quận 7",
        baseAddress: "Đường Nguyễn Thị Thập, Phường Tân Phú, Quận 7, TP.HCM",
        baseCoords: [10.7308, 106.7188]
    },
    {
        id: 'drone-003',
        name: "QuickFly Express",
        manufacturer: "RoboFly",
        status: "busy",
        battery: 67,
        speed: "60 km/h",
        altitude: "400m",
        range: "20 km",
        maxWeight: 3,
        homeBase: "Kho Bình Thạnh",
        baseAddress: "Đường Điện Biên Phủ, Phường 15, Quận Bình Thạnh, TP.HCM",
        baseCoords: [10.8016, 106.7100]
    },
    {
        id: 'drone-004',
        name: "HeavyLift Cargo",
        manufacturer: "DroneMax",
        status: "available",
        battery: 78,
        speed: "35 km/h",
        altitude: "450m",
        range: "35 km",
        maxWeight: 15,
        homeBase: "Cảng Cát Lái",
        baseAddress: "Đường Mai Chí Thọ, Phường Cát Lái, Quận 2, TP.HCM",
        baseCoords: [10.7769, 106.7644]
    }
];

// User authentication
let currentPage = 'home';

// Check authentication for protected pages
function checkAuth(event, role) {
    if (!window.authFunctions || !window.authFunctions.isLoggedIn()) {
        event.preventDefault();
        if (window.showLoginModal) {
            window.showLoginModal();
        }
        return false;
    }
    
    if (role === 'admin' && window.currentUser && window.currentUser.role !== 'admin') {
        alert('Bạn không có quyền truy cập!');
        return false;
    }
    
    return true;
}

// Cart functions
// Get cart key for current user
function getCartKey() {
    const currentUser = window.currentUser;
    if (currentUser && currentUser.id) {
        return `cart_${currentUser.id}`;
    }
    return 'cart_guest'; // For guest users
}

// Get current user's cart
function getUserCart() {
    return JSON.parse(localStorage.getItem(getCartKey()) || '[]');
}

// Save current user's cart
function saveUserCart(cart) {
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
}

// Clear all cart data (for logout)
function clearAllCartData() {
    // Remove guest cart
    localStorage.removeItem('cart_guest');
    // Remove the old 'cart' key if it exists
    localStorage.removeItem('cart');
    
    // Remove current user's cart
    const currentUser = window.currentUser;
    if (currentUser && currentUser.id) {
        localStorage.removeItem(`cart_${currentUser.id}`);
    }
}

function addToCart(productId) {
    // Create mock user if not logged in
    if (!window.currentUser) {
        window.currentUser = {
            id: 'guest_user',
            name: 'Guest User',
            email: ''
        };
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        alert('Sản phẩm không tìm thấy!');
        return;
    }
    
    let cart = getUserCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        alert(`Đã tăng số lượng ${product.name} thành ${existingItem.quantity}`);
    } else {
        cart.push({ ...product, quantity: 1 });
        alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    }
    
    saveUserCart(cart);
    updateCartCount();
}

function updateCartCount() {
    const cart = getUserCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Simple notification fallback
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // Simple alert for now - can be enhanced later
    if (type === 'error') {
        alert('❌ ' + message);
    } else if (type === 'success') {
        alert('✅ ' + message);
    } else {
        alert('ℹ️ ' + message);
    }
}

// Remove from cart
function removeFromCart(productId) {
    let cart = getUserCart();
    cart = cart.filter(item => item.id !== productId);
    saveUserCart(cart);
    loadCart();
    updateCartCount();
}

// Update quantity in cart
function updateQuantity(productId, quantity) {
    let cart = getUserCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveUserCart(cart);
        loadCart();
        updateCartCount();
    }
}

// Format price function
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Load featured products on home page
function loadFeaturedProducts() {
    console.log('loadFeaturedProducts called');
    const container = document.getElementById('productGrid');
    console.log('Product grid container:', container);
    
    if (!container) {
        console.log('Product grid container not found, skipping product loading');
        return;
    }
    
    try {
        const featuredProducts = products.slice(0, 4);
        console.log('Featured products:', featuredProducts.length);
        
        container.innerHTML = featuredProducts.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <i class="${product.image}"></i>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <button class="btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                </div>
            </div>
        `).join('');
        
        console.log('Featured products loaded successfully');
    } catch (error) {
        console.error('Error loading featured products:', error);
        if (container) {
            container.innerHTML = '<p style="text-align: center; color: #666;">Đang tải sản phẩm...</p>';
        }
    }
}

// Load all products
function loadAllProducts() {
    console.log('=== loadAllProducts called ===');
    const container = document.getElementById('allProductsGrid');
    console.log('All products container found:', !!container);
    
    if (!container) {
        console.error('All products grid container not found');
        return;
    }
    
    try {
        console.log('Loading', products.length, 'products');
        container.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <i class="${product.image}"></i>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <div class="product-actions">
                        <button class="btn-primary" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        console.log('All products loaded successfully');
    } catch (error) {
        console.error('Error loading all products:', error);
        container.innerHTML = '<p class="error-message">Lỗi tải sản phẩm. Vui lòng thử lại sau.</p>';
    }
}

// Load drones
function loadDrones() {
    console.log('=== loadDrones called ===');
    const container = document.getElementById('dronesGrid');
    console.log('Drones container found:', !!container);
    
    if (!container) {
        console.error('Drones grid container not found');
        return;
    }
    
    try {
        console.log('Loading', drones.length, 'drones');
        container.innerHTML = drones.map(drone => `
            <div class="drone-card">
                <div class="drone-header">
                    <h3 class="drone-name">${drone.name}</h3>
                    <p class="drone-manufacturer">${drone.manufacturer}</p>
                </div>
                <div class="drone-body">
                    <div class="drone-status ${drone.status}">
                        <i class="fas fa-circle"></i>
                        ${drone.status === 'available' ? 'Sẵn sàng' : 'Đang bay'}
                    </div>
                    
                    <div class="drone-specs">
                        <div class="spec-item">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>${drone.speed}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-route"></i>
                            <span>${drone.range}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-weight-hanging"></i>
                            <span>${drone.maxWeight}kg</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-battery-three-quarters"></i>
                            <span>${drone.battery}%</span>
                        </div>
                    </div>
                    
                    <div class="drone-base">
                        <p class="base-title">
                            <i class="fas fa-map-marker-alt"></i>
                            ${drone.homeBase}
                        </p>
                        <p class="base-address">${drone.baseAddress}</p>
                    </div>
                </div>
            </div>
        `).join('');
        console.log('Drones loaded successfully');
    } catch (error) {
        console.error('Error loading drones:', error);
        container.innerHTML = '<p class="error-message">Lỗi tải thông tin drone. Vui lòng thử lại sau.</p>';
    }
}

// Load cart
function loadCart() {
    const container = document.getElementById('cartItems');
    const summaryElement = document.getElementById('cartSummary');
    
    if (!container) return;
    
    const cart = getUserCart();
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
        if (summaryElement) summaryElement.style.display = 'none';
        return;
    }
    
    let total = 0;
    
    container.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <i class="${item.image}"></i>
                    <div>
                        <h4>${item.name}</h4>
                        <p>${formatPrice(item.price)}</p>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">
                    ${formatPrice(itemTotal)}
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');
    
    // Show summary and update total
    if (summaryElement) summaryElement.style.display = 'block';
    
    const totalAmountElement = document.getElementById('totalAmount');
    if (totalAmountElement) {
        totalAmountElement.textContent = formatPrice(total);
    }
}

// Proceed to checkout page
function proceedToCheckout() {
    // Create mock user if not logged in
    if (!window.currentUser) {
        window.currentUser = {
            id: 'guest_user',
            name: 'Guest User',
            email: ''
        };
    }
    
    const cart = getUserCart();
    if (cart.length === 0) {
        alert('Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.');
        return;
    }
    
    // Save draft order before proceeding to checkout
    saveDraftOrder(cart);
    
    // Switch to checkout page
    if (window.showPage) {
        window.showPage('checkout');
    }
    loadCheckoutPage();
}

// Save draft order (temporary order for 10 minutes)
function saveDraftOrder(cartItems) {
    if (!window.currentUser || !cartItems || cartItems.length === 0) return;
    
    const draftOrder = {
        id: 'draft_' + Date.now(),
        userId: window.currentUser.id,
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        createdAt: Date.now(),
        expiresAt: Date.now() + (10 * 60 * 1000), // 10 minutes from now
        status: 'draft'
    };
    
    const draftOrders = JSON.parse(localStorage.getItem('draftOrders') || '[]');
    
    // Remove existing draft for this user
    const filteredDrafts = draftOrders.filter(order => order.userId !== window.currentUser.id);
    
    // Add new draft
    filteredDrafts.push(draftOrder);
    
    localStorage.setItem('draftOrders', JSON.stringify(filteredDrafts));
    
    console.log('Draft order saved for 10 minutes');
}

// Load checkout page with cart data
function loadCheckoutPage() {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    const subtotalElement = document.getElementById('subtotal');
    const finalTotalElement = document.getElementById('finalTotal');
    
    if (!checkoutItemsContainer) return;
    
    const cart = getUserCart();
    const currentUser = window.currentUser;
    
    // Pre-fill customer info if available
    if (currentUser) {
        const nameField = document.getElementById('customerName');
        const emailField = document.getElementById('customerEmail');
        
        if (nameField) nameField.value = currentUser.name || '';
        if (emailField) emailField.value = currentUser.email || '';
    }
    
    // Calculate totals
    let subtotal = 0;
    
    // Display checkout items
    checkoutItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="checkout-item">
                <div class="item-image">
                    <i class="${item.image}"></i>
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">${formatPrice(item.price)} x ${item.quantity}</p>
                </div>
                <div class="item-total">
                    ${formatPrice(itemTotal)}
                </div>
            </div>
        `;
    }).join('');
    
    // Update totals
    const shippingFee = 0; // Free shipping
    const discount = 0;
    const finalTotal = subtotal + shippingFee - discount;
    
    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (finalTotalElement) finalTotalElement.textContent = formatPrice(finalTotal);
    
    console.log('Checkout data prepared');
}

// Logout function
function logout() {
    // Clear cart data before logout
    clearAllCartData();
    
    localStorage.removeItem('currentUser');
    window.currentUser = null;
    if (window.authFunctions && window.authFunctions.updateAuthUI) {
        window.authFunctions.updateAuthUI();
    }
    updateCartCount(); // Reset cart count to 0
    if (window.showPage) {
        window.showPage('home');
    }
}

// Initialize when the document is ready
window.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js loaded - updating cart count');
    updateCartCount();
});

// Make functions globally accessible
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.proceedToCheckout = proceedToCheckout;
window.loadFeaturedProducts = loadFeaturedProducts;
window.loadAllProducts = loadAllProducts;
window.loadDrones = loadDrones;
window.loadCart = loadCart;
window.loadCheckoutPage = loadCheckoutPage;
window.updateCartCount = updateCartCount;
window.logout = logout;

console.log('Main.js functions loaded and made globally accessible');
