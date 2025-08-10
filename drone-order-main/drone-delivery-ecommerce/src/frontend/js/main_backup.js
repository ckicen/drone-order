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
    if (!window.authFunctions.isLoggedIn()) {
        event.preventDefault();
        showLoginModal();
        return false;
    }
    
    if (role === 'admin' && currentUser.role !== 'admin') {
        alert('Bạn không có quyền truy cập!');
        return false;
    }
    
    return true;
}

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
}// Load content for each page
function loadPageContent(pageName) {
    console.log('Loading content for page:', pageName);
    
    switch(pageName) {
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
            loadCart();
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
            loadProfile();
            break;
        case 'orders':
            console.log('Loading orders...');
            // Ensure user is logged in and currentUser is set
            if (window.authFunctions && window.authFunctions.isLoggedIn() && window.currentUser) {
                console.log('Loading orders for user:', window.currentUser.id);
                // Auto-create demo orders for user123 if none exist
                if (window.currentUser.id === 'user123') {
                    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                    if (!orders.some(order => order.userId === 'user123')) {
                        if (typeof createDemoOrders === 'function') {
                            createDemoOrders();
                            console.log('Demo orders created for user123');
                        }
                    }
                }
                loadOrders();
            } else {
                console.log('User not logged in, showing login modal');
                window.showLoginModal();
            }
            break;
        case 'admin':
            console.log('Loading admin content...');
            if (window.currentUser && window.currentUser.role === 'admin') {
                loadAdminContent();
            }
            break;
        case 'order-processing':
            console.log('=== Loading order-processing page ===');
            if (currentUser && currentUser.role === 'admin') {
                console.log('User is admin, calling loadOrderProcessingPage');
                loadOrderProcessingPage();
            } else {
                console.error('User is not admin or not logged in');
            }
            break;
    }
}

// Update UI based on authentication status
function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userDropdown = document.getElementById('userDropdown');
    const adminLink = document.getElementById('adminLink');
    
    if (window.authFunctions.isLoggedIn()) {
        authButtons.innerHTML = `
            <span class="user-info">Xin chào, ${window.currentUser.name}!</span>
            <button class="btn-logout" onclick="logout()">Đăng xuất</button>
        `;
        
        if (userDropdown) {
            userDropdown.style.display = 'block';
        }
        
        if (adminLink && currentUser.role === 'admin') {
            adminLink.style.display = 'block';
        }
    } else {
        authButtons.innerHTML = `
            <button class="btn-login" onclick="showLoginModal()">Đăng nhập</button>
            <button class="btn-register" onclick="showRegisterModal()">Đăng ký</button>
        `;
        
        if (userDropdown) {
            userDropdown.style.display = 'none';
        }
        
        if (adminLink) {
            adminLink.style.display = 'none';
        }
    }
}

// Logout function
function logout() {
    // Clear cart data before logout
    clearAllCartData();
    
    localStorage.removeItem('currentUser');
    currentUser = null;
    window.currentUser = null;
    updateAuthUI();
    updateCartCount(); // Reset cart count to 0
    showPage('home');
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
    showPage('checkout');
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

// Clean expired draft orders
function cleanExpiredDraftOrders() {
    const draftOrders = JSON.parse(localStorage.getItem('draftOrders') || '[]');
    const now = Date.now();
    
    const validDrafts = draftOrders.filter(order => order.expiresAt > now);
    
    if (validDrafts.length !== draftOrders.length) {
        localStorage.setItem('draftOrders', JSON.stringify(validDrafts));
        console.log('Expired draft orders cleaned');
    }
}

// Restore draft order if exists
function restoreDraftOrder() {
    if (!window.currentUser) return;
    
    cleanExpiredDraftOrders();
    
    const draftOrders = JSON.parse(localStorage.getItem('draftOrders') || '[]');
    const userDraft = draftOrders.find(order => 
        order.userId === window.currentUser.id && 
        order.expiresAt > Date.now()
    );
    
    if (userDraft) {
        const currentCart = getUserCart();
        if (currentCart.length === 0) {
            // Restore draft to cart
            saveUserCart(userDraft.items);
            updateCartCount();
            
            const timeLeft = Math.ceil((userDraft.expiresAt - Date.now()) / 60000);
            showNotification(`Đã khôi phục giỏ hàng từ ${timeLeft} phút trước!`, 'info');
        }
    }
}

// Clear draft order for current user
function clearDraftOrder() {
    if (!window.currentUser) return;
    
    const draftOrders = JSON.parse(localStorage.getItem('draftOrders') || '[]');
    const filteredDrafts = draftOrders.filter(order => order.userId !== window.currentUser.id);
    
    localStorage.setItem('draftOrders', JSON.stringify(filteredDrafts));
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
    
    // Note: Map will be initialized when showPage('checkout') is called
    console.log('Checkout data prepared, map will initialize when page is shown');
}

// Process checkout form submission
function processCheckout(event) {
    event.preventDefault();
    
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
        // Scroll to map section
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
            lat: formData.get('deliveryLat') || '',
            lng: formData.get('deliveryLng') || ''
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
    
    console.log('Creating order for user:', window.currentUser.id, order); // Debug log
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    console.log('Order saved, total orders:', orders.length); // Debug log
    
    // Clear user's cart and draft order
    saveUserCart([]);
    clearDraftOrder();
    updateCartCount();
    
    // Show success popup and redirect
    showOrderSuccessPopup(order);
    
    // Debug: Show storage info after order creation
    console.log('Order creation completed, checking storage...');
    setTimeout(() => debugStorageData(), 1000);
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
        showPage('orders');
        loadOrders(); // Explicitly reload orders
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

// Debug function to check localStorage data
function debugStorageData() {
    console.log('=== Storage Debug Info ===');
    console.log('Current User:', window.currentUser);
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    console.log('Total Orders in Storage:', orders.length);
    
    orders.forEach((order, index) => {
        console.log(`Order ${index + 1}:`, {
            id: order.id,
            userId: order.userId,
            date: order.date,
            total: order.total,
            status: order.status
        });
    });
    
    if (window.currentUser) {
        const userOrders = orders.filter(order => order.userId === window.currentUser.id);
        console.log(`Orders for current user (${window.currentUser.id}):`, userOrders.length);
    }
    
    console.log('=== End Debug ===');
}

// Make debug function globally accessible
window.debugStorageData = debugStorageData;

// Checkout function
function checkout() {
    if (!window.authFunctions.isLoggedIn()) {
        window.showLoginModal();
        return;
    }
    
    const cart = getUserCart();
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order
    const order = {
        id: Date.now(),
        userId: currentUser.id,
        items: cart,
        total: total,
        status: 'pending',
        date: new Date().toLocaleString('vi-VN'),
        address: prompt('Nhập địa chỉ giao hàng:') || 'Địa chỉ mặc định'
    };
    
    // Save order
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear current user's cart only
    saveUserCart([]);
    updateCartCount();
    
    alert('Đặt hàng thành công! Mã đơn hàng: ' + order.id);
    showPage('orders');
}

// Load user orders
function loadOrders() {
    const container = document.getElementById('ordersList');
    if (!container) return;
    
    console.log('loadOrders called, currentUser:', window.currentUser); // Debug log
    
    // Ensure currentUser is set
    if (!window.currentUser && window.authFunctions) {
        console.log('currentUser not set, calling updateAuthUI to restore from localStorage');
        window.authFunctions.updateAuthUI();
    }
    
    if (!window.currentUser) {
        console.log('No currentUser found even after updateAuthUI');
        container.innerHTML = '<div class="no-orders"><p>Vui lòng đăng nhập để xem đơn hàng</p></div>';
        return;
    }
    
    console.log('Loading orders for user:', window.currentUser.id);
    
    // Clean expired drafts first
    cleanExpiredDraftOrders();
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const draftOrders = JSON.parse(localStorage.getItem('draftOrders') || '[]');
    
    console.log('All orders in storage:', orders.length);
    console.log('Looking for orders with userId:', window.currentUser.id);
    
    const userOrders = orders.filter(order => order.userId === window.currentUser.id);
    const userDrafts = draftOrders.filter(order => 
        order.userId === window.currentUser.id && 
        order.expiresAt > Date.now()
    );
    
    console.log('Found user orders:', userOrders.length);
    console.log('Found user drafts:', userDrafts.length);
    
    // Combine completed orders and draft orders
    const allUserOrders = [...userOrders, ...userDrafts];
    
    if (allUserOrders.length === 0) {
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
    allUserOrders.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a.date);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b.date);
        return dateB - dateA;
    });
    
    container.innerHTML = allUserOrders.map(order => {
        if (order.status === 'draft') {
            return renderDraftOrder(order);
        } else {
            return renderCompletedOrder(order);
        }
    }).join('');
}

