"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const loginUser = async (email, password) => {
    const result = await db_1.pool.query(`SELECT * FROM users WHERE email=$1`, [
        email,
    ]);
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const match = await bcryptjs_1.default.compare(password, user?.password);
    if (!match) {
        return null;
    }
    const token = jsonwebtoken_1.default.sign({ name: user?.name, role: user?.role, email: user?.email }, config_1.default.jwt_secret, {
        expiresIn: "7d",
    });
    return { token, user };
};
exports.authServices = {
    loginUser,
};
