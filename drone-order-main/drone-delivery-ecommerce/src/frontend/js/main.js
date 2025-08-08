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
            deliveryMap.on('click', function (e) {
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

// Show page function for SPA
function showPage(pageName) {
    console.log('=== showPage called with:', pageName);
    console.log('Current currentPage:', currentPage);

    try {
        // Hide all pages
        const pages = document.querySelectorAll('.page-content');
        console.log('Found pages:', pages.length);
        pages.forEach(page => {
            console.log('Hiding page:', page.id);
            page.style.display = 'none';
        });

        // Change body background based on page
        const body = document.body;
        if (pageName === 'products' || pageName === 'drones') {
            body.style.background = 'white';
            console.log('Set white background for:', pageName);
        } else {
            body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            console.log('Set gradient background for:', pageName);
        }

        // Show selected page
        const selectedPage = document.getElementById(pageName + 'Page');
        console.log('Looking for page:', pageName + 'Page');
        console.log('Selected page element:', selectedPage);

        if (selectedPage) {
            selectedPage.style.display = 'block';
            currentPage = pageName;
            console.log('Page displayed:', pageName);

            // Ensure the page is properly visible
            selectedPage.style.visibility = 'visible';
            selectedPage.style.opacity = '1';

            // Update navigation active state
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));

            const activeLink = document.querySelector(`[data-page="${pageName}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            // Handle homepage sections specifically
            const heroSection = document.querySelector('.hero');
            const featuresSection = document.querySelector('.features');
            const featuredProductsSection = document.querySelector('.featured-products');

            console.log('Checking pageName:', pageName, 'against "home"');
            if (pageName === 'home') {
                console.log('=== SHOWING HOME PAGE SECTIONS ===');
                // Show homepage sections
                if (heroSection) {
                    heroSection.style.display = 'flex';
                    heroSection.style.visibility = 'visible';
                    heroSection.style.opacity = '1';
                    console.log('Hero section shown');
                }
                if (featuresSection) {
                    featuresSection.style.display = 'block';
                    featuresSection.style.visibility = 'visible';
                    featuresSection.style.opacity = '1';
                    console.log('Features section shown');
                }
                if (featuredProductsSection) {
                    featuredProductsSection.style.display = 'block';
                    featuredProductsSection.style.visibility = 'visible';
                    featuredProductsSection.style.opacity = '1';
                    console.log('Featured products section shown');
                }
            } else {
                console.log('=== HIDING HOME PAGE SECTIONS (not home page) ===');
                console.log('Current page is:', pageName);
                // Hide homepage sections for other pages (especially products/drones)
                if (heroSection) {
                    heroSection.style.display = 'none';
                    heroSection.style.visibility = 'hidden';
                    heroSection.style.opacity = '0';
                    console.log('Hero section hidden for', pageName);
                }
                if (featuresSection) {
                    featuresSection.style.display = 'none';
                    featuresSection.style.visibility = 'hidden';
                    featuresSection.style.opacity = '0';
                    console.log('Features section hidden for', pageName);
                }
                if (featuredProductsSection) {
                    featuredProductsSection.style.display = 'none';
                    featuredProductsSection.style.visibility = 'hidden';
                    featuredProductsSection.style.opacity = '0';
                    console.log('Featured products section hidden for', pageName);
                }
                console.log('Hidden homepage sections for non-home page');
            }

            // Load page content
            console.log('Loading page content for:', pageName);
            loadPageContent(pageName);

        } else {
            console.error('Page not found:', pageName + 'Page');
            // List all available pages
            const allPages = document.querySelectorAll('[id$="Page"]');
            console.log('Available pages:');
            allPages.forEach(page => console.log(' -', page.id));
        }

    } catch (error) {
        console.error('Error in showPage:', error);
        console.error('Attempting to show page:', pageName);
    }
}

// Load content for each page
function loadPageContent(pageName) {
    console.log('Loading content for page:', pageName);

    switch (pageName) {
        case 'home':
            console.log('Loading featured products...');
            loadFeaturedProducts();
            break;
        case 'products':
            console.log('Loading all products...');
            loadAllProducts();
            break;
        case 'drones':
            console.log('Loading drones...');
            loadDrones();
            break;
        case 'cart':
            console.log('Loading cart...');
            // Use cart.js loadCart function instead of main.js
            if (window.loadCart) {
                window.loadCart();
            } else {
                loadCart();
            }
            break;
        case 'checkout':
            console.log('Loading checkout page...');
            loadCheckoutPage();
            // Initialize simple delivery map for checkout page
            setTimeout(() => {
                console.log('Initializing simple delivery map for checkout page...');
                initializeSimpleDeliveryMap();
            }, 500);
            break;
        case 'profile':
            console.log('Loading profile...');
            // loadProfile();
            break;
        case 'orders':
            console.log('Loading orders...');
            loadOrders();
            break;
        case 'admin':
            console.log('Loading admin content...');
            loadAdminContent();
            break;
    }
}

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

    // Use cart.js addToCart function if available
    if (window.addToCart && window.addToCart !== addToCart) {
        window.addToCart(product);
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
window.addEventListener('DOMContentLoaded', function () {
    console.log('Main.js loaded - updating cart count');
    updateCartCount();

    // Auto-load admin content if we're on admin dashboard page
    if (window.location.pathname.includes('admin/dashboard.html') ||
        window.location.pathname.includes('admin\\dashboard.html')) {
        console.log('Admin dashboard detected, auto-loading dashboard content...');
        setTimeout(() => {
            loadDashboardContent();
        }, 500); // Small delay to ensure all scripts are loaded
    } else if (document.getElementById('adminContent')) {
        console.log('Admin page detected, auto-loading admin content...');
        setTimeout(() => {
            if (typeof loadAdminContent === 'function') {
                loadAdminContent();
            }
        }, 500);
    }
});

// Initialize simple delivery map for checkout
function initializeSimpleDeliveryMap() {
    console.log('Initializing simple delivery map...');

    const mapContainer = document.getElementById('deliveryLocationMap');
    if (!mapContainer) {
        console.log('Map container not found');
        return;
    }

    // Ensure container is visible and has dimensions
    mapContainer.style.height = '300px';
    mapContainer.style.width = '100%';
    mapContainer.style.border = '1px solid #ccc';
    mapContainer.style.borderRadius = '8px';

    try {
        // Initialize map with Ho Chi Minh City center
        const map = L.map('deliveryLocationMap').setView([10.762622, 106.660172], 13);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        let marker;

        // Add click handler for map
        map.on('click', function (e) {
            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker(e.latlng).addTo(map);

            // Update hidden inputs
            document.getElementById('deliveryLat').value = e.latlng.lat.toFixed(6);
            document.getElementById('deliveryLng').value = e.latlng.lng.toFixed(6);

            console.log('Location selected:', e.latlng);
        });

        console.log('Delivery map initialized successfully');

        // Force map size update
        setTimeout(() => {
            map.invalidateSize();
        }, 500);

    } catch (error) {
        console.error('Error initializing delivery map:', error);
    }
}

// Process checkout form submission
function processCheckout(event) {
    event.preventDefault();
    console.log('Processing checkout...');

    const form = event.target;
    const formData = new FormData(form);

    // Validate required fields
    const requiredFields = ['customerName', 'customerPhone', 'deliveryAddress', 'deliveryCity'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Vui lòng điền đầy đủ thông tin: ${getFieldLabel(field)}`);
            return;
        }
    }

    // Validate delivery location coordinates
    const deliveryLat = formData.get('deliveryLat');
    const deliveryLng = formData.get('deliveryLng');
    if (!deliveryLat || !deliveryLng) {
        alert('Vui lòng chọn vị trí giao hàng trên bản đồ!');
        document.getElementById('deliveryLocationMap').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        return;
    }

    const cart = getUserCart();
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order object
    const order = {
        id: Date.now(),
        userId: window.currentUser.id,
        customerInfo: {
            name: formData.get('customerName'),
            phone: formData.get('customerPhone'),
            email: formData.get('customerEmail') || ''
        },
        deliveryInfo: {
            address: formData.get('deliveryAddress'),
            city: formData.get('deliveryCity'),
            notes: formData.get('deliveryNotes') || '',
            lat: deliveryLat,
            lng: deliveryLng
        },
        paymentMethod: formData.get('paymentMethod'),
        items: cart,
        subtotal: total,
        shippingFee: 0,
        discount: 0,
        total: total,
        status: 'pending',
        date: new Date().toLocaleString('vi-VN'),
        createdAt: new Date().toISOString()
    };

    console.log('Creating order for user:', window.currentUser.id, order);

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    console.log('Order saved, total orders:', orders.length);

    // Refresh admin map if it exists (so new orders appear immediately)
    if (window.adminDeliveryMap && typeof addOrdersToMap === 'function') {
        console.log('Refreshing admin map with new order');
        addOrdersToMap();
    }

    // Clear user's cart
    saveUserCart([]);
    updateCartCount();

    // Show success popup and redirect
    showOrderSuccessPopup(order);
}

// Get field label for validation
function getFieldLabel(fieldName) {
    const labels = {
        'customerName': 'Họ và tên',
        'customerPhone': 'Số điện thoại',
        'deliveryAddress': 'Địa chỉ giao hàng',
        'deliveryCity': 'Tỉnh/Thành phố'
    };
    return labels[fieldName] || fieldName;
}

