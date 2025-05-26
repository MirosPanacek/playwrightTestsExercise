import { baseURL, extraHTTPHeaders } from './RequestConfig';

export const removeUser = async (userId) => {
    try {
        const response = await fetch(`${baseURL}users/${userId}`, {
            method: 'DELETE',
            headers: extraHTTPHeaders,
        });

        console.log('Status:', response.status);
    } catch (error) {
        console.error('Chyba při mazání uživatele:', error);
    }
};