// Render draft order
function renderDraftOrder(order) {
    const timeLeft = Math.ceil((order.expiresAt - Date.now()) / 60000);
    const timeLeftText = timeLeft > 0 ? `${timeLeft} phút` : 'Đã hết hạn';
    
    return `
        <div class="order-card draft-order">
            <div class="order-header">
                <div class="order-id">
                    <h3><i class="fas fa-clock"></i> Đơn hàng tạm thời</h3>
                    <span class="order-date">Còn lại: ${timeLeftText}</span>
                </div>
                <div class="order-status-container">
                    <span class="order-status status-draft">
                        <i class="fas fa-edit"></i> Đang soạn thảo
                    </span>
                </div>
            </div>
            
            <div class="order-content">
                <div class="order-details">
                    <div class="detail-row">
                        <div class="detail-item">
                            <i class="fas fa-money-bill-wave"></i>
                            <span><strong>Tổng tiền dự kiến:</strong> ${formatPrice(order.total)}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-box"></i>
                            <span><strong>Số sản phẩm:</strong> ${order.items.length}</span>
                        </div>
                    </div>
                </div>
                
                <div class="order-items">
                    <h4><i class="fas fa-list"></i> Sản phẩm trong giỏ:</h4>
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
                
                <div class="order-actions">
                    <button class="btn-primary btn-small" onclick="continueDraftOrder('${order.id}')">
                        <i class="fas fa-shopping-cart"></i> Tiếp tục mua hàng
                    </button>
                    <button class="btn-secondary btn-small" onclick="deleteDraftOrder('${order.id}')">
                        <i class="fas fa-trash"></i> Xóa
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render completed order
function renderCompletedOrder(order) {
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
                
                <div class="order-actions">
                    ${getOrderActions(order)}
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

// Get order actions based on status
function getOrderActions(order) {
    let actions = '';
    
    switch(order.status) {
        case 'pending':
            actions = `
                <button class="btn-secondary btn-small" onclick="cancelOrder('${order.id}')">
                    <i class="fas fa-times"></i> Hủy đơn hàng
                </button>
            `;
            break;
        case 'processing':
            actions = `
                <button class="btn-info btn-small" onclick="trackOrder('${order.id}')">
                    <i class="fas fa-map-marked-alt"></i> Theo dõi đơn hàng
                </button>
            `;
            break;
        case 'shipping':
            actions = `
                <button class="btn-primary btn-small" onclick="trackOrder('${order.id}')">
                    <i class="fas fa-drone"></i> Theo dõi drone
                </button>
            `;
            break;
        case 'delivered':
            actions = `
                <button class="btn-success btn-small" onclick="reorderItems('${order.id}')">
                    <i class="fas fa-redo"></i> Đặt lại
                </button>
                <button class="btn-info btn-small" onclick="reviewOrder('${order.id}')">
                    <i class="fas fa-star"></i> Đánh giá
                </button>
            `;
            break;
        case 'cancelled':
            actions = `
                <button class="btn-primary btn-small" onclick="reorderItems('${order.id}')">
                    <i class="fas fa-redo"></i> Đặt lại
                </button>
            `;
            break;
    }
    
    return actions;
}

// Cancel order
function cancelOrder(orderId) {
    if (!confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex(order => order.id == orderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = 'cancelled';
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Show success message
        showNotification('Đơn hàng đã được hủy thành công!', 'success');
        
        // Reload orders
        loadOrders();
    }
}

// Track order
function trackOrder(orderId) {
    showNotification('Tính năng theo dõi đơn hàng đang được phát triển!', 'info');
}

// Reorder items
function reorderItems(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(order => order.id == orderId);
    
    if (order) {
        // Add items back to cart
        order.items.forEach(item => {
            addToCart(item);
        });
        
        showNotification('Đã thêm sản phẩm vào giỏ hàng!', 'success');
        updateCartCount();
    }
}

// Review order
function reviewOrder(orderId) {
    showNotification('Tính năng đánh giá đơn hàng đang được phát triển!', 'info');
}

// Continue draft order
function continueDraftOrder(draftId) {
    const draftOrders = JSON.parse(localStorage.getItem('draftOrders') || '[]');
    const draft = draftOrders.find(order => order.id === draftId);
    
    if (draft && draft.expiresAt > Date.now()) {
        // Restore draft to cart
        saveUserCart(draft.items);
        updateCartCount();
        
        // Clear the draft
        clearDraftOrder();
        
        showNotification('Đã khôi phục giỏ hàng!', 'success');
        showPage('cart');
    } else {
        showNotification('Đơn hàng tạm đã hết hạn!', 'error');
        loadOrders(); // Refresh the list
    }
}

// Delete draft order
function deleteDraftOrder(draftId) {
    if (!confirm('Bạn có chắc chắn muốn xóa đơn hàng tạm này?')) return;
    
    const draftOrders = JSON.parse(localStorage.getItem('draftOrders') || '[]');
    const filteredDrafts = draftOrders.filter(order => order.id !== draftId);
    
    localStorage.setItem('draftOrders', JSON.stringify(filteredDrafts));
    
    showNotification('Đã xóa đơn hàng tạm!', 'success');
    loadOrders(); // Refresh the list
}

// Create demo orders for testing (only if no orders exist)
function createDemoOrders() {
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (existingOrders.length > 0) return; // Don't create demo if orders already exist
    
    console.log('Creating demo orders with delivery coordinates...');
    
    const demoOrders = [
        {
            id: Date.now() - 86400000, // 1 day ago
            userId: 'user123', // Consistent with auth system
            customerInfo: {
                name: 'Nguyễn Văn A',
                phone: '0901234567',
                email: 'user@demo.com'
            },
            deliveryInfo: {
                address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
                city: 'ho-chi-minh',
                notes: 'Giao hàng giờ hành chính',
                lat: '10.762622',
                lng: '106.660172'
            },
            paymentMethod: 'cod',
            items: [
                {
                    id: 1,
                    name: 'iPhone 15 Pro Max',
                    price: 29000000,
                    quantity: 1,
                    image: 'fas fa-mobile-alt'
                }
            ],
            subtotal: 29000000,
            shippingFee: 0,
            discount: 0,
            total: 29000000,
            status: 'delivered',
            date: new Date(Date.now() - 86400000).toLocaleString('vi-VN'),
            createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
            id: Date.now() - 43200000, // 12 hours ago
            userId: 'user123',
            customerInfo: {
                name: 'Nguyễn Văn A',
                phone: '0901234567',
                email: 'user@demo.com'
            },
            deliveryInfo: {
                address: '456 Đường DEF, Phường UVW, Quận 3, TP.HCM',
                city: 'ho-chi-minh',
                notes: '',
                lat: '10.786785',
                lng: '106.700763'
            },
            paymentMethod: 'momo',
            items: [
                {
                    id: 2,
                    name: 'MacBook Pro M3',
                    price: 45000000,
                    quantity: 1,
                    image: 'fas fa-laptop'
                },
                {
                    id: 4,
                    name: 'AirPods Pro',
                    price: 6000000,
                    quantity: 1,
                    image: 'fas fa-headphones'
                }
            ],
            subtotal: 51000000,
            shippingFee: 0,
            discount: 0,
            total: 51000000,
            status: 'shipping',
            date: new Date(Date.now() - 43200000).toLocaleString('vi-VN'),
            createdAt: new Date(Date.now() - 43200000).toISOString()
        },
        {
            id: Date.now() - 7200000, // 2 hours ago
            userId: 'user123',
            customerInfo: {
                name: 'Nguyễn Văn A',
                phone: '0901234567',
                email: 'user@demo.com'
            },
            deliveryInfo: {
                address: '789 Đường GHI, Phường RST, Quận 7, TP.HCM',
                city: 'ho-chi-minh',
                notes: 'Gọi trước khi giao',
                lat: '10.732776',
                lng: '106.719447'
            },
            paymentMethod: 'banking',
            items: [
                {
                    id: 3,
                    name: 'iPad Air',
                    price: 15000000,
                    quantity: 1,
                    image: 'fas fa-tablet-alt'
                }
            ],
            subtotal: 15000000,
            shippingFee: 0,
            discount: 0,
            total: 15000000,
            status: 'processing',
            date: new Date(Date.now() - 7200000).toLocaleString('vi-VN'),
            createdAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
            id: Date.now() - 3600000, // 1 hour ago
            userId: 'user123',
            customerInfo: {
                name: 'Nguyễn Văn A',
                phone: '0901234567',
                email: 'user@demo.com'
            },
            deliveryInfo: {
                address: '321 Đường JKL, Phường MNO, Quận 10, TP.HCM',
                city: 'ho-chi-minh',
                notes: '',
                lat: '10.773221',
                lng: '106.667954'
            },
            paymentMethod: 'zalopay',
            items: [
                {
                    id: 6,
                    name: 'Apple Watch Series 9',
                    price: 9000000,
                    quantity: 1,
                    image: 'fas fa-clock'
                }
            ],
            subtotal: 9000000,
            shippingFee: 0,
            discount: 0,
            total: 9000000,
            status: 'pending',
            date: new Date(Date.now() - 3600000).toLocaleString('vi-VN'),
            createdAt: new Date(Date.now() - 3600000).toISOString()
        }
    ];
    
    localStorage.setItem('orders', JSON.stringify(demoOrders));
    console.log('Demo orders created with coordinates:', demoOrders.length);
}

// Temporary function to reset orders for testing
function resetAndCreateDemoOrders() {
    localStorage.removeItem('orders');
    createDemoOrders();
    console.log('Orders reset and recreated with coordinates');
}

// Test function for debugging map
function testMapInitialization() {
    console.log('=== Testing map initialization ===');
    const mapElement = document.getElementById('orderProcessingMap');
    console.log('Map element:', mapElement);
    
    if (mapElement) {
        console.log('Map element found!');
        console.log('Dimensions:', mapElement.offsetWidth, 'x', mapElement.offsetHeight);
        console.log('Client dimensions:', mapElement.clientWidth, 'x', mapElement.clientHeight);
        console.log('Style:', mapElement.style.cssText);
        console.log('Parent:', mapElement.parentElement);
        console.log('Parent style:', mapElement.parentElement ? mapElement.parentElement.style.cssText : 'N/A');
        
        // Try to force initialize
        initializeOrderProcessingMap();
    } else {
        console.log('Map element not found');
        
        // Check if we're on the right page
        const currentPage = document.querySelector('.page-content[style*="block"]');
        console.log('Current visible page:', currentPage ? currentPage.id : 'None');
        
        // Check order processing page
        const orderPage = document.getElementById('order-processingPage');
        console.log('Order processing page:', orderPage);
        console.log('Order processing page display:', orderPage ? orderPage.style.display : 'N/A');
    }
}

// Test function to navigate to order processing
function testOrderProcessing() {
    console.log('=== Testing order processing navigation ===');
    
    // Create a test order
    const testOrder = {
        id: Date.now(),
        customerInfo: { name: 'Test User', phone: '123456789' },
        deliveryInfo: { 
            address: 'Test Address', 
            lat: '10.762622', 
            lng: '106.660172' 
        },
        items: [{ name: 'Test Product', price: 100000, quantity: 1 }],
        total: 100000,
        date: new Date().toLocaleString('vi-VN')
    };
    
    localStorage.setItem('currentProcessingOrder', JSON.stringify(testOrder));
    console.log('Test order created:', testOrder);
    
    // Navigate to page
    showPage('order-processing');
}

// Calculate order statistics for admin dashboard
function calculateOrderStats() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const users = {}; // Cache user info
    
    // Get user names from localStorage or create default mapping
    orders.forEach(order => {
        if (!users[order.userId]) {
            // Try to get user info from currentUser if it matches, otherwise use default
            if (window.currentUser && window.currentUser.id == order.userId) {
                users[order.userId] = window.currentUser.name;
            } else {
                users[order.userId] = `User ${order.userId}`;
            }
        }
    });
    
    const stats = {
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
            orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
        todayOrders: orders.filter(order => {
            const orderDate = new Date(order.date.split(',')[0].split('/').reverse().join('-'));
            const today = new Date();
            return orderDate.toDateString() === today.toDateString();
        }).length,
        users: users,
        ordersWithUserInfo: orders.map(order => ({
            ...order,
            userName: users[order.userId] || `User ${order.userId}`
        }))
    };
    
    return stats;
}

// Get detailed status text with color
function getStatusInfo(status) {
    const statusMap = {
        'pending': { text: 'Chờ xử lý', class: 'pending', icon: 'fas fa-clock' },
        'processing': { text: 'Đang xử lý', class: 'processing', icon: 'fas fa-cog' },
        'shipping': { text: 'Đang giao', class: 'shipping', icon: 'fas fa-truck' },
        'delivered': { text: 'Đã giao', class: 'delivered', icon: 'fas fa-check-circle' },
        'cancelled': { text: 'Đã hủy', class: 'cancelled', icon: 'fas fa-times-circle' }
    };
    return statusMap[status] || { text: status, class: 'unknown', icon: 'fas fa-question-circle' };
}

// Filter orders by status
function filterOrdersByStatus(status = 'all') {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
}

// Get status text in Vietnamese
function getStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xử lý',
        'preparing': 'Đang chuẩn bị',
        'processing': 'Đang xử lý',
        'shipping': 'Đang giao',
        'delivered': 'Đã giao',
        'cancelled': 'Đã hủy',
        'completed': 'Hoàn thành'
    };
    return statusMap[status] || status;
}

// Load admin content
function loadAdminContent() {
    const container = document.getElementById('adminContent');
    if (!container) return;
    
    const stats = calculateOrderStats();
    
    container.innerHTML = `
        <div class="admin-header">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>Dashboard Quản lý đơn hàng</h2>
                <button class="btn-primary" onclick="createSampleOrders()" style="padding: 10px 20px;">
                    <i class="fas fa-plus"></i> Tạo dữ liệu mẫu
                </button>
            </div>
            <div class="admin-stats">
                <div class="stat-card total">
                    <div class="stat-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="stat-info">
                        <h3>${stats.total}</h3>
                        <p>Tổng đơn hàng</p>
                        <small>Hôm nay: ${stats.todayOrders}</small>
                    </div>
                </div>
                <div class="stat-card pending">
                    <div class="stat-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-info">
                        <h3>${stats.pending}</h3>
                        <p>Chờ xử lý</p>
                        <small>${((stats.pending/stats.total)*100 || 0).toFixed(1)}%</small>
                    </div>
                </div>
                <div class="stat-card processing">
                    <div class="stat-icon">
                        <i class="fas fa-cog"></i>
                    </div>
                    <div class="stat-info">
                        <h3>${stats.processing}</h3>
                        <p>Đang xử lý</p>
                        <small>${((stats.processing/stats.total)*100 || 0).toFixed(1)}%</small>
                    </div>
                </div>
                <div class="stat-card shipping">
                    <div class="stat-icon">
                        <i class="fas fa-truck"></i>
                    </div>
                    <div class="stat-info">
                        <h3>${stats.shipping}</h3>
                        <p>Đang giao</p>
                        <small>${((stats.shipping/stats.total)*100 || 0).toFixed(1)}%</small>
                    </div>
                </div>
                <div class="stat-card delivered">
                    <div class="stat-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stat-info">
                        <h3>${stats.delivered}</h3>
                        <p>Đã giao</p>
                        <small>${((stats.delivered/stats.total)*100 || 0).toFixed(1)}%</small>
                    </div>
                </div>
                <div class="stat-card cancelled">
                    <div class="stat-icon">
                        <i class="fas fa-times-circle"></i>
                    </div>
                    <div class="stat-info">
                        <h3>${stats.cancelled}</h3>
                        <p>Đã hủy</p>
                        <small>${((stats.cancelled/stats.total)*100 || 0).toFixed(1)}%</small>
                    </div>
                </div>
            </div>
            
            <div class="revenue-stats">
                <div class="revenue-card">
                    <h4>Doanh thu (Đã giao)</h4>
                    <h2>${formatPrice(stats.totalRevenue)}</h2>
                </div>
                <div class="revenue-card">
                    <h4>Giá trị đơn hàng TB</h4>
                    <h2>${formatPrice(stats.avgOrderValue)}</h2>
                </div>
            </div>
        </div>
        
        <div class="admin-filters">
            <div class="filter-buttons">
                <button class="filter-btn active" onclick="filterOrders('all')">Tất cả (${stats.total})</button>
                <button class="filter-btn" onclick="filterOrders('pending')">Chờ xử lý (${stats.pending})</button>
                <button class="filter-btn" onclick="filterOrders('processing')">Đang xử lý (${stats.processing})</button>
                <button class="filter-btn" onclick="filterOrders('shipping')">Đang giao (${stats.shipping})</button>
                <button class="filter-btn" onclick="filterOrders('delivered')">Đã giao (${stats.delivered})</button>
                <button class="filter-btn" onclick="filterOrders('cancelled')">Đã hủy (${stats.cancelled})</button>
            </div>
            <div class="search-box">
                <input type="text" id="orderSearch" placeholder="Tìm kiếm theo mã đơn, khách hàng..." onkeyup="searchOrders()">
                <i class="fas fa-search"></i>
            </div>
        </div>
        
        <div class="orders-table">
            <table>
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Khách hàng</th>
                        <th>Ngày đặt</th>
                        <th>Sản phẩm</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody id="ordersTableBody">
                    ${generateOrderRows(stats.ordersWithUserInfo)}
                </tbody>
            </table>
        </div>
    `;
}

// Generate order table rows
function generateOrderRows(orders) {
    if (!orders || orders.length === 0) {
        return '<tr><td colspan="7" class="no-orders">Không có đơn hàng nào</td></tr>';
    }
    
    return orders.map(order => {
        const statusInfo = getStatusInfo(order.status);
        const itemsCount = order.items ? order.items.length : 0;
        const itemsText = itemsCount > 1 ? `${itemsCount} sản phẩm` : '1 sản phẩm';
        
        return `
            <tr class="order-row" data-status="${order.status}">
                <td class="order-id">#${order.id}</td>
                <td class="customer-name">${order.userName}</td>
                <td class="order-date">${order.date}</td>
                <td class="order-items">
                    <span class="items-count">${itemsText}</span>
                    ${order.items && order.items.length > 0 ? 
                        `<div class="items-preview">
                            ${order.items.slice(0, 2).map(item => 
                                `<small>${item.name} x${item.quantity}</small>`
                            ).join('<br>')}
                            ${order.items.length > 2 ? '<small>...</small>' : ''}
                        </div>` : ''
                    }
                </td>
                <td class="order-total">${formatPrice(order.total)}</td>
                <td class="order-status">
                    <span class="status-badge ${statusInfo.class}">
                        <i class="${statusInfo.icon}"></i>
                        ${statusInfo.text}
                    </span>
                </td>
                <td class="order-actions">
                    ${generateActionButtons(order)}
                </td>
            </tr>
        `;
    }).join('');
}

// Generate action buttons based on order status
function generateActionButtons(order) {
    switch(order.status) {
        case 'pending':
            return `
                <button class="btn-action process" onclick="updateOrderStatus(${order.id}, 'processing')" title="Xử lý đơn hàng">
                    <i class="fas fa-play"></i> Xử lý
                </button>
                <button class="btn-action cancel" onclick="updateOrderStatus(${order.id}, 'cancelled')" title="Hủy đơn hàng">
                    <i class="fas fa-times"></i> Hủy
                </button>
            `;
        case 'processing':
            return `
                <button class="btn-action ship" onclick="processOrder(${order.id})" title="Giao hàng">
                    <i class="fas fa-truck"></i> Giao hàng
                </button>
                <button class="btn-action cancel" onclick="updateOrderStatus(${order.id}, 'cancelled')" title="Hủy đơn hàng">
                    <i class="fas fa-times"></i> Hủy
                </button>
            `;
        case 'shipping':
            return `
                <button class="btn-action complete" onclick="updateOrderStatus(${order.id}, 'delivered')" title="Hoàn thành">
                    <i class="fas fa-check"></i> Hoàn thành
                </button>
            `;
        case 'delivered':
            return `
                <span class="completed-text">
                    <i class="fas fa-check-circle"></i> Đã hoàn thành
                </span>
            `;
        case 'cancelled':
            return `
                <span class="cancelled-text">
                    <i class="fas fa-times-circle"></i> Đã hủy
                </span>
            `;
        default:
            return `
                <button class="btn-action process" onclick="processOrder(${order.id})">Xử lý</button>
            `;
    }
}

// Update order status
function updateOrderStatus(orderId, newStatus) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex(order => order.id == orderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        orders[orderIndex].updatedAt = new Date().toLocaleString('vi-VN');
        
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Show notification
        const statusText = getStatusText(newStatus);
        alert(`Đơn hàng #${orderId} đã được cập nhật thành: ${statusText}`);
        
        // Reload admin content
        loadAdminContent();
    }
}