// Show order success popup
function showOrderSuccessPopup(order) {
    const popup = document.createElement('div');
    popup.className = 'success-popup-overlay';
    popup.innerHTML = `
        <div class="success-popup">
            <div class="success-header">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Đặt hàng thành công!</h2>
                <p>Cảm ơn bạn đã tin tưởng DroneShop</p>
            </div>
            
            <div class="success-content">
                <div class="order-info">
                    <h3>Thông tin đơn hàng</h3>
                    <p><strong>Mã đơn hàng:</strong> #${order.id}</p>
                    <p><strong>Tổng tiền:</strong> ${formatPrice(order.total)}</p>
                    <p><strong>Phương thức thanh toán:</strong> ${getPaymentMethodText(order.paymentMethod)}</p>
                    <p><strong>Địa chỉ giao hàng:</strong> ${order.deliveryInfo.address}</p>
                </div>
                
                <div class="delivery-estimate">
                    <i class="fas fa-drone"></i>
                    <p>Drone sẽ giao hàng trong vòng <strong>30-60 phút</strong></p>
                    <small>Bạn có thể theo dõi đơn hàng trong mục "Đơn hàng của tôi"</small>
                </div>
            </div>
            
            <div class="success-actions">
                <button class="btn-secondary" onclick="closeSuccessPopup(); showPage('home');">
                    <i class="fas fa-home"></i> Về trang chủ
                </button>
                <button class="btn-primary" onclick="closeSuccessPopup(); showPage('orders'); loadOrders();">
                    <i class="fas fa-list"></i> Xem đơn hàng
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    // Auto close after 10 seconds
    setTimeout(() => {
        closeSuccessPopup();
        window.showPage('orders');
        loadOrders();
    }, 10000);
}

// Close success popup
function closeSuccessPopup() {
    const popup = document.querySelector('.success-popup-overlay');
    if (popup) {
        popup.remove();
    }
}

// Get payment method text
function getPaymentMethodText(method) {
    const methods = {
        'cod': 'Thanh toán khi nhận hàng (COD)',
        'banking': 'Chuyển khoản ngân hàng',
        'momo': 'Ví MoMo',
        'zalopay': 'ZaloPay'
    };
    return methods[method] || method;
}

// Load user orders
function loadOrders() {
    const container = document.getElementById('ordersList');
    if (!container) return;

    console.log('loadOrders called, currentUser:', window.currentUser);

    // Ensure currentUser is set
    if (!window.currentUser) {
        container.innerHTML = '<div class="no-orders"><p>Vui lòng đăng nhập để xem đơn hàng</p></div>';
        return;
    }

    console.log('Loading orders for user:', window.currentUser.id);

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    console.log('All orders in storage:', orders.length);

    const userOrders = orders.filter(order => order.userId === window.currentUser.id);
    console.log('Found user orders:', userOrders.length);

    if (userOrders.length === 0) {
        container.innerHTML = `
            <div class="no-orders">
                <div class="no-orders-icon">
                    <i class="fas fa-shopping-bag"></i>
                </div>
                <h3>Chưa có đơn hàng nào</h3>
                <p>Bạn chưa có đơn hàng nào. Hãy mua sắm ngay!</p>
                <button class="btn-primary" onclick="showPage('products')">
                    <i class="fas fa-shopping-cart"></i> Mua sắm ngay
                </button>
            </div>
        `;
        return;
    }

    // Sort orders by date (newest first)
    userOrders.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a.date);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b.date);
        return dateB - dateA;
    });

    container.innerHTML = userOrders.map(order => renderOrder(order)).join('');
}

// Render single order
function renderOrder(order) {
    return `
        <div class="order-card">
            <div class="order-header">
                <div class="order-id">
                    <h3><i class="fas fa-receipt"></i> Đơn hàng #${order.id}</h3>
                    <span class="order-date">${order.date}</span>
                </div>
                <div class="order-status-container">
                    <span class="order-status status-${order.status}">
                        ${getOrderStatusIcon(order.status)} ${getOrderStatusText(order.status)}
                    </span>
                </div>
            </div>
            
            <div class="order-content">
                <div class="order-details">
                    <div class="detail-row">
                        <div class="detail-item">
                            <i class="fas fa-user"></i>
                            <span><strong>Khách hàng:</strong> ${order.customerInfo.name}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-phone"></i>
                            <span><strong>SĐT:</strong> ${order.customerInfo.phone}</span>
                        </div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span><strong>Địa chỉ:</strong> ${order.deliveryInfo.address}, ${order.deliveryInfo.city}</span>
                        </div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-item">
                            <i class="fas fa-credit-card"></i>
                            <span><strong>Thanh toán:</strong> ${getPaymentMethodText(order.paymentMethod)}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-money-bill-wave"></i>
                            <span><strong>Tổng tiền:</strong> ${formatPrice(order.total)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="order-items">
                    <h4><i class="fas fa-list"></i> Sản phẩm đã đặt:</h4>
                    <div class="items-list">
                        ${order.items.map(item => `
                            <div class="order-item">
                                <div class="item-info">
                                    <i class="${item.image}"></i>
                                    <div class="item-details">
                                        <span class="item-name">${item.name}</span>
                                        <span class="item-quantity">Số lượng: ${item.quantity}</span>
                                    </div>
                                </div>
                                <div class="item-price">
                                    ${formatPrice(item.price * item.quantity)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Get order status text
function getOrderStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xử lý',
        'processing': 'Đang xử lý',
        'shipping': 'Đang giao hàng',
        'delivered': 'Đã giao hàng',
        'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
}

// Get order status icon
function getOrderStatusIcon(status) {
    const iconMap = {
        'pending': '<i class="fas fa-clock"></i>',
        'processing': '<i class="fas fa-cog"></i>',
        'shipping': '<i class="fas fa-drone"></i>',
        'delivered': '<i class="fas fa-check-circle"></i>',
        'cancelled': '<i class="fas fa-times-circle"></i>'
    };
    return iconMap[status] || '<i class="fas fa-question-circle"></i>';
}

// Calculate order statistics
function calculateOrderStats(orders) {
    return {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipping: orders.filter(o => o.status === 'shipping').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
        totalRevenue: orders
            .filter(o => o.status === 'delivered')
            .reduce((sum, order) => sum + order.total, 0),
        avgOrderValue: orders.length > 0 ?
            orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0
    };
}

// Load dashboard content specifically for dashboard.html
function loadDashboardContent() {
    console.log('Loading dashboard content...');

    // Load orders and drones
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');

    // Create sample orders if none exist
    if (orders.length === 0) {
        console.log('No orders found, creating sample orders...');
        createSampleOrders();
    }

    // Populate order list
    const orderList = document.getElementById('orderList');
    if (orderList) {
        orderList.innerHTML = generateOrderListHTML();
    }

    // Populate drone list  
    const droneList = document.getElementById('droneList');
    if (droneList) {
        droneList.innerHTML = generateDroneListHTML();
    }

    // Initialize map
    setTimeout(() => {
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            console.log('Initializing dashboard map...');
            initializeDashboardMap();
        } else {
            console.error('Map container not found');
        }
    }, 1000);
}

// Initialize map for dashboard
function initializeDashboardMap() {
    console.log('Initializing dashboard map...');

    // Clear existing map if any
    if (window.dashboardMap) {
        window.dashboardMap.remove();
        window.dashboardMap = null;
    }

    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }

    try {
        // Initialize Leaflet map
        window.dashboardMap = L.map('map').setView([21.0285, 105.8542], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: ' OpenStreetMap contributors'
        }).addTo(window.dashboardMap);

        console.log('Dashboard map initialized successfully');

        // Load and display drones and orders
        displayDronesOnDashboardMap();
        displayOrdersOnDashboardMap();

    } catch (error) {
        console.error('Error initializing dashboard map:', error);
        mapContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">
                <div style="text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                    <p>Lỗi khởi tạo bản đồ</p>
                    <small>Vui lòng tải lại trang</small>
                </div>
            </div>
        `;
    }
}

// Display drones on dashboard map
function displayDronesOnDashboardMap() {
    if (!window.dashboardMap) return;

    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    console.log('Displaying drones on dashboard map:', drones.length);

    // Clear existing drone markers
    if (window.dashboardDroneMarkers) {
        window.dashboardDroneMarkers.forEach(marker => {
            window.dashboardMap.removeLayer(marker);
        });
    }
    window.dashboardDroneMarkers = [];

    drones.forEach(drone => {
        if (drone.location && drone.location.lat && drone.location.lng) {
            const droneIcon = L.divIcon({
                html: `<div style="
                    background-color: ${drone.status === 'active' ? '#28a745' : '#6c757d'};
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 3px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    color: white;
                    font-weight: bold;
                    font-size: 12px;
                ">🚁</div>`,
                className: 'drone-marker',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            const marker = L.marker([drone.location.lat, drone.location.lng], { icon: droneIcon })
                .addTo(window.dashboardMap);

            marker.bindPopup(`
                <div style="text-align: center;">
                    <h4 style="margin: 0 0 10px 0;">${drone.name}</h4>
                    <p style="margin: 5px 0;"><strong>Trạng thái:</strong> ${drone.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}</p>
                    <p style="margin: 5px 0;"><strong>Tải trọng:</strong> ${drone.capacity}kg</p>
                    <p style="margin: 5px 0;"><strong>Vị trí:</strong> ${drone.location.lat.toFixed(6)}, ${drone.location.lng.toFixed(6)}</p>
                </div>
            `);

            window.dashboardDroneMarkers.push(marker);
        }
    });
}

// Display orders on dashboard map
function displayOrdersOnDashboardMap(skipOrderId = null) {
    if (!window.dashboardMap) return;

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    console.log('Displaying orders on dashboard map:', orders.length);

    // Check if there's an open popup we should preserve
    let preservePopupOrderId = null;
    if (window.dashboardMap._popup && window.dashboardMap._popup._source) {
        // Try to extract order ID from popup content
        const popupContent = window.dashboardMap._popup._content;
        const orderMatch = popupContent.match(/Đơn hàng #(\w+)/);
        if (orderMatch) {
            preservePopupOrderId = orderMatch[1];
        }
    }

    // Clear existing order markers (except the one with active popup)
    if (window.dashboardOrderMarkers) {
        window.dashboardOrderMarkers.forEach(marker => {
            // Don't remove marker if it has an open popup that we want to preserve
            const shouldPreserve = preservePopupOrderId && marker._popup &&
                marker._popup._content &&
                marker._popup._content.includes(`Đơn hàng #${preservePopupOrderId}`) &&
                marker._popup._isOpen;

            if (!shouldPreserve) {
                window.dashboardMap.removeLayer(marker);
            }
        });

        // Filter out removed markers
        window.dashboardOrderMarkers = window.dashboardOrderMarkers.filter(marker =>
            marker._map !== null
        );
    } else {
        window.dashboardOrderMarkers = [];
    }

    orders.forEach(order => {
        // Skip order if it's the one we want to preserve or explicitly skip
        if ((preservePopupOrderId && order.id === preservePopupOrderId) ||
            (skipOrderId && order.id === skipOrderId)) {
            return;
        }

        if (order.deliveryLocation && order.deliveryLocation.lat && order.deliveryLocation.lng) {
            const statusColors = {
                'pending': '#ffc107',
                'processing': '#17a2b8',
                'shipping': '#007bff',
                'delivered': '#28a745',
                'cancelled': '#dc3545'
            };

            const orderIcon = L.divIcon({
                html: `<div style="
                    background-color: ${statusColors[order.status] || '#6c757d'};
                    width: 25px;
                    height: 25px;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    color: white;
                    font-weight: bold;
                    font-size: 10px;
                ">📦</div>`,
                className: 'order-marker',
                iconSize: [25, 25],
                iconAnchor: [12, 12]
            });

            const marker = L.marker([order.deliveryLocation.lat, order.deliveryLocation.lng], { icon: orderIcon })
                .addTo(window.dashboardMap);

            marker.bindPopup(`
                <div style="text-align: center;">
                    <h4 style="margin: 0 0 10px 0;">Đơn hàng #${order.id}</h4>
                    <p style="margin: 5px 0;"><strong>Khách hàng:</strong> ${order.customerInfo.name}</p>
                    <p style="margin: 5px 0;"><strong>Trạng thái:</strong> ${getStatusText(order.status)}</p>
                    <p style="margin: 5px 0;"><strong>Tổng tiền:</strong> ${formatPrice(order.total)}</p>
                    <p style="margin: 5px 0;"><strong>Địa chỉ:</strong> ${order.deliveryLocation.address}</p>
                    <div id="orderActions-${order.id}" style="margin-top: 10px;">
                        <button onclick="startOrderProcessing('${order.id}')" class="process-order-btn" style="
                            background-color: #28a745;
                            color: white;
                            border: none;
                            padding: 8px 16px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: bold;
                        ">🚁 Xử lý đơn hàng</button>
                    </div>
                </div>
            `);

            window.dashboardOrderMarkers.push(marker);
        }
    });
}

// Generate order list HTML
function generateOrderListHTML() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    if (orders.length === 0) {
        return `
            <div style="text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                <p>Chưa có đơn hàng nào</p>
                <button onclick="createSampleOrders()" style="
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 10px;
                ">Tạo đơn hàng mẫu</button>
            </div>
        `;
    }

    return orders.map(order => `
        <div style="
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            background: white;
        ">
            <h4 style="margin: 0 0 10px 0;">Đơn hàng #${order.id}</h4>
            <p><strong>Khách hàng:</strong> ${order.customerInfo.name}</p>
            <p><strong>Trạng thái:</strong> <span style="
                padding: 3px 8px;
                border-radius: 12px;
                font-size: 12px;
                color: white;
                background-color: ${getStatusColor(order.status)};
            ">${getStatusText(order.status)}</span></p>
            <p><strong>Tổng tiền:</strong> ${formatPrice(order.total)}</p>
            <p><strong>Ngày đặt:</strong> ${new Date(order.orderDate).toLocaleDateString('vi-VN')}</p>
        </div>
    `).join('');
}

// Generate drone list HTML
function generateDroneListHTML() {
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');

    if (drones.length === 0) {
        return `
            <div style="text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-drone" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                <p>Chưa có drone nào</p>
            </div>
        `;
    }

    return drones.map(drone => `
        <div style="
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            background: white;
        ">
            <h4 style="margin: 0 0 10px 0;">${drone.name}</h4>
            <p><strong>Trạng thái:</strong> <span style="
                padding: 3px 8px;
                border-radius: 12px;
                font-size: 12px;
                color: white;
                background-color: ${drone.status === 'active' ? '#28a745' : '#6c757d'};
            ">${drone.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}</span></p>
            <p><strong>Tải trọng:</strong> ${drone.capacity}kg</p>
            <p><strong>Vị trí:</strong> ${drone.location ? `${drone.location.lat.toFixed(4)}, ${drone.location.lng.toFixed(4)}` : 'Chưa xác định'}</p>
        </div>
    `).join('');
}

// Helper functions
function getStatusColor(status) {
    const colors = {
        'pending': '#ffc107',
        'processing': '#17a2b8',
        'shipping': '#007bff',
        'delivered': '#28a745',
        'cancelled': '#dc3545'
    };
    return colors[status] || '#6c757d';
}

function getStatusText(status) {
    const texts = {
        'pending': 'Chờ xử lý',
        'processing': 'Đang xử lý',
        'shipping': 'Đang giao hàng',
        'delivered': 'Đã giao hàng',
        'cancelled': 'Đã hủy'
    };
    return texts[status] || 'Không xác định';
}

// Load admin content
function loadAdminContent() {
    const container = document.getElementById('adminContent');
    if (!container) {
        console.error('Admin content container not found');
        return;
    }

    console.log('Loading admin content...');

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const stats = calculateOrderStats(orders);

    console.log('Admin stats:', stats);

    container.innerHTML = `
        <div class="admin-header">
            <h2><i class="fas fa-tachometer-alt"></i> Dashboard Quản lý</h2>
            <div class="admin-actions">
                <button class="btn-primary" onclick="createSampleOrders()">
                    <i class="fas fa-plus"></i> Tạo đơn hàng mẫu
                </button>
                <button class="btn-secondary" onclick="exportOrders()">
                    <i class="fas fa-download"></i> Xuất dữ liệu
                </button>
                <button class="btn-danger" onclick="clearAllOrders()" style="margin-left: 10px;">
                    <i class="fas fa-trash"></i> Xóa tất cả đơn hàng
                </button>
                <button class="btn-warning" onclick="clearAllDroneStatus()" style="margin-left: 10px;">
                    <i class="fas fa-broom"></i> Clear Drone
                </button>
            </div>
        </div>
        
        <div class="admin-stats">
            <div class="stat-card total">
                <div class="stat-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="stat-info">
                    <h3>${stats.total}</h3>
                    <p>Tổng đơn hàng</p>
                </div>
            </div>
            
            <div class="stat-card pending">
                <div class="stat-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="stat-info">
                    <h3>${stats.pending}</h3>
                    <p>Chờ xử lý</p>
                </div>
            </div>
            
            <div class="stat-card processing">
                <div class="stat-icon">
                    <i class="fas fa-cog"></i>
                </div>
                <div class="stat-info">
                    <h3>${stats.processing}</h3>
                    <p>Đang xử lý</p>
                </div>
            </div>
            
            <div class="stat-card shipping">
                <div class="stat-icon">
                    <i class="fas fa-drone"></i>
                </div>
                <div class="stat-info">
                    <h3>${stats.shipping}</h3>
                    <p>Đang giao hàng</p>
                </div>
            </div>
            
            <div class="stat-card delivered">
                <div class="stat-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-info">
                    <h3>${stats.delivered}</h3>
                    <p>Đã giao</p>
                </div>
            </div>
            
            <div class="stat-card revenue">
                <div class="stat-icon">
                    <i class="fas fa-money-bill-wave"></i>
                </div>
                <div class="stat-info">
                    <h3>${formatPrice(stats.totalRevenue)}</h3>
                    <p>Doanh thu</p>
                </div>
            </div>
        </div>
        
        <div class="admin-sections">
            <div class="admin-section">
                <div class="section-header">
                    <h3><i class="fas fa-list"></i> Quản lý đơn hàng</h3>
                    <div class="filter-buttons">
                        <button class="filter-btn active" onclick="filterAdminOrders('all')">Tất cả</button>
                        <button class="filter-btn" onclick="filterAdminOrders('pending')">Chờ xử lý</button>
                        <button class="filter-btn" onclick="filterAdminOrders('processing')">Đang xử lý</button>
                        <button class="filter-btn" onclick="filterAdminOrders('shipping')">Đang giao</button>
                        <button class="filter-btn" onclick="filterAdminOrders('delivered')">Đã giao</button>
                    </div>
                </div>
                
                <div class="orders-table-container">
                    <table class="orders-table">
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Khách hàng</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Ngày đặt</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="adminOrdersTable">
                            ${renderAdminOrdersTable(orders)}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="admin-section">
                <div class="section-header">
                    <h3><i class="fas fa-drone"></i> Trạng thái Drone</h3>
                </div>
                
                <div class="drones-status">
                    ${renderDronesStatus()}
                </div>
            </div>
            
            <div class="admin-section">
                <div class="section-header">
                    <h3><i class="fas fa-map"></i> Quản lý Giao hàng & Drone</h3>
                    <div class="section-actions">
                        <button class="btn-primary" onclick="showDroneAssignmentModal()">
                            <i class="fas fa-plus"></i> Phân công Drone
                        </button>
                        <button class="btn-secondary" onclick="refreshDroneMap()">
                            <i class="fas fa-sync"></i> Cập nhật Bản đồ
                        </button>
                        <button class="btn-warning" onclick="clearAllRoutes()">
                            <i class="fas fa-eraser"></i> Xóa đường đi
                        </button>
                        <button class="btn-info" onclick="manualInitializeMap()">
                            <i class="fas fa-map"></i> Khởi tạo Bản đồ
                        </button>
                    </div>
                </div>
                
                <div class="delivery-management">
                    <div class="drone-assignment-panel">
                        <h4>Phân công Drone cho Đơn hàng</h4>
                        <div class="assignment-controls">
                            <select id="orderSelect" class="form-control">
                                <option value="">Chọn đơn hàng...</option>
                                ${orders.filter(o => o.status === 'pending' || o.status === 'processing').map(order =>
        `<option value="${order.id}">Đơn hàng #${order.id} - ${order.customerInfo.name}</option>`
    ).join('')}
                            </select>
                            
                            <select id="droneSelect" class="form-control">
                                <option value="">Chọn drone...</option>
                                ${renderAvailableDrones()}
                            </select>
                            
                            <button class="btn-primary" onclick="assignDroneToOrder()">
                                <i class="fas fa-check"></i> Phân công
                            </button>
                            
                            <button class="btn-secondary" onclick="resetAllDrones()" style="margin-left: 10px;">
                                <i class="fas fa-undo"></i> Reset Drones
                            </button>
                            
                            <button onclick="clearDroneData()" style="margin-left: 10px; background-color: #ffc107; color: #000; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px;">
                                <i class="fas fa-trash"></i> Clear Data
                            </button>
                            
                            <button onclick="clearDeliveryRoute()" style="margin-left: 10px; background-color: #28a745; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px;">
                                <i class="fas fa-route"></i> Clear Route
                            </button>
                            
                            <button onclick="createSampleOrders()" style="margin-left: 10px; background-color: #17a2b8; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px;">
                                <i class="fas fa-plus-circle"></i> Tạo đơn mẫu
                            </button>
                            
                            <button onclick="createRandomOrder()" style="margin-left: 10px; background-color: #6f42c1; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px;">
                                <i class="fas fa-random"></i> Đơn ngẫu nhiên
                            </button>
                            
                            <button onclick="showAllOrdersOnMap()" style="margin-left: 10px; background-color: #fd7e14; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px;">
                                <i class="fas fa-map-marked-alt"></i> Hiển thị đơn hàng
                            </button>
                        </div>
                    </div>
                    
                    <div class="delivery-map-container">
                        <div id="adminDeliveryMap" style="height: 500px; width: 100%; border-radius: 8px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; color: #666;">
                            <div style="text-align: center;">
                                <i class="fas fa-map" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                                <p>Đang khởi tạo bản đồ...</p>
                                <small>Nếu bản đồ không hiển thị, hãy click "Khởi tạo Bản đồ"</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize admin delivery map after content is loaded
    console.log('Content loaded, waiting for DOM to be ready...');

    // Use a longer timeout and check if container exists before initializing
    setTimeout(() => {
        const mapContainer = document.getElementById('adminDeliveryMap');
        if (mapContainer) {
            console.log('Map container ready...');
            // Only initialize if map doesn't exist yet
            if (!window.adminDeliveryMap) {
                console.log('Initializing new map...');
                initializeAdminDeliveryMap();
            } else {
                console.log('Map already exists, just refreshing markers...');
                // Verify map is still valid
                if (window.adminDeliveryMap && typeof window.adminDeliveryMap.addLayer === 'function') {
                    // Just refresh markers and preserve routes
                    addDronesToMap();
                    addOrdersToMap();
                    window.adminDeliveryMap.invalidateSize();
                } else {
                    console.log('Map exists but invalid, reinitializing...');
                    window.adminDeliveryMap = null;
                    initializeAdminDeliveryMap();
                }
            }
        } else {
            console.error('Map container still not found after timeout');
        }
    }, 1000);
}

// Render admin orders table
function renderAdminOrdersTable(orders) {
    if (orders.length === 0) {
        return `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                    Chưa có đơn hàng nào
                </td>
            </tr>
        `;
    }

    return orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>
                <div class="customer-info">
                    <strong>${order.customerInfo.name}</strong><br>
                    <small>${order.customerInfo.phone}</small>
                </div>
            </td>
            <td><strong>${formatPrice(order.total)}</strong></td>
            <td>
                <span class="status-badge status-${order.status}">
                    ${getOrderStatusIcon(order.status)} ${getOrderStatusText(order.status)}
                </span>
            </td>
            <td>${order.date}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-view" onclick="viewOrderDetails('${order.id}')" title="Xem chi tiết">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-edit" onclick="updateOrderStatus('${order.id}')" title="Cập nhật trạng thái">
                        <i class="fas fa-edit"></i>
                    </button>
                    ${order.status === 'pending' ? `
                        <button class="btn-delete" onclick="deleteOrder('${order.id}')" title="Xóa đơn hàng">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
            </td>
        </tr>
    `).join('');
}

// Render drones status
function renderDronesStatus() {
    // Get drones from localStorage instead of static data
    const storedDrones = JSON.parse(localStorage.getItem('drones') || '[]');

    // If no drones in storage, create them first
    if (storedDrones.length === 0) {
        renderAvailableDrones(); // This will create the synchronized drones
        return renderDronesStatus(); // Recursive call after creation
    }

    return storedDrones.map(drone => `
        <div class="drone-status-card">
            <div class="drone-info">
                <h4>${drone.name}</h4>
                <p>ID: ${drone.id}</p>
                <p class="home-base">📍 Vị trí: ${drone.location ? `${drone.location.lat.toFixed(4)}, ${drone.location.lng.toFixed(4)}` : 'Chưa xác định'}</p>
            </div>
            <div class="drone-metrics">
                <div class="metric">
                    <span class="metric-label">Trạng thái:</span>
                    <span class="status-badge status-${drone.status}">
                        <i class="fas fa-circle"></i>
                        ${getDroneStatusText(drone.status)}
                    </span>
                </div>
                <div class="metric">
                    <span class="metric-label">Pin:</span>
                    <div class="battery-indicator">
                        <div class="battery-fill" style="width: ${drone.battery}%"></div>
                        <span class="battery-text">${drone.battery}%</span>
                    </div>
                </div>
                <div class="metric">
                    <span class="metric-label">Tải trọng:</span>
                    <span>${drone.capacity}kg</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Phạm vi:</span>
                    <span>${drone.range}km</span>
                </div>
                ${drone.assignedOrder ? `
                    <div class="metric">
                        <span class="metric-label">Đơn hàng:</span>
                        <span class="assigned-order">#${drone.assignedOrder}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Filter admin orders
function filterAdminOrders(status) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const filteredOrders = status === 'all' ? orders : orders.filter(order => order.status === status);

    document.getElementById('adminOrdersTable').innerHTML = renderAdminOrdersTable(filteredOrders);

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Create sample orders for demo
function createSampleOrders() {
    // Random delivery locations in Hanoi
    const hanoiLocations = [
        { lat: 21.0285, lng: 105.8542, address: 'Số 1 Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội' }, // Hoan Kiem Lake
        { lat: 21.0355, lng: 105.8431, address: '54 Liễu Giai, Ba Đình, Hà Nội' }, // Ba Dinh
        { lat: 21.0245, lng: 105.8412, address: '123 Nguyễn Du, Hai Bà Trưng, Hà Nội' }, // Hai Ba Trung
        { lat: 21.0122, lng: 105.8255, address: '456 Tố Hữu, Nam Từ Liêm, Hà Nội' }, // Nam Tu Liem
        { lat: 21.0458, lng: 105.7844, address: '789 Xuân Thủy, Cầu Giấy, Hà Nội' }, // Cau Giay
        { lat: 21.0031, lng: 105.8201, address: '321 Nguyễn Trãi, Thanh Xuân, Hà Nội' }, // Thanh Xuan
        { lat: 21.0583, lng: 105.8216, address: '654 Láng Hạ, Đống Đa, Hà Nội' }, // Dong Da
        { lat: 21.0278, lng: 105.8342, address: '987 Bà Triệu, Hoàn Kiếm, Hà Nội' }, // Ba Trieu
        { lat: 21.0508, lng: 105.8591, address: '147 Trần Duy Hưng, Cầu Giấy, Hà Nội' }, // Tran Duy Hung
        { lat: 21.0064, lng: 105.8431, address: '258 Lê Văn Lương, Thanh Xuân, Hà Nội' } // Le Van Luong
    ];

    // Sample customer names
    const customerNames = [
        'Nguyễn Văn Anh', 'Trần Thị Bình', 'Lê Hoàng Cường', 'Phạm Thị Dung',
        'Hoàng Văn Em', 'Vũ Thị Giang', 'Đỗ Minh Hải', 'Bùi Thị Lan',
        'Ngô Văn Khôi', 'Lý Thị Mai', 'Phan Đức Nam', 'Đinh Thị Oanh'
    ];

    // Sample products
    const products = [
        { id: 1, name: 'iPhone 15 Pro Max', price: 29990000, image: 'fas fa-mobile-alt' },
        { id: 2, name: 'MacBook Pro M3', price: 45990000, image: 'fas fa-laptop' },
        { id: 3, name: 'iPad Air M2', price: 18990000, image: 'fas fa-tablet-alt' },
        { id: 4, name: 'Apple Watch Ultra', price: 21990000, image: 'fas fa-watch' },
        { id: 5, name: 'AirPods Pro 2', price: 6990000, image: 'fas fa-headphones' },
        { id: 6, name: 'Samsung Galaxy S24', price: 24990000, image: 'fas fa-mobile-alt' },
        { id: 7, name: 'Dell XPS 13', price: 35990000, image: 'fas fa-laptop' },
        { id: 8, name: 'Sony WH-1000XM5', price: 8990000, image: 'fas fa-headphones' },
        { id: 9, name: 'Nintendo Switch', price: 7990000, image: 'fas fa-gamepad' },
        { id: 10, name: 'GoPro Hero 12', price: 12990000, image: 'fas fa-camera' }
    ];

    // Payment methods
    const paymentMethods = ['cod', 'momo', 'banking', 'zalopay'];
    const statuses = ['pending', 'processing', 'shipping'];

    const sampleOrders = [];
    const timestamp = Date.now();

    // Create 10 sample orders
    for (let i = 0; i < 10; i++) {
        const location = hanoiLocations[i];
        const customer = customerNames[i];
        const product = products[i];
        const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 items

        // Generate phone number
        const phone = '09' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0');

        // Generate email
        const email = customer.toLowerCase()
            .replace(/\s+/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') + '@email.com';

        const order = {
            id: 'ORD' + (timestamp + i),
            userId: 'user' + (100 + i),
            customerName: customer, // Add direct customerName field
            customerInfo: {
                name: customer,
                phone: phone,
                email: email,
                address: location.address
            },
            address: location.address, // Add direct address field
            deliveryLocation: {
                lat: location.lat + (Math.random() - 0.5) * 0.01, // Add small random offset
                lng: location.lng + (Math.random() - 0.5) * 0.01
            },
            paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
            items: [
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                    image: product.image
                }
            ],
            total: product.price * quantity,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            date: new Date(timestamp + i * 60000).toLocaleString('vi-VN'), // Each order 1 minute apart
            createdAt: new Date(timestamp + i * 60000).toISOString(),
            estimatedDelivery: null,
            assignedDrone: null,
            notes: `Đơn hàng mẫu số ${i + 1} - Giao hàng tại ${location.address.split(',')[1]?.trim() || 'Hà Nội'}`
        };

        sampleOrders.push(order);
    }

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const allOrders = [...existingOrders, ...sampleOrders];
    localStorage.setItem('orders', JSON.stringify(allOrders));

    showNotification(`Đã tạo ${sampleOrders.length} đơn hàng mẫu với điểm giao hàng tự động!`, 'success');

    // Reload admin content to show new orders
    if (typeof loadAdminContent === 'function') {
        setTimeout(() => {
            loadAdminContent();
        }, 500);
    }

    console.log('Created sample orders:', sampleOrders);
}

// Create single random order
function createRandomOrder() {
    // Random delivery location around Hanoi center
    const centerLat = 21.0285;
    const centerLng = 105.8542;
    const radius = 0.05; // About 5km radius

    const randomLat = centerLat + (Math.random() - 0.5) * radius;
    const randomLng = centerLng + (Math.random() - 0.5) * radius;

    // Random customer data
    const firstNames = ['Anh', 'Bình', 'Cường', 'Dung', 'Em', 'Giang', 'Hải', 'Lan', 'Khôi', 'Mai'];
    const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đỗ', 'Bùi', 'Ngô', 'Lý'];
    const middleNames = ['Văn', 'Thị', 'Hoàng', 'Minh', 'Đức', 'Thanh', 'Hồng', 'Kim', 'Tuấn', 'Thu'];

    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const customerName = `${lastName} ${middleName} ${firstName}`;

    // Random address in Hanoi districts
    const districts = [
        'Hoàn Kiếm', 'Ba Đình', 'Hai Bà Trưng', 'Đống Đa', 'Cầu Giấy',
        'Thanh Xuân', 'Nam Từ Liêm', 'Bắc Từ Liêm', 'Tây Hồ', 'Long Biên'
    ];
    const streets = [
        'Nguyễn Huệ', 'Lê Lợi', 'Tràng Tiền', 'Láng Hạ', 'Xuân Thủy',
        'Nguyễn Trãi', 'Bà Triệu', 'Đinh Tiên Hoàng', 'Lý Thường Kiệt', 'Hai Bà Trưng'
    ];

    const houseNumber = Math.floor(Math.random() * 999) + 1;
    const street = streets[Math.floor(Math.random() * streets.length)];
    const district = districts[Math.floor(Math.random() * districts.length)];
    const address = `${houseNumber} ${street}, ${district}, Hà Nội`;

    // Random product
    const products = [
        { id: 1, name: 'iPhone 15 Pro Max', price: 29990000, image: 'fas fa-mobile-alt' },
        { id: 2, name: 'MacBook Pro M3', price: 45990000, image: 'fas fa-laptop' },
        { id: 3, name: 'iPad Air M2', price: 18990000, image: 'fas fa-tablet-alt' },
        { id: 4, name: 'Apple Watch Ultra', price: 21990000, image: 'fas fa-watch' },
        { id: 5, name: 'AirPods Pro 2', price: 6990000, image: 'fas fa-headphones' },
        { id: 6, name: 'Samsung Galaxy S24', price: 24990000, image: 'fas fa-mobile-alt' },
        { id: 7, name: 'Dell XPS 13', price: 35990000, image: 'fas fa-laptop' },
        { id: 8, name: 'Sony WH-1000XM5', price: 8990000, image: 'fas fa-headphones' },
        { id: 9, name: 'Nintendo Switch', price: 7990000, image: 'fas fa-gamepad' },
        { id: 10, name: 'GoPro Hero 12', price: 12990000, image: 'fas fa-camera' }
    ];

    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;

    // Random payment method and status
    const paymentMethods = ['cod', 'momo', 'banking', 'zalopay'];
    const statuses = ['pending', 'processing'];

    const phone = '09' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    const email = customerName.toLowerCase()
        .replace(/\s+/g, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') + '@email.com';

    const order = {
        id: 'ORD' + Date.now(),
        userId: 'user' + Math.floor(Math.random() * 1000),
        customerName: customerName,
        customerInfo: {
            name: customerName,
            phone: phone,
            email: email,
            address: address
        },
        address: address,
        deliveryLocation: {
            lat: randomLat,
            lng: randomLng
        },
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        items: [{
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        }],
        total: product.price * quantity,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date().toLocaleString('vi-VN'),
        createdAt: new Date().toISOString(),
        estimatedDelivery: null,
        assignedDrone: null,
        notes: `Đơn hàng tự động - Giao tại ${district}`
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    showNotification(`Đã tạo đơn hàng ${order.id} tại ${district}!`, 'success');

    // Reload admin content
    if (typeof loadAdminContent === 'function') {
        setTimeout(() => {
            loadAdminContent();
        }, 300);
    }

    return order;
}

// Show all orders on map
function showAllOrdersOnMap() {
    if (!window.adminDeliveryMap) {
        console.error('Admin delivery map not initialized');
        showNotification('Bản đồ chưa được khởi tạo!', 'error');
        return;
    }

    // Clear existing order markers
    if (window.orderMarkers) {
        Object.values(window.orderMarkers).forEach(marker => {
            try {
                window.adminDeliveryMap.removeLayer(marker);
            } catch (e) {
                console.log('Error removing order marker:', e);
            }
        });
    }
    window.orderMarkers = {};

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    let markersAdded = 0;

    orders.forEach(order => {
        if (order.deliveryLocation && order.deliveryLocation.lat && order.deliveryLocation.lng) {
            try {
                // Create order marker
                const orderIcon = L.divIcon({
                    html: `<div class="order-marker-icon ${order.status}">
                             <i class="fas fa-map-marker-alt"></i>
                           </div>`,
                    className: 'custom-div-icon',
                    iconSize: [30, 30],
                    iconAnchor: [15, 30]
                });

                const marker = L.marker([order.deliveryLocation.lat, order.deliveryLocation.lng], { icon: orderIcon })
                    .bindPopup(`
                        <div class="order-popup-content">
                            <h4><i class="fas fa-shopping-cart"></i> Đơn hàng #${order.id}</h4>
                            <p><strong>Khách hàng:</strong> ${order.customerName || order.customerInfo?.name || 'N/A'}</p>
                            <p><strong>Địa chỉ:</strong> ${order.address || order.customerInfo?.address || 'N/A'}</p>
                            <p><strong>Trạng thái:</strong> <span class="status-badge status-${order.status}">${getOrderStatusText(order.status)}</span></p>
                            <p><strong>Tổng tiền:</strong> ${formatCurrency(order.total)}</p>
                            <p><strong>Sản phẩm:</strong> ${order.items?.[0]?.name || 'N/A'} ${order.items?.[0]?.quantity ? `(x${order.items[0].quantity})` : ''}</p>
                            ${order.assignedDrone ? `<p><strong>Drone:</strong> ${order.assignedDrone}</p>` : ''}
                            <p><strong>Tọa độ:</strong> ${order.deliveryLocation.lat.toFixed(6)}, ${order.deliveryLocation.lng.toFixed(6)}</p>
                            <div id="adminOrderActions-${order.id}" style="text-align: center; margin-top: 10px;">
                                ${!order.assignedDrone ?
                            `<button onclick="startOrderProcessing('${order.id}')" class="process-order-btn">
                                        <i class="fas fa-cog"></i> Xử lý đơn hàng
                                    </button>` :
                            `<button onclick="showDeliveryRoute('${order.id}')" class="assigned show-route-btn">
                                        <i class="fas fa-route"></i> Xem đường đi
                                    </button>`
                        }
                            </div>
                        </div>
                    `)
                    .addTo(window.adminDeliveryMap);

                window.orderMarkers[order.id] = marker;
                markersAdded++;

            } catch (error) {
                console.error('Error adding order marker:', error, order);
            }
        }
    });

    // Fit map to show all markers if any were added
    if (markersAdded > 0) {
        const group = new L.featureGroup(Object.values(window.orderMarkers));
        if (window.droneMarkers) {
            Object.values(window.droneMarkers).forEach(marker => group.addLayer(marker));
        }

        try {
            window.adminDeliveryMap.fitBounds(group.getBounds().pad(0.1));
        } catch (error) {
            console.log('Error fitting bounds:', error);
        }

        showNotification(`Đã hiển thị ${markersAdded} đơn hàng trên bản đồ!`, 'success');
    } else {
        showNotification('Không có đơn hàng nào có địa chỉ giao hàng!', 'warning');
    }
}

// Format currency helper
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// View order details
function viewOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id == orderId);

    if (order) {
        const popup = document.createElement('div');
        popup.className = 'order-details-popup';
        popup.innerHTML = `
            <div class="popup-overlay">
                <div class="popup-content">
                    <div class="popup-header">
                        <h3>Chi tiết đơn hàng #${order.id}</h3>
                        <button class="close-btn" onclick="this.closest('.order-details-popup').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="popup-body">
                        ${renderOrder(order)}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
    }
}

// Update order status
function updateOrderStatus(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id == orderId);

    if (orderIndex !== -1) {
        const currentStatus = orders[orderIndex].status;
        const statusOptions = ['pending', 'processing', 'shipping', 'delivered'];
        const currentIndex = statusOptions.indexOf(currentStatus);

        if (currentIndex < statusOptions.length - 1) {
            orders[orderIndex].status = statusOptions[currentIndex + 1];
            localStorage.setItem('orders', JSON.stringify(orders));

            showNotification(`Đã cập nhật trạng thái đơn hàng thành "${getOrderStatusText(orders[orderIndex].status)}"`, 'success');
            loadAdminContent(); // Reload admin content
        }
    }
}

// Delete order
function deleteOrder(orderId) {
    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const filteredOrders = orders.filter(o => o.id != orderId);
        localStorage.setItem('orders', JSON.stringify(filteredOrders));

        showNotification('Đã xóa đơn hàng thành công!', 'success');
        loadAdminContent(); // Reload admin content
    }
}

// Export orders
function exportOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const dataStr = JSON.stringify(orders, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `orders-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();

    showNotification('Đã xuất dữ liệu đơn hàng thành công!', 'success');
}

// Render available drones for selection
function renderAvailableDrones() {
    let drones = JSON.parse(localStorage.getItem('drones') || '[]');

    // If no drones exist, create some sample drones
    if (drones.length === 0) {
        const sampleDrones = [
            {
                id: 'DR001',
                name: 'Drone Alpha',
                status: 'available',
                battery: 85,
                location: { lat: 21.0285, lng: 105.8542 }, // Hà Nội
                capacity: 5,
                range: 10
            },
            {
                id: 'DR002',
                name: 'Drone Beta',
                status: 'available',
                battery: 92,
                location: { lat: 21.0245, lng: 105.8412 },
                capacity: 8,
                range: 15
            },
            {
                id: 'DR003',
                name: 'Drone Gamma',
                status: 'available',
                battery: 67,
                location: { lat: 21.0195, lng: 105.8502 },
                capacity: 3,
                range: 8
            },
            {
                id: 'DR004',
                name: 'Drone Delta',
                status: 'available',
                battery: 78,
                location: { lat: 21.0335, lng: 105.8592 },
                capacity: 6,
                range: 12
            },
            {
                id: 'DR005',
                name: 'Drone Echo',
                status: 'available',
                battery: 95,
                location: { lat: 21.0155, lng: 105.8372 },
                capacity: 4,
                range: 9
            }
        ];
        localStorage.setItem('drones', JSON.stringify(sampleDrones));
        drones = sampleDrones;
    }

    // Auto-fix: If all drones are busy, reset some to available
    const availableDrones = drones.filter(d => d.status === 'available');
    if (availableDrones.length === 0 && drones.length > 0) {
        console.log('⚠️ All drones are busy, auto-resetting some to available...');
        drones.forEach((drone, index) => {
            if (index < 3) { // Reset first 3 drones to available
                drone.status = 'available';
                drone.assignedOrder = null;
            }
        });
        localStorage.setItem('drones', JSON.stringify(drones));
        console.log('✅ Auto-reset completed: 3 drones set to available');
    }

    const finalAvailableDrones = drones.filter(d => d.status === 'available');
    console.log('=== DRONE DEBUG INFO ===');
    console.log('Total drones:', drones.length);
    console.log('All drones:', drones.map(d => ({ id: d.id, name: d.name, status: d.status })));
    console.log('Available drones:', finalAvailableDrones.length, finalAvailableDrones.map(d => ({ id: d.id, name: d.name, status: d.status })));
    console.log('========================');

    if (finalAvailableDrones.length === 0) {
        return '<option value="">Không có drone khả dụng - Tất cả đang bận</option>';
    }

    return finalAvailableDrones.map(drone =>
        `<option value="${drone.id}">${drone.name} (Pin: ${drone.battery}%, Tải trọng: ${drone.capacity}kg)</option>`
    ).join('');
}

// Show drone assignment modal
function showDroneAssignmentModal() {
    console.log('=== OPENING DRONE ASSIGNMENT MODAL ===');
    console.log('Current drones in localStorage:', JSON.parse(localStorage.getItem('drones') || '[]'));

    // Remove any existing modal first
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    const modalId = 'droneAssignmentModal_' + Date.now(); // Unique ID
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = modalId;
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-drone"></i> Phân công Drone</h3>
                <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Chọn đơn hàng:</label>
                    <select id="modalOrderSelect_${modalId}" class="form-control">
                        <option value="">Chọn đơn hàng cần giao...</option>
                        ${renderPendingOrdersForAssignment()}
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Chọn drone:</label>
                    <select id="modalDroneSelect_${modalId}" class="form-control">
                        <option value="">Chọn drone...</option>
                        ${renderAvailableDrones()}
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Thời gian giao dự kiến:</label>
                    <input type="datetime-local" id="estimatedDelivery_${modalId}" class="form-control" 
                           value="${getEstimatedDeliveryTime()}">
                </div>
                
                <div class="drone-info" id="selectedDroneInfo_${modalId}" style="display: none;">
                    <!-- Drone info will be displayed here -->
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Hủy</button>
                <button class="btn-primary" id="confirmAssignmentBtn_${modalId}" onclick="confirmModalDroneAssignmentWithId('${modalId}')">Xác nhận</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners after modal is added to DOM
    setTimeout(() => {
        const droneSelect = document.getElementById(`modalDroneSelect_${modalId}`);
        if (droneSelect) {
            droneSelect.addEventListener('change', function () {
                showDroneInfoWithId(this.value, modalId);
            });
            console.log('Event listener added to modalDroneSelect_' + modalId);
        } else {
            console.error('modalDroneSelect not found after modal creation');
        }

        // Verify all elements exist
        const elements = {
            orderSelect: document.getElementById(`modalOrderSelect_${modalId}`),
            droneSelect: document.getElementById(`modalDroneSelect_${modalId}`),
            estimatedDelivery: document.getElementById(`estimatedDelivery_${modalId}`),
            confirmBtn: document.getElementById(`confirmAssignmentBtn_${modalId}`)
        };
        console.log('Modal elements verification:', elements);

        // Add backup event listener to confirm button (remove existing first)
        if (elements.confirmBtn) {
            // Remove any existing event listeners
            elements.confirmBtn.onclick = null;

            // Add new event listener
            elements.confirmBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent multiple calls
                console.log('Confirm button clicked via event listener');

                // Check if modal still exists before proceeding
                if (document.querySelector('.modal-overlay')) {
                    confirmModalDroneAssignmentWithId(modalId);
                }
            });
        }
    }, 100);
}

// Render pending orders for assignment
function renderPendingOrdersForAssignment() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.filter(o => o.status === 'pending' || o.status === 'processing')
        .map(order => `
            <option value="${order.id}">
                #${order.id} - ${order.customerInfo.name} - ${order.customerInfo.address}
            </option>
        `).join('');
}

// Get estimated delivery time (current time + 2 hours)
function getEstimatedDeliveryTime() {
    const now = new Date();
    now.setHours(now.getHours() + 2);
    return now.toISOString().slice(0, 16);
}

// Show drone information when selected
function showDroneInfo(droneId) {
    const droneInfoDiv = document.getElementById('selectedDroneInfo');
    if (!droneId) {
        droneInfoDiv.style.display = 'none';
        return;
    }

    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    const drone = drones.find(d => d.id === droneId);

    if (drone) {
        droneInfoDiv.innerHTML = `
            <div class="drone-details">
                <h4><i class="fas fa-drone"></i> ${drone.name}</h4>
                <div class="drone-stats">
                    <div class="stat">
                        <label>Pin:</label>
                        <div class="battery-indicator">
                            <div class="battery-level" style="width: ${drone.battery}%"></div>
                            <span>${drone.battery}%</span>
                        </div>
                    </div>
                    <div class="stat">
                        <label>Tải trọng tối đa:</label>
                        <span>${drone.capacity}kg</span>
                    </div>
                    <div class="stat">
                        <label>Phạm vi hoạt động:</label>
                        <span>${drone.range}km</span>
                    </div>
                    <div class="stat">
                        <label>Vị trí hiện tại:</label>
                        <span>Lat: ${drone.location.lat.toFixed(4)}, Lng: ${drone.location.lng.toFixed(4)}</span>
                    </div>
                </div>
            </div>
        `;
        droneInfoDiv.style.display = 'block';
    }
}

// Show drone info with modal ID
function showDroneInfoWithId(droneId, modalId) {
    const droneInfoDiv = document.getElementById(`selectedDroneInfo_${modalId}`);
    if (!droneId || !droneInfoDiv) {
        if (droneInfoDiv) {
            droneInfoDiv.style.display = 'none';
        }
        return;
    }

    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    const drone = drones.find(d => d.id === droneId);

    if (drone) {
        droneInfoDiv.innerHTML = `
            <div class="drone-details">
                <h4><i class="fas fa-drone"></i> ${drone.name}</h4>
                <div class="drone-stats">
                    <div class="stat">
                        <label>Pin:</label>
                        <div class="battery-indicator">
                            <div class="battery-level" style="width: ${drone.battery}%"></div>
                            <span>${drone.battery}%</span>
                        </div>
                    </div>
                    <div class="stat">
                        <label>Tải trọng tối đa:</label>
                        <span>${drone.capacity}kg</span>
                    </div>
                    <div class="stat">
                        <label>Phạm vi hoạt động:</label>
                        <span>${drone.range}km</span>
                    </div>
                    <div class="stat">
                        <label>Vị trí hiện tại:</label>
                        <span>Lat: ${drone.location.lat.toFixed(4)}, Lng: ${drone.location.lng.toFixed(4)}</span>
                    </div>
                </div>
            </div>
        `;
        droneInfoDiv.style.display = 'block';
    }
}

// Confirm drone assignment
function confirmModalDroneAssignmentWithId(modalId) {
    console.log('confirmModalDroneAssignmentWithId called with modalId:', modalId);

    // Check if modal still exists
    const modalElement = document.querySelector(`[id="${modalId}"]`) || document.querySelector('.modal-overlay');
    if (!modalElement) {
        console.log('Modal no longer exists, skipping confirmation');
        return;
    }

    const orderSelectElement = document.getElementById(`modalOrderSelect_${modalId}`);
    const droneSelectElement = document.getElementById(`modalDroneSelect_${modalId}`);
    const estimatedElement = document.getElementById(`estimatedDelivery_${modalId}`);

    console.log('Modal elements found:', {
        orderSelect: orderSelectElement,
        droneSelect: droneSelectElement,
        estimated: estimatedElement
    });

    if (!orderSelectElement) {
        console.error('modalOrderSelect not found for modalId:', modalId);
        showNotification('Lỗi: Không tìm thấy form chọn đơn hàng!', 'error');
        return;
    }

    if (!droneSelectElement) {
        console.error('modalDroneSelect not found for modalId:', modalId);
        showNotification('Lỗi: Không tìm thấy form chọn drone!', 'error');
        return;
    }

    const orderId = orderSelectElement.value;
    const droneId = droneSelectElement.value;
    const estimatedDelivery = estimatedElement ? estimatedElement.value : '';

    console.log('Modal values:', { orderId, droneId, estimatedDelivery });

    if (!orderId || !droneId) {
        showNotification('Vui lòng chọn đơn hàng và drone!', 'error');
        return;
    }

    // Update order with drone assignment
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    console.log('All orders:', orders);
    console.log('Looking for order ID:', orderId, typeof orderId);

    // Try both string and number comparison
    const orderIndex = orders.findIndex(o => o.id === orderId || o.id == orderId || String(o.id) === String(orderId));

    console.log('Found order index:', orderIndex);

    if (orderIndex !== -1) {
        orders[orderIndex].assignedDrone = droneId;
        orders[orderIndex].estimatedDelivery = estimatedDelivery;
        orders[orderIndex].status = 'shipping';
        localStorage.setItem('orders', JSON.stringify(orders));

        console.log('Updated order:', orders[orderIndex]);

        // Update drone status
        const drones = JSON.parse(localStorage.getItem('drones') || '[]');
        const droneIndex = drones.findIndex(d => d.id === droneId);
        if (droneIndex !== -1) {
            drones[droneIndex].status = 'busy';
            drones[droneIndex].assignedOrder = orderId;
            localStorage.setItem('drones', JSON.stringify(drones));
            console.log('Drone updated:', drones[droneIndex]);
        }

        showNotification('Đã phân công drone thành công!', 'success');

        // Close modal properly
        const modal = document.querySelector('.modal-overlay') || document.getElementById(modalId);
        if (modal) {
            modal.remove();
            console.log('Modal removed successfully');
        }

        // Sync map immediately but preserve routes
        if (window.adminDeliveryMap) {
            addDronesToMap();
            addOrdersToMap(); // Also refresh order markers

            // Show delivery route after map sync with a slight delay
            setTimeout(() => {
                showDeliveryRoute(orderId);
            }, 500);
        }

        // Don't reload admin content to preserve map and routes
        console.log('Assignment completed, map preserved with route');
    } else {
        console.error('Order not found. Available order IDs:', orders.map(o => ({ id: o.id, type: typeof o.id })));
        showNotification('Không tìm thấy đơn hàng! ID: ' + orderId, 'error');
    }
}

function confirmModalDroneAssignment() {
    console.log('confirmModalDroneAssignment (modal version) called');

    const orderSelectElement = document.getElementById('modalOrderSelect');
    const droneSelectElement = document.getElementById('modalDroneSelect');
    const estimatedElement = document.getElementById('estimatedDelivery');

    console.log('Modal elements found:', {
        orderSelect: orderSelectElement,
        droneSelect: droneSelectElement,
        estimated: estimatedElement
    });

    if (!orderSelectElement) {
        console.error('modalOrderSelect not found!');
        showNotification('Lỗi: Không tìm thấy form chọn đơn hàng!', 'error');
        return;
    }

    if (!droneSelectElement) {
        console.error('modalDroneSelect not found!');
        showNotification('Lỗi: Không tìm thấy form chọn drone!', 'error');
        return;
    }

    const orderId = orderSelectElement.value;
    const droneId = droneSelectElement.value;
    const estimatedDelivery = estimatedElement ? estimatedElement.value : '';

    console.log('Modal values:', { orderId, droneId, estimatedDelivery });

    if (!orderId || !droneId) {
        showNotification('Vui lòng chọn đơn hàng và drone!', 'error');
        return;
    }

    // Update order with drone assignment
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    console.log('All orders:', orders);
    console.log('Looking for order ID:', orderId, typeof orderId);

    // Try both string and number comparison
    const orderIndex = orders.findIndex(o => o.id === orderId || o.id == orderId || String(o.id) === String(orderId));

    console.log('Found order index:', orderIndex);

    if (orderIndex !== -1) {
        orders[orderIndex].assignedDrone = droneId;
        orders[orderIndex].estimatedDelivery = estimatedDelivery;
        orders[orderIndex].status = 'shipping';
        localStorage.setItem('orders', JSON.stringify(orders));

        console.log('Updated order:', orders[orderIndex]);

        // Update drone status
        const drones = JSON.parse(localStorage.getItem('drones') || '[]');
        const droneIndex = drones.findIndex(d => d.id === droneId);
        if (droneIndex !== -1) {
            drones[droneIndex].status = 'busy';
            drones[droneIndex].assignedOrder = orderId;
            localStorage.setItem('drones', JSON.stringify(drones));
            console.log('Drone updated:', drones[droneIndex]);
        }

        showNotification('Đã phân công drone thành công!', 'success');

        // Close modal
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }

        // Sync map immediately but preserve routes
        if (window.adminDeliveryMap) {
            addDronesToMap();
            addOrdersToMap(); // Also refresh order markers

            // Show delivery route after map sync with a slight delay
            setTimeout(() => {
                showDeliveryRoute(orderId);
            }, 500);
        }

        // Don't reload admin content to preserve map and routes
        console.log('Assignment completed, map preserved with route');
    } else {
        console.error('Order not found. Available order IDs:', orders.map(o => ({ id: o.id, type: typeof o.id })));
        showNotification('Không tìm thấy đơn hàng! ID: ' + orderId, 'error');
    }
}

// Assign drone to order (simplified version)
function assignDroneToOrder() {
    const orderId = document.getElementById('orderSelect').value;
    const droneId = document.getElementById('droneSelect').value;

    console.log('Quick assign:', { orderId, droneId });

    if (!orderId || !droneId) {
        showNotification('Vui lòng chọn đơn hàng và drone!', 'error');
        return;
    }

    // Get estimated delivery time
    const now = new Date();
    now.setHours(now.getHours() + 2);
    const estimatedDelivery = now.toISOString().slice(0, 16);

    // Update order with drone assignment
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id === orderId);

    if (orderIndex !== -1) {
        orders[orderIndex].assignedDrone = droneId;
        orders[orderIndex].estimatedDelivery = estimatedDelivery;
        orders[orderIndex].status = 'shipping';
        localStorage.setItem('orders', JSON.stringify(orders));

        // Update drone status
        const drones = JSON.parse(localStorage.getItem('drones') || '[]');
        const droneIndex = drones.findIndex(d => d.id === droneId);
        if (droneIndex !== -1) {
            drones[droneIndex].status = 'busy';
            drones[droneIndex].assignedOrder = orderId;
            localStorage.setItem('drones', JSON.stringify(drones));
        }

        showNotification('Đã phân công drone thành công!', 'success');

        // Sync map immediately and show route
        if (window.adminDeliveryMap) {
            addDronesToMap();
            // Show drone and delivery route immediately
            setTimeout(() => {
                showDroneDeliveryRoute(orderId, droneId);
            }, 300);
        }

        // Refresh admin content
        setTimeout(() => {
            loadAdminContent();
        }, 500);
    }

    confirmDroneAssignment();
}

