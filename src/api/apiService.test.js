import apiService from './apiService';

describe('API Service (Integration Tests with MSW)', () => {

    test('fetches entities successfully via GET', async () => {
        // This will hit the MSW handler configured in src/mocks/handlers.js
        const data = await apiService.get('/entities');

        expect(data).toHaveLength(2);
        expect(data[0].name).toBe('Entity A');
        expect(data[1].name).toBe('Entity B');
    });

    test('creates entity successfully via POST', async () => {
        const payload = { name: 'Entity C' };
        const data = await apiService.post('/entities', payload);

        // MSW returns the payload plus an ID
        expect(data.name).toBe('Entity C');
        expect(data.id).toBeDefined();
    });
});
