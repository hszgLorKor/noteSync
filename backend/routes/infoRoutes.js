import { Router } from 'express';
const router = Router();

// Define your routes
router.get('/info', (req, res) => {
    res.send('info Route');
});

// Default export
export default router;