// Filter orders by status
function filterOrders(status) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter table rows
    const rows = document.querySelectorAll('.order-row');
    rows.forEach(row => {
        if (status === 'all' || row.dataset.status === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Search orders
function searchOrders() {
    const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
    const rows = document.querySelectorAll('.order-row');
    
    rows.forEach(row => {
        const orderId = row.querySelector('.order-id').textContent.toLowerCase();
        const customerName = row.querySelector('.customer-name').textContent.toLowerCase();
        const orderDate = row.querySelector('.order-date').textContent.toLowerCase();
        
        if (orderId.includes(searchTerm) || 
            customerName.includes(searchTerm) || 
            orderDate.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Create sample orders for testing (admin only)
function createSampleOrders() {
    if (!window.currentUser || window.currentUser.role !== 'admin') {
        alert('Chỉ admin mới có thể tạo dữ liệu mẫu!');
        return;
    }
    
    const sampleOrders = [
        {
            id: Date.now() - 5000,
            userId: 12345,
            items: [
                { id: 1, name: 'iPhone 15 Pro Max', price: 32000000, quantity: 1 },
                { id: 2, name: 'AirPods Pro', price: 6000000, quantity: 1 }
            ],
            total: 38000000,
            status: 'pending',
            date: new Date(Date.now() - 86400000).toLocaleString('vi-VN'),
            address: '123 Nguyễn Huệ, Quận 1, TP.HCM'
        },
        {
            id: Date.now() - 4000,
            userId: 12346,
            items: [
                { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 1 }
            ],
            total: 22000000,
            status: 'processing',
            date: new Date(Date.now() - 172800000).toLocaleString('vi-VN'),
            address: '456 Lê Lợi, Quận 3, TP.HCM'
        },
        {
            id: Date.now() - 3000,
            userId: 12347,
            items: [
                { id: 4, name: 'MacBook Pro M3', price: 45000000, quantity: 1 },
                { id: 5, name: 'Magic Mouse', price: 2500000, quantity: 1 }
            ],
            total: 47500000,
            status: 'shipping',
            date: new Date(Date.now() - 259200000).toLocaleString('vi-VN'),
            address: '789 Trần Hưng Đạo, Quận 5, TP.HCM'
        },
        {
            id: Date.now() - 2000,
            userId: 12348,
            items: [
                { id: 6, name: 'iPad Air', price: 18000000, quantity: 1 }
            ],
            total: 18000000,
            status: 'delivered',
            date: new Date(Date.now() - 345600000).toLocaleString('vi-VN'),
            address: '321 Võ Văn Tần, Quận 10, TP.HCM'
        },
        {
            id: Date.now() - 1000,
            userId: 12349,
            items: [
                { id: 7, name: 'Sony WH-1000XM5', price: 8500000, quantity: 1 }
            ],
            total: 8500000,
            status: 'cancelled',
            date: new Date(Date.now() - 432000000).toLocaleString('vi-VN'),
            address: '654 Cách Mạng Tháng 8, Quận Tân Bình, TP.HCM'
        }
    ];
    
    // Save sample orders
    localStorage.setItem('orders', JSON.stringify(sampleOrders));
    
    alert('Đã tạo 5 đơn hàng mẫu thành công!');
    loadAdminContent();
}

// Process order function for admin
function processOrder(orderId) {
    console.log('=== processOrder called with orderId:', orderId);
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id == orderId);
    
    if (!order) {
        console.error('Order not found:', orderId);
        alert('Không tìm thấy đơn hàng!');
        return;
    }
    
    console.log('Order found:', order);
    
    // Store current order for processing
    localStorage.setItem('currentProcessingOrder', JSON.stringify(order));
    console.log('Order stored in localStorage');
    
    // Navigate to order processing page (fix: correct page ID)
    console.log('Calling showPage with order-processing');
    showPage('order-processing');
    
    // Ensure map is initialized after DOM renders with longer delay
    console.log('Setting up map initialization timeout...');
    setTimeout(() => {
        console.log('=== Map initialization timeout triggered ===');
        console.log('Attempting to initialize map...');
        const mapElement = document.getElementById('orderProcessingMap');
        console.log('Map element found:', mapElement);
        if (mapElement) {
            console.log('Map element dimensions:', mapElement.offsetWidth, 'x', mapElement.offsetHeight);
            console.log('Map element parent:', mapElement.parentElement);
            console.log('Map element computed style:', window.getComputedStyle(mapElement));
            initializeOrderProcessingMap();
        } else {
            console.error('Map element not found after timeout!');
            // Let's check what pages are visible
            const pages = document.querySelectorAll('.page-content');
            pages.forEach((page, index) => {
                console.log(`Page ${index}:`, page.id, 'visible:', page.style.display !== 'none');
            });
        }
    }, 1000); // Increased timeout
}

// Load order processing page
function loadOrderProcessingPage() {
    console.log('=== loadOrderProcessingPage started ===');
    
    const order = JSON.parse(localStorage.getItem('currentProcessingOrder') || '{}');
    console.log('Retrieved order from localStorage:', order);
    
    if (!order.id) {
        console.error('No order ID found');
        showNotification('Không có đơn hàng để xử lý', 'error');
        showPage('admin');
        return;
    }
    
    console.log('Processing order:', order);
    
    // Populate order information in existing HTML structure
    const orderInfoDetails = document.getElementById('orderInfoDetails');
    console.log('orderInfoDetails element:', orderInfoDetails);
    
    if (orderInfoDetails) {
        console.log('Populating order info...');
        orderInfoDetails.innerHTML = `
            <div class="order-details">
                <p><strong>Mã đơn:</strong> #${order.id}</p>
                <p><strong>Khách hàng:</strong> ${order.customerInfo ? order.customerInfo.name : 'N/A'}</p>
                <p><strong>Số điện thoại:</strong> ${order.customerInfo ? order.customerInfo.phone : 'N/A'}</p>
                <p><strong>Ngày đặt:</strong> ${order.date}</p>
                <p><strong>Địa chỉ giao:</strong> ${order.deliveryInfo ? order.deliveryInfo.address : 'N/A'}</p>
                ${order.deliveryInfo && order.deliveryInfo.lat ? `
                    <p><strong>Tọa độ:</strong> ${parseFloat(order.deliveryInfo.lat).toFixed(6)}, ${parseFloat(order.deliveryInfo.lng).toFixed(6)}</p>
                ` : ''}
                <p><strong>Tổng tiền:</strong> ${formatPrice(order.total)}</p>
            </div>
            
            <h4>Sản phẩm:</h4>
            <div class="order-items-list">
                ${order.items ? order.items.map(item => `
                    <div class="item" style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee;">
                        <span>${item.name} x${item.quantity}</span>
                        <span>${formatPrice(item.price * item.quantity)}</span>
                    </div>
                `).join('') : '<p>Không có sản phẩm</p>'}
            </div>
        `;
        console.log('Order info populated successfully');
    } else {
        console.error('orderInfoDetails element not found!');
    }
    
    // Populate drone selection in existing HTML structure
    const droneSelectionList = document.getElementById('droneSelectionList');
    console.log('droneSelectionList element:', droneSelectionList);
    
    if (droneSelectionList) {
        console.log('Populating drone selection...');
        droneSelectionList.innerHTML = drones.filter(d => d.status === 'available').map(drone => `
            <div class="drone-item" onclick="selectDroneForProcessing('${drone.id}')" style="border: 1px solid #ddd; padding: 10px; margin: 5px 0; border-radius: 5px; cursor: pointer;">
                <div class="drone-info">
                    <h5 style="margin: 0 0 5px 0;">${drone.name}</h5>
                    <p style="margin: 2px 0; font-size: 12px;"><i class="fas fa-home"></i> ${drone.homeBase}</p>
                    <p style="margin: 2px 0; font-size: 12px;"><i class="fas fa-battery-three-quarters"></i> Pin: ${drone.battery}%</p>
                    <p class="drone-status status-${drone.status}" style="margin: 2px 0; font-size: 12px; color: #28a745;">
                        <i class="fas fa-check-circle"></i> Sẵn sàng
                    </p>
                </div>
            </div>
        `).join('') + (drones.filter(d => d.status === 'available').length === 0 ? 
            '<p class="no-drones">Không có drone sẵn sàng</p>' : '');
        console.log('Drone selection populated successfully');
    } else {
        console.error('droneSelectionList element not found!');
    }
    
    // Initialize the map after a short delay to ensure DOM is ready
    console.log('Setting timeout for map initialization...');
    setTimeout(() => {
        console.log('=== Map initialization timeout triggered ===');
        const mapElement = document.getElementById('orderProcessingMap');
        console.log('Map element found:', mapElement);
        console.log('Map element parent:', mapElement ? mapElement.parentElement : 'N/A');
        console.log('Map element offsetParent:', mapElement ? mapElement.offsetParent : 'N/A');
        
        if (mapElement) {
            console.log('Map element dimensions:', mapElement.offsetWidth, 'x', mapElement.offsetHeight);
            console.log('Map element client dimensions:', mapElement.clientWidth, 'x', mapElement.clientHeight);
            console.log('Map element style:', mapElement.style.cssText);
            console.log('Map element computed style display:', window.getComputedStyle(mapElement).display);
            console.log('Map element computed style visibility:', window.getComputedStyle(mapElement).visibility);
            
            // Force dimensions if needed
            if (mapElement.offsetWidth === 0 || mapElement.offsetHeight === 0) {
                console.log('Map element has zero dimensions, forcing dimensions...');
                mapElement.style.width = '100%';
                mapElement.style.height = '500px';
                mapElement.style.minHeight = '350px';
                mapElement.style.display = 'block';
            }
            
            initializeOrderProcessingMap();
        } else {
            console.error('Map element not found after timeout!');
            // Check if the page is actually visible
            const orderProcessingPage = document.getElementById('order-processingPage');
            console.log('order-processingPage element:', orderProcessingPage);
            console.log('order-processingPage display:', orderProcessingPage ? orderProcessingPage.style.display : 'N/A');
        }
    }, 1000);
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.order-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
    }
}

// Test OpenStreetMap connectivity
function testOpenStreetMapConnectivity() {
    console.log('🧪 Testing OpenStreetMap API connectivity...');
    
    // Test tile server connectivity
    const testUrl = 'https://a.tile.openstreetmap.org/0/0/0.png';
    const img = new Image();
    
    img.onload = function() {
        console.log('✅ OpenStreetMap tile server is accessible');
    };
    
    img.onerror = function() {
        console.error('❌ OpenStreetMap tile server is not accessible');
        console.log('🔧 Suggestions:');
        console.log('  - Check internet connection');
        console.log('  - Check if OpenStreetMap is blocked by firewall/proxy');
        console.log('  - Try alternative tile servers');
    };
    
    img.src = testUrl;
    
    // Also test API endpoint
    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=10.8231&lon=106.6297&zoom=18&addressdetails=1')
        .then(response => {
            if (response.ok) {
                console.log('✅ OpenStreetMap Nominatim API is accessible');
                return response.json();
            } else {
                throw new Error('API not accessible');
            }
        })
        .then(data => {
            console.log('📍 Test geocoding result:', data);
        })
        .catch(error => {
            console.warn('⚠️ OpenStreetMap Nominatim API test failed:', error);
        });
}

// Initialize order processing map
function initializeOrderProcessingMap() {
    console.log('initializeOrderProcessingMap called');
    
    // Test OpenStreetMap connectivity
    testOpenStreetMapConnectivity();
    
    const mapContainer = document.getElementById('orderProcessingMap');
    if (!mapContainer) {
        console.error('Map container not found!');
        return;
    }
    
    console.log('Map container found, dimensions:', mapContainer.offsetWidth, 'x', mapContainer.offsetHeight);
    
    // Remove existing map if any
    if (window.orderProcessingMap) {
        console.log('Removing existing map');
        window.orderProcessingMap.remove();
        window.orderProcessingMap = null;
    }
    
    try {
        // Initialize map centered on Ho Chi Minh City
        console.log('Creating new map...');
        window.orderProcessingMap = L.map('orderProcessingMap', {
            center: [10.8231, 106.6297],
            zoom: 12,
            zoomControl: true
        });
        
        console.log('Adding tile layer...');
        const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
            subdomains: ['a', 'b', 'c'],
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
            tileLoadTimout: 10000,
            detectRetina: true
        });
        
        tileLayer.addTo(window.orderProcessingMap);
        
        // Add tile load event handlers
        tileLayer.on('load', function() {
            console.log('✅ Tiles loaded successfully');
        });
        
        tileLayer.on('tileerror', function(e) {
            console.warn('⚠️ Tile load error:', e);
        });
        
        // Force refresh map size after adding tiles
        setTimeout(() => {
            window.orderProcessingMap.invalidateSize();
            console.log('Map size invalidated and refreshed');
        }, 500);
        
        // Reset route planning variables
        routePlanningMode = false;
        currentRoute = [];
        routeMarkers = [];
        visitedWaypoints = 0;
        
        console.log('Map created successfully');
        
        // Auto-create default route from drone to delivery coordinates
        setTimeout(() => {
            console.log('Setting up default route...');
            const order = JSON.parse(localStorage.getItem('currentProcessingOrder') || '{}');
            if (order && order.deliveryInfo && order.deliveryInfo.lat && order.deliveryInfo.lng) {
                console.log('Order has delivery coordinates:', order.deliveryInfo.lat, order.deliveryInfo.lng);
                
                let drone = selectedDroneForOrder;
                if (!drone && drones.length > 0) {
                    drone = drones[0];
                    console.log('Using default drone:', drone.name);
                }
                
                if (drone && drone.baseCoords) {
                    const droneBase = [drone.baseCoords[0], drone.baseCoords[1]];
                    const deliveryPoint = [parseFloat(order.deliveryInfo.lat), parseFloat(order.deliveryInfo.lng)];
                    
                    console.log('Creating route from', droneBase, 'to', deliveryPoint);
                    
                    // Create default straight-line route
                    currentRoute = [
                        { lat: droneBase[0], lng: droneBase[1], type: 'start', label: 'Điểm xuất phát Drone' },
                        { lat: deliveryPoint[0], lng: deliveryPoint[1], type: 'delivery', label: 'Điểm giao hàng' }
                    ];
                    
                    // Add drone base marker (green)
                    const droneMarker = L.marker(droneBase, {
                        icon: L.icon({
                            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        }),
                        draggable: false
                    }).addTo(window.orderProcessingMap)
                      .bindPopup('<b>Điểm xuất phát Drone</b><br>' + drone.name);
                    
                    // Add delivery marker (red)
                    const deliveryMarker = L.marker(deliveryPoint, {
                        icon: L.icon({
                            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        }),
                        draggable: false
                    }).addTo(window.orderProcessingMap)
                      .bindPopup('<b>Điểm giao hàng</b><br>' + (order.deliveryInfo.address || 'Địa chỉ giao hàng'));
                    
                    // Store markers
                    routeMarkers = [droneMarker, deliveryMarker];
                    
                    // Draw default route line
                    drawDefaultRoute();
                    
                    // Fit map to show both points
                    window.orderProcessingMap.fitBounds([droneBase, deliveryPoint], { padding: [20, 20] });
                    
                    // Enable start flight button
                    const startBtn = document.querySelector('.start-btn');
                    if (startBtn) startBtn.disabled = false;
                    
                    console.log('Default route created successfully');
                } else {
                    console.log('No drone base coordinates available');
                }
            } else {
                console.log('No delivery coordinates in order');
            }
            
            // Handle map clicks for route planning
            window.orderProcessingMap.on('click', function(e) {
                if (routePlanningMode && currentFlightStatus === 'idle') {
                    addProcessingWaypoint(e.latlng);
                }
            });
            
            console.log('Map setup completed');
        }, 200);
        
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

// Global variables for flight control
let selectedDroneForOrder = null;
let currentFlightStatus = 'idle';
let flightProgress = 0;
let routePlanningMode = false;
let currentRoute = [];
let routeControl = null;
let flightSimulation = null;
let routeMarkers = [];
let visitedWaypoints = 0;
let defaultRouteLine = null;

// Select drone for processing
function selectDroneForProcessing(droneId) {
    const drone = drones.find(d => d.id === droneId);
    if (!drone) return;
    
    selectedDroneForOrder = drone;
    
    // Update UI
    const droneItems = document.querySelectorAll('.drone-item');
    droneItems.forEach(item => item.classList.remove('selected'));
    
    const selectedItem = document.querySelector(`[onclick="selectDroneForProcessing('${droneId}')"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }
    
    // Enable start button
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.disabled = false;
    }
    
    // Update map to show selected drone base
    if (window.orderProcessingMap && drone.baseCoords) {
        window.orderProcessingMap.setView(drone.baseCoords, 14);
    }
    
    showNotification(`Đã chọn drone: ${drone.name}`, 'success');
}

// Flight control functions
function startFlight(orderId) {
    if (!selectedDroneForOrder) {
        showNotification('Vui lòng chọn drone trước khi khởi hành', 'error');
        return;
    }
    
    if (currentRoute.length < 2) {
        showNotification('Vui lòng thiết lập lộ trình trước khi khởi hành', 'error');
        return;
    }
    
    currentFlightStatus = 'flying';
    flightProgress = 0;
    visitedWaypoints = 0;
    updateFlightStatus('flying', 'Đang bay');
    
    // Enable pause and emergency buttons, disable start
    const pauseBtn = document.querySelector('.pause-btn');
    const emergencyBtn = document.querySelector('.emergency-btn');
    const startBtn = document.querySelector('.start-btn');
    
    if (pauseBtn) pauseBtn.disabled = false;
    if (emergencyBtn) emergencyBtn.disabled = false;
    if (startBtn) startBtn.disabled = true;
    
    // Disable route editing controls during flight
    const planningBtn = document.querySelector('.map-btn');
    const resetBtn = document.querySelector('.map-btn.secondary');
    if (planningBtn) planningBtn.style.opacity = '0.5';
    if (resetBtn) resetBtn.style.opacity = '0.5';
    
    // Start flight simulation
    simulateFlight(orderId);
    
    showNotification(`Drone ${selectedDroneForOrder.name} đã khởi hành!`, 'success');
}

function pauseFlight(orderId) {
    currentFlightStatus = 'paused';
    updateFlightStatus('paused', 'Tạm dừng');
    
    const pauseBtn = document.querySelector('.pause-btn');
    const continueBtn = document.querySelector('.continue-btn');
    
    if (pauseBtn) pauseBtn.disabled = true;
    if (continueBtn) continueBtn.disabled = false;
    
    if (flightSimulation) {
        clearInterval(flightSimulation);
    }
    
    showNotification('Chuyến bay đã tạm dừng', 'warning');
}

function continueFlight(orderId) {
    currentFlightStatus = 'flying';
    updateFlightStatus('flying', 'Đang bay');
    
    const pauseBtn = document.querySelector('.pause-btn');
    const continueBtn = document.querySelector('.continue-btn');
    
    if (pauseBtn) pauseBtn.disabled = false;
    if (continueBtn) continueBtn.disabled = true;
    
    simulateFlight(orderId);
    
    showNotification('Chuyến bay tiếp tục', 'success');
}

function emergencyLanding(orderId) {
    currentFlightStatus = 'emergency';
    updateFlightStatus('paused', 'Hạ cánh khẩn cấp');
    
    if (flightSimulation) {
        clearInterval(flightSimulation);
    }
    
    // Enable route editing controls again
    const planningBtn = document.querySelector('.map-btn');
    const resetBtn = document.querySelector('.map-btn.secondary');
    if (planningBtn) planningBtn.style.opacity = '1';
    if (resetBtn) resetBtn.style.opacity = '1';
    
    // Disable all control buttons except start
    const pauseBtn = document.querySelector('.pause-btn');
    const continueBtn = document.querySelector('.continue-btn');
    const emergencyBtn = document.querySelector('.emergency-btn');
    const startBtn = document.querySelector('.start-btn');
    
    if (pauseBtn) pauseBtn.disabled = true;
    if (continueBtn) continueBtn.disabled = true;
    if (emergencyBtn) emergencyBtn.disabled = true;
    if (startBtn) startBtn.disabled = false;
    
    // Reset progress
    flightProgress = 0;
    visitedWaypoints = 0;
    updateProgress(0);
    
    showNotification('Drone đã hạ cánh khẩn cấp!', 'error');
}

function updateFlightStatus(status, text) {
    const statusElement = document.getElementById('flightStatus');
    if (statusElement) {
        statusElement.textContent = text;
        statusElement.className = `status-indicator ${status}`;
    }
}

function updateProgress(percentage) {
    const progressFill = document.getElementById('flightProgress');
    const progressText = document.getElementById('progressText');
    
    if (progressFill && progressText) {
        progressFill.style.width = percentage + '%';
        progressText.textContent = Math.round(percentage) + '%';
    }
}

function simulateFlight(orderId) {
    if (flightSimulation) {
        clearInterval(flightSimulation);
    }
    
    flightSimulation = setInterval(() => {
        if (currentFlightStatus === 'flying') {
            flightProgress += 1.5; // Increase by 1.5% each interval
            
            // Calculate current waypoint based on progress
            const totalSegments = currentRoute.length - 1;
            const progressPerSegment = 100 / totalSegments;
            const currentSegment = Math.floor(flightProgress / progressPerSegment);
            
            // Update visited waypoints (preventing editing of passed points)
            if (currentSegment > visitedWaypoints) {
                visitedWaypoints = currentSegment;
                
                // Update marker colors for visited waypoints
                if (visitedWaypoints < routeMarkers.length) {
                    const visitedMarker = routeMarkers[visitedWaypoints];
                    if (visitedMarker) {
                        visitedMarker.setIcon(L.icon({
                            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        }));
                    }
                }
                
                showNotification(`Đã đến điểm ${visitedWaypoints + 1}/${currentRoute.length}`, 'info');
            }
            
            // Update route line color to show progress
            drawDefaultRoute();
            updateProgress(flightProgress);
            
            if (flightProgress >= 100) {
                // Flight completed
                currentFlightStatus = 'completed';
                updateFlightStatus('completed', 'Hoàn thành');
                clearInterval(flightSimulation);
                
                // Re-enable route editing controls
                const planningBtn = document.querySelector('.map-btn');
                const resetBtn = document.querySelector('.map-btn.secondary');
                if (planningBtn) planningBtn.style.opacity = '1';
                if (resetBtn) resetBtn.style.opacity = '1';
                
                // Update order status
                const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                const orderIndex = orders.findIndex(o => o.id == orderId);
                if (orderIndex !== -1) {
                    orders[orderIndex].status = 'delivered';
                    orders[orderIndex].droneId = selectedDroneForOrder.id;
                    orders[orderIndex].deliveryRoute = currentRoute;
                    localStorage.setItem('orders', JSON.stringify(orders));
                }
                
                showNotification('Giao hàng thành công!', 'success');
                
                // Enable confirm delivery button
                const confirmBtn = document.querySelector('.confirm-delivery-btn');
                if (confirmBtn) {
                    confirmBtn.disabled = false;
                    confirmBtn.innerHTML = '<i class="fas fa-check"></i> Xác nhận hoàn thành';
                }
                
                // Disable flight control buttons
                const startBtn = document.querySelector('.start-btn');
                const pauseBtn = document.querySelector('.pause-btn');
                const continueBtn = document.querySelector('.continue-btn');
                const emergencyBtn = document.querySelector('.emergency-btn');
                
                if (startBtn) startBtn.disabled = true;
                if (pauseBtn) pauseBtn.disabled = true;
                if (continueBtn) continueBtn.disabled = true;
                if (emergencyBtn) emergencyBtn.disabled = true;
            }
        }
    }, 1000); // Update every second
}

// Route planning functions
function toggleRoutePlanning() {
    if (currentFlightStatus === 'flying') {
        showNotification('Không thể thay đổi chế độ khi đang bay!', 'warning');
        return;
    }
    
    const btn = document.getElementById('planningBtnText');
    const instructions = document.getElementById('route-instructions');
    
    if (!routePlanningMode) {
        routePlanningMode = true;
        if (btn) btn.innerHTML = '<i class="fas fa-check"></i> Hoàn thành lộ trình';
        if (instructions) instructions.style.display = 'block';
        showNotification('Chế độ lập lộ trình đã bật. Click trên bản đồ để thêm điểm dừng.', 'info');
    } else {
        routePlanningMode = false;
        if (btn) btn.innerHTML = '<i class="fas fa-route"></i> Lập lại lộ trình';
        if (instructions) instructions.style.display = 'none';
        
        if (currentRoute.length >= 2) {
            showNotification('Lộ trình đã được lưu!', 'success');
            const optimizeBtn = document.querySelector('.map-btn.success');
            if (optimizeBtn) optimizeBtn.disabled = false;
        }
    }
}

function addProcessingWaypoint(latlng) {
    if (currentFlightStatus !== 'idle') {
        showNotification('Không thể thêm điểm khi đang bay!', 'warning');
        return;
    }
    
    // Insert waypoint before the delivery point (last point)
    const insertIndex = currentRoute.length - 1;
    const newWaypoint = { 
        lat: latlng.lat, 
        lng: latlng.lng, 
        type: 'waypoint', 
        label: `Điểm dừng ${insertIndex}` 
    };
    
    currentRoute.splice(insertIndex, 0, newWaypoint);
    
    // Add marker for new waypoint
    const marker = L.marker(latlng, {
        draggable: true,
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(window.orderProcessingMap);
    
    marker.bindPopup(newWaypoint.label);
    routeMarkers.splice(insertIndex, 0, marker);
    
    // Handle marker drag with flight restrictions
    marker.on('dragend', function(e) {
        if (currentFlightStatus === 'flying') {
            const markerIndex = routeMarkers.indexOf(marker);
            if (markerIndex <= visitedWaypoints) {
                showNotification('Không thể thay đổi điểm đã đi qua!', 'warning');
                marker.setLatLng([newWaypoint.lat, newWaypoint.lng]);
                return;
            }
        }
        
        const newPos = e.target.getLatLng();
        const markerIndex = routeMarkers.indexOf(marker);
        if (markerIndex !== -1) {
            currentRoute[markerIndex].lat = newPos.lat;
            currentRoute[markerIndex].lng = newPos.lng;
            drawDefaultRoute();
        }
    });
    
    drawDefaultRoute();
    showNotification('Đã thêm điểm dừng mới', 'success');
}

function drawDefaultRoute() {
    // Remove existing route line
    if (defaultRouteLine) {
        window.orderProcessingMap.removeLayer(defaultRouteLine);
    }
    
    if (currentRoute.length >= 2) {
        const routePoints = currentRoute.map(point => [point.lat, point.lng]);
        defaultRouteLine = L.polyline(routePoints, {
            color: currentFlightStatus === 'flying' ? '#ff6b35' : '#007bff',
            weight: 4,
            opacity: 0.8,
            dashArray: currentFlightStatus === 'flying' ? '10,5' : null
        }).addTo(window.orderProcessingMap);
        
        // Add direction arrows
        if (currentFlightStatus === 'idle') {
            addRouteDirectionArrows(routePoints);
        }
    }
}

function addRouteDirectionArrows(routePoints) {
    for (let i = 0; i < routePoints.length - 1; i++) {
        const start = routePoints[i];
        const end = routePoints[i + 1];
        const midpoint = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
        
        // Calculate bearing for arrow direction
        const bearing = getBearing(start, end);
        
        L.marker(midpoint, {
            icon: L.divIcon({
                html: `<div style="transform: rotate(${bearing}deg); font-size: 16px; color: #007bff;">→</div>`,
                iconSize: [20, 20],
                className: 'route-arrow'
            })
        }).addTo(window.orderProcessingMap);
    }
}

function getBearing(start, end) {
    const lat1 = start[0] * Math.PI / 180;
    const lat2 = end[0] * Math.PI / 180;
    const deltaLong = (end[1] - start[1]) * Math.PI / 180;
    
    const y = Math.sin(deltaLong) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLong);
    
    const bearing = Math.atan2(y, x) * 180 / Math.PI;
    return (bearing + 360) % 360;
}

function updateProcessingRoute() {
    if (routeControl) {
        window.orderProcessingMap.removeControl(routeControl);
    }
    
    if (currentRoute.length > 1) {
        let waypoints = [];
        
        // Start from drone base if available
        if (selectedDroneForOrder && selectedDroneForOrder.baseCoords) {
            waypoints.push(L.latLng(selectedDroneForOrder.baseCoords[0], selectedDroneForOrder.baseCoords[1]));
        }
        
        // Add route points
        waypoints = waypoints.concat(currentRoute.map(point => L.latLng(point.lat, point.lng)));
        
        routeControl = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: false,
            addWaypoints: false,
            createMarker: function() { return null; } // Don't create default markers
        }).addTo(window.orderProcessingMap);
    }
}

function resetRoute() {
    if (currentFlightStatus === 'flying') {
        showNotification('Không thể đặt lại lộ trình khi đang bay!', 'warning');
        return;
    }
    
    // Clear waypoints but keep start and end points
    const startPoint = currentRoute[0];
    const endPoint = currentRoute[currentRoute.length - 1];
    currentRoute = [startPoint, endPoint];
    
    // Remove waypoint markers
    routeMarkers.forEach((marker, index) => {
        if (index !== 0 && index !== routeMarkers.length - 1) {
            window.orderProcessingMap.removeLayer(marker);
        }
    });
    
    // Keep only start and end markers
    routeMarkers = [routeMarkers[0], routeMarkers[routeMarkers.length - 1]];
    
    // Remove direction arrows
    window.orderProcessingMap.eachLayer(function(layer) {
        if (layer.options && layer.options.className === 'route-arrow') {
            window.orderProcessingMap.removeLayer(layer);
        }
    });
    
    // Redraw route
    drawDefaultRoute();
    
    // Disable optimize button
    const optimizeBtn = document.querySelector('.map-btn.success');
    if (optimizeBtn) optimizeBtn.disabled = true;
    
    showNotification('Lộ trình đã được đặt lại về đường thẳng', 'info');
}

function optimizeRoute() {
    if (currentFlightStatus === 'flying') {
        showNotification('Không thể tối ưu lộ trình khi đang bay!', 'warning');
        return;
    }
    
    if (currentRoute.length < 3) {
        showNotification('Cần ít nhất 3 điểm để tối ưu lộ trình', 'warning');
        return;
    }
    
    // Simple optimization: rearrange waypoints to minimize total distance
    const startPoint = currentRoute[0];
    const endPoint = currentRoute[currentRoute.length - 1];
    let waypoints = currentRoute.slice(1, -1); // Exclude start and end points
    
    // Use nearest neighbor algorithm for simple optimization
    let optimizedWaypoints = [];
    let currentPoint = startPoint;
    
    while (waypoints.length > 0) {
        let nearestIndex = 0;
        let minDistance = getDistance(currentPoint, waypoints[0]);
        
        for (let i = 1; i < waypoints.length; i++) {
            const distance = getDistance(currentPoint, waypoints[i]);
            if (distance < minDistance) {
                minDistance = distance;
                nearestIndex = i;
            }
        }
        
        optimizedWaypoints.push(waypoints[nearestIndex]);
        currentPoint = waypoints[nearestIndex];
        waypoints.splice(nearestIndex, 1);
    }
    
    // Update route with optimized waypoints
    currentRoute = [startPoint, ...optimizedWaypoints, endPoint];
    
    // Update markers on map
    routeMarkers.forEach(marker => window.orderProcessingMap.removeLayer(marker));
    routeMarkers = [];
    
    // Recreate markers in optimized order
    currentRoute.forEach((point, index) => {
        let iconUrl, label;
        if (index === 0) {
            iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
            label = point.label || 'Điểm xuất phát';
        } else if (index === currentRoute.length - 1) {
            iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';
            label = point.label || 'Điểm giao hàng';
        } else {
            iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png';
            label = `Điểm dừng ${index}`;
        }
        
        const marker = L.marker([point.lat, point.lng], {
            icon: L.icon({
                iconUrl: iconUrl,
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            draggable: index !== 0 && index !== currentRoute.length - 1
        }).addTo(window.orderProcessingMap);
        
        marker.bindPopup(label);
        routeMarkers.push(marker);
        
        // Add drag handler for waypoints
        if (index !== 0 && index !== currentRoute.length - 1) {
            marker.on('dragend', function(e) {
                if (currentFlightStatus === 'flying') {
                    const markerIndex = routeMarkers.indexOf(marker);
                    if (markerIndex <= visitedWaypoints) {
                        showNotification('Không thể thay đổi điểm đã đi qua!', 'warning');
                        marker.setLatLng([point.lat, point.lng]);
                        return;
                    }
                }
                
                const newPos = e.target.getLatLng();
                const markerIndex = routeMarkers.indexOf(marker);
                currentRoute[markerIndex].lat = newPos.lat;
                currentRoute[markerIndex].lng = newPos.lng;
                drawDefaultRoute();
            });
        }
    });
    
    drawDefaultRoute();
    showNotification('Lộ trình đã được tối ưu hóa!', 'success');
}

function getDistance(point1, point2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function confirmDelivery(orderId) {
    if (currentRoute.length === 0) {
        showNotification('Vui lòng lập lộ trình trước khi xác nhận', 'warning');
        return;
    }
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id == orderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = 'shipping';
        orders[orderIndex].droneId = selectedDroneForOrder.id;
        orders[orderIndex].route = currentRoute;
        localStorage.setItem('orders', JSON.stringify(orders));
    }
    
    showNotification('Đơn hàng đã được xác nhận và chuẩn bị giao!', 'success');
}

function confirmDeliveryFromPage() {
    const order = JSON.parse(localStorage.getItem('currentProcessingOrder') || '{}');
    if (!order.id) {
        showNotification('Không tìm thấy thông tin đơn hàng!', 'error');
        return;
    }
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id == order.id);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = 'completed';
        orders[orderIndex].completedDate = new Date().toLocaleString('vi-VN');
        orders[orderIndex].droneId = selectedDroneForOrder?.id;
        orders[orderIndex].deliveryRoute = currentRoute;
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear current processing order
        localStorage.removeItem('currentProcessingOrder');
        
        showNotification('Đơn hàng đã được hoàn thành!', 'success');
        
        // Return to admin page
        setTimeout(() => {
            showPage('admin');
        }, 2000);
    } else {
        showNotification('Không tìm thấy đơn hàng!', 'error');
    }
}

// Complete order function for admin
function completeOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id == orderId);
    
    if (orderIndex === -1) {
        alert('Không tìm thấy đơn hàng!');
        return;
    }
    
    // Update order status to completed
    orders[orderIndex].status = 'completed';
    orders[orderIndex].completedDate = new Date().toLocaleString('vi-VN');
    
    // Update drone status back to available
    if (orders[orderIndex].droneId) {
        const drone = drones.find(d => d.id === orders[orderIndex].droneId);
        if (drone) {
            drone.status = 'available';
        }
    }
    
    localStorage.setItem('orders', JSON.stringify(orders));
    
    alert('Đơn hàng đã được đánh dấu hoàn thành!');
    loadAdminContent();
}

// Load profile page
function loadProfile() {
    const container = document.getElementById('profileContent');
    if (!container || !currentUser) return;
    
    container.innerHTML = `
        <div class="profile-section">
            <h2>Thông tin cá nhân</h2>
            <div class="profile-info">
                <p><strong>Tên:</strong> ${currentUser.name}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
                <p><strong>Vai trò:</strong> ${currentUser.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</p>
            </div>
        </div>
    `;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Filter products by category
function filterProducts(category) {
    console.log('Filtering products by category:', category);
    
    // Update active filter button
    document.querySelectorAll('.compact-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const container = document.getElementById('allProductsGrid');
    if (!container) return;
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    console.log(`Showing ${filteredProducts.length} products for category: ${category}`);
    
    container.innerHTML = filteredProducts.map(product => `
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
}

// Export functions for use in other files
window.mainFunctions = {
    isLoggedIn,
    checkAuth,
    logout,
    updateAuthUI,
    addToCart,
    products,
    formatPrice,
    showPage,
    clearAllCartData,
    updateCartCount
};

// Debug function to force show homepage
function forceShowHomepage() {
    console.log('=== FORCE SHOW HOMEPAGE ===');
    const homePage = document.getElementById('homePage');
    const heroSection = document.querySelector('.hero');
    const featuresSection = document.querySelector('.features');
    const featuredProductsSection = document.querySelector('.featured-products');
    
    if (homePage) {
        homePage.style.display = 'block';
        homePage.style.visibility = 'visible';
        homePage.style.opacity = '1';
        console.log('HomePage container shown');
    }
    
    if (heroSection) {
        heroSection.style.display = 'flex';
        heroSection.style.visibility = 'visible';
        heroSection.style.opacity = '1';
        console.log('Hero section forced visible');
    }
    if (featuresSection) {
        featuresSection.style.display = 'block';
        featuresSection.style.visibility = 'visible';
        featuresSection.style.opacity = '1';
        console.log('Features section forced visible');
    }
    if (featuredProductsSection) {
        featuredProductsSection.style.display = 'block';
        featuredProductsSection.style.visibility = 'visible';
        featuredProductsSection.style.opacity = '1';
        console.log('Featured products section forced visible');
    }
}

// Make debug function globally accessible
window.forceShowHomepage = forceShowHomepage;

// Make functions globally accessible
window.addToCart = addToCart;
window.showPage = showPage;
window.updateCartCount = updateCartCount;
window.clearAllCartData = clearAllCartData;
window.checkAuth = checkAuth;
window.logout = logout;
window.updateOrderStatus = updateOrderStatus;
window.filterOrders = filterOrders;
window.searchOrders = searchOrders;
window.createSampleOrders = createSampleOrders;
window.loadFeaturedProducts = loadFeaturedProducts;

// ========== DELIVERY LOCATION MAP FUNCTIONS ==========

// Global variables for delivery location map - use window object for consistency
window.deliveryLocationMap = window.deliveryLocationMap || null;
window.deliveryLocationMarker = window.deliveryLocationMarker || null;
window.selectedDeliveryLocation = window.selectedDeliveryLocation || null;

// Initialize delivery location map
function initializeDeliveryLocationMap() {
    console.log('Initializing delivery location map...');
    
    // First check if we're actually on checkout page
    const checkoutPage = document.getElementById('checkoutPage');
    if (!checkoutPage || checkoutPage.style.display !== 'block') {
        console.log('Checkout page not visible, aborting map initialization');
        return;
    }
    
    const mapContainer = document.getElementById('deliveryLocationMap');
    if (!mapContainer) {
        console.error('Delivery location map container not found');
        
        // List all available elements for debugging
        const allElements = document.querySelectorAll('[id*="delivery"], [id*="map"]');
        console.log('Available delivery/map elements:', Array.from(allElements).map(el => el.id));
        
        return;
    }
    
    console.log('Map container found:', mapContainer);
    console.log('Container dimensions:', mapContainer.offsetWidth, 'x', mapContainer.offsetHeight);
    console.log('Container visibility:', window.getComputedStyle(mapContainer).visibility);
    console.log('Container display:', window.getComputedStyle(mapContainer).display);
    
    // Check if container has proper dimensions
    if (mapContainer.offsetWidth === 0 || mapContainer.offsetHeight === 0) {
        console.warn('Map container has zero dimensions, retrying...');
        setTimeout(() => {
            initializeDeliveryLocationMap();
        }, 1000);
        return;
    }
    
    // Remove existing map if any
    if (window.deliveryLocationMap) {
        console.log('Removing existing delivery location map...');
        window.deliveryLocationMap.remove();
        window.deliveryLocationMap = null;
    }
    
    try {
        console.log('Creating new Leaflet map...');
        
        // Check if Leaflet is loaded
        if (typeof L === 'undefined') {
            console.error('Leaflet library not loaded!');
            alert('Không thể tải thư viện bản đồ. Vui lòng refresh trang.');
            return;
        }
        
        console.log('Leaflet version:', L.version);
        
        // Create map centered on Ho Chi Minh City
        window.deliveryLocationMap = L.map('deliveryLocationMap', {
            center: [10.8231, 106.6297],
            zoom: 13,
            zoomControl: true
        });
        
        console.log('Map object created successfully');
        console.log('Map type:', typeof window.deliveryLocationMap);
        console.log('Map has addLayer:', typeof window.deliveryLocationMap.addLayer);
        
        // Add OpenStreetMap tiles
        const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
        });
        
        tileLayer.addTo(window.deliveryLocationMap);
        console.log('Tile layer added to map');
        
        // Force map resize after a short delay
        setTimeout(() => {
            window.deliveryLocationMap.invalidateSize();
            console.log('Map size invalidated and refreshed');
        }, 200);
        
        // Handle map clicks to select delivery location
        window.deliveryLocationMap.on('click', function(e) {
            setDeliveryLocation(e.latlng.lat, e.latlng.lng);
        });
        
        console.log('Delivery location map initialized successfully');
        
    } catch (error) {
        console.error('Error initializing delivery location map:', error);
    }
}

// Set delivery location
function setDeliveryLocation(lat, lng, address = null) {
    console.log('Setting delivery location:', lat, lng);
    console.log('Current deliveryLocationMap:', window.deliveryLocationMap);
    console.log('Type of deliveryLocationMap:', typeof window.deliveryLocationMap);
    
    if (!window.deliveryLocationMap) {
        console.error('Delivery location map not initialized');
        alert('Bản đồ chưa được khởi tạo. Vui lòng thử lại.');
        return;
    }
    
    // Check if it's a valid Leaflet map
    if (!window.deliveryLocationMap.addLayer || typeof window.deliveryLocationMap.addLayer !== 'function') {
        console.error('Invalid map object - missing addLayer function');
        console.log('Map object:', window.deliveryLocationMap);
        
        // Try to reinitialize
        console.log('Attempting to reinitialize map...');
        window.deliveryLocationMap = null;
        initializeDeliveryLocationMap();
        
        // Retry after delay
        setTimeout(() => {
            setDeliveryLocation(lat, lng, address);
        }, 1500);
        return;
    }
    
    // Remove existing marker
    if (window.deliveryLocationMarker) {
        window.deliveryLocationMap.removeLayer(window.deliveryLocationMarker);
    }
    
    // Create new marker
    window.deliveryLocationMarker = L.marker([lat, lng], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }),
        draggable: true
    }).addTo(window.deliveryLocationMap);
    
    // Handle marker drag
    window.deliveryLocationMarker.on('dragend', function(e) {
        const position = e.target.getLatLng();
        setDeliveryLocation(position.lat, position.lng);
    });
    
    // Add popup
    const popupContent = `
        <div class="delivery-marker-popup">
            <div class="popup-title">📦 Vị trí giao hàng</div>
            <div class="popup-coords">${lat.toFixed(6)}, ${lng.toFixed(6)}</div>
            ${address ? `<div class="popup-address">${address}</div>` : ''}
        </div>
    `;
    window.deliveryLocationMarker.bindPopup(popupContent).openPopup();
    
    // Update form fields
    document.getElementById('deliveryLat').value = lat;
    document.getElementById('deliveryLng').value = lng;
    
    // Update coordinates display
    const coordsDisplay = document.getElementById('selectedCoords');
    const clearButton = document.querySelector('.btn-clear-location');
    
    if (coordsDisplay) {
        coordsDisplay.textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        coordsDisplay.style.color = '#007bff';
    }
    
    if (clearButton) {
        clearButton.style.display = 'inline-block';
    }
    
    // Store selected location
    window.selectedDeliveryLocation = { lat, lng, address };
    
    // Center map on marker
    window.deliveryLocationMap.setView([lat, lng], window.deliveryLocationMap.getZoom());
}

// Clear delivery location
function clearDeliveryLocation() {
    if (window.deliveryLocationMarker && window.deliveryLocationMap) {
        window.deliveryLocationMap.removeLayer(window.deliveryLocationMarker);
        window.deliveryLocationMarker = null;
    }
    
    // Clear form fields
    document.getElementById('deliveryLat').value = '';
    document.getElementById('deliveryLng').value = '';
    
    // Reset coordinates display
    const coordsDisplay = document.getElementById('selectedCoords');
    const clearButton = document.querySelector('.btn-clear-location');
    
    if (coordsDisplay) {
        coordsDisplay.textContent = 'Chưa chọn vị trí';
        coordsDisplay.style.color = '#666';
    }
    
    if (clearButton) {
        clearButton.style.display = 'none';
    }
    
    window.selectedDeliveryLocation = null;
}

// Use current location - updated to work with simple map
function useCurrentLocation() {
    console.log('useCurrentLocation called - delegating to useGPSLocation');
    useGPSLocation();
}
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            // Check if map is initialized before setting location
            if (!window.deliveryLocationMap) {
                console.log('Map not initialized yet, initializing first...');
                initializeDeliveryLocationMap();
                // Try again after a delay
                setTimeout(() => {
                    if (window.deliveryLocationMap) {
                        setDeliveryLocation(lat, lng, 'Vị trí hiện tại');
                    } else {
                        console.error('Map still not initialized after retry');
                        alert('Không thể hiển thị bản đồ. Vui lòng thử lại.');
                    }
                }, 1000);
            } else {
                setDeliveryLocation(lat, lng, 'Vị trí hiện tại');
            }
            
            // Reset button
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Show success message
            showNotification('Đã lấy vị trí hiện tại thành công!', 'success');
        },
        function(error) {
            console.error('Geolocation error:', error);
            let errorMessage = 'Không thể lấy vị trí hiện tại';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Bạn đã từ chối quyền truy cập vị trí';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Thông tin vị trí không khả dụng';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Quá thời gian lấy vị trí';
                    break;
            }
            
            alert(errorMessage);
            
            // Reset button
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    );
}

