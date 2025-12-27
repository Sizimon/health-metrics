import { Router, Request, Response } from 'express';
import { addEvent } from '../../aggregator/index.js';

const router = Router();

router.post('/metrics', (req: Request, res: Response) => {
    try {
        const { service, route, method, status, latencyMs } = req.body;
        if (!service || !route || !method || !status || latencyMs === undefined) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

        addEvent({ service, route, method, status, latencyMs });
        res.status(204).send({ message: 'Metrics received & added to aggregator.' });
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
});


export default router;