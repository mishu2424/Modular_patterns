import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./users.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req?.body);
    res.status(201).json({
      success: true,
      message: "Data has been posted",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res.status(200).json({
      success: true,
      message: "Data found",
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

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req?.params;
  try {
    const result = await userServices.getSingleUser(id!);

    if (result?.rows?.length === 0) {
      res.status(500).json({
        success: false,
        data: "No user found!",
      });
    } else {
      res.status(200).json({
        success: true,
        data: result?.rows?.[0],
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

const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req?.body;
  const { id } = req?.params;
  try {
    const result = await userServices.updateUser(name, email, id as string);

    if (result?.rows?.length === 0) {
      res.status(500).json({
        success: false,
        data: "No user found!",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Data updated",
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

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req?.params;
  try {
    const result = await userServices.deleteUser(id as string);

    if (result?.rowCount === 0) {
      res.status(204).json({
        success: false,
        data: "No data to be deleted",
      });
    } else {
      res.status(200).json({
        success: true,
        data: null,
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
export const userControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
