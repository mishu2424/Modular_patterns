"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Middleware
const logger = (req, res, next) => {
    const loggerTime = `Timestamp: ${Date.now()}, hit url${req?.url}, for method ${req?.method}\n`;
    const filePath = path_1.default.join(process.cwd(), "/src/server.txt");
    if (!fs_1.default.existsSync(filePath)) {
        fs_1.default.writeFileSync(filePath, loggerTime);
    }
    else {
        fs_1.default.appendFileSync(filePath, loggerTime);
    }
    next();
};
exports.default = logger;
