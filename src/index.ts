import express, { Application } from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { schools } from "./routers";
const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cors());

app.use("/api/school", schools);

const port: number = 4200;

app.listen(port, () => console.log(`app listening on port ${port}`));
