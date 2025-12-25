import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config';
import metricsRouter from './routes/metricsRoutes/metrics';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: config.ALLOWED_ORIGINS }))

app.use('/api', metricsRouter);

export default app;