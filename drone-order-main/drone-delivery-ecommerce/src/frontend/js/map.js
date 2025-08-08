// This file integrates OpenStreetMap for displaying and managing drone routes.

let map;
let droneMarkers = {};
let deliveryRoutes = [];

// Initialize the map
function initMap() {
    map = L.map('map').setView([21.0285, 105.8542], 13); // Set initial view to a specific location

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// Add a drone marker to the map
function addDroneMarker(drone) {
    const marker = L.marker([drone.lat, drone.lng]).addTo(map);
    marker.bindPopup(`<b>${drone.name}</b><br>Status: ${drone.status}`);
    droneMarkers[drone.id] = marker;
}

// Update drone position on the map
function updateDronePosition(droneId, lat, lng) {
    if (droneMarkers[droneId]) {
        droneMarkers[droneId].setLatLng([lat, lng]);
    }
}

// Draw delivery route on the map
function drawRoute(route) {
    const latLngs = route.map(point => [point.lat, point.lng]);
    const polyline = L.polyline(latLngs, { color: 'blue' }).addTo(map);
    deliveryRoutes.push(polyline);
}

// Clear all delivery routes from the map
function clearRoutes() {
    deliveryRoutes.forEach(route => map.removeLayer(route));
    deliveryRoutes = [];
}

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', initMap);