import express from 'express';
const app = express();
import userRouter from './routes/userRouter.js';
import studentRouter from './routes/studentRouter.js';

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/user', userRouter);
app.use('/students', studentRouter);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})