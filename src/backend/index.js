import express from "express";
import characterRoutes from './routes/characterRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/characters", characterRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Servidor Rick and Morty rodando 🚀" });
});

app.listen(PORT, ()=> {
    console.log(`App online na porta ${PORT}!`);
})