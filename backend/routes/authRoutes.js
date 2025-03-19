import { Router } from 'express';
import cors from "cors";
const router = Router();

router.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // If using cookies or HTTP authentication
}));

// Define your routes
router.get('/', (req, res) => {
    res.send('Auth Route');
});

// Default export
export default router;
