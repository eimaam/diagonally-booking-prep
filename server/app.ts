import cors from 'cors';
import express, { type Request, type Response } from 'express';
import profileRoutes from './routes/profile.routes';
import bookingRoutes from './routes/booking.routes';

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

// health check route
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'diagonallyyyyyy',
  });
});

app.use('/api/v1/profiles', profileRoutes);
app.use('/api/v1/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`🚀 API listening on http://localhost:${PORT}`);
});
