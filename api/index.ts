import express from 'express';
import cors from 'cors';
import { apiRouter } from '../server/routes/api.routes.ts';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Support both /api/path and /path
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
