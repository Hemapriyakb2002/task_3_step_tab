import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import register from "./routes/users";
import { AppDataSource } from "./config/datasource.config";

const app = express();
app.use(express.json());

app.use(cors({
	origin:"*", credentials:true
  })) 

const port=process.env.PORT
AppDataSource

app.use("/user", register)

app.listen(port, () => {
	console.log(`Now running on port ${port}`);
});