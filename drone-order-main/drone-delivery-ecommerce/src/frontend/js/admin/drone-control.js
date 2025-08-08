// Drone management for admin panel - using localStorage

document.addEventListener('DOMContentLoaded', function() {
    initializeDroneManagement();
});

function initializeDroneManagement() {
    loadDroneGrid();
    loadDroneSelect();
    initializeDroneMap();
    setupDroneControlForm();
}

// Load drone grid
function loadDroneGrid() {
    const droneGrid = document.getElementById('droneGrid');
    if (!droneGrid) return;
    
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    
    // Create sample drones if none exist
    if (drones.length === 0) {
        createSampleDrones();
        return loadDroneGrid(); // Reload after creating
    }
    
    droneGrid.innerHTML = drones.map(drone => `
        <div class="drone-card ${drone.status}">
            <div class="drone-header">
                <h3>${drone.name}</h3>
                <span class="drone-status ${drone.status}">${getStatusText(drone.status)}</span>
            </div>
            <div class="drone-info">
                <div class="info-item">
                    <label>ID:</label>
                    <span>${drone.id}</span>
                </div>
                <div class="info-item">
                    <label>Pin:</label>
                    <span class="battery-level">
                        <div class="battery-bar">
                            <div class="battery-fill" style="width: ${drone.battery}%"></div>
                        </div>
                        ${drone.battery}%
                    </span>
                </div>
                <div class="info-item">
                    <label>Tải trọng:</label>
                    <span>${drone.capacity}kg</span>
                </div>
                <div class="info-item">
                    <label>Phạm vi:</label>
                    <span>${drone.range}km</span>
                </div>
                <div class="info-item">
                    <label>Vị trí:</label>
                    <span>${drone.location.lat.toFixed(4)}, ${drone.location.lng.toFixed(4)}</span>
                </div>
                ${drone.assignedOrder ? `
                <div class="info-item">
                    <label>Đơn hàng:</label>
                    <span>#${drone.assignedOrder}</span>
                </div>
                ` : ''}
            </div>
            <div class="drone-actions">
                <button onclick="toggleDroneStatus('${drone.id}')" class="btn-secondary">
                    ${drone.status === 'available' ? 'Đặt Bận' : 'Đặt Sẵn sàng'}
                </button>
                <button onclick="showDroneOnMap('${drone.id}')" class="btn-primary">Xem trên bản đồ</button>
            </div>
        </div>
    `).join('');
}

// Get status text in Vietnamese
function getStatusText(status) {
    const statusMap = {
        'available': 'Sẵn sàng',
        'busy': 'Đang bận',
        'maintenance': 'Bảo trì',
        'offline': 'Ngoại tuyến'
    };
    return statusMap[status] || status;
}

// Create sample drones
function createSampleDrones() {
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
}

// Toggle drone status
function toggleDroneStatus(droneId) {
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    const droneIndex = drones.findIndex(d => d.id === droneId);
    
    if (droneIndex !== -1) {
        const currentStatus = drones[droneIndex].status;
        drones[droneIndex].status = currentStatus === 'available' ? 'busy' : 'available';
        
        // Clear assigned order if setting to available
        if (drones[droneIndex].status === 'available') {
            drones[droneIndex].assignedOrder = null;
        }
        
        localStorage.setItem('drones', JSON.stringify(drones));
        loadDroneGrid(); // Reload to show changes
        
        showNotification(`Đã cập nhật trạng thái drone ${droneId}`, 'success');
    }
}

// Load drone select options
function loadDroneSelect() {
    const droneSelect = document.getElementById('droneSelect');
    if (!droneSelect) return;
    
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    droneSelect.innerHTML = '<option value="">-- Chọn Drone --</option>' +
        drones.map(drone => 
            `<option value="${drone.id}">${drone.name} (${getStatusText(drone.status)})</option>`
        ).join('');
}

// Initialize drone map
function initializeDroneMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement || typeof L === 'undefined') {
        console.log('Map element not found or Leaflet not loaded');
        return;
    }
    
    try {
        // Initialize map
        const map = L.map('map').setView([21.0285, 105.8542], 12);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Add drone markers
        addDroneMarkers(map);
        
        // Store map reference
        window.droneMap = map;
        
    } catch (error) {
        console.error('Error initializing drone map:', error);
        mapElement.innerHTML = '<p style="text-align: center; padding: 20px;">Lỗi khởi tạo bản đồ</p>';
    }
}