// Search address on map - updated function
function searchAddressOnMap() {
    const address = prompt('Nhập địa chỉ để tìm kiếm:');
    if (!address) return;
    
    // Simple geocoding using Nominatim API
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
    
    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);
                
                updateDeliveryCoordinates(lat, lng);
                
                // If we have a real map, center it and add marker
                if (window.simpleDeliveryMap && window.simpleDeliveryMap.setView) {
                    if (window.deliveryMarker) {
                        window.simpleDeliveryMap.removeLayer(window.deliveryMarker);
                    }
                    window.deliveryMarker = L.marker([lat, lng]).addTo(window.simpleDeliveryMap);
                    window.simpleDeliveryMap.setView([lat, lng], 15);
                }
                
                alert(`Đã tìm thấy: ${result.display_name}`);
            } else {
                alert('Không tìm thấy địa chỉ. Vui lòng thử lại.');
            }
        })
        .catch(error => {
            console.error('Geocoding error:', error);
            alert('Lỗi tìm kiếm địa chỉ. Vui lòng thử lại.');
        });
}

// Create address search modal
function createAddressSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'address-search-modal';
    modal.innerHTML = `
        <div class="address-search-content">
            <div class="address-search-header">
                <h3><i class="fas fa-search"></i> Tìm kiếm địa chỉ</h3>
                <button class="address-search-close" onclick="closeAddressSearchModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <input type="text" class="address-search-input" placeholder="Nhập địa chỉ cần tìm..." id="addressSearchInput">
            <div class="address-search-results" id="addressSearchResults">
                <div style="padding: 20px; text-align: center; color: #666;">
                    Nhập địa chỉ để bắt đầu tìm kiếm
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    const searchInput = modal.querySelector('#addressSearchInput');
    let searchTimeout;
    
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 3) {
            modal.querySelector('#addressSearchResults').innerHTML = `
                <div style="padding: 20px; text-align: center; color: #666;">
                    Nhập ít nhất 3 ký tự để tìm kiếm
                </div>
            `;
            return;
        }
        
        searchTimeout = setTimeout(() => {
            searchAddress(query, modal);
        }, 500);
    });
    
    // Focus on input
    setTimeout(() => {
        searchInput.focus();
    }, 100);
    
    return modal;
}

// Search address using Nominatim API
function searchAddress(query, modal) {
    const resultsContainer = modal.querySelector('#addressSearchResults');
    resultsContainer.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <i class="fas fa-spinner fa-spin"></i> Đang tìm kiếm...
        </div>
    `;
    
    // Add Vietnam bias to search
    const searchQuery = encodeURIComponent(query + ', Vietnam');
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&limit=10&countrycodes=vn&addressdetails=1`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                resultsContainer.innerHTML = `
                    <div style="padding: 20px; text-align: center; color: #666;">
                        Không tìm thấy địa chỉ phù hợp
                    </div>
                `;
                return;
            }
            
            resultsContainer.innerHTML = data.map(item => `
                <div class="address-result-item" onclick="selectSearchResult(${item.lat}, ${item.lon}, '${item.display_name.replace(/'/g, "\\'")}')">
                    <div class="address-result-name">${item.display_name.split(',')[0]}</div>
                    <div class="address-result-details">${item.display_name}</div>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Address search error:', error);
            resultsContainer.innerHTML = `
                <div style="padding: 20px; text-align: center; color: #dc3545;">
                    Lỗi tìm kiếm địa chỉ. Vui lòng thử lại.
                </div>
            `;
        });
}

