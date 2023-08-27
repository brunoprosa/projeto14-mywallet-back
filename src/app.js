import express from "express";
import cors from "cors"
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import dayjs from "dayjs";
import router from "../routes/indexRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL);
export let db;

mongoClient.connect()
	.then(() => db = mongoClient.db())
	.catch((err) => console.log(err))

app.use(router)

const PORT = 5000
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))