// Add drone markers to map
function addDroneMarkers(map) {
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    
    drones.forEach(drone => {
        const statusColor = {
            'available': 'green',
            'busy': 'red',
            'maintenance': 'orange',
            'offline': 'gray'
        }[drone.status] || 'blue';
        
        const marker = L.marker([drone.location.lat, drone.location.lng])
            .addTo(map)
            .bindPopup(`
                <div>
                    <h4>${drone.name}</h4>
                    <p><strong>Trạng thái:</strong> ${getStatusText(drone.status)}</p>
                    <p><strong>Pin:</strong> ${drone.battery}%</p>
                    <p><strong>Tải trọng:</strong> ${drone.capacity}kg</p>
                    ${drone.assignedOrder ? `<p><strong>Đơn hàng:</strong> #${drone.assignedOrder}</p>` : ''}
                </div>
            `);
            
        // Store drone ID on marker for reference
        marker.droneId = drone.id;
    });
}

// Show specific drone on map
function showDroneOnMap(droneId) {
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    const drone = drones.find(d => d.id === droneId);
    
    if (drone && window.droneMap) {
        window.droneMap.setView([drone.location.lat, drone.location.lng], 15);
        
        // Find and open popup for this drone
        window.droneMap.eachLayer(layer => {
            if (layer.droneId === droneId) {
                layer.openPopup();
            }
        });
    }
}

// Setup drone control form
function setupDroneControlForm() {
    const form = document.getElementById('droneControlForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const droneId = document.getElementById('droneSelect').value;
        const targetLat = parseFloat(document.getElementById('targetLat').value);
        const targetLng = parseFloat(document.getElementById('targetLng').value);
        
        if (!droneId || !targetLat || !targetLng) {
            showMessage('Vui lòng điền đầy đủ thông tin!', 'error');
            return;
        }
        
        sendDroneToPosition(droneId, targetLat, targetLng);
    });
}

// Send drone to position
function sendDroneToPosition(droneId, lat, lng) {
    const drones = JSON.parse(localStorage.getItem('drones') || '[]');
    const droneIndex = drones.findIndex(d => d.id === droneId);
    
    if (droneIndex !== -1) {
        // Update drone location
        drones[droneIndex].location = { lat, lng };
        drones[droneIndex].status = 'busy'; // Set to busy when moving
        
        localStorage.setItem('drones', JSON.stringify(drones));
        
        showMessage(`Đã gửi ${drones[droneIndex].name} đến vị trí (${lat}, ${lng})`, 'success');
        
        // Refresh displays
        loadDroneGrid();
        loadDroneSelect();
        
        // Update map if available
        if (window.droneMap) {
            window.droneMap.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    window.droneMap.removeLayer(layer);
                }
            });
            addDroneMarkers(window.droneMap);
        }
        
        // Simulate completion after 5 seconds
        setTimeout(() => {
            const updatedDrones = JSON.parse(localStorage.getItem('drones') || '[]');
            const updatedDroneIndex = updatedDrones.findIndex(d => d.id === droneId);
            if (updatedDroneIndex !== -1) {
                updatedDrones[updatedDroneIndex].status = 'available';
                localStorage.setItem('drones', JSON.stringify(updatedDrones));
                showMessage(`${updatedDrones[updatedDroneIndex].name} đã đến đích`, 'success');
                loadDroneGrid();
                loadDroneSelect();
            }
        }, 5000);
    }
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.getElementById('controlMessage');
    if (messageDiv) {
        messageDiv.innerHTML = `<div class="message ${type}">${message}</div>`;
        setTimeout(() => {
            messageDiv.innerHTML = '';
        }, 3000);
    }
}

// Show notification (fallback if not available in main.js)
function showNotification(message, type) {
    if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        showMessage(message, type);
    }
}

// Make functions globally accessible
window.toggleDroneStatus = toggleDroneStatus;
window.showDroneOnMap = showDroneOnMap;