import { Router } from "express";
import { todoControllers } from "./todos.controllers";

const router = Router();

router.get("/", todoControllers.getTodos);

router.post("/", todoControllers.postTodos);

router.put("/:id", todoControllers.updateTodo);

router.delete("/:id", todoControllers.deleteTodo);
export const todoRoutes = router;
