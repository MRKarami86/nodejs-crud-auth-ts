import express, { Application } from 'express';

import userRoutes from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

const app: Application = express();



app.use('/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

