import express from 'express';
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from 'body-parser';
import { databaseConnection } from './config/dbConnect';
import meetingRoute from "./routes/meetingRoute"

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

//connecting db
databaseConnection();

app.get("/success", (req: any, res: any) => {
  res.json("SUCCESS");
});

app.use("/api/meetings",meetingRoute)

const server=app.listen(process.env.PORT, () => {
    console.log(`Listening at Port ${process.env.PORT}`);
  });
  


export default server;