// Refresh drone map
function refreshDroneMap() {
    console.log('Refreshing drone map...');
    const mapContainer = document.getElementById('adminDeliveryMap');
    if (!mapContainer) {
        showNotification('Không tìm thấy container bản đồ!', 'error');
        return;
    }

    initializeAdminDeliveryMap();
    showNotification('Đã cập nhật bản đồ!', 'success');
}

// Manual map initialization (for button click)
function manualInitializeMap() {
    console.log('Manual map initialization triggered...');
    const mapContainer = document.getElementById('adminDeliveryMap');
    if (!mapContainer) {
        showNotification('Container bản đồ chưa sẵn sàng. Vui lòng thử lại sau.', 'error');
        return;
    }

    initializeAdminDeliveryMap();
    showNotification('Đã khởi tạo bản đồ!', 'success');
}

// Initialize admin delivery map
function initializeAdminDeliveryMap() {
    console.log('Initializing admin delivery map...');

    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        showNotification('Lỗi: Thư viện bản đồ chưa được tải!', 'error');
        return;
    }

    // Check if map container exists
    const mapContainer = document.getElementById('adminDeliveryMap');
    if (!mapContainer) {
        console.error('Admin delivery map container not found');
        return;
    }

    console.log('Map container found:', mapContainer);

    // Remove existing map if any
    if (window.adminDeliveryMap) {
        console.log('Removing existing map');
        try {
            window.adminDeliveryMap.off(); // Remove all event handlers
            window.adminDeliveryMap.remove();
        } catch (e) {
            console.log('Error removing existing map:', e);
        }
        window.adminDeliveryMap = null;
    }

    // Clear and reset container
    mapContainer.innerHTML = '';
    mapContainer.style.height = '500px';
    mapContainer.style.width = '100%';
    mapContainer.style.background = '#f8f9fa';

    // Small delay to ensure DOM is ready
    setTimeout(() => {
        try {
            console.log('Creating new map...');

            // Create map with center in Hanoi
            window.adminDeliveryMap = L.map(mapContainer, {
                center: [21.0285, 105.8542],
                zoom: 13,
                zoomControl: true,
                attributionControl: true
            });

            // Verify map was created
            if (!window.adminDeliveryMap || typeof window.adminDeliveryMap.addLayer !== 'function') {
                throw new Error('Map creation failed - invalid map object');
            }

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(window.adminDeliveryMap);

            console.log('Map created successfully:', window.adminDeliveryMap);

            // Add click event to map for setting target locations
            window.adminDeliveryMap.on('click', function (e) {
                console.log('Map clicked at:', e.latlng);
                if (window.selectedDrone) {
                    setTargetLocation(e.latlng.lat, e.latlng.lng);
                }
            });

            // Wait a bit then add markers
            setTimeout(() => {
                try {
                    addDronesToMap();
                    addOrdersToMap();

                    // Ensure map renders properly
                    window.adminDeliveryMap.invalidateSize();
                    console.log('Admin delivery map fully initialized');
                    showNotification('Bản đồ đã được khởi tạo thành công!', 'success');
                } catch (error) {
                    console.error('Error adding markers:', error);
                    showNotification('Lỗi thêm markers: ' + error.message, 'error');
                }
            }, 300);

        } catch (error) {
            console.error('Error initializing map:', error);
            showNotification('Lỗi khởi tạo bản đồ: ' + error.message, 'error');

            // Fallback: show placeholder
            mapContainer.innerHTML = `
                <div style="height: 500px; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border: 1px dashed #ddd;">
                    <div style="text-align: center; color: #666;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 10px;"></i><br>
                        <strong>Lỗi khởi tạo bản đồ</strong><br>
                        <button onclick="initializeAdminDeliveryMap()" class="btn-primary" style="margin-top: 10px;">
                            Thử lại
                        </button>
                    </div>
                </div>
            `;
        }
    }, 100);
}

