// Emergency navigation fix
console.log('=== Loading emergency navigation fix ===');

// Override showPage function with working version
window.showPage = function(pageName) {
    console.log('Emergency showPage called with:', pageName);
    
    try {
        // Hide all pages
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => {
            page.style.display = 'none';
        });
        
        // Show target page
        const targetPage = document.getElementById(pageName + 'Page');
        if (targetPage) {
            targetPage.style.display = 'block';
            
            // Handle background for products/drones
            if (pageName === 'products' || pageName === 'drones') {
                document.body.style.background = 'white';
            } else {
                document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
            
            // Handle homepage sections
            const heroSection = document.querySelector('.hero');
            const featuresSection = document.querySelector('.features');
            const featuredProductsSection = document.querySelector('.featured-products');
            
            if (pageName === 'home') {
                if (heroSection) heroSection.style.display = 'flex';
                if (featuresSection) featuresSection.style.display = 'block';
                if (featuredProductsSection) featuredProductsSection.style.display = 'block';
            } else {
                if (heroSection) heroSection.style.display = 'none';
                if (featuresSection) featuresSection.style.display = 'none';
                if (featuredProductsSection) featuredProductsSection.style.display = 'none';
            }
            
            // Update navigation
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`[data-page="${pageName}"]`);
            if (activeLink) activeLink.classList.add('active');
            
            // Load content
            loadPageContent(pageName);
            
            console.log('Emergency showPage completed:', pageName);
        } else {
            console.error('Page not found:', pageName + 'Page');
        }
    } catch (error) {
        console.error('Emergency showPage error:', error);
    }
};

// Override loadPageContent function
window.loadPageContent = function(pageName) {
    console.log('Emergency loadPageContent:', pageName);
    
    switch(pageName) {
        case 'home':
            if (typeof loadFeaturedProducts === 'function') {
                loadFeaturedProducts();
            }
            break;
        case 'products':
            if (typeof loadAllProducts === 'function') {
                loadAllProducts();
            }
            break;
        case 'drones':
            if (typeof loadDrones === 'function') {
                loadDrones();
            }
            break;
        case 'cart':
            if (typeof loadCart === 'function') {
                loadCart();
            }
            break;
        case 'checkout':
            if (typeof loadCheckoutPage === 'function') {
                loadCheckoutPage();
            }
            break;
        case 'orders':
            if (typeof loadOrders === 'function') {
                loadOrders();
            }
            break;
    }
};

// Add navigation click handlers
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            console.log('Navigation clicked:', page);
            showPage(page);
        });
    });
});

console.log('Emergency navigation fix loaded!');
