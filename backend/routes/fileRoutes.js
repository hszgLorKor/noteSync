import { Router } from 'express';
const router = Router();

// Define your routes
router.get('/file', (req, res) => {
    res.send('file Route');
});

// Default export
export default router;