// Select search result
function selectSearchResult(lat, lng, address) {
    setDeliveryLocation(parseFloat(lat), parseFloat(lng), address);
    closeAddressSearchModal();
    showNotification('Đã chọn vị trí giao hàng thành công!', 'success');
}

// Close address search modal
function closeAddressSearchModal() {
    const modal = document.querySelector('.address-search-modal');
    if (modal) {
        modal.remove();
    }
}

// Make delivery location functions globally accessible
window.initializeDeliveryLocationMap = initializeDeliveryLocationMap;
window.setDeliveryLocation = setDeliveryLocation;
window.clearDeliveryLocation = clearDeliveryLocation;
window.useCurrentLocation = useCurrentLocation;
window.searchAddressOnMap = searchAddressOnMap;
window.selectSearchResult = selectSearchResult;
window.closeAddressSearchModal = closeAddressSearchModal;

// ========== ENHANCED DRONE ROUTE MANAGEMENT ==========

// Global variables for route management
let currentRoutePolyline = null;
let waypointMarkers = [];

// Draw default route with draggable waypoints
function drawDefaultRoute() {
    console.log('Drawing default route...');
    
    if (!window.orderProcessingMap || currentRoute.length < 2) {
        console.error('Map not available or insufficient route points');
        return;
    }
    
    // Remove existing route if any
    removeCurrentRoute();
    
    // Create waypoint markers that can be dragged
    waypointMarkers = [];
    for (let i = 0; i < currentRoute.length; i++) {
        const point = currentRoute[i];
        let markerColor = 'blue';
        let isDraggable = false;
        
        // Set marker appearance based on type
        if (point.type === 'start') {
            markerColor = 'green';
            isDraggable = false; // Start point is fixed
        } else if (point.type === 'delivery') {
            markerColor = 'red';
            isDraggable = false; // End point is fixed
        } else {
            markerColor = 'blue';
            isDraggable = true; // Waypoints can be dragged
        }
        
        const marker = L.marker([point.lat, point.lng], {
            icon: L.icon({
                iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${markerColor}.png`,
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            draggable: isDraggable
        }).addTo(window.orderProcessingMap);
        
        // Add popup
        marker.bindPopup(`<b>${point.label}</b><br>Lat: ${point.lat.toFixed(6)}, Lng: ${point.lng.toFixed(6)}`);
        
        // Handle waypoint drag
        if (isDraggable) {
            marker.on('dragend', function(e) {
                const newPos = e.target.getLatLng();
                updateWaypointPosition(i, newPos.lat, newPos.lng);
            });
        }
        
        waypointMarkers.push(marker);
    }
    
    // Create polyline for the route
    const latlngs = currentRoute.map(point => [point.lat, point.lng]);
    currentRoutePolyline = L.polyline(latlngs, {
        color: '#007bff',
        weight: 4,
        opacity: 0.8
    }).addTo(window.orderProcessingMap);
    
    // Add distance and estimated time
    const distance = calculateRouteDistance();
    const estimatedTime = calculateFlightTime(distance);
    
    console.log(`Route created: ${distance.toFixed(2)}km, estimated time: ${estimatedTime.toFixed(1)} minutes`);
    
    // Update UI with route info
    updateRouteInformation(distance, estimatedTime);
}

// Update waypoint position and redraw route
function updateWaypointPosition(index, lat, lng) {
    if (index >= 0 && index < currentRoute.length) {
        currentRoute[index].lat = lat;
        currentRoute[index].lng = lng;
        
        // Update marker popup
        const marker = waypointMarkers[index];
        if (marker) {
            marker.bindPopup(`<b>${currentRoute[index].label}</b><br>Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`);
        }
        
        // Redraw route line
        if (currentRoutePolyline) {
            const latlngs = currentRoute.map(point => [point.lat, point.lng]);
            currentRoutePolyline.setLatLngs(latlngs);
        }
        
        // Update route information
        const distance = calculateRouteDistance();
        const estimatedTime = calculateFlightTime(distance);
        updateRouteInformation(distance, estimatedTime);
        
        console.log(`Waypoint ${index} updated: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }
}

// Add new waypoint when clicking on map
function addProcessingWaypoint(latlng) {
    if (!routePlanningMode) return;
    
    const newWaypoint = {
        lat: latlng.lat,
        lng: latlng.lng,
        type: 'waypoint',
        label: `Điểm dừng ${currentRoute.length - 1}`
    };
    
    // Insert before the last point (delivery point)
    currentRoute.splice(currentRoute.length - 1, 0, newWaypoint);
    
    // Redraw route with new waypoint
    drawDefaultRoute();
    
    console.log('Added new waypoint:', newWaypoint);
    showNotification('Đã thêm điểm dừng mới vào lộ trình', 'success');
}

// Remove current route from map
function removeCurrentRoute() {
    if (currentRoutePolyline) {
        window.orderProcessingMap.removeLayer(currentRoutePolyline);
        currentRoutePolyline = null;
    }
    
    waypointMarkers.forEach(marker => {
        if (marker) {
            window.orderProcessingMap.removeLayer(marker);
        }
    });
    waypointMarkers = [];
    
    if (routeControl) {
        window.orderProcessingMap.removeControl(routeControl);
        routeControl = null;
    }
}

// Calculate total route distance
function calculateRouteDistance() {
    if (currentRoute.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 0; i < currentRoute.length - 1; i++) {
        const from = L.latLng(currentRoute[i].lat, currentRoute[i].lng);
        const to = L.latLng(currentRoute[i + 1].lat, currentRoute[i + 1].lng);
        totalDistance += from.distanceTo(to);
    }
    
    return totalDistance / 1000; // Convert to kilometers
}

// Calculate estimated flight time
function calculateFlightTime(distanceKm) {
    const droneSpeed = 50; // km/h average speed
    return (distanceKm / droneSpeed) * 60; // minutes
}

// Update route information in UI
function updateRouteInformation(distance, estimatedTime) {
    // Find or create route info display
    let routeInfo = document.getElementById('routeInformation');
    if (!routeInfo) {
        routeInfo = document.createElement('div');
        routeInfo.id = 'routeInformation';
        routeInfo.className = 'route-information';
        
        const sidebar = document.querySelector('.order-sidebar');
        if (sidebar) {
            const firstSection = sidebar.querySelector('.sidebar-section');
            if (firstSection) {
                firstSection.appendChild(routeInfo);
            }
        }
    }
    
    routeInfo.innerHTML = `
        <div class="route-stats">
            <h4><i class="fas fa-route"></i> Thông tin lộ trình</h4>
            <div class="stat-item">
                <span class="stat-label">Khoảng cách:</span>
                <span class="stat-value">${distance.toFixed(2)} km</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Thời gian dự kiến:</span>
                <span class="stat-value">${estimatedTime.toFixed(1)} phút</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Số điểm dừng:</span>
                <span class="stat-value">${currentRoute.length - 2} điểm</span>
            </div>
        </div>
    `;
}

// Toggle route planning mode
function toggleRoutePlanning() {
    routePlanningMode = !routePlanningMode;
    
    const btn = document.querySelector('#planningBtnText');
    const instructions = document.getElementById('route-instructions');
    
    if (routePlanningMode) {
        if (btn) btn.innerHTML = '<i class="fas fa-stop"></i> Dừng lập lộ trình';
        if (instructions) instructions.style.display = 'block';
        console.log('Route planning mode enabled');
    } else {
        if (btn) btn.innerHTML = '<i class="fas fa-route"></i> Lập lại lộ trình';
        if (instructions) instructions.style.display = 'none';
        console.log('Route planning mode disabled');
    }
}

// Reset route to default
function resetRoute() {
    const order = JSON.parse(localStorage.getItem('currentProcessingOrder') || '{}');
    if (!order.deliveryInfo || !order.deliveryInfo.lat || !order.deliveryInfo.lng) {
        alert('Không có thông tin giao hàng để tạo lộ trình');
        return;
    }
    
    let drone = selectedDroneForOrder;
    if (!drone && drones.length > 0) {
        drone = drones[0];
    }
    
    if (!drone || !drone.baseCoords) {
        alert('Không có thông tin drone để tạo lộ trình');
        return;
    }
    
    // Reset to original route
    const droneBase = [drone.baseCoords[0], drone.baseCoords[1]];
    const deliveryPoint = [parseFloat(order.deliveryInfo.lat), parseFloat(order.deliveryInfo.lng)];
    
    currentRoute = [
        { lat: droneBase[0], lng: droneBase[1], type: 'start', label: 'Điểm xuất phát Drone' },
        { lat: deliveryPoint[0], lng: deliveryPoint[1], type: 'delivery', label: 'Điểm giao hàng' }
    ];
    
    drawDefaultRoute();
    showNotification('Đã đặt lại lộ trình về mặc định', 'success');
}

// Optimize route (simple implementation)
function optimizeRoute() {
    if (currentRoute.length <= 2) {
        alert('Cần ít nhất 1 điểm dừng để tối ưu hóa');
        return;
    }
    
    // Simple optimization: sort waypoints by distance from start
    const start = currentRoute[0];
    const end = currentRoute[currentRoute.length - 1];
    const waypoints = currentRoute.slice(1, -1);
    
    // Sort waypoints by distance from start point
    waypoints.sort((a, b) => {
        const distA = Math.sqrt(Math.pow(a.lat - start.lat, 2) + Math.pow(a.lng - start.lng, 2));
        const distB = Math.sqrt(Math.pow(b.lat - start.lat, 2) + Math.pow(b.lng - start.lng, 2));
        return distA - distB;
    });
    
    // Rebuild route
    currentRoute = [start, ...waypoints, end];
    
    drawDefaultRoute();
    showNotification('Đã tối ưu hóa lộ trình thành công', 'success');
}

// Make route management functions globally accessible
window.drawDefaultRoute = drawDefaultRoute;
window.updateWaypointPosition = updateWaypointPosition;
window.addProcessingWaypoint = addProcessingWaypoint;
window.toggleRoutePlanning = toggleRoutePlanning;
window.resetRoute = resetRoute;
window.optimizeRoute = optimizeRoute;
window.loadAllProducts = loadAllProducts;
window.loadDrones = loadDrones;
window.createDemoOrders = createDemoOrders;
window.filterProducts = filterProducts;

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM Content Loaded - Initializing App ===');
    
    // Ensure all critical functions are available
    if (typeof showPage !== 'function') {
        console.error('showPage function not available!');
        return;
    }
    
    // Initialize auth system
    if (window.authFunctions && typeof window.authFunctions.init === 'function') {
        window.authFunctions.init();
    }
    
    // Update cart count
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
    
    // Update auth UI
    if (typeof updateAuthUI === 'function') {
        updateAuthUI();
    }
    
    // Load featured products on home page
    if (typeof loadFeaturedProducts === 'function') {
        loadFeaturedProducts();
    }
    
    // Set up form event listeners
    setupFormEventListeners();
    
    console.log('=== App initialization complete ===');
});

// Setup form event listeners
function setupFormEventListeners() {
    console.log('Setting up form event listeners...');
    
    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', processCheckout);
        console.log('Checkout form listener attached');
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (typeof handleLogin === 'function') {
                handleLogin();
            }
        });
        console.log('Login form listener attached');
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (typeof handleRegister === 'function') {
                handleRegister();
            }
        });
        console.log('Register form listener attached');
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page && typeof showPage === 'function') {
                showPage(page);
            }
        });
    });
    console.log(`Navigation listeners attached to ${navLinks.length} links`);
}

