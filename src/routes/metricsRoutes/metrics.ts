import { Router, Request, Response } from 'express';

const router = Router();

router.post('/metrics', (req: Request, res: Response) => {
    try {
        const { service, route, method, status, latencyMs } = req.body;
        if (!service || !route || !method || !status || latencyMs === undefined) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

        res.status(204).send({ message: 'Metrics received' });
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
});


export default router;