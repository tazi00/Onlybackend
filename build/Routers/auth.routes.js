"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../Controllers/auth.controller");
const authMddlewares_1 = require("../Middlewares/authMddlewares");
const authRouter = express_1.default.Router();
authRouter.route("/login").post(authMddlewares_1.validateLogin, authMddlewares_1.authenticateUser, auth_controller_1.login);
authRouter.route("/register").post(authMddlewares_1.validateRegistration, auth_controller_1.register);
authRouter.route("/logout").post(auth_controller_1.logout);
authRouter.route("/refresh-token").post(auth_controller_1.refreshAccessToken);
exports.default = authRouter;
