import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: config.ALLOWED_ORIGINS }))



export default app;