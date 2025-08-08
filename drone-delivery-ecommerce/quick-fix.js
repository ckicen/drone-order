// QUICK FIX for navigation issues
// Add this to console to restore navigation

console.log('=== QUICK FIX: Restoring Navigation ===');

// Ensure showPage function is working
window.showPage = function(pageName) {
    console.log('Quick fix showPage called:', pageName);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageName + 'Page');
    if (selectedPage) {
        selectedPage.style.display = 'block';
        window.currentPage = pageName;
        console.log('Page displayed:', pageName);
        
        // Load page content
        if (typeof loadPageContent === 'function') {
            loadPageContent(pageName);
        }
    } else {
        console.error('Page not found:', pageName + 'Page');
    }
};

// Restore click handlers
document.querySelectorAll('[onclick*="showPage"]').forEach(element => {
    const onclickAttr = element.getAttribute('onclick');
    if (onclickAttr) {
        console.log('Restoring click handler:', onclickAttr);
        element.onclick = function() {
            eval(onclickAttr);
        };
    }
});

console.log('✅ Navigation should work now. Try clicking "Sản phẩm" or "Drone"');
