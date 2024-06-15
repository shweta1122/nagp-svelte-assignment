export async function load({ locals }) {
    if (!locals.user) {
        return {
            status: 401,
            error: new Error('Not authorized')
        };
    }

    return {
        user: locals.user
    };
}
