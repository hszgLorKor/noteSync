import { Router } from 'express';
const router = Router();

// Define your routes
router.get('/', (req, res) => {
    res.send('file Route');
});

// Default export
export default router;
