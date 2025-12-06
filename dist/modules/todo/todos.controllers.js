"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoControllers = void 0;
const todos_services_1 = require("./todos.services");
const getTodos = async (req, res) => {
    try {
        const result = await todos_services_1.todoServices.getTodos();
        res.status(200).json({
            success: true,
            message: "SUccessfully fetched the data",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            errorData: err,
        });
    }
};
const postTodos = async (req, res) => {
    try {
        const result = await todos_services_1.todoServices.postTodos(req?.body);
        if (result?.rows?.length === 0) {
            res.status(500).json({
                success: false,
                message: "No data found!!",
            });
        }
        else {
            res.status(201).json({
                success: true,
                message: "Todo has been created",
                data: result?.rows[0],
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            errorData: err,
        });
    }
};
const updateTodo = async (req, res) => {
    const { user_id, title } = req?.body;
    try {
        const result = await todos_services_1.todoServices.updateTodo(user_id, title, req?.params?.id);
        if (result.rows.length === 0) {
            res.status(500).json({
                success: false,
                message: "No data found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Data has been updated",
                data: result?.rows[0],
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            errorData: err,
        });
    }
};
const deleteTodo = async (req, res) => {
    try {
        const result = await todos_services_1.todoServices.deleteTodo(req?.params?.id);
        if (result?.rowCount === 0) {
            res.status(500).json({
                success: false,
                message: "No data found to be deleted",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Successfully deleted the data",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: err,
        });
    }
};
exports.todoControllers = {
    getTodos,
    postTodos,
    updateTodo,
    deleteTodo,
};
