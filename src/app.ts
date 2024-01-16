import express from "express";
import userRouter from "./Routers/user.routes";
import authRouter from "./Routers/auth.routes";
import { authenticateToken } from "./Middlewares/authMddlewares";
import rateLimiter from "express-rate-limit";
const apiLimit = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    msg: "Too many request from same ip,please try again after 15 minutes",
  },
});
const app = express();
app.set("trust-proxy", 1);
app.use(express.json());
app.use("/api/v1/auth", apiLimit, authRouter);
app.use("/api/v1/user", authenticateToken, userRouter);

export default app;
