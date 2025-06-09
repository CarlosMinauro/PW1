import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta para saludar
app.post('/api/saludar', (req, res) => {
  const { name } = req.body;
  if (name) {
    res.json({ message: `¡Hola, ${name}!` });
  } else {
    res.status(400).json({ message: 'Nombre no proporcionado.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 