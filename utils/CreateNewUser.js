import { baseURL, extraHTTPHeaders } from './RequestConfig';

export const createNewUser = async (name, job) => {
    try {
        const response = await fetch(`${baseURL}users/`, {
            method: 'POST',
            headers: extraHTTPHeaders,
            body: JSON.stringify({
                name: name,
                job: job,
            }),
        });
        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();

        // Validate that we got back what we expect
        if (!userData || !userData.id) {
            throw new Error('Invalid user data received from API');
        }

        return userData;

    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Re-throw the error instead of swallowing it
    }
};