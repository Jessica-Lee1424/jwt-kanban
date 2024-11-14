import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null; // Decode and return the token or null if no token exists
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Return true if token exists and is not expired
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decoded = jwtDecode <JwtPayload> (token);
    if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
    return true  
    }// Check if the token's expiration time is less than the current time
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('id_token') || ''; // Return the token from localStorage or an empty string if it doesn't exist
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken); // Store the token in localStorage
    // TODO: redirect to the home page
    window.location.assign('/'); // Redirect to the home page
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token'); // Remove the token from localStorage
    // TODO: redirect to the login page
    window.location.assign('/login'); // Redirect to the login page
  }
}

export default new AuthService();