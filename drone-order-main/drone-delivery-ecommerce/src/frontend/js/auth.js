// Authentication functions
let currentUser = null;

// Make currentUser globally accessible
window.currentUser = currentUser;

// Check if user is logged in
function isLoggedIn() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        window.currentUser = currentUser; // Update global reference
        
        // Update cart count for the current user
        if (typeof window.updateCartCount === 'function') {
            window.updateCartCount();
        }
        
        return true;
    }
    return false;
}

// Update UI based on login status
function updateAuthUI() {
    // First, check if user is stored in localStorage
    if (!currentUser) {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            currentUser = JSON.parse(storedUser);
            window.currentUser = currentUser;
            console.log('Restored user from localStorage:', currentUser);
        }
    }
    
    const authButtons = document.getElementById('authButtons');
    const userDropdown = document.getElementById('userDropdown');
    const userNameNav = document.getElementById('userNameNav');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const adminLink = document.getElementById('adminLink');
    
    console.log('updateAuthUI called, currentUser:', currentUser); // Debug log
    
    if (isLoggedIn() && currentUser) {
        // Hide auth buttons, show user dropdown
        if (authButtons) authButtons.style.display = 'none';
        if (userDropdown) userDropdown.style.display = 'flex';
        if (userNameNav) userNameNav.textContent = currentUser.name;
        
        // Legacy user info (if exists)
        if (userInfo) {
            userInfo.style.display = 'block';
            if (userName) userName.textContent = `Xin chào, ${currentUser.name}!`;
        }
        
        // Show admin link if user is admin
        if (adminLink && currentUser.role === 'admin') {
            adminLink.style.display = 'block';
        } else if (adminLink) {
            adminLink.style.display = 'none';
        }
    } else {
        // Show auth buttons, hide user dropdown
        if (authButtons) authButtons.style.display = 'flex';
        if (userDropdown) userDropdown.style.display = 'none';
        if (userInfo) userInfo.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
    }
}

// Check authentication before accessing protected pages
function checkAuth(event, page) {
    if (!isLoggedIn()) {
        event.preventDefault();
        showLoginModal();
        return false;
    }
    
    if (page && page !== 'addToCart') {
        window.location.href = page;
    }
    
    return true;
}

// Show login modal
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Hide login modal
function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Show register modal
function showRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Hide register modal
function hideRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt:', email, password); // Debug log
    
    // Demo authentication
    const demoUsers = {
        'admin@demo.com': { password: 'admin123', role: 'admin', name: 'Admin Demo', id: 'admin123' },
        'user@demo.com': { password: 'user123', role: 'user', name: 'User Demo', id: 'user123' }
    };
    
    if (demoUsers[email] && demoUsers[email].password === password) {
        const user = {
            id: demoUsers[email].id, // Use consistent ID based on email
            email: email,
            name: demoUsers[email].name,
            role: demoUsers[email].role
        };
        
        console.log('Login successful:', user); // Debug log
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUser = user;
        window.currentUser = currentUser;
        updateAuthUI();
        hideLoginModal();
        
        // Restore draft order if exists
        if (typeof restoreDraftOrder === 'function') {
            setTimeout(() => restoreDraftOrder(), 500);
        }
        
        // Show success notification
        alert('Đăng nhập thành công!');
    } else {
        console.log('Login failed for:', email); // Debug log
        alert('Email hoặc mật khẩu không đúng!');
    }
}

// Handle login click (without event)
function handleLoginClick() {
    console.log('handleLoginClick called'); // Debug log
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt:', email, password); // Debug log
    
    if (!email || !password) {
        alert('Vui lòng nhập đầy đủ email và mật khẩu!');
        return;
    }
    
    // Demo authentication
    const demoUsers = {
        'admin@demo.com': { password: 'admin123', role: 'admin', name: 'Admin' },
        'user@demo.com': { password: 'user123', role: 'user', name: 'User Demo' }
    };
    
    if (demoUsers[email] && demoUsers[email].password === password) {
        const user = {
            id: Date.now(),
            email: email,
            name: demoUsers[email].name,
            role: demoUsers[email].role
        };
        
        console.log('Login successful:', user); // Debug log
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUser = user;
        window.currentUser = currentUser;
        updateAuthUI();
        
        // Update cart count for the logged in user
        if (typeof window.updateCartCount === 'function') {
            window.updateCartCount();
        }
        
        hideLoginModal();
        
        // Show success notification
        alert('Đăng nhập thành công!');
    } else {
        console.log('Login failed for:', email); // Debug log
        alert('Email hoặc mật khẩu không đúng!');
    }
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }
    
    if (password.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự!');
        return;
    }
    
    // Check if email already exists (in demo mode, just check demo accounts)
    const demoEmails = ['admin@demo.com', 'user@demo.com'];
    if (demoEmails.includes(email)) {
        alert('Email này đã được sử dụng!');
        return;
    }
    
    // Register new user
    const user = {
        id: email.replace('@', '_').replace('.', '_'), // Create consistent ID from email
        email: email,
        name: name,
        role: 'user'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUser = user;
    window.currentUser = currentUser;
    updateAuthUI();
    
    // Update cart count for the newly registered user
    if (typeof window.updateCartCount === 'function') {
        window.updateCartCount();
    }
    
    hideRegisterModal();
    
    alert('Đăng ký thành công!');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Logout function
function logout() {
    // Clear cart data before logout
    if (typeof window.clearAllCartData === 'function') {
        window.clearAllCartData();
    }
    
    localStorage.removeItem('currentUser');
    currentUser = null;
    window.currentUser = null;
    updateAuthUI();
    
    // Update cart count to 0
    if (typeof window.updateCartCount === 'function') {
        window.updateCartCount();
    }
    
    alert('Đã đăng xuất thành công!');
    window.location.href = 'index.html';
}

// Sample login function (for testing)
function sampleLogin(email, password, role = 'user') {
    // This is a sample function for testing
    // In real application, this would make API call to backend
    const user = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        role: role
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUser = user;
    updateAuthUI();
    return true;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const loginModal = document.getElementById('loginModal');
        const registerModal = document.getElementById('registerModal');
        
        if (event.target === loginModal) {
            hideLoginModal();
        }
        if (event.target === registerModal) {
            hideRegisterModal();
        }
    }
    
    // Close login modal when clicking X
    const loginCloseBtn = document.querySelector('#loginModal .close');
    if (loginCloseBtn) {
        loginCloseBtn.onclick = hideLoginModal;
    }
    
    // Close register modal when clicking X
    const registerCloseBtn = document.querySelector('#registerModal .close');
    if (registerCloseBtn) {
        registerCloseBtn.onclick = hideRegisterModal;
    }
});

// Close modal function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Export functions for use in other files
window.authFunctions = {
    isLoggedIn,
    checkAuth,
    logout,
    sampleLogin,
    updateAuthUI
};

// Make functions globally accessible
window.showLoginModal = showLoginModal;
window.hideLoginModal = hideLoginModal;
window.showRegisterModal = showRegisterModal;
window.hideRegisterModal = hideRegisterModal;
window.handleLogin = handleLogin;
window.handleLoginClick = handleLoginClick;
window.handleRegister = handleRegister;
window.showNotification = showNotification;
window.updateAuthUI = updateAuthUI;
window.closeModal = closeModal;
window.logout = logout;