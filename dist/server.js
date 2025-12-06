"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./config/db"));
const port = config_1.default.port || 5000;
let dbInitialized = false;
const ensureDBConnection = async () => {
    if (!dbInitialized) {
        await (0, db_1.default)();
        dbInitialized = true;
        console.log("Database connected successfully");
    }
};
// For local development only
if (process.env.VERCEL !== "1") {
    const startServer = async () => {
        try {
            await ensureDBConnection();
            app_1.default.listen(port, () => {
                console.log(`Example app listening on port ${port}`);
            });
        }
        catch (error) {
            console.error("Failed to start server:", error);
            process.exit(1);
        }
    };
    startServer();
}
// Export for Vercel serverless
module.exports = async (req, res) => {
    await ensureDBConnection();
    return (0, app_1.default)(req, res);
};
// Also export as default for ES modules
exports.default = async (req, res) => {
    await ensureDBConnection();
    return (0, app_1.default)(req, res);
};
