import express from "express";
import { userControllers } from "./users.controllers";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";
const router = express.Router();

router.post("/", userControllers.createUser);

router.get("/", logger, auth("admin"), userControllers.getUser);

router.get("/:id", logger, auth("admin", "user"), userControllers.getSingleUser);

router.put("/:id", userControllers.updateUser);

router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;
