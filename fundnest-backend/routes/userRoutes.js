import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { registerUser, loginUser } from '../controllers/userController.js';


const router = express.Router();

router.get('/profile', protect, (req, res) => {
    res.json({
        message: 'Profile accessed successfully',
        user: req.user,
    });
});
router.get('/dashboard', protect, (req, res) => {
    res.json({
        message: 'Welcome to dashboard',
        email: req.user.email,
    });
});

router.post('/login', loginUser);

router.post('/register', registerUser);

export default router;