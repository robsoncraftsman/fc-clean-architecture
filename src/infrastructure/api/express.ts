import express, { Express } from "express";
import { customerRoute } from "./routes/customer.route";

export const app: Express = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("FullCycle - Clean Architecture");
});

app.use("/customer", customerRoute);