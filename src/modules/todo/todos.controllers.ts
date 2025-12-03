import { Request, Response } from "express";
import { todoServices } from "./todos.services";

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodos();
    res.status(200).json({
      success: true,
      message: "SUccessfully fetched the data",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      errorData: err,
    });
  }
};

const postTodos = async (req: Request, res: Response) => {
  const { user_id, title } = req?.body;
  try {
    const result = await todoServices.postTodos(user_id, title);
    if (result?.rows?.length === 0) {
      res.status(500).json({
        success: false,
        message: "No data found!!",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Todo has been created",
        data: result?.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      errorData: err,
    });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req?.body;
  try {
    const result = await todoServices.updateTodo(
      user_id,
      title,
      req?.params?.id as string
    );

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "No data found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Data has been updated",
        data: result?.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      errorData: err,
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.deleteTodo(req?.params?.id as string);
    if (result?.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "No data found to be deleted",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully deleted the data",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: err,
    });
  }
};
export const todoControllers = {
  getTodos,
  postTodos,
  updateTodo,
  deleteTodo,
};
