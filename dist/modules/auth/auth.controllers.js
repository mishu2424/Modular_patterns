"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const auth_services_1 = require("./auth.services");
const loginUser = async (req, res) => {
    const { email, password } = req?.body;
    try {
        const result = await auth_services_1.authServices.loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "login successful",
            data: result,
        });
    }
    catch (err) {
        res.status(403).json({
            success: false,
            message: err.message,
            errorData: err,
        });
    }
};
exports.authControllers = {
    loginUser
};