// Set target location for drone
function setTargetLocation(lat, lng) {
    console.log('Setting target location:', lat, lng);

    // Remove existing target marker
    if (window.targetMarker) {
        window.adminDeliveryMap.removeLayer(window.targetMarker);
    }

    // Add new target marker
    window.targetMarker = L.marker([lat, lng], {
        icon: L.divIcon({
            html: '🎯',
            className: 'target-marker',
            iconSize: [20, 20]
        })
    }).addTo(window.adminDeliveryMap);

    showNotification(`Đã đặt vị trí đích tại: ${lat.toFixed(6)}, ${lng.toFixed(6)}`, 'info');
}

// Clear current delivery route
function clearDeliveryRoute() {
    if (window.currentRoute) {
        try {
            // Check if it's a routing control or polyline
            if (window.currentRoute.removeFrom) {
                // It's a polyline
                window.adminDeliveryMap.removeLayer(window.currentRoute);
            } else {
                // It's a routing control
                window.adminDeliveryMap.removeControl(window.currentRoute);
            }
            window.currentRoute = null;
            console.log('Cleared current delivery route');
        } catch (error) {
            console.error('Error clearing route:', error);
        }
    }

    // Clear route markers
    if (window.currentDroneMarker) {
        try {
            window.adminDeliveryMap.removeLayer(window.currentDroneMarker);
            window.currentDroneMarker = null;
        } catch (error) {
            console.error('Error removing drone marker:', error);
        }
    }

    if (window.currentDeliveryMarker) {
        try {
            window.adminDeliveryMap.removeLayer(window.currentDeliveryMarker);
            window.currentDeliveryMarker = null;
        } catch (error) {
            console.error('Error removing delivery marker:', error);
        }
    }
}

