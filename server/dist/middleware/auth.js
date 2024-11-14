import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Get the Authorization header
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extract the token from the header
        const secretKey = process.env.JWT_SECRET_KEY || ''; // Get the secret key from environment variables
        jwt.verify(token, secretKey, (error, user) => {
            if (error) {
                return res.sendStatus(403); // Forbidden if token is invalid
            }
            req.user = user; // Add user data to the request object
            return next(); // Proceed to the next middleware or route handler
        });
        return next();
    }
    else {
        return res.sendStatus(401); // Unauthorized if no token is provided
    }
};
