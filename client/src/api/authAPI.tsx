import axios from 'axios';
import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    // POST request to the login route
    const response = await axios.post('/api/login', userInfo);
    return response.data; // Return the response data (e.g., token and user info)
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Rethrow the error for further handling
  }
}

export { login };