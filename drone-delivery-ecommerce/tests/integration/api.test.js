const request = require('supertest');
const app = require('../../src/backend/server'); // Adjust the path as necessary

describe('API Integration Tests', () => {
    let adminToken;
    let userToken;
    let testProductId;
    let testDroneId;
    let testOrderId;

    beforeAll(async () => {
        // Login as admin to get token
        const adminResponse = await request(app)
            .post('/api/auth/login')
            .send({ username: 'admin', password: 'admin123' });
        adminToken = adminResponse.body.token;

        // Login as user to get token
        const userResponse = await request(app)
            .post('/api/auth/login')
            .send({ username: 'user', password: 'user123' });
        userToken = userResponse.body.token;
    });

    test('GET /api/products should return all products', async () => {
        const response = await request(app)
            .get('/api/products')
            .set('Authorization', `Bearer ${userToken}`);
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/orders should create a new order', async () => {
        const orderData = {
            productId: testProductId,
            quantity: 1,
            deliveryAddress: '123 Test St, Test City',
            paymentMethod: 'credit_card'
        };

        const response = await request(app)
            .post('/api/orders')
            .set('Authorization', `Bearer ${userToken}`)
            .send(orderData);
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('orderId');
        testOrderId = response.body.orderId;
    });

    test('GET /api/orders/:id should return order details', async () => {
        const response = await request(app)
            .get(`/api/orders/${testOrderId}`)
            .set('Authorization', `Bearer ${userToken}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('orderId', testOrderId);
    });

    test('GET /api/drones should return all drones', async () => {
        const response = await request(app)
            .get('/api/drones')
            .set('Authorization', `Bearer ${adminToken}`);
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/drones should create a new drone', async () => {
        const droneData = {
            name: 'Drone Test',
            battery: 100,
            status: 'available',
            location: { lat: 21.0285, lng: 105.8542 },
            manufacturer: 'DroneCo',
            productionDate: '2023-01-01',
            usageTime: 0
        };

        const response = await request(app)
            .post('/api/drones')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(droneData);
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('droneId');
        testDroneId = response.body.droneId;
    });

    test('PUT /api/drones/:id should update a drone', async () => {
        const updatedData = {
            battery: 90,
            status: 'in_use'
        };

        const response = await request(app)
            .put(`/api/drones/${testDroneId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send(updatedData);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Drone updated successfully');
    });

    test('DELETE /api/drones/:id should delete a drone', async () => {
        const response = await request(app)
            .delete(`/api/drones/${testDroneId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        
        expect(response.status).toBe(204);
    });

    afterAll(async () => {
        // Cleanup: delete the test order if it exists
        if (testOrderId) {
            await request(app)
                .delete(`/api/orders/${testOrderId}`)
                .set('Authorization', `Bearer ${adminToken}`);
        }
    });
});