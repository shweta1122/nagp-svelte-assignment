import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
    const token = event.request.headers.get('authorization')?.split(' ')[1];

    if (token) {
        try {
            event.locals.user = jwt.verify(token, 'your_jwt_secret');
        } catch (err) {
            // Invalid token
        }
    }

    const response = await resolve(event);

    if (response.status === 401) {
        throw redirect(303, '/login');
    }

    return response;
}