// Add drones to map
function addDronesToMap() {
    if (!window.adminDeliveryMap || typeof window.adminDeliveryMap.addLayer !== 'function') {
        console.error('Admin delivery map not properly initialized');
        return;
    }

    // Clear existing drone markers
    if (window.droneMarkers) {
        Object.values(window.droneMarkers).forEach(marker => {
            try {
                window.adminDeliveryMap.removeLayer(marker);
            } catch (e) {
                console.log('Error removing drone marker:', e);
            }
        });
    }
    window.droneMarkers = {};

    // Get synchronized drones from localStorage
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    console.log('Adding synchronized drones to map:', drones.length);

    // If no drones, create them first
    if (drones.length === 0) {
        console.log('No drones found, creating synchronized drones...');
        renderAvailableDrones(); // This will create the drones
        return addDronesToMap(); // Recursive call after creation
    }

    drones.forEach(drone => {
        try {
            // Ensure drone has location
            if (!drone.location) {
                drone.location = {
                    lat: 21.0285 + (Math.random() - 0.5) * 0.1, // Random position around Hanoi
                    lng: 105.8542 + (Math.random() - 0.5) * 0.1
                };
            }

            const iconClass = drone.status === 'moving' ? 'rotating' : '';
            const iconHtml = `<div class="drone-icon ${iconClass}">🚁</div>`;

            // Status color mapping
            const statusColors = {
                'available': '#28a745',
                'busy': '#dc3545',
                'maintenance': '#ffc107',
                'charging': '#6c757d'
            };

            const icon = L.divIcon({
                html: `<div class="drone-marker ${drone.status}" style="background-color: ${statusColors[drone.status] || '#6c757d'}">
                            ${iconHtml}
                            <span class="drone-battery">${drone.battery}%</span>
                       </div>`,
                className: 'custom-div-icon',
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            });

            window.droneMarkers[drone.id] = L.marker([drone.location.lat, drone.location.lng], { icon: icon })
                .addTo(window.adminDeliveryMap);

            window.droneMarkers[drone.id].bindPopup(`
                <div class="drone-popup">
                    <h4><i class="fas fa-drone"></i> ${drone.name}</h4>
                    <p><strong>Trạng thái:</strong> <span class="status-${drone.status}">${getDroneStatusText(drone.status)}</span></p>
                    <p><strong>Pin:</strong> ${drone.battery}%</p>
                    <p><strong>Tải trọng:</strong> ${drone.capacity}kg</p>
                    <p><strong>Phạm vi:</strong> ${drone.range}km</p>
                    ${drone.assignedOrder ? `<p><strong>Đơn hàng:</strong> #${drone.assignedOrder}</p>` : ''}
                    <div class="popup-actions">
                        <button class="btn-primary btn-sm" onclick="selectDroneForControl('${drone.id}')">
                            <i class="fas fa-gamepad"></i> Điều khiển
                        </button>
                        ${drone.status === 'busy' ? `
                            <button class="btn-secondary btn-sm" onclick="setDroneAvailable('${drone.id}')">
                                <i class="fas fa-check"></i> Đặt sẵn sàng
                            </button>
                        ` : ''}
                    </div>
                </div>
            `);
        } catch (error) {
            console.error('Error adding drone marker:', error);
        }
    });

    console.log('✅ Synchronized drones added to map successfully');
}

// Add orders to map
function addOrdersToMap() {
    if (!window.adminDeliveryMap || typeof window.adminDeliveryMap.addLayer !== 'function') {
        console.error('Admin delivery map not properly initialized');
        return;
    }

    // Clear existing order markers
    if (window.orderMarkers) {
        Object.values(window.orderMarkers).forEach(marker => {
            try {
                window.adminDeliveryMap.removeLayer(marker);
            } catch (e) {
                console.log('Error removing order marker:', e);
            }
        });
    }
    window.orderMarkers = {};

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    console.log('Adding orders to map:', orders);

    orders.forEach(order => {
        // Check both old and new data structure for coordinates
        let lat, lng;
        if (order.deliveryInfo && order.deliveryInfo.lat && order.deliveryInfo.lng) {
            // New structure from processCheckout
            lat = parseFloat(order.deliveryInfo.lat);
            lng = parseFloat(order.deliveryInfo.lng);
        } else if (order.deliveryLocation && order.deliveryLocation.lat && order.deliveryLocation.lng) {
            // Old structure
            lat = parseFloat(order.deliveryLocation.lat);
            lng = parseFloat(order.deliveryLocation.lng);
        }

        if (lat && lng) {
            try {
                // Create different icons based on order status
                let markerColor, markerIcon;
                switch (order.status) {
                    case 'delivered':
                        markerColor = '#28a745'; // Green for delivered
                        markerIcon = 'fas fa-check-circle';
                        break;
                    case 'shipping':
                        markerColor = '#007bff'; // Blue for shipping
                        markerIcon = 'fas fa-shipping-fast';
                        break;
                    case 'processing':
                        markerColor = '#ffc107'; // Yellow for processing
                        markerIcon = 'fas fa-cog';
                        break;
                    case 'pending':
                    default:
                        markerColor = '#6c757d'; // Gray for pending
                        markerIcon = 'fas fa-clock';
                        break;
                }

                const icon = L.divIcon({
                    html: `<div class="order-marker status-${order.status}" style="background-color: ${markerColor}; border: 2px solid white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
                                <i class="${markerIcon}" style="color: white; font-size: 14px;"></i>
                           </div>
                           <div class="order-id-label" style="background: ${markerColor}; color: white; font-size: 10px; padding: 2px 4px; border-radius: 3px; margin-top: 2px; text-align: center; font-weight: bold; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">
                                #${String(order.id).slice(-4)}
                           </div>`,
                    className: 'custom-div-icon',
                    iconSize: [35, 45],
                    iconAnchor: [17, 45]
                });

                window.orderMarkers[order.id] = L.marker([lat, lng], { icon: icon })
                    .addTo(window.adminDeliveryMap);

                // Add click event to auto-select order (only for non-delivered orders)
                window.orderMarkers[order.id].on('click', function () {
                    console.log('Order marker clicked:', order.id);

                    // If order is already delivered, just show popup with info
                    if (order.status === 'delivered') {
                        console.log('Order already delivered, showing info only');
                        showNotification(`Đơn hàng #${order.id} đã được giao thành công!`, 'info');
                        return; // Don't open assignment modal for delivered orders
                    }

                    // If order already has assigned drone, just show info
                    if (order.assignedDrone && order.status === 'shipping') {
                        console.log('Order already has assigned drone, showing delivery info');
                        showNotification(`Đơn hàng #${order.id} đang được giao bởi ${getDroneName(order.assignedDrone)}`, 'info');
                        return; // Don't open assignment modal for orders in progress
                    }

                    // Only open modal for pending/processing orders without drone assignment
                    if ((order.status === 'pending' || order.status === 'processing') && !order.assignedDrone) {
                        // Check if there's already a modal open
                        const existingModal = document.querySelector('.modal-overlay');

                        if (existingModal) {
                            // Auto-select this order in existing modal
                            const modalOrderSelects = document.querySelectorAll('[id^="modalOrderSelect_"]');
                            modalOrderSelects.forEach(select => {
                                if (select) {
                                    select.value = order.id;
                                    console.log('Auto-selected order in existing modal:', order.id);
                                    showNotification(`Đã chọn đơn hàng #${order.id}`, 'success');
                                }
                            });
                        } else {
                            // Open modal and auto-select this order
                            showDroneAssignmentModal();

                            // Wait for modal to be created then select the order
                            setTimeout(() => {
                                const modalOrderSelects = document.querySelectorAll('[id^="modalOrderSelect_"]');
                                modalOrderSelects.forEach(select => {
                                    if (select) {
                                        select.value = order.id;
                                        console.log('Auto-selected order in new modal:', order.id);
                                        showNotification(`Đã mở modal và chọn đơn hàng #${order.id}`, 'success');
                                    }
                                });
                            }, 200);
                        }
                    } else {
                        // For other statuses, just show info
                        showNotification(`Đơn hàng #${order.id} - Trạng thái: ${getOrderStatusText(order.status)}`, 'info');
                    }
                });

                window.orderMarkers[order.id].bindPopup(`
                    <div class="order-popup">
                        <h4><i class="fas fa-shopping-cart"></i> Đơn hàng #${order.id}</h4>
                        <p><strong>Khách hàng:</strong> ${order.customerInfo.name}</p>
                        <p><strong>Điện thoại:</strong> ${order.customerInfo.phone}</p>
                        <p><strong>Địa chỉ:</strong> ${order.deliveryInfo.address || order.customerInfo.address || 'N/A'}</p>
                        <p><strong>Tọa độ:</strong> ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
                        <p><strong>Trạng thái:</strong> ${getOrderStatusText(order.status)}</p>
                        <p><strong>Tổng tiền:</strong> ${formatPrice(order.total)}</p>
                        <p><strong>Thời gian đặt:</strong> ${order.date || new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                        ${order.assignedDrone ? `
                            <p><strong>Drone giao hàng:</strong> ${getDroneName(order.assignedDrone)}</p>
                        ` : ''}
                        ${order.estimatedDelivery ? `
                            <p><strong>Thời gian dự kiến:</strong> ${new Date(order.estimatedDelivery).toLocaleString('vi-VN')}</p>
                        ` : ''}
                        ${order.deliveryCompletedAt ? `
                            <p><strong>Hoàn thành lúc:</strong> ${new Date(order.deliveryCompletedAt).toLocaleString('vi-VN')}</p>
                        ` : ''}
                        ${order.fullyCompletedAt ? `
                            <p><strong>Giao hàng hoàn tất:</strong> ${new Date(order.fullyCompletedAt).toLocaleString('vi-VN')}</p>
                        ` : ''}
                        
                        ${order.status === 'delivered' ? `
                            <div style="color: #28a745; font-weight: bold; margin-top: 10px; padding: 8px; background: #d4edda; border-radius: 4px; text-align: center;">
                                <i class="fas fa-check-circle"></i> ✅ Đơn hàng đã được giao thành công!
                            </div>
                            <div style="margin-top: 8px; font-size: 12px; color: #666; text-align: center;">
                                Drone đã quay về vị trí ban đầu và sẵn sàng giao hàng tiếp theo
                            </div>
                        ` : order.assignedDrone ? `
                            <button class="btn-primary btn-sm" onclick="showDeliveryRoute('${order.id}')">
                                <i class="fas fa-route"></i> Xem đường đi
                            </button>
                            ${order.status === 'shipping' && !order.deliveryStarted ? `
                                <button class="btn-success btn-sm" onclick="startDelivery('${order.id}')" style="margin-top: 5px;">
                                    <i class="fas fa-play"></i> Bắt đầu giao hàng
                                </button>
                            ` : ''}
                            ${order.status === 'shipping' && order.deliveryStarted && !order.deliveryCompleted ? `
                                <div style="color: #007bff; font-weight: bold; margin-top: 5px;">
                                    <i class="fas fa-spinner fa-spin"></i> Đang giao hàng...
                                </div>
                            ` : ''}
                            ${order.status === 'shipping' && order.deliveryCompleted && !order.returning ? `
                                <div style="color: #28a745; font-weight: bold; margin-top: 5px;">
                                    <i class="fas fa-check-circle"></i> Đã giao hàng, chờ drone quay về...
                                </div>
                            ` : ''}
                            ${order.status === 'shipping' && order.returning ? `
                                <div style="color: #ffc107; font-weight: bold; margin-top: 5px;">
                                    <i class="fas fa-undo fa-spin"></i> Drone đang quay về...
                                </div>
                            ` : ''}
                            ${order.status === 'shipping' && order.fullyCompleted ? `
                                <button class="btn-success btn-sm" onclick="completeDelivery('${order.id}')" style="margin-top: 5px;">
                                    <i class="fas fa-check"></i> Xác nhận hoàn thành
                                </button>
                            ` : ''}
                        ` : `
                            <button class="btn-primary btn-sm" onclick="quickAssignDrone('${order.id}')">
                                <i class="fas fa-drone"></i> Phân công Drone
                            </button>
                        `}
                    </div>
                `);
            } catch (error) {
                console.error('Error adding order marker:', error);
            }
        } else {
            console.warn('Order missing coordinates:', order.id, 'deliveryInfo:', order.deliveryInfo);
        }
    });

    console.log('Orders added to map successfully');
}

