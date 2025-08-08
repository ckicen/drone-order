// This file handles real-time tracking of drones during delivery.

let map;
let droneMarkers = {};
let deliveryRoute = [];

// Initialize the map and set the view to a default location
function initMap() {
    map = L.map('map').setView([21.0285, 105.8542], 13); // Default coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// Function to update drone positions on the map
function updateDronePosition(droneId, lat, lng) {
    if (!droneMarkers[droneId]) {
        droneMarkers[droneId] = L.marker([lat, lng]).addTo(map);
    } else {
        droneMarkers[droneId].setLatLng([lat, lng]);
    }
}

// Function to draw the delivery route on the map
function drawRoute(route) {
    if (deliveryRoute.length > 0) {
        deliveryRoute.forEach(segment => {
            map.removeLayer(segment);
        });
    }
    
    deliveryRoute = [];
    
    for (let i = 0; i < route.length - 1; i++) {
        const segment = L.polyline([route[i], route[i + 1]], { color: 'blue' }).addTo(map);
        deliveryRoute.push(segment);
    }
}

// Function to fetch drone tracking data from the server
async function fetchDroneTracking(droneId) {
    try {
        const response = await fetch(`/api/drones/${droneId}/tracking`);
        const data = await response.json();
        
        if (data.success) {
            const { position, route } = data;
            updateDronePosition(droneId, position.lat, position.lng);
            drawRoute(route);
        }
    } catch (error) {
        console.error('Error fetching drone tracking data:', error);
    }
}

// Start tracking the drone
function startTracking(droneId) {
    initMap();
    setInterval(() => fetchDroneTracking(droneId), 5000); // Update every 5 seconds
}