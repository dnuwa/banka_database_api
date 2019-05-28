import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use API routes in the app
app.use('/api/v1', routes);


const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
