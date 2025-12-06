"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const users_services_1 = require("./users.services");
const createUser = async (req, res) => {
    try {
        const result = await users_services_1.userServices.createUser(req?.body);
        res.status(201).json({
            success: true,
            message: "Data has been posted",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const getUser = async (req, res) => {
    try {
        const result = await users_services_1.userServices.getUser();
        res.status(200).json({
            success: true,
            message: "Data found",
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
const getSingleUser = async (req, res) => {
    const { id } = req?.params;
    try {
        const result = await users_services_1.userServices.getSingleUser(id);
        if (result?.rows?.length === 0) {
            res.status(500).json({
                success: false,
                data: "No user found!",
            });
        }
        else {
            res.status(200).json({
                success: true,
                data: result?.rows?.[0],
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
const updateUser = async (req, res) => {
    const { name, email } = req?.body;
    const { id } = req?.params;
    try {
        const result = await users_services_1.userServices.updateUser(name, email, id);
        if (result?.rows?.length === 0) {
            res.status(500).json({
                success: false,
                data: "No user found!",
            });
        }
        else {
            res.status(201).json({
                success: true,
                message: "Data updated",
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
const deleteUser = async (req, res) => {
    const { id } = req?.params;
    try {
        const result = await users_services_1.userServices.deleteUser(id);
        if (result?.rowCount === 0) {
            res.status(204).json({
                success: false,
                data: "No data to be deleted",
            });
        }
        else {
            res.status(200).json({
                success: true,
                data: null,
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
exports.userControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
