import Express from 'express';
import BodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import './config/db.js';

//Routes
import authRouter from './routes/authRoutes.js';
import taskRouter from './routes/taskRoutes.js';
import swaggerSpec from './config/swagger.js';

const app = Express();

const port = 4000;

//middleware

app.use(BodyParser.json());

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api', authRouter);
app.use('/api', taskRouter);

app.listen(port, () => {
  console.log(`Server run http://localhost:${port}`);
});
