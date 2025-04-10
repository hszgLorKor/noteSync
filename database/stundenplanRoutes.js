import express from 'express';
import { Stundenplan } from './mongoose.js';

const router = express.Router();

// Stundenstatus aktualisieren (z. B. findet_statt auf false setzen)
router.put('/stundenplan/:id', async (req, res) => {
    try {
        const eintrag = await Stundenplan.findByIdAndUpdate(
            req.params.id,
            { findet_statt: req.body.findet_statt },
            { new: true }
        );
        if (!eintrag) {
            return res.status(404).json({ message: "Eintrag nicht gefunden" });
        }
        res.json(eintrag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
