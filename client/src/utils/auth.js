import { jwtDecode } from "jwt-decode";
class AuthService {
    getProfile() {
        const token = this.getToken();
        return token ? jwtDecode(token) : null;
    }
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp) {
                return decoded.exp * 1000 < Date.now();
            }
            return false;
        }
        catch (error) {
            console.error("Invalid token format:", error);
            return true;
        }
    }
    getToken() {
        // Retrieve the token from localStorage
        return localStorage.getItem("jwtToken");
    }
    login(idToken) {
        // Store the token in localStorage
        localStorage.setItem("jwtToken", idToken);
        window.location.assign("/"); // Redirect to home or dashboard
    }
    logout() {
        // Remove the token from localStorage
        localStorage.removeItem("jwtToken");
        window.location.assign("/login"); // Redirect to login page
    }
}
export default new AuthService();
