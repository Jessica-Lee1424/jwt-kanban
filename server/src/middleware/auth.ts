import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization']; // Get the Authorization header

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Extract the token from the header
    const secretKey = process.env.JWT_SECRET_KEY || ''; // Get the secret key from environment variables

    jwt.verify(token, secretKey, (error, user) => {
      if (error) {
        return res.sendStatus(403); // Forbidden if token is invalid
      }
      req.user = user as JwtPayload; // Add user data to the request object
      return next(); // Proceed to the next middleware or route handler
    });
  } else {
    return res.sendStatus(401); // Unauthorized if no token is provided
  }
};