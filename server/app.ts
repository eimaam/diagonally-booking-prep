import cors from 'cors';
import express, { type Request, type Response } from 'express';


const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());



app.listen(PORT, () => {
  console.log(`🚀 API listening on http://localhost:${PORT}`);
});
