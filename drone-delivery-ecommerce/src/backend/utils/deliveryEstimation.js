const calculateDeliveryTime = (distance, speed) => {
    if (speed <= 0) {
        throw new Error("Speed must be greater than zero.");
    }
    return distance / speed; // time = distance / speed
};

const estimateDeliveryTime = (drone, deliveryAddress) => {
    const distance = calculateDistance(drone.location, deliveryAddress);
    const speed = drone.speed; // speed in meters per second
    const timeInSeconds = calculateDeliveryTime(distance, speed);
    return timeInSeconds; // returns time in seconds
};

const calculateDistance = (location1, location2) => {
    const R = 6371e3; // meters
    const φ1 = location1.lat * Math.PI/180; // φ in radians
    const φ2 = location2.lat * Math.PI/180; // φ in radians
    const Δφ = (location2.lat-location1.lat) * Math.PI/180;
    const Δλ = (location2.lng-location1.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in meters
};

module.exports = {
    estimateDeliveryTime,
    calculateDistance
};