// Make setup function globally accessible
window.setupFormEventListeners = setupFormEventListeners;

// Test function to verify everything works
function testNavigation() {
    console.log('=== Testing Navigation Functions ===');
    console.log('showPage function:', typeof showPage);
    console.log('updateCartCount function:', typeof updateCartCount);
    console.log('updateAuthUI function:', typeof updateAuthUI);
    
    // Test page switching
    console.log('Testing page navigation...');
    if (typeof showPage === 'function') {
        console.log('✅ showPage function is available');
        
        // Test switching to products page
        setTimeout(() => {
            console.log('Testing switch to products page...');
            showPage('products');
        }, 1000);
        
        // Test switching back to home
        setTimeout(() => {
            console.log('Testing switch back to home page...');
            showPage('home');
        }, 3000);
    } else {
        console.error('❌ showPage function is NOT available');
    }
}

// Make test function globally accessible for debugging
window.testNavigation = testNavigation;

// Function to test delivery map specifically
function testDeliveryMap() {
    console.log('=== Testing Delivery Map ===');
    
    // First go to checkout page
    showPage('checkout');
    
    setTimeout(() => {
        const mapContainer = document.getElementById('deliveryLocationMap');
        console.log('Map container found:', !!mapContainer);
        
        if (mapContainer) {
            console.log('Container dimensions:', mapContainer.offsetWidth, 'x', mapContainer.offsetHeight);
            console.log('Container parent:', mapContainer.parentElement);
            console.log('Container visibility:', window.getComputedStyle(mapContainer).visibility);
            
            // Manually try to initialize map
            console.log('Manually initializing map...');
            initializeDeliveryLocationMap();
        }
        
        // Check if delivery location map object exists
        setTimeout(() => {
            console.log('Delivery location map object exists:', !!deliveryLocationMap);
            
            if (deliveryLocationMap) {
                console.log('✅ Delivery map successfully initialized');
            } else {
                console.error('❌ Delivery map failed to initialize');
            }
        }, 2000);
        
    }, 1000);
}

