const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 3000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    console.log('Request for:', pathname);
    
    // Default to index.html if accessing root
    if (pathname === '/') {
        pathname = '/src/frontend/pages/index.html';
    }
    
    // Handle CSS files specifically
    if (pathname.includes('css/main.css')) {
        pathname = '/src/frontend/css/main.css';
    }
    
    // Handle JS files
    if (pathname.includes('js/main.js')) {
        pathname = '/src/frontend/js/main.js';
    }
    
    if (pathname.includes('js/auth.js')) {
        pathname = '/src/frontend/js/auth.js';
    }
    
    // Build file path
    const filePath = path.join(__dirname, pathname);
    console.log('Serving file:', filePath);
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('File not found:', filePath);
            res.writeHead(404);
            res.end('File not found: ' + pathname);
            return;
        }
        
        // Read and serve file
        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.log('Error reading file:', err);
                res.writeHead(500);
                res.end('Server error');
                return;
            }
            
            console.log('Successfully served:', pathname, 'as', mimeType);
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content);
        });
    });
});

server.listen(port, () => {
    console.log(`Simple HTTP server running at http://localhost:${port}`);
});
