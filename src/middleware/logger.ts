import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

// Middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  const loggerTime = `Timestamp: ${Date.now()}, hit url${
    req?.url
  }, for method ${req?.method}\n`;
  const filePath = path.join(process.cwd(), "/src/server.txt");
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, loggerTime);
  } else {
    fs.appendFileSync(filePath, loggerTime);
  }
  next();
};

export default logger;