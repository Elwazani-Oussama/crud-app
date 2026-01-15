import express from 'express';
const app = express();
import userRouter from './routes/userRouter.js';

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/user', userRouter);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})