// Make delivery map test globally accessible
window.testDeliveryMap = testDeliveryMap;

// Force initialize delivery map - simple function for debugging
function forceInitDeliveryMap() {
    console.log('=== FORCE INIT DELIVERY MAP ===');
    
    // First check if we're on checkout page
    const checkoutPage = document.getElementById('checkoutPage');
    if (!checkoutPage) {
        console.log('Checkout page not found, going to checkout first...');
        showPage('checkout');
        setTimeout(forceInitDeliveryMap, 1000);
        return;
    }
    
    if (checkoutPage.style.display !== 'block') {
        console.log('Checkout page not visible, showing it first...');
        showPage('checkout');
        setTimeout(forceInitDeliveryMap, 1000);
        return;
    }
    
    // Check for map container
    const mapContainer = document.getElementById('deliveryLocationMap');
    console.log('Map container:', mapContainer);
    
    if (!mapContainer) {
        console.error('❌ Map container not found in DOM!');
        return;
    }
    
    console.log('Container styles:', {
        width: mapContainer.style.width,
        height: mapContainer.style.height,
        display: getComputedStyle(mapContainer).display,
        visibility: getComputedStyle(mapContainer).visibility,
        offsetWidth: mapContainer.offsetWidth,
        offsetHeight: mapContainer.offsetHeight
    });
    
    // Force container to be visible
    mapContainer.style.display = 'block';
    mapContainer.style.visibility = 'visible';
    mapContainer.style.height = '300px';
    mapContainer.style.width = '100%';
    
    // Remove any existing map
    if (window.deliveryLocationMap) {
        console.log('Removing existing map...');
        window.deliveryLocationMap.remove();
        window.deliveryLocationMap = null;
    }
    
    try {
        console.log('Creating new Leaflet map...');
        window.deliveryLocationMap = L.map('deliveryLocationMap').setView([10.8231, 106.6297], 13);
        
        console.log('Adding tile layer...');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(window.deliveryLocationMap);
        
        console.log('✅ Map created successfully!');
        
        // Add click handler
        window.deliveryLocationMap.on('click', function(e) {
            console.log('Map clicked at:', e.latlng);
            if (typeof setDeliveryLocation === 'function') {
                setDeliveryLocation(e.latlng.lat, e.latlng.lng);
            }
        });
        
        setTimeout(() => {
            window.deliveryLocationMap.invalidateSize();
            console.log('Map size refreshed');
        }, 500);
        
    } catch (error) {
        console.error('❌ Error creating map:', error);
    }
}

