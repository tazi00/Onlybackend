import express from "express";
import { login, logout, refreshAccessToken, register } from "../Controllers/auth.controller";
import {
  authenticateUser,
  validateLogin,
  validateRegistration,
} from "../Middlewares/authMddlewares";
const authRouter = express.Router();

authRouter.route("/login").post(validateLogin, authenticateUser, login);
authRouter.route("/register").post(validateRegistration, register);
authRouter.route("/logout").post(logout);
authRouter.route("/refresh-token").post(refreshAccessToken);

export default authRouter;
