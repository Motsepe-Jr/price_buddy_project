import express from 'express';

const app = express();


// middleware
import errorMiddleware from './middlewares/errors';
import cookieParser from 'cookie-parser';
app.use(express.json());
app.use(cookieParser())




// import all routes 
import { router as productRouter } from './routes/product';
import {router as userRouter} from './routes/user';
import {router as categoryRouter} from './routes/category';
import {router as storeRouter} from './routes/store';
import {router as specialRouter} from './routes/special';


app.use('/api/v1', productRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', storeRouter);
app.use('/api/v1', specialRouter);

app.use(errorMiddleware);

export { app };