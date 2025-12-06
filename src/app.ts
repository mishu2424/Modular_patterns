import express, { NextFunction, Request, Response, Router } from "express";
import dotenv from "dotenv";
import path from "path";
import initDB, { pool } from "./config/db";
import config from "./config";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/users.routes";
import { todoRoutes } from "./modules/todo/todos.routes";
import { authRoutes } from "./modules/auth/auth.routes";
const app = express();
dotenv.config({ path: path.join(process.cwd(), ".env") });
// to parse json type data sent from client side
app.use(express.json());
// to parse fromData
app.use(express.urlencoded());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/", async (req: Request, res: Response) => {
  console.log(req?.body);
  res.status(201).json({
    success: true,
    message: "Successfully hit the api.",
  });
});

// get all users
// modular patterns - app.use -> routes -> controllers -> services
app.use("/users", userRoutes);

// todos

// get all todos
app.use("/todos", todoRoutes);

// auth
app.use("/auth",authRoutes);

// for not found url
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Data not found for method ${req.method} hitting url ${req.url}`,
  });
});

export default app;