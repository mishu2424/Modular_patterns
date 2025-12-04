import { JwtPayload } from "jsonwebtoken";

declare global {
  // "declare global" means: "I'm adding something to the global scope"
  // This makes it available everywhere in your app
  namespace Express {
    // We're extending the Express namespace (the Express library's types)

    interface Request {
      // We're extending Express's Request interface (what gets passed to middleware/routes)
      // This is the req object you see in: app.get('/', (req, res) => { ... })

      user?: JwtPayload;
      // We're adding an optional "user" property to the Request object
      // The "?" means it's optional (might not always exist)
      // It will contain decoded JWT data (like user ID, roles, etc.)
    }
  }
}
