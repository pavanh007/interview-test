import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import userRouter from './userRoutes.js';

//NOTE - middleware



app.use(bodyParser.json());

//3. ROUTES
// app.use('/v1/booking', bookingRouter);
app.use('/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;




