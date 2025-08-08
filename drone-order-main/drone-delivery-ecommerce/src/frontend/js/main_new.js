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
let currentUser = null;
let currentPage = 'home';

// Check if user is logged in
function isLoggedIn() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        return true;
    }
    return false;
}

// Check authentication for protected pages
function checkAuth(event, role) {
    if (!isLoggedIn()) {
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
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.style.display = 'none');
    
    // Show selected page
    const selectedPage = document.getElementById(pageName + 'Page');
    if (selectedPage) {
        selectedPage.style.display = 'block';
        currentPage = pageName;
        
        // Update navigation active state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        const activeLink = document.querySelector(`[data-page="${pageName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Load page content
        loadPageContent(pageName);
    }
}

// Load content for each page
function loadPageContent(pageName) {
    switch(pageName) {
        case 'home':
            loadFeaturedProducts();
            break;
        case 'products':
            loadAllProducts();
            break;
        case 'drones':
            loadDrones();
            break;
        case 'cart':
            loadCart();
            break;
        case 'profile':
            loadProfile();
            break;
        case 'orders':
            if (isLoggedIn()) {
                loadOrders();
            } else {
                showLoginModal();
            }
            break;
        case 'admin':
            if (currentUser && currentUser.role === 'admin') {
                loadAdminContent();
            }
            break;
        case 'order-processing':
            if (currentUser && currentUser.role === 'admin') {
                loadOrderProcessingPage();
            }
            break;
    }
}

// Update UI based on authentication status
function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userDropdown = document.getElementById('userDropdown');
    const adminLink = document.getElementById('adminLink');
    
    if (isLoggedIn()) {
        authButtons.innerHTML = `
            <span class="user-info">Xin chào, ${currentUser.name}!</span>
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
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateAuthUI();
    showPage('home');
}

// Cart functions
function addToCart(productId) {
    if (!isLoggedIn()) {
        showLoginModal();
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} đã được thêm vào giỏ hàng!`, 'success');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Remove from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Update quantity in cart
function updateQuantity(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = Math.max(1, quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
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
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const featuredProducts = products.slice(0, 4);
    
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
}

// Load all products
function loadAllProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <i class="${product.image}"></i>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-category">${product.category}</div>
                <button class="btn-primary" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                </button>
            </div>
        </div>
    `).join('');
}

// Load drones
function loadDrones() {
    const container = document.getElementById('dronesContainer');
    if (!container) return;
    
    container.innerHTML = drones.map(drone => `
        <div class="drone-card">
            <div class="drone-header">
                <h3>${drone.name}</h3>
                <span class="drone-status ${drone.status}">${drone.status === 'available' ? 'Sẵn sàng' : 'Đang bay'}</span>
            </div>
            <div class="drone-info">
                <p><strong>Nhà sản xuất:</strong> ${drone.manufacturer}</p>
                <p><strong>Sân bãi:</strong> ${drone.homeBase}</p>
                <p><strong>Địa chỉ:</strong> ${drone.baseAddress}</p>
                <p><strong>Tốc độ:</strong> ${drone.speed}</p>
                <p><strong>Tầm bay:</strong> ${drone.range}</p>
                <p><strong>Tải trọng tối đa:</strong> ${drone.maxWeight}kg</p>
                <p><strong>Pin:</strong> ${drone.battery}%</p>
            </div>
        </div>
    `).join('');
}

// Load cart
function loadCart() {
    const container = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    
    if (!container) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
        if (totalElement) totalElement.textContent = '0₫';
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
    
    if (totalElement) {
        totalElement.textContent = formatPrice(total);
    }
}

// Checkout function
function checkout() {
    if (!isLoggedIn()) {
        showLoginModal();
        return;
    }
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
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
    
    // Clear cart
    localStorage.removeItem('cart');
    updateCartCount();
    
    alert('Đặt hàng thành công! Mã đơn hàng: ' + order.id);
    showPage('orders');
}

// Load user orders
function loadOrders() {
    const container = document.getElementById('ordersContainer');
    if (!container) return;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = orders.filter(order => order.userId === currentUser.id);
    
    if (userOrders.length === 0) {
        container.innerHTML = '<p class="no-orders">Bạn chưa có đơn hàng nào</p>';
        return;
    }
    
    container.innerHTML = userOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <h3>Đơn hàng #${order.id}</h3>
                <span class="order-status ${order.status}">${getStatusText(order.status)}</span>
            </div>
            <div class="order-info">
                <p><strong>Ngày đặt:</strong> ${order.date}</p>
                <p><strong>Tổng tiền:</strong> ${formatPrice(order.total)}</p>
                <p><strong>Địa chỉ:</strong> ${order.address}</p>
            </div>
            <div class="order-items">
                <h4>Sản phẩm:</h4>
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name} x${item.quantity}</span>
                        <span>${formatPrice(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Get status text in Vietnamese
function getStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xử lý',
        'preparing': 'Đang chuẩn bị',
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
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    container.innerHTML = `
        <div class="admin-header">
            <h2>Quản lý đơn hàng</h2>
            <div class="admin-stats">
                <div class="stat-card">
                    <h3>${orders.length}</h3>
                    <p>Tổng đơn hàng</p>
                </div>
                <div class="stat-card">
                    <h3>${orders.filter(o => o.status === 'pending').length}</h3>
                    <p>Chờ xử lý</p>
                </div>
                <div class="stat-card">
                    <h3>${orders.filter(o => o.status === 'shipping').length}</h3>
                    <p>Đang giao</p>
                </div>
                <div class="stat-card">
                    <h3>${orders.filter(o => o.status === 'delivered').length}</h3>
                    <p>Đã giao</p>
                </div>
            </div>
        </div>
        
        <div class="orders-table">
            <table>
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Khách hàng</th>
                        <th>Ngày đặt</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr>
                            <td>#${order.id}</td>
                            <td>User ${order.userId}</td>
                            <td>${order.date}</td>
                            <td>${formatPrice(order.total)}</td>
                            <td><span class="status-badge ${order.status}">${getStatusText(order.status)}</span></td>
                            <td>
                                <button class="btn-process" onclick="processOrder(${order.id})">Xử lý</button>
                                <button class="btn-complete" onclick="completeOrder(${order.id})">Hoàn thành</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Process order function for admin
function processOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id == orderId);
    
    if (!order) {
        alert('Không tìm thấy đơn hàng!');
        return;
    }
    
    // Store current order for processing
    localStorage.setItem('currentProcessingOrder', JSON.stringify(order));
    
    // Navigate to order processing page
    showPage('order-processing');
}

