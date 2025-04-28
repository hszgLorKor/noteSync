import { Router } from 'express';
import cors from "cors";

const router = Router();

router.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // If using cookies or HTTP authentication
}));

router.get('/', (req, res) => {
    res.send({message : 'pong'});
});

export default router;