const { Product } = require('../../src/backend/models/Product');

describe('Product Model', () => {
    beforeAll(async () => {
        await Product.sync({ force: true }); // Reset the database before tests
    });

    afterAll(async () => {
        await Product.drop(); // Clean up after tests
    });

    test('should create a product', async () => {
        const product = await Product.create({
            name: 'Drone X',
            image: 'path/to/image.jpg',
            battery: 100,
            status: 'available',
            location: 'Warehouse A',
            manufacturer: 'DroneCorp',
            manufactureDate: new Date('2023-01-01'),
            usageTime: 10
        });

        expect(product.name).toBe('Drone X');
        expect(product.battery).toBe(100);
        expect(product.status).toBe('available');
    });

    test('should retrieve a product by ID', async () => {
        const product = await Product.create({
            name: 'Drone Y',
            image: 'path/to/image2.jpg',
            battery: 80,
            status: 'available',
            location: 'Warehouse B',
            manufacturer: 'DroneTech',
            manufactureDate: new Date('2023-02-01'),
            usageTime: 5
        });

        const foundProduct = await Product.findByPk(product.id);
        expect(foundProduct.name).toBe('Drone Y');
    });

    test('should update a product', async () => {
        const product = await Product.create({
            name: 'Drone Z',
            image: 'path/to/image3.jpg',
            battery: 90,
            status: 'available',
            location: 'Warehouse C',
            manufacturer: 'DroneInc',
            manufactureDate: new Date('2023-03-01'),
            usageTime: 8
        });

        product.battery = 85;
        await product.save();

        const updatedProduct = await Product.findByPk(product.id);
        expect(updatedProduct.battery).toBe(85);
    });

    test('should delete a product', async () => {
        const product = await Product.create({
            name: 'Drone A',
            image: 'path/to/image4.jpg',
            battery: 70,
            status: 'available',
            location: 'Warehouse D',
            manufacturer: 'DroneWorld',
            manufactureDate: new Date('2023-04-01'),
            usageTime: 12
        });

        await product.destroy();
        const deletedProduct = await Product.findByPk(product.id);
        expect(deletedProduct).toBeNull();
    });
});