// Start delivery animation
function startDelivery(orderId) {
    console.log('Starting delivery for order:', orderId);

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id === orderId || String(o.id) === String(orderId));

    if (orderIndex === -1) {
        showNotification('Không tìm thấy đơn hàng!', 'error');
        return;
    }

    const order = orders[orderIndex];
    const droneId = order.assignedDrone;

    if (!droneId) {
        showNotification('Đơn hàng chưa được phân công drone!', 'error');
        return;
    }

    // Update order status
    orders[orderIndex].deliveryStarted = true;
    orders[orderIndex].deliveryStartedAt = new Date().toISOString();
    localStorage.setItem('orders', JSON.stringify(orders));

    // Start drone animation
    animateDroneMovement(droneId, order);

    // Refresh order markers to show new status
    addOrdersToMap();

    showNotification(`Bắt đầu giao hàng đơn #${orderId}!`, 'success');

    // Close any open popups
    if (window.adminDeliveryMap) {
        window.adminDeliveryMap.closePopup();
    }
}

// Animate drone movement
function animateDroneMovement(droneId, order) {
    console.log('Animating drone movement:', droneId, 'to order:', order.id);

    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    const droneIndex = drones.findIndex(d => d.id === droneId);

    // Check for delivery coordinates in both old and new structure
    let deliveryLat, deliveryLng;
    if (order.deliveryInfo && order.deliveryInfo.lat && order.deliveryInfo.lng) {
        deliveryLat = parseFloat(order.deliveryInfo.lat);
        deliveryLng = parseFloat(order.deliveryInfo.lng);
    } else if (order.deliveryLocation && order.deliveryLocation.lat && order.deliveryLocation.lng) {
        deliveryLat = parseFloat(order.deliveryLocation.lat);
        deliveryLng = parseFloat(order.deliveryLocation.lng);
    }

    if (droneIndex === -1 || !deliveryLat || !deliveryLng) {
        console.error('Drone or delivery location not found', {
            droneIndex,
            deliveryLat,
            deliveryLng,
            orderDeliveryInfo: order.deliveryInfo,
            orderDeliveryLocation: order.deliveryLocation
        });
        showNotification('Lỗi: Không tìm thấy drone hoặc địa chỉ giao hàng!', 'error');
        return;
    }

    const drone = drones[droneIndex];
    const originalLat = drone.location.lat; // Store original position
    const originalLng = drone.location.lng;
    const startLat = drone.location.lat;
    const startLng = drone.location.lng;
    const endLat = deliveryLat;
    const endLng = deliveryLng;

    console.log('Animation from:', startLat, startLng, 'to:', endLat, endLng);
    console.log('Original position:', originalLat, originalLng);

    // Animation parameters
    const duration = 10000; // 10 seconds for delivery
    const returnDuration = 8000; // 8 seconds for return
    const steps = 100;
    const stepDuration = duration / steps;
    const returnSteps = 80;
    const returnStepDuration = returnDuration / returnSteps;

    let currentStep = 0;
    let isReturning = false;
    let returnStep = 0;

    // Store route segments for fading effect
    window.routeSegments = [];

    // Store current route to preserve it during animation
    const preservedRoute = window.currentRoute;

    // Create animated drone marker if not exists
    if (!window.animatedDroneMarkers) {
        window.animatedDroneMarkers = {};
    }

    // Remove existing animated marker for this drone
    if (window.animatedDroneMarkers[droneId]) {
        try {
            window.adminDeliveryMap.removeLayer(window.animatedDroneMarkers[droneId]);
        } catch (e) {
            console.log('Error removing animated marker:', e);
        }
    }

    // Create animated drone icon
    const animatedIcon = L.divIcon({
        html: `<div class="animated-drone-marker" style="position: relative; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-drone" style="color: #007bff; font-size: 24px; z-index: 1000; text-shadow: 0 0 3px rgba(0,0,0,0.5);"></i>
                    <div class="drone-trail" style="position: absolute; width: 20px; height: 2px; background: linear-gradient(90deg, transparent, #007bff, transparent); opacity: 0.8; z-index: 999;"></div>
               </div>`,
        className: 'custom-animated-drone',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    // Create animated marker
    window.animatedDroneMarkers[droneId] = L.marker([startLat, startLng], {
        icon: animatedIcon,
        zIndexOffset: 1000 // Keep on top
    }).addTo(window.adminDeliveryMap);

    console.log('Animated drone marker created:', window.animatedDroneMarkers[droneId]);
    console.log('Marker position:', [startLat, startLng]);

    // Add popup to animated marker to verify it's working
    window.animatedDroneMarkers[droneId].bindPopup(
        `<div style="text-align: center;">
            <strong>🚁 ${drone.name}</strong><br>
            <span style="color: #007bff;">Đang giao hàng...</span>
        </div>`
    );

    // Immediately open popup to show marker is visible
    setTimeout(() => {
        if (window.animatedDroneMarkers[droneId]) {
            window.animatedDroneMarkers[droneId].openPopup();
        }
    }, 100);

    // Hide static drone marker during animation
    if (window.droneMarkers && window.droneMarkers[droneId]) {
        try {
            window.adminDeliveryMap.removeLayer(window.droneMarkers[droneId]);
            console.log('Hidden static drone marker during animation');
        } catch (e) {
            console.log('Error hiding static marker:', e);
        }
    }

    // Center map on animated drone
    window.adminDeliveryMap.setView([startLat, startLng], 15);

    // Animation function
    function animateStep() {
        if (!isReturning && currentStep >= steps) {
            // Delivery complete, start returning
            console.log('Delivery completed, drone returning to base...');
            isReturning = true;
            returnStep = 0;

            // Mark delivery as completed but not finished yet
            const updatedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
            const updatedOrderIndex = updatedOrders.findIndex(o => o.id === order.id || String(o.id) === String(order.id));
            if (updatedOrderIndex !== -1) {
                updatedOrders[updatedOrderIndex].deliveryCompleted = true;
                updatedOrders[updatedOrderIndex].deliveryCompletedAt = new Date().toISOString();
                updatedOrders[updatedOrderIndex].returning = true;
                localStorage.setItem('orders', JSON.stringify(updatedOrders));
            }

            showNotification(`Giao hàng thành công! Drone đang quay về...`, 'info');

            // Continue with return animation
            setTimeout(returnAnimateStep, returnStepDuration);
            return;
        }

        if (isReturning && returnStep >= returnSteps) {
            // Return animation complete - ensure exact positioning
            console.log('Drone return animation completed for drone:', droneId);
            console.log('Setting final position to exact original coordinates:', [originalLat, originalLng]);

            // Get fresh drone data to ensure we're working with latest state
            const latestDrones = JSON.parse(localStorage.getItem('drones') || '[]');
            const latestDroneIndex = latestDrones.findIndex(d => d.id === droneId);

            if (latestDroneIndex !== -1) {
                // Update drone location back to EXACT original position with high precision
                latestDrones[latestDroneIndex].location.lat = parseFloat(originalLat.toFixed(8));
                latestDrones[latestDroneIndex].location.lng = parseFloat(originalLng.toFixed(8));

                // Reset drone status to available (ready for next delivery)
                latestDrones[latestDroneIndex].status = 'available';
                latestDrones[latestDroneIndex].assignedOrder = null;

                // Clear any delivery-related flags
                latestDrones[latestDroneIndex].deliveryStarted = false;
                latestDrones[latestDroneIndex].deliveryCompleted = false;
                latestDrones[latestDroneIndex].returning = false;
                latestDrones[latestDroneIndex].fullyCompleted = false;

                // Save updated drone data
                localStorage.setItem('drones', JSON.stringify(latestDrones));

                console.log(`✅ Drone ${droneId} status reset to AVAILABLE and positioned at original coordinates`);
                console.log('Updated drone data:', latestDrones[latestDroneIndex]);
            }

            // Final position verification
            if (window.animatedDroneMarkers[droneId]) {
                window.animatedDroneMarkers[droneId].setLatLng([originalLat, originalLng]);
                console.log('Final marker position set to:', window.animatedDroneMarkers[droneId].getLatLng());
            }

            // Mark order as fully delivered
            const finalOrders = JSON.parse(localStorage.getItem('orders') || '[]');
            const finalOrderIndex = finalOrders.findIndex(o => o.id === order.id || String(o.id) === String(order.id));
            if (finalOrderIndex !== -1) {
                finalOrders[finalOrderIndex].status = 'delivered';
                finalOrders[finalOrderIndex].returning = false;
                finalOrders[finalOrderIndex].fullyCompleted = true;
                finalOrders[finalOrderIndex].fullyCompletedAt = new Date().toISOString();
                finalOrders[finalOrderIndex].assignedDrone = null; // Clear drone assignment from order
                localStorage.setItem('orders', JSON.stringify(finalOrders));
                console.log(`✅ Order ${order.id} marked as delivered and drone assignment cleared`);
            }

            // Clean up all route effects and segments
            if (window.routeSegments) {
                window.routeSegments.forEach(segment => {
                    try {
                        window.adminDeliveryMap.removeLayer(segment);
                    } catch (e) {
                        console.log('Error removing route segment:', e);
                    }
                });
                window.routeSegments = [];
            }

            // Clean up trail segments
            if (window.trailSegments) {
                window.trailSegments.forEach(segment => {
                    try {
                        window.adminDeliveryMap.removeLayer(segment);
                    } catch (e) {
                        console.log('Error removing trail segment:', e);
                    }
                });
                window.trailSegments = [];
            }

            // Don't clear the main delivery route - preserve it for user to view
            // clearDeliveryRoute();

            // Restore preserved route if it exists
            if (preservedRoute && window.adminDeliveryMap) {
                try {
                    window.currentRoute = preservedRoute;
                    if (!window.adminDeliveryMap.hasLayer(preservedRoute)) {
                        preservedRoute.addTo(window.adminDeliveryMap);
                    }
                    console.log('Restored delivery route after animation');
                } catch (e) {
                    console.log('Error restoring route:', e);
                }
            }

            // Remove animated marker
            if (window.animatedDroneMarkers[droneId]) {
                try {
                    window.adminDeliveryMap.removeLayer(window.animatedDroneMarkers[droneId]);
                    delete window.animatedDroneMarkers[droneId];
                    console.log('Removed animated marker');
                } catch (e) {
                    console.log('Error removing animated marker:', e);
                }
            }

            // Wait a bit before restoring static markers to ensure clean state
            setTimeout(() => {
                // Restore static markers at exact positions with updated status
                addDronesToMap();
                addOrdersToMap();

                // Update drone status display in admin panel if available
                if (typeof renderDronesStatus === 'function') {
                    const dronesStatusContainer = document.querySelector('.drones-status');
                    if (dronesStatusContainer) {
                        dronesStatusContainer.innerHTML = renderDronesStatus();
                    }
                }

                console.log('✅ Map markers restored with updated drone status');
            }, 500);

            showNotification(`🎉 Drone ${getDroneName(droneId)} đã hoàn thành giao hàng và sẵn sàng cho đơn hàng tiếp theo!`, 'success');
            return;
        }

        if (!isReturning) {
            // Calculate current position for delivery
            const progress = currentStep / steps;
            const currentLat = startLat + (endLat - startLat) * progress;
            const currentLng = startLng + (endLng - startLng) * progress;

            // Debug: Log position every 10 steps
            if (currentStep % 10 === 0) {
                console.log(`Delivery step ${currentStep}/${steps}: [${currentLat.toFixed(6)}, ${currentLng.toFixed(6)}]`);
            }

            // Update marker position
            if (window.animatedDroneMarkers[droneId]) {
                window.animatedDroneMarkers[droneId].setLatLng([currentLat, currentLng]);

                // Update popup content with progress
                const progressPercent = Math.round((currentStep / steps) * 100);
                window.animatedDroneMarkers[droneId].setPopupContent(
                    `<div style="text-align: center;">
                        <strong>🚁 ${drone.name}</strong><br>
                        <span style="color: #007bff;">Đang giao hàng... ${progressPercent}%</span><br>
                        <div style="width: 100px; height: 5px; background: #f0f0f0; border-radius: 3px; margin: 5px auto;">
                            <div style="width: ${progressPercent}%; height: 100%; background: #007bff; border-radius: 3px; transition: width 0.1s;"></div>
                        </div>
                    </div>`
                );
            }

            currentStep++;
            setTimeout(animateStep, stepDuration);
        }
    }

    // Return animation function
    function returnAnimateStep() {
        if (returnStep >= returnSteps) {
            // Final step: Ensure exact positioning at original coordinates
            console.log(`Final return step: Setting drone to exact original position [${originalLat}, ${originalLng}]`);

            if (window.animatedDroneMarkers[droneId]) {
                window.animatedDroneMarkers[droneId].setLatLng([originalLat, originalLng]);

                // Final popup update showing drone is ready for next delivery
                window.animatedDroneMarkers[droneId].setPopupContent(
                    `<div style="text-align: center;">
                        <strong>🚁 ${drone.name}</strong><br>
                        <span style="color: #28a745;">✅ Đã về vị trí ban đầu - Sẵn sàng giao hàng!</span>
                    </div>`
                );
            }

            // Get fresh drone data and reset status to available
            const currentDrones = JSON.parse(localStorage.getItem('drones') || '[]');
            const currentDroneIndex = currentDrones.findIndex(d => d.id === droneId);

            if (currentDroneIndex !== -1) {
                // Reset all delivery-related properties
                currentDrones[currentDroneIndex].status = 'available';
                currentDrones[currentDroneIndex].assignedOrder = null;
                currentDrones[currentDroneIndex].deliveryStarted = false;
                currentDrones[currentDroneIndex].deliveryCompleted = false;
                currentDrones[currentDroneIndex].returning = false;
                currentDrones[currentDroneIndex].fullyCompleted = false;

                // Update position to exact original coordinates
                currentDrones[currentDroneIndex].location.lat = parseFloat(originalLat.toFixed(8));
                currentDrones[currentDroneIndex].location.lng = parseFloat(originalLng.toFixed(8));

                localStorage.setItem('drones', JSON.stringify(currentDrones));

                console.log(`✅ Drone ${droneId} status reset to AVAILABLE in returnAnimateStep`);
                console.log('Updated drone:', currentDrones[currentDroneIndex]);
            }

            // Clear all route segments and trails
            if (window.trailSegments) {
                window.trailSegments.forEach(segment => {
                    try {
                        window.adminDeliveryMap.removeLayer(segment);
                    } catch (e) {
                        console.log('Error removing trail segment:', e);
                    }
                });
                window.trailSegments = [];
            }

            // Clear current route
            if (window.currentRoute) {
                try {
                    window.adminDeliveryMap.removeLayer(window.currentRoute);
                    window.currentRoute = null;
                } catch (e) {
                    console.log('Error removing current route:', e);
                }
            }

            return; // This should be handled in main animateStep function
        }

        // Calculate current position for return with high precision
        const progress = returnStep / returnSteps;

        // Use smooth easing for better animation
        const easeProgress = 1 - Math.pow(1 - progress, 2); // Ease-out quadratic

        // Calculate precise position using original coordinates as target
        const currentLat = endLat + (originalLat - endLat) * easeProgress;
        const currentLng = endLng + (originalLng - endLng) * easeProgress;

        // Debug: Log position every 10 steps
        if (returnStep % 10 === 0) {
            console.log(`Return step ${returnStep}/${returnSteps}: [${currentLat.toFixed(8)}, ${currentLng.toFixed(8)}] (${(progress * 100).toFixed(1)}%)`);
        }

        // Update marker position
        if (window.animatedDroneMarkers[droneId]) {
            window.animatedDroneMarkers[droneId].setLatLng([currentLat, currentLng]);

            // Update popup content with return progress
            const progressPercent = Math.round((returnStep / returnSteps) * 100);
            window.animatedDroneMarkers[droneId].setPopupContent(
                `<div style="text-align: center;">
                    <strong>🚁 ${drone.name}</strong><br>
                    <span style="color: #28a745;">Đang quay về... ${progressPercent}%</span><br>
                    <div style="width: 100px; height: 5px; background: #f0f0f0; border-radius: 3px; margin: 5px auto;">
                        <div style="width: ${progressPercent}%; height: 100%; background: #28a745; border-radius: 3px; transition: width 0.1s;"></div>
                    </div>
                    <small style="color: #666;">Sau khi về sẽ sẵn sàng giao hàng tiếp</small>
                </div>`
            );
        }

        // Create fading route effect for return journey
        createFadingRouteSegment(currentLat, currentLng, originalLat, originalLng, progress);

        returnStep++;
        setTimeout(returnAnimateStep, returnStepDuration);
    }

    // Start animation
    animateStep();
}

// Create fading route segment effect
function createFadingRouteSegment(currentLat, currentLng, targetLat, targetLng, progress) {
    if (!window.adminDeliveryMap || !window.currentRoute) {
        return;
    }

    try {
        // Calculate the fading distance (how much route should disappear behind drone)
        const fadeDistance = 0.2; // 20% of route behind drone will fade

        // For return journey, we want to fade the route between delivery point and current position
        // As drone moves from delivery point back to original position

        // Get the original route points
        const originalRoute = window.currentRoute.getLatLngs();
        if (originalRoute.length < 2) return;

        const deliveryPoint = originalRoute[originalRoute.length - 1]; // End point (delivery location)
        const basePoint = originalRoute[0]; // Start point (original drone position)

        // Calculate how much of the return route has been completed
        const completedDistance = progress * fadeDistance;

        // Calculate the point where fading should start (behind the current drone position)
        const fadeStartProgress = Math.max(0, progress - completedDistance);
        const fadeStartLat = deliveryPoint.lat + (targetLat - deliveryPoint.lat) * fadeStartProgress;
        const fadeStartLng = deliveryPoint.lng + (targetLng - deliveryPoint.lng) * fadeStartProgress;

        // Update the main route to show only the remaining path (ahead of drone)
        const remainingRoute = [
            [currentLat, currentLng], // Current drone position
            [targetLat, targetLng]    // Target (original position)
        ];

        // Update current route to show only what's ahead
        if (window.currentRoute && remainingRoute.length >= 2) {
            window.currentRoute.setLatLngs(remainingRoute);
        }

        // Create a very faint trail segment behind the drone (optional visual effect)
        if (progress > 0.1) { // Only show trail after 10% progress
            const trailDistance = Math.min(0.15, progress); // Max 15% trail behind
            const trailStartProgress = Math.max(0, progress - trailDistance);
            const trailStartLat = deliveryPoint.lat + (targetLat - deliveryPoint.lat) * trailStartProgress;
            const trailStartLng = deliveryPoint.lng + (targetLng - deliveryPoint.lng) * trailStartProgress;

            const trailSegment = L.polyline([
                [trailStartLat, trailStartLng],
                [currentLat, currentLng]
            ], {
                color: '#28a745',
                weight: 1,
                opacity: 0.3 * (1 - progress), // Fade as drone progresses
                dashArray: '3, 8'
            });

            // Add trail segment temporarily
            if (!window.trailSegments) {
                window.trailSegments = [];
            }

            // Remove old trail segments
            if (window.trailSegments.length > 3) {
                const oldSegment = window.trailSegments.shift();
                try {
                    window.adminDeliveryMap.removeLayer(oldSegment);
                } catch (e) {
                    console.log('Error removing old trail segment:', e);
                }
            }

            trailSegment.addTo(window.adminDeliveryMap);
            window.trailSegments.push(trailSegment);
        }

    } catch (error) {
        console.log('Error creating fading route segment:', error);
    }
}

// Complete delivery function
function completeDelivery(orderId) {
    console.log('Completing delivery for order:', orderId);

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id === orderId || String(o.id) === String(orderId));

    if (orderIndex === -1) {
        showNotification('Không tìm thấy đơn hàng!', 'error');
        return;
    }

    const order = orders[orderIndex];

    // Check if delivery process is fully completed (drone returned)
    if (!order.fullyCompleted) {
        if (order.returning) {
            showNotification('Drone đang quay về vị trí ban đầu! Vui lòng đợi...', 'warning');
        } else if (order.deliveryCompleted) {
            showNotification('Giao hàng thành công nhưng drone chưa quay về!', 'warning');
        } else {
            showNotification('Drone chưa đến điểm giao hàng! Vui lòng đợi...', 'warning');
        }
        return;
    }

    const droneId = order.assignedDrone;

    // Update order status to delivered (this is now just confirmation)
    orders[orderIndex].status = 'delivered';
    orders[orderIndex].confirmedAt = new Date().toISOString();
    localStorage.setItem('orders', JSON.stringify(orders));

    // Drone should already be available and at original position
    // Just refresh to ensure consistency
    if (droneId) {
        const drones = JSON.parse(localStorage.getItem('drones') || '[]');
        const droneIndex = drones.findIndex(d => d.id === droneId);
        if (droneIndex !== -1) {
            drones[droneIndex].status = 'available';
            drones[droneIndex].assignedOrder = null;
            localStorage.setItem('drones', JSON.stringify(drones));
        }
    }

    // Clean up any remaining route elements
    clearDeliveryRoute();

    if (window.fadingSegments) {
        window.fadingSegments.forEach(segment => {
            try {
                window.adminDeliveryMap.removeLayer(segment);
            } catch (e) {
                console.log('Error removing fading segment:', e);
            }
        });
        window.fadingSegments = [];
    }

    // Refresh map markers
    if (window.adminDeliveryMap) {
        addDronesToMap();
        addOrdersToMap();
    }

    showNotification(`Xác nhận hoàn thành đơn hàng #${orderId}!`, 'success');

    // Close any open popups
    if (window.adminDeliveryMap) {
        window.adminDeliveryMap.closePopup();
    }
}

// Select drone for control
function selectDroneForControl(droneId) {
    window.selectedDrone = droneId;
    const drone = JSON.parse(localStorage.getItem('drones') || '[]').find(d => d.id === droneId);

    if (drone) {
        showNotification(`Đã chọn ${drone.name} để điều khiển. Click vào bản đồ để đặt vị trí đích.`, 'info');

        // Center map on selected drone
        if (window.adminDeliveryMap) {
            window.adminDeliveryMap.setView([drone.location.lat, drone.location.lng], 15);
        }
    }
}

// Get drone name by ID
function getDroneName(droneId) {
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    const drone = drones.find(d => d.id === droneId);
    return drone ? drone.name : 'Unknown';
}

// Get drone status text
function getDroneStatusText(status) {
    const statusMap = {
        'available': 'Sẵn sàng',
        'busy': 'Đang giao hàng',
        'maintenance': 'Bảo trì',
        'charging': 'Đang sạc'
    };
    return statusMap[status] || status;
}

// Show delivery route
function showDeliveryRoute(orderId) {
    console.log('Showing delivery route for order:', orderId);

    if (!window.adminDeliveryMap) {
        console.error('Admin delivery map not initialized');
        showNotification('Bản đồ chưa được khởi tạo!', 'error');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId || String(o.id) === String(orderId));

    if (!order) {
        console.error('Order not found:', orderId);
        showNotification('Không tìm thấy đơn hàng!', 'error');
        return;
    }

    if (!order.assignedDrone) {
        console.error('Order has no assigned drone:', order);
        showNotification('Đơn hàng chưa được phân công drone!', 'error');
        return;
    }

    // Check for delivery coordinates in both old and new structure
    let deliveryLat, deliveryLng;
    if (order.deliveryInfo && order.deliveryInfo.lat && order.deliveryInfo.lng) {
        deliveryLat = parseFloat(order.deliveryInfo.lat);
        deliveryLng = parseFloat(order.deliveryInfo.lng);
    } else if (order.deliveryLocation && order.deliveryLocation.lat && order.deliveryLocation.lng) {
        deliveryLat = parseFloat(order.deliveryLocation.lat);
        deliveryLng = parseFloat(order.deliveryLocation.lng);
    }

    if (!deliveryLat || !deliveryLng) {
        console.error('Order missing delivery coordinates:', order);
        showNotification('Đơn hàng thiếu tọa độ giao hàng!', 'error');
        return;
    }

    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    const drone = drones.find(d => d.id === order.assignedDrone);

    if (drone) {
        console.log('Creating straight line route from drone to order location');

        // Clear existing routes first
        clearDeliveryRoute();

        try {
            // Create straight line instead of routing
            const routePoints = [
                [drone.location.lat, drone.location.lng],
                [deliveryLat, deliveryLng]
            ];

            window.currentRoute = L.polyline(routePoints, {
                color: '#007bff',
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 10'
            }).addTo(window.adminDeliveryMap);

            // Fit map to show the route
            const group = new L.featureGroup([
                L.marker([drone.location.lat, drone.location.lng]),
                L.marker([deliveryLat, deliveryLng])
            ]);
            window.adminDeliveryMap.fitBounds(group.getBounds().pad(0.1));

            showNotification(`Đã hiển thị đường đi thẳng từ ${drone.name} đến đơn hàng #${order.id}`, 'success');

        } catch (error) {
            console.error('Error creating route:', error);
            showNotification('Lỗi tạo đường đi: ' + error.message, 'error');
        }
    } else {
        showNotification('Không tìm thấy drone!', 'error');
    }
}

// Show drone and delivery route immediately after assignment
function showDroneDeliveryRoute(orderId, droneId) {
    console.log('Showing drone delivery route for order:', orderId, 'drone:', droneId);

    if (!window.adminDeliveryMap) {
        console.error('Admin delivery map not initialized');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');

    const order = orders.find(o => o.id === orderId);
    const drone = drones.find(d => d.id === droneId);

    if (!order || !drone) {
        console.error('Order or drone not found:', { order, drone });
        return;
    }

    // Clear existing routes first
    clearDeliveryRoute();

    // Check if delivery location exists
    if (!order.deliveryLocation || !order.deliveryLocation.lat || !order.deliveryLocation.lng) {
        console.error('Order delivery location not found:', order.deliveryLocation);
        showNotification('Đơn hàng chưa có địa chỉ giao hàng!', 'error');
        return;
    }

    // Check if Leaflet Routing Machine is available
    if (typeof L.Routing === 'undefined') {
        console.error('Leaflet Routing Machine not loaded');
        showNotification('Tính năng định tuyến không khả dụng!', 'error');
        return;
    }

    try {
        // Create drone marker with animation
        const droneIcon = L.divIcon({
            html: `<div class="drone-marker-icon busy">
                     <i class="fas fa-helicopter rotating"></i>
                   </div>`,
            className: 'custom-div-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        // Create delivery location marker
        const deliveryIcon = L.divIcon({
            html: `<div class="order-marker-icon shipping">
                     <i class="fas fa-map-marker-alt"></i>
                   </div>`,
            className: 'custom-div-icon',
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        });

        // Add markers to map
        const droneMarker = L.marker([drone.location.lat, drone.location.lng], { icon: droneIcon })
            .bindPopup(`
                <div class="drone-popup-content">
                    <h4><i class="fas fa-helicopter"></i> ${drone.name}</h4>
                    <p><strong>Trạng thái:</strong> Đang giao hàng</p>
                    <p><strong>Pin:</strong> ${drone.battery}%</p>
                    <p><strong>Đơn hàng:</strong> #${order.id}</p>
                </div>
            `)
            .addTo(window.adminDeliveryMap);

        const deliveryMarker = L.marker([order.deliveryLocation.lat, order.deliveryLocation.lng], { icon: deliveryIcon })
            .bindPopup(`
                <div class="order-popup-content">
                    <h4><i class="fas fa-map-marker-alt"></i> Điểm giao hàng</h4>
                    <p><strong>Đơn hàng:</strong> #${order.id}</p>
                    <p><strong>Khách hàng:</strong> ${order.customerName}</p>
                    <p><strong>Địa chỉ:</strong> ${order.address}</p>
                    <p><strong>Tọa độ:</strong> ${order.deliveryLocation.lat.toFixed(6)}, ${order.deliveryLocation.lng.toFixed(6)}</p>
                </div>
            `)
            .addTo(window.adminDeliveryMap);

        // Create straight line routing instead of complex routing
        const routePoints = [
            [drone.location.lat, drone.location.lng],
            [order.deliveryLocation.lat, order.deliveryLocation.lng]
        ];

        window.currentRoute = L.polyline(routePoints, {
            color: '#28a745',
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 10'
        }).addTo(window.adminDeliveryMap);

        // Calculate distance and estimated time
        const distance = calculateDistance(
            drone.location.lat, drone.location.lng,
            order.deliveryLocation.lat, order.deliveryLocation.lng
        );

        // Estimate delivery time (assuming 30 km/h average speed)
        const estimatedTimeMinutes = Math.round((distance / 30) * 60);

        // Fit map to show the route with padding
        const group = new L.featureGroup([droneMarker, deliveryMarker]);
        window.adminDeliveryMap.fitBounds(group.getBounds().pad(0.2));

        // Show detailed notification with route info
        showNotification(
            `🚁 Drone ${drone.name} đã được phân công!\n` +
            `📍 Khoảng cách: ${distance.toFixed(2)} km\n` +
            `⏱️ Thời gian dự kiến: ${estimatedTimeMinutes} phút\n` +
            `🔋 Pin drone: ${drone.battery}%`,
            'success'
        );

        // Store markers for cleanup later
        window.currentDroneMarker = droneMarker;
        window.currentDeliveryMarker = deliveryMarker;

    } catch (error) {
        console.error('Error creating drone delivery route:', error);
        showNotification('Lỗi tạo đường đi giao hàng: ' + error.message, 'error');
    }
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Start order processing - show drone selection
function startOrderProcessing(orderId) {
    console.log('Starting order processing for order:', orderId);

    const order = JSON.parse(localStorage.getItem('orders') || '[]').find(o => o.id === orderId);
    if (!order) {
        showNotification('Không tìm thấy đơn hàng!', 'error');
        return;
    }

    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    const availableDrones = drones.filter(drone => drone.status === 'active' && (!drone.assignedOrderId || drone.assignedOrderId === ''));

    console.log('Available drones:', availableDrones);

    if (availableDrones.length === 0) {
        showNotification('Không có drone khả dụng!', 'error');
        return;
    }

    // Try to find action div (dashboard map or admin map)
    let actionDiv = document.getElementById(`orderActions-${orderId}`) || document.getElementById(`adminOrderActions-${orderId}`);

    console.log('Action div found:', actionDiv);

    if (actionDiv) {
        try {
            // Generate drone options safely
            const droneOptions = availableDrones.map(drone => {
                let distanceText = 'Vị trí chưa xác định';
                if (drone.location && order.deliveryLocation) {
                    try {
                        const distance = calculateDistance(order.deliveryLocation, drone.location);
                        distanceText = `${distance.toFixed(1)}km`;
                    } catch (e) {
                        console.warn('Error calculating distance for drone:', drone.id, e);
                        distanceText = 'N/A';
                    }
                }
                return `<option value="${drone.id}">${drone.name} (${drone.capacity}kg) - ${distanceText}</option>`;
            }).join('');

            console.log('Generated drone options:', droneOptions);

            actionDiv.innerHTML = `
                <div style="text-align: left; min-width: 250px;">
                    <h5 style="margin: 0 0 10px 0; color: #007bff;">🚁 Chọn Drone giao hàng</h5>
                    <select id="droneSelect-${orderId}" style="
                        width: 100%;
                        padding: 8px;
                        margin-bottom: 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        font-size: 14px;
                    ">
                        <option value="">-- Chọn drone --</option>
                        ${droneOptions}
                    </select>
                    <div style="display: flex; gap: 5px;">
                        <button onclick="confirmDroneAssignment('${orderId}')" style="
                            background-color: #28a745;
                            color: white;
                            border: none;
                            padding: 8px 12px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 12px;
                            flex: 1;
                        ">✅ Xác nhận</button>
                        <button onclick="cancelOrderProcessing('${orderId}')" style="
                            background-color: #dc3545;
                            color: white;
                            border: none;
                            padding: 8px 12px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 12px;
                            flex: 1;
                        ">❌ Hủy</button>
                    </div>
                </div>
            `;

            // Verify the select element was created
            setTimeout(() => {
                const selectElement = document.getElementById(`droneSelect-${orderId}`);
                console.log('Select element after creation:', selectElement);
                if (selectElement) {
                    console.log('Select options count:', selectElement.options.length);

                    // Add change event listener to track selection
                    selectElement.addEventListener('change', function () {
                        console.log('Drone selected:', this.value);
                    });
                }
            }, 100);

        } catch (error) {
            console.error('Error creating drone selection UI:', error);
            showNotification('Lỗi tạo giao diện chọn drone: ' + error.message, 'error');
        }
    } else {
        console.error('No action div found for order:', orderId);
    }
}

// Cancel order processing - return to initial state
function cancelOrderProcessing(orderId) {
    // Try to find action div (dashboard map or admin map)
    let actionDiv = document.getElementById(`orderActions-${orderId}`) || document.getElementById(`adminOrderActions-${orderId}`);

    if (actionDiv) {
        const isAdminMap = actionDiv.id.includes('admin');
        const buttonClass = isAdminMap ? 'process-order-btn' : 'process-order-btn';

        actionDiv.innerHTML = `
            <button onclick="startOrderProcessing('${orderId}')" class="${buttonClass}" style="
                background-color: #28a745;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
            ">${isAdminMap ? '<i class="fas fa-cog"></i> Xử lý đơn hàng' : '🚁 Xử lý đơn hàng'}</button>
        `;
    }
}

// Confirm drone assignment and show route
function confirmDroneAssignment(orderId) {
    console.log('confirmDroneAssignment called with orderId:', orderId);

    const droneSelect = document.getElementById(`droneSelect-${orderId}`);
    console.log('droneSelect element:', droneSelect);

    const selectedDroneId = droneSelect ? droneSelect.value : '';
    console.log('selectedDroneId:', selectedDroneId);

    if (!droneSelect) {
        console.error('Drone select element not found!');
        showNotification('Lỗi: Không tìm thấy form chọn drone!', 'error');
        return;
    }

    if (!selectedDroneId || selectedDroneId === '') {
        console.error('No drone selected, selectedDroneId:', selectedDroneId);
        showNotification('Vui lòng chọn drone!', 'error');
        return;
    }

    console.log('Confirming drone assignment:', { orderId, selectedDroneId });

    // Update order and drone data
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');

    const orderIndex = orders.findIndex(o => o.id === orderId);
    const droneIndex = drones.findIndex(d => d.id === selectedDroneId);

    if (orderIndex === -1 || droneIndex === -1) {
        showNotification('Lỗi phân công drone!', 'error');
        return;
    }

    // Update order status and assigned drone
    orders[orderIndex].status = 'shipping';
    orders[orderIndex].assignedDroneId = selectedDroneId;
    orders[orderIndex].assignedAt = new Date().toISOString();

    // Update drone status
    drones[droneIndex].assignedOrderId = orderId;
    drones[droneIndex].status = 'active';

    // Save changes
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('drones', JSON.stringify(drones));

    // Update popup to show completion state
    let actionDiv = document.getElementById(`orderActions-${orderId}`) || document.getElementById(`adminOrderActions-${orderId}`);

    if (actionDiv) {
        const drone = drones[droneIndex];
        const isAdminMap = actionDiv.id.includes('admin');

        actionDiv.innerHTML = `
            <div style="text-align: center;">
                <p style="margin: 5px 0; color: #28a745; font-weight: bold;">
                    ✅ Đã phân công: ${drone.name}
                </p>
                <button onclick="showDeliveryRoute('${orderId}')" style="
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    margin-top: 5px;
                ">${isAdminMap ? '<i class="fas fa-route"></i> Xem đường đi' : '🗺️ Xem đường đi'}</button>
            </div>
        `;
    }

    // Show the delivery route
    setTimeout(() => {
        showDeliveryRoute(orderId); // Use showDeliveryRoute instead of showDroneDeliveryRoute
    }, 500);

    showNotification(`Đã phân công drone ${drones[droneIndex].name} cho đơn hàng #${orderId}!`, 'success');

    // Note: We don't refresh the map here to preserve the current popup state
    // The user can manually refresh if needed, or it will refresh when they close the popup
}

// Calculate distance between two points (simple approximation)
function calculateDistance(point1, point2) {
    if (!point1 || !point2 || !point1.lat || !point1.lng || !point2.lat || !point2.lng) {
        return 0;
    }

    const R = 6371; // Earth's radius in km
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLng = (point2.lng - point1.lng) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Clear all orders
function clearAllOrders() {
    if (confirm('Bạn có chắc chắn muốn xóa TẤT CẢ đơn hàng? Hành động này không thể hoàn tác!')) {
        console.log('Clearing all orders...');

        // Clear orders from localStorage
        localStorage.removeItem('orders');

        // Clear all routes on map
        clearDeliveryRoute();

        // Clear order markers from dashboard map
        if (window.dashboardOrderMarkers) {
            window.dashboardOrderMarkers.forEach(marker => {
                if (window.dashboardMap) {
                    window.dashboardMap.removeLayer(marker);
                }
            });
            window.dashboardOrderMarkers = [];
        }

        // Clear order markers from admin map
        if (window.orderMarkers) {
            Object.values(window.orderMarkers).forEach(marker => {
                if (window.adminDeliveryMap) {
                    try {
                        window.adminDeliveryMap.removeLayer(marker);
                    } catch (e) {
                        console.log('Error removing order marker:', e);
                    }
                }
            });
            window.orderMarkers = {};
        }

        // Refresh dashboard content
        if (typeof loadDashboardContent === 'function') {
            setTimeout(() => {
                const orderList = document.getElementById('orderList');
                if (orderList) {
                    orderList.innerHTML = generateOrderListHTML();
                }
                displayOrdersOnDashboardMap();
            }, 500);
        }

        showNotification('Đã xóa tất cả đơn hàng!', 'success');
        console.log('All orders cleared successfully');
    }
}

// Clear all drone status
function clearAllDroneStatus() {
    if (confirm('Bạn có chắc chắn muốn clear trạng thái tất cả drone? Điều này sẽ hủy phân công và đặt lại trạng thái drone.')) {
        console.log('Clearing all drone status...');

        // Get current drones
        const drones = JSON.parse(localStorage.getItem('drones') || '[]');

        // Reset all drone status
        const resetDrones = drones.map(drone => ({
            ...drone,
            assignedOrderId: '',
            status: 'active'
        }));

        // Save reset drones
        localStorage.setItem('drones', JSON.stringify(resetDrones));

        // Update orders to remove drone assignments
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrders = orders.map(order => {
            if (order.assignedDroneId) {
                return {
                    ...order,
                    assignedDroneId: '',
                    status: order.status === 'shipping' ? 'processing' : order.status
                };
            }
            return order;
        });

        // Save updated orders
        localStorage.setItem('orders', JSON.stringify(updatedOrders));

        // Clear all routes on map
        clearDeliveryRoute();

        // Refresh dashboard content
        if (typeof loadDashboardContent === 'function') {
            setTimeout(() => {
                const droneList = document.getElementById('droneList');
                const orderList = document.getElementById('orderList');

                if (droneList) {
                    droneList.innerHTML = generateDroneListHTML();
                }
                if (orderList) {
                    orderList.innerHTML = generateOrderListHTML();
                }

                displayDronesOnDashboardMap();
                displayOrdersOnDashboardMap();
            }, 500);
        }

        // Refresh admin content if available
        if (typeof loadAdminContent === 'function') {
            setTimeout(() => {
                showAllOrdersOnMap();
                showAllDronesOnMap();
            }, 1000);
        }

        showNotification('Đã clear trạng thái tất cả drone!', 'success');
        console.log('All drone status cleared successfully');
    }
}

// Quick assign drone
function quickAssignDrone(orderId) {
    console.log('Quick assign drone for order:', orderId);

    // Find order details for notification
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId || o.id == orderId || String(o.id) === String(orderId));

    // Show drone assignment modal
    showDroneAssignmentModal();

    // Wait for modal to be created, then set the order
    setTimeout(() => {
        const modalOrderSelect = document.getElementById('modalOrderSelect');
        if (modalOrderSelect) {
            modalOrderSelect.value = orderId;
            console.log('Pre-selected order:', orderId);

            // Trigger change event to update any dependent UI
            const event = new Event('change', { bubbles: true });
            modalOrderSelect.dispatchEvent(event);

            // Show notification with order details
            const customerName = order?.customerName || order?.customerInfo?.name || 'N/A';
            showNotification(`✅ Đã chọn đơn hàng #${orderId} của ${customerName} để phân công drone!`, 'info');
        } else {
            console.error('Modal order select not found');
        }
    }, 100);
}

// Clear all routes from map
function clearAllRoutes() {
    if (window.currentRoute && window.adminDeliveryMap) {
        window.adminDeliveryMap.removeControl(window.currentRoute);
        window.currentRoute = null;
        showNotification('Đã xóa tất cả đường đi trên bản đồ!', 'success');
    } else {
        showNotification('Không có đường đi nào để xóa!', 'info');
    }
}

// Make functions globally accessible
window.products = products; // Expose products array globally
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
window.initializeSimpleDeliveryMap = initializeSimpleDeliveryMap;
window.processCheckout = processCheckout;
window.loadOrders = loadOrders;
window.closeSuccessPopup = closeSuccessPopup;
window.showPage = showPage;
window.loadPageContent = loadPageContent;
window.loadAdminContent = loadAdminContent;
window.filterAdminOrders = filterAdminOrders;
window.createSampleOrders = createSampleOrders;
window.viewOrderDetails = viewOrderDetails;
window.updateOrderStatus = updateOrderStatus;
window.deleteOrder = deleteOrder;
window.exportOrders = exportOrders;
window.showDroneAssignmentModal = showDroneAssignmentModal;
window.startDelivery = startDelivery;
window.assignDroneToOrder = assignDroneToOrder;
window.refreshDroneMap = refreshDroneMap;
window.initializeAdminDeliveryMap = initializeAdminDeliveryMap;
window.addOrdersToMap = addOrdersToMap;
window.confirmDroneAssignment = confirmDroneAssignment;
window.showDroneInfo = showDroneInfo;
window.showDeliveryRoute = showDeliveryRoute;
window.showDroneDeliveryRoute = showDroneDeliveryRoute;
window.calculateDistance = calculateDistance;
window.clearDeliveryRoute = clearDeliveryRoute;
window.createSampleOrders = createSampleOrders;
window.createRandomOrder = createRandomOrder;
window.showAllOrdersOnMap = showAllOrdersOnMap;
window.quickAssignDrone = quickAssignDrone;
window.clearAllRoutes = clearAllRoutes;
window.selectDroneForControl = selectDroneForControl;
window.manualInitializeMap = manualInitializeMap;
window.resetAllDrones = resetAllDrones;
window.clearDroneData = clearDroneData;
window.setDroneAvailable = setDroneAvailable;
window.syncDroneData = syncDroneData;

// Reset all drones to available status
function resetAllDrones() {
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    drones.forEach(drone => {
        drone.status = 'available';
        drone.assignedOrder = null;
    });
    localStorage.setItem('drones', JSON.stringify(drones));

    showNotification('Đã reset tất cả drone về trạng thái khả dụng!', 'success');

    // Refresh the admin content to update the UI
    setTimeout(() => {
        loadAdminContent();
    }, 500);
}

// Clear all drone data and recreate
function clearDroneData() {
    localStorage.removeItem('drones');
    showNotification('Đã xóa dữ liệu drone! Sẽ tạo lại dữ liệu mẫu.', 'success');

    // Refresh the admin content to recreate drones
    setTimeout(() => {
        loadAdminContent();
    }, 500);
}

// Set drone to available status
function setDroneAvailable(droneId) {
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    const droneIndex = drones.findIndex(d => d.id === droneId);

    if (droneIndex !== -1) {
        drones[droneIndex].status = 'available';
        drones[droneIndex].assignedOrder = null;
        localStorage.setItem('drones', JSON.stringify(drones));

        showNotification(`Đã đặt ${drones[droneIndex].name} về trạng thái sẵn sàng!`, 'success');

        // Refresh map and admin content
        setTimeout(() => {
            addDronesToMap();
            loadAdminContent();
        }, 500);
    }
}

// Sync drone data periodically
function syncDroneData() {
    console.log('🔄 Syncing drone data...');

    const drones = JSON.parse(localStorage.getItem('drones') || '[]');

    // Log current state
    console.log('Current drone states:', drones.map(d => ({
        id: d.id,
        name: d.name,
        status: d.status,
        battery: d.battery,
        assignedOrder: d.assignedOrder
    })));

    // Update map if it exists
    if (window.adminDeliveryMap && typeof addDronesToMap === 'function') {
        addDronesToMap();
    }

    console.log('✅ Drone data synced');
}

console.log('Main.js functions loaded and made globally accessible');
