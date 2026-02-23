import { rest } from 'msw';

const BASE_URL = 'http://localhost:8080/api';

// Intercept REST APIs and return mocked JSON responses for our frontend testing
export const handlers = [
    // Mock Auth Refresh Endpoint
    rest.post(`${BASE_URL}/auth/refresh`, (req, res, ctx) => {
        return res(
            ctx.json({
                token: 'mock-new-jwt-token',
                refreshToken: 'mock-new-refresh-token',
            })
        );
    }),

    // Mock GET Entities Endpoint
    rest.get(`${BASE_URL}/entities`, (req, res, ctx) => {
        return res(
            ctx.json([
                { id: 1, name: 'Entity A' },
                { id: 2, name: 'Entity B' },
            ])
        );
    }),

    // Mock Empty/Success Responses
    rest.post(`${BASE_URL}/entities`, async (req, res, ctx) => {
        const newEntity = await req.json();
        return res(
            ctx.status(201),
            ctx.json({ id: Math.random(), ...newEntity })
        );
    }),
];
