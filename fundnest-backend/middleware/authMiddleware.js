import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
    let token;

    try {
        // STEP A: Check if header exists
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            // STEP B: Extract token
            token = req.headers.authorization.split(' ')[1];

            // STEP C: Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // STEP D: Get user from DB
            const user = await User.findById(decoded.id).select('-password');

            // STEP E: Check user exists
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // STEP F: Attach user to request
            req.user = user;

            // STEP G: Go to next
            next();
        } else {
            res.status(401).json({ message: 'No token, authorization denied' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export { protect };