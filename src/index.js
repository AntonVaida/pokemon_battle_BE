import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import { db } from '../utils/db.js';
import { authRouter } from './route/auth.route.js';
import { pokemonRouter } from './route/pokemon.route.js';
import cookieParser from 'cookie-parser';
import { setupWebSocket } from "./ws/webSocket.js"

const PORT = process.env.PORT || 3000;

const app = express();

db.connection();

app.use(cors({
  origin: process.env.CLIENT_HOST || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/pokemon', pokemonRouter)
app.get("/", async (req, res) => {
  res.send("HELLO WORLD!")
})

const server = app.listen(PORT, () => {
  console.log('SERVER IS RUNNING', `CORS ALLOW  => ${process.env.CLIENT_HOST}`);
})

setupWebSocket(server)

export default app;