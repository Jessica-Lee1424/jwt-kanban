import Auth from '../utils/auth';

const retrieveUsers = async () => {
  try {
    const token = Auth.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    // Check if the response is okay before parsing
    if (!response.ok) {
      throw new Error(`Invalid user API response: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err.message); // Log only the error message
    return [];
  }
}

export { retrieveUsers };