"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
const users_routes_1 = require("./modules/user/users.routes");
const todos_routes_1 = require("./modules/todo/todos.routes");
const auth_routes_1 = require("./modules/auth/auth.routes");
const app = (0, express_1.default)();
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
// to parse json type data sent from client side
app.use(express_1.default.json());
// to parse fromData
app.use(express_1.default.urlencoded());
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/", async (req, res) => {
    console.log(req?.body);
    res.status(201).json({
        success: true,
        message: "Successfully hit the api.",
    });
});
// get all users
// modular patterns - app.use -> routes -> controllers -> services
app.use("/users", users_routes_1.userRoutes);
// todos
// get all todos
app.use("/todos", todos_routes_1.todoRoutes);
// auth
app.use("/auth", auth_routes_1.authRoutes);
// for not found url
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Data not found for method ${req.method} hitting url ${req.url}`,
    });
});
exports.default = app;
