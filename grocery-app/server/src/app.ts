import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import groceryRoutes from './routes/groceryRoutes';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', groceryRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 5050;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