// Make force init globally accessible
window.forceInitDeliveryMap = forceInitDeliveryMap;

// Simple test function to debug map issues
function debugMapIssue() {
    console.log('=== DEBUG MAP ISSUE ===');
    
    // Check if we're on checkout page
    const checkoutPage = document.getElementById('checkoutPage');
    console.log('Checkout page:', checkoutPage);
    console.log('Checkout page display:', checkoutPage ? checkoutPage.style.display : 'N/A');
    
    // Check map container
    const mapContainer = document.getElementById('deliveryLocationMap');
    console.log('Map container:', mapContainer);
    
    if (mapContainer) {
        console.log('Container dimensions:', mapContainer.offsetWidth, 'x', mapContainer.offsetHeight);
        console.log('Container parent:', mapContainer.parentElement);
    }
    
    // Check Leaflet
    console.log('Leaflet available:', typeof L);
    if (typeof L !== 'undefined') {
        console.log('Leaflet version:', L.version);
    }
    
    // Check current map
    console.log('Current map:', window.deliveryLocationMap);
    console.log('Map type:', typeof window.deliveryLocationMap);
    
    if (window.deliveryLocationMap) {
        console.log('Map has addLayer:', typeof window.deliveryLocationMap.addLayer);
        console.log('Map has setView:', typeof window.deliveryLocationMap.setView);
    }
    
    // Try to create a simple map
    if (mapContainer && typeof L !== 'undefined') {
        try {
            console.log('Attempting to create simple test map...');
            const testMap = L.map('deliveryLocationMap').setView([10.8231, 106.6297], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(testMap);
            window.deliveryLocationMap = testMap;
            console.log('✅ Test map created successfully!');
        } catch (error) {
            console.error('❌ Error creating test map:', error);
        }
    }
}

// NEW: Simple and reliable delivery map initialization
function initializeSimpleDeliveryMap() {
    console.log('=== NEW Simple Delivery Map Initialization ===');
    
    const mapContainer = document.getElementById('deliveryLocationMap');
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }
    
    // Clear any existing content
    mapContainer.innerHTML = '';
    
    // Check if Leaflet is available
    if (typeof L === 'undefined') {
        console.log('Leaflet not available, creating fallback interface');
        createFallbackMapInterface(mapContainer);
        return;
    }
    
    try {
        // Create simple Leaflet map
        const map = L.map('deliveryLocationMap').setView([10.8231, 106.6297], 13);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Store globally
        window.simpleDeliveryMap = map;
        window.deliveryMarker = null;
        
        // Handle map clicks
        map.on('click', function(e) {
            console.log('Map clicked:', e.latlng);
            
            // Remove existing marker
            if (window.deliveryMarker) {
                map.removeLayer(window.deliveryMarker);
            }
            
            // Add new marker
            window.deliveryMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
            
            // Update form fields
            updateDeliveryCoordinates(e.latlng.lat, e.latlng.lng);
        });
        
        console.log('✅ Simple delivery map created successfully!');
        
        // Force resize after delay
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
        
    } catch (error) {
        console.error('Error creating Leaflet map:', error);
        createFallbackMapInterface(mapContainer);
    }
}

// Fallback map interface when Leaflet fails
function createFallbackMapInterface(container) {
    container.innerHTML = `
        <div style="
            width: 100%; 
            height: 300px; 
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border: 2px dashed #2196f3;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            position: relative;
        ">
            <div style="text-align: center; color: #1976d2;">
                <i class="fas fa-map-marker-alt" style="font-size: 48px; margin-bottom: 16px;"></i>
                <h3 style="margin: 0 0 8px 0;">Chọn vị trí giao hàng</h3>
                <p style="margin: 0 0 16px 0; font-size: 14px;">Nhập tọa độ thủ công hoặc sử dụng GPS</p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
                    <button onclick="useGPSLocation()" style="
                        background: #4caf50;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 14px;
                    ">
                        <i class="fas fa-location-arrow"></i> GPS
                    </button>
                    <button onclick="enterCoordinatesManually()" style="
                        background: #ff9800;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 14px;
                    ">
                        <i class="fas fa-edit"></i> Nhập tọa độ
                    </button>
                </div>
            </div>
            <div id="selectedLocationDisplay" style="
                position: absolute;
                bottom: 10px;
                left: 10px;
                right: 10px;
                background: rgba(255,255,255,0.9);
                padding: 8px;
                border-radius: 4px;
                display: none;
                font-size: 12px;
                text-align: center;
            ">
                <strong>Vị trí:</strong> <span id="locationText"></span>
            </div>
        </div>
    `;
}

// Update delivery coordinates in form
function updateDeliveryCoordinates(lat, lng) {
    console.log('Updating coordinates:', lat, lng);
    
    // Update hidden form fields
    const latField = document.getElementById('deliveryLat');
    const lngField = document.getElementById('deliveryLng');
    
    if (latField) latField.value = lat.toFixed(6);
    if (lngField) lngField.value = lng.toFixed(6);
    
    // Update coordinates display
    const coordsDisplay = document.getElementById('selectedCoords');
    if (coordsDisplay) {
        coordsDisplay.textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        coordsDisplay.style.color = '#007bff';
    }
    
    // Show clear button
    const clearButton = document.querySelector('.btn-clear-location');
    if (clearButton) {
        clearButton.style.display = 'inline-block';
    }
    
    // Update fallback display if exists
    const locationDisplay = document.getElementById('selectedLocationDisplay');
    const locationText = document.getElementById('locationText');
    if (locationDisplay && locationText) {
        locationText.textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        locationDisplay.style.display = 'block';
    }
    
    console.log('✅ Coordinates updated successfully');
}

// GPS location function
function useGPSLocation() {
    if (!navigator.geolocation) {
        alert('Trình duyệt không hỗ trợ GPS');
        return;
    }
    
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang lấy GPS...';
    btn.disabled = true;
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            updateDeliveryCoordinates(lat, lng);
            
            // If we have a real map, center it and add marker
            if (window.simpleDeliveryMap && window.simpleDeliveryMap.setView) {
                if (window.deliveryMarker) {
                    window.simpleDeliveryMap.removeLayer(window.deliveryMarker);
                }
                window.deliveryMarker = L.marker([lat, lng]).addTo(window.simpleDeliveryMap);
                window.simpleDeliveryMap.setView([lat, lng], 15);
            }
            
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            alert(`Đã lấy vị trí GPS: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        },
        function(error) {
            console.error('GPS error:', error);
            btn.innerHTML = originalText;
            btn.disabled = false;
            alert('Không thể lấy vị trí GPS. Vui lòng cho phép truy cập vị trí.');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
}

// Manual coordinates entry
function enterCoordinatesManually() {
    const lat = prompt('Nhập latitude (vĩ độ):');
    const lng = prompt('Nhập longitude (kinh độ):');
    
    if (lat && lng) {
        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lng);
        
        if (!isNaN(latNum) && !isNaN(lngNum)) {
            updateDeliveryCoordinates(latNum, lngNum);
            
            // If we have a real map, center it and add marker
            if (window.simpleDeliveryMap && window.simpleDeliveryMap.setView) {
                if (window.deliveryMarker) {
                    window.simpleDeliveryMap.removeLayer(window.deliveryMarker);
                }
                window.deliveryMarker = L.marker([latNum, lngNum]).addTo(window.simpleDeliveryMap);
                window.simpleDeliveryMap.setView([latNum, lngNum], 15);
            }
            
            alert('Đã cập nhật tọa độ thành công!');
        } else {
            alert('Tọa độ không hợp lệ!');
        }
    }
}

// Make functions globally accessible
window.initializeSimpleDeliveryMap = initializeSimpleDeliveryMap;
window.useGPSLocation = useGPSLocation;
window.enterCoordinatesManually = enterCoordinatesManually;

// Auto-run test in development mode
if (window.location.hostname === 'localhost') {
    setTimeout(testNavigation, 2000);
    // Test delivery map after navigation test
    setTimeout(testDeliveryMap, 5000);
}
