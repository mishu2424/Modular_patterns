"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("./users.controllers");
const logger_1 = __importDefault(require("../../middleware/logger"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/", users_controllers_1.userControllers.createUser);
router.get("/", logger_1.default, (0, auth_1.default)("admin"), users_controllers_1.userControllers.getUser);
router.get("/:id", logger_1.default, (0, auth_1.default)("admin", "user"), users_controllers_1.userControllers.getSingleUser);
router.put("/:id", users_controllers_1.userControllers.updateUser);
router.delete("/:id", users_controllers_1.userControllers.deleteUser);
exports.userRoutes = router;
