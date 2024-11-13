import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';
import { authenticateToken } from '../../middleware/auth.ts'; // Import the authentication middleware

const router = Router();

// Apply authentication middleware to the ticket routes
router.use('/tickets', authenticateToken, ticketRouter);

// Apply authentication middleware to the user routes if needed
router.use('/users', authenticateToken, userRouter);

export default router;