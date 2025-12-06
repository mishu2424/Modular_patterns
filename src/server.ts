import app from "./app";
import config from "./config";
import initDB from "./config/db";

const port = config.port || 5000;

let dbInitialized = false;

const ensureDBConnection = async () => {
  if (!dbInitialized) {
    await initDB();
    dbInitialized = true;
    console.log("Database connected successfully");
  }
};

// For local development only
if (process.env.VERCEL !== "1") {
  const startServer = async () => {
    try {
      await ensureDBConnection();
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  };
  startServer();
}

// Export for Vercel serverless
module.exports = async (req: any, res: any) => {
  await ensureDBConnection();
  return app(req, res);
};

// Also export as default for ES modules
export default async (req: any, res: any) => {
  await ensureDBConnection();
  return app(req, res);
};