// Load order processing page
function loadOrderProcessingPage() {
    const container = document.getElementById('orderProcessingContent');
    if (!container) return;
    
    const order = JSON.parse(localStorage.getItem('currentProcessingOrder') || '{}');
    if (!order.id) {
        container.innerHTML = '<p>Không có đơn hàng để xử lý</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="order-processing-layout">
            <div class="order-sidebar">
                <div class="sidebar-toggle" onclick="toggleSidebar()">
                    <i class="fas fa-bars"></i>
                </div>
                
                <div class="sidebar-content">
                    <div class="order-info-section">
                        <h3><i class="fas fa-info-circle"></i> Thông tin đơn hàng</h3>
                        <div class="order-details">
                            <p><strong>Mã đơn:</strong> #${order.id}</p>
                            <p><strong>Khách hàng:</strong> User ${order.userId}</p>
                            <p><strong>Ngày đặt:</strong> ${order.date}</p>
                            <p><strong>Địa chỉ giao:</strong> ${order.address}</p>
                            <p><strong>Tổng tiền:</strong> ${formatPrice(order.total)}</p>
                        </div>
                        
                        <h4>Sản phẩm:</h4>
                        <div class="order-items-list">
                            ${order.items.map(item => `
                                <div class="item">
                                    <span>${item.name} x${item.quantity}</span>
                                    <span>${formatPrice(item.price * item.quantity)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="drone-selection-section">
                        <h3><i class="fas fa-drone"></i> Chọn Drone</h3>
                        <div class="drone-list">
                            ${drones.filter(d => d.status === 'available').map(drone => `
                                <div class="drone-item ${selectedDroneForOrder && selectedDroneForOrder.id === drone.id ? 'selected' : ''}" 
                                     onclick="selectDroneForProcessing('${drone.id}')">
                                    <h4>${drone.name}</h4>
                                    <p><i class="fas fa-home"></i> ${drone.homeBase}</p>
                                    <p><i class="fas fa-battery-three-quarters"></i> Pin: ${drone.battery}%</p>
                                    <p><i class="fas fa-weight-hanging"></i> Tải: ${drone.maxWeight}kg</p>
                                </div>
                            `).join('')}
                        </div>
                        ${drones.filter(d => d.status === 'available').length === 0 ? 
                            '<p class="no-drones">Không có drone sẵn sàng</p>' : ''}
                    </div>
                    
                    <div class="flight-controls-section">
                        <h3><i class="fas fa-play-circle"></i> Điều khiển</h3>
                        <div class="control-buttons">
                            <button class="control-btn start-btn" onclick="startFlight('${order.id}')" ${!selectedDroneForOrder ? 'disabled' : ''}>
                                <i class="fas fa-plane-departure"></i> Khởi hành
                            </button>
                            <button class="control-btn pause-btn" onclick="pauseFlight('${order.id}')" disabled>
                                <i class="fas fa-pause"></i> Tạm dừng
                            </button>
                            <button class="control-btn continue-btn" onclick="continueFlight('${order.id}')" disabled>
                                <i class="fas fa-play"></i> Tiếp tục
                            </button>
                            <button class="control-btn emergency-btn" onclick="emergencyLanding('${order.id}')" disabled>
                                <i class="fas fa-exclamation-triangle"></i> Khẩn cấp
                            </button>
                        </div>
                        
                        <div class="flight-status">
                            <h4>Trạng thái:</h4>
                            <span id="flightStatus" class="status-indicator">Chưa khởi hành</span>
                            <div class="progress-container">
                                <div class="progress-bar">
                                    <div id="flightProgress" class="progress-fill" style="width: 0%"></div>
                                </div>
                                <span id="progressText">0%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="route-controls-section">
                        <h3><i class="fas fa-route"></i> Lộ trình</h3>
                        <div class="route-buttons">
                            <button class="route-btn" onclick="toggleRoutePlanning()">
                                <span id="planningBtnText"><i class="fas fa-route"></i> Lập lộ trình</span>
                            </button>
                            <button class="route-btn secondary" onclick="resetRoute()">
                                <i class="fas fa-redo"></i> Đặt lại
                            </button>
                        </div>
                        
                        <div id="route-instructions" style="display: none;">
                            <p><strong>Hướng dẫn:</strong></p>
                            <p>• Click trên bản đồ để thêm điểm</p>
                            <p>• Kéo thả để di chuyển điểm</p>
                            <p>• Điểm cuối là điểm giao hàng</p>
                        </div>
                        
                        <button class="confirm-delivery-btn" onclick="confirmDelivery('${order.id}')" disabled>
                            <i class="fas fa-check"></i> Xác nhận giao hàng
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="map-container-full">
                <div id="orderProcessingMap"></div>
            </div>
        </div>
    `;
    
    // Initialize map after content is loaded
    setTimeout(() => {
        initializeOrderProcessingMap();
    }, 100);
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.order-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
    }
}

// Initialize order processing map
function initializeOrderProcessingMap() {
    const mapContainer = document.getElementById('orderProcessingMap');
    if (!mapContainer) return;
    
    // Initialize map centered on Ho Chi Minh City
    if (window.orderProcessingMap) {
        window.orderProcessingMap.remove();
    }
    
    window.orderProcessingMap = L.map('orderProcessingMap').setView([10.8231, 106.6297], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ' OpenStreetMap contributors'
    }).addTo(window.orderProcessingMap);
    
    // Add drone base markers
    drones.forEach(drone => {
        if (drone.baseCoords) {
            const marker = L.marker(drone.baseCoords)
                .addTo(window.orderProcessingMap)
                .bindPopup(`<b>${drone.name}</b><br>${drone.homeBase}<br>${drone.baseAddress}`);
                
            if (selectedDroneForOrder && selectedDroneForOrder.id === drone.id) {
                marker.openPopup();
            }
        }
    });
    
    // Handle map clicks for route planning
    window.orderProcessingMap.on('click', function(e) {
        if (routePlanningMode) {
            addProcessingWaypoint(e.latlng);
        }
    });
}

// Global variables for flight control
let selectedDroneForOrder = null;
let currentFlightStatus = 'idle';
let flightProgress = 0;
let routePlanningMode = false;
let currentRoute = [];
let routeControl = null;
let flightSimulation = null;

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
    
    currentFlightStatus = 'flying';
    updateFlightStatus('flying', 'Đang bay');
    
    // Enable pause and emergency buttons
    const pauseBtn = document.querySelector('.pause-btn');
    const emergencyBtn = document.querySelector('.emergency-btn');
    const startBtn = document.querySelector('.start-btn');
    
    if (pauseBtn) pauseBtn.disabled = false;
    if (emergencyBtn) emergencyBtn.disabled = false;
    if (startBtn) startBtn.disabled = true;
    
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
    flightSimulation = setInterval(() => {
        if (currentFlightStatus === 'flying') {
            flightProgress += 2; // Increase by 2% each interval
            updateProgress(flightProgress);
            
            if (flightProgress >= 100) {
                // Flight completed
                currentFlightStatus = 'completed';
                updateFlightStatus('completed', 'Hoàn thành');
                clearInterval(flightSimulation);
                
                // Update order status
                const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                const orderIndex = orders.findIndex(o => o.id == orderId);
                if (orderIndex !== -1) {
                    orders[orderIndex].status = 'delivered';
                    localStorage.setItem('orders', JSON.stringify(orders));
                }
                
                showNotification('Giao hàng thành công!', 'success');
                
                // Disable all control buttons
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
    const btn = document.getElementById('planningBtnText');
    const instructions = document.getElementById('route-instructions');
    const confirmBtn = document.querySelector('.confirm-delivery-btn');
    
    if (!routePlanningMode) {
        routePlanningMode = true;
        if (btn) btn.innerHTML = '<i class="fas fa-check"></i> Hoàn thành lộ trình';
        if (instructions) instructions.style.display = 'block';
    } else {
        routePlanningMode = false;
        if (btn) btn.innerHTML = '<i class="fas fa-route"></i> Lập lộ trình';
        if (instructions) instructions.style.display = 'none';
        
        if (currentRoute.length > 0) {
            showNotification('Lộ trình đã được lưu!', 'success');
            if (confirmBtn) confirmBtn.disabled = false;
        }
    }
}

function addProcessingWaypoint(latlng) {
    currentRoute.push(latlng);
    
    // Add marker
    const marker = L.marker(latlng, {
        draggable: true
    }).addTo(window.orderProcessingMap);
    
    marker.bindPopup(`Điểm ${currentRoute.length}`);
    
    // Handle marker drag
    marker.on('dragend', function(e) {
        const newPos = e.target.getLatLng();
        const index = currentRoute.findIndex(point => 
            Math.abs(point.lat - latlng.lat) < 0.0001 && 
            Math.abs(point.lng - latlng.lng) < 0.0001
        );
        
        if (index !== -1) {
            currentRoute[index] = newPos;
            updateProcessingRoute();
        }
    });
    
    updateProcessingRoute();
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
    currentRoute = [];
    
    if (routeControl) {
        window.orderProcessingMap.removeControl(routeControl);
        routeControl = null;
    }
    
    // Clear all markers except drone base
    window.orderProcessingMap.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            const pos = layer.getLatLng();
            if (!selectedDroneForOrder || 
                !selectedDroneForOrder.baseCoords ||
                Math.abs(pos.lat - selectedDroneForOrder.baseCoords[0]) > 0.0001 ||
                Math.abs(pos.lng - selectedDroneForOrder.baseCoords[1]) > 0.0001) {
                window.orderProcessingMap.removeLayer(layer);
            }
        }
    });
    
    const confirmBtn = document.querySelector('.confirm-delivery-btn');
    if (confirmBtn) confirmBtn.disabled = true;
    
    showNotification('Lộ trình đã được đặt lại', 'info');
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

// Export functions for use in other files
window.mainFunctions = {
    isLoggedIn,
    checkAuth,
    logout,
    updateAuthUI,
    addToCart,
    products,
    formatPrice,
    showPage
};
