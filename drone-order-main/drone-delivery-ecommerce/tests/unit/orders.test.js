const request = require('supertest');
const app = require('../../src/backend/server'); // Adjust the path as necessary
const Order = require('../../src/backend/models/Order');

describe('Order API', () => {
    let orderId;

    beforeAll(async () => {
        // Create a test order before running tests
        const order = await Order.create({
            userId: 'testUserId',
            productId: 'testProductId',
            quantity: 1,
            totalPrice: 100,
            deliveryAddress: '123 Test St',
            status: 'pending'
        });
        orderId = order._id;
    });

    afterAll(async () => {
        // Clean up the test order after tests
        await Order.deleteMany({});
    });

    it('should create a new order', async () => {
        const response = await request(app)
            .post('/api/orders')
            .send({
                userId: 'testUserId',
                productId: 'testProductId',
                quantity: 2,
                totalPrice: 200,
                deliveryAddress: '456 Another St'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('order');
        expect(response.body.order).toHaveProperty('_id');
    });

    it('should get an order by ID', async () => {
        const response = await request(app).get(`/api/orders/${orderId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('order');
        expect(response.body.order._id).toBe(orderId.toString());
    });

    it('should update an order status', async () => {
        const response = await request(app)
            .put(`/api/orders/${orderId}`)
            .send({ status: 'shipped' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('order');
        expect(response.body.order.status).toBe('shipped');
    });

    it('should delete an order', async () => {
        const response = await request(app).delete(`/api/orders/${orderId}`);

        expect(response.status).toBe(204);
    });
});