"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./Routers/user.routes"));
const auth_routes_1 = __importDefault(require("./Routers/auth.routes"));
const authMddlewares_1 = require("./Middlewares/authMddlewares");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const apiLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: {
        msg: "Too many request from same ip,please try again after 15 minutes",
    },
});
const app = (0, express_1.default)();
app.set("trust-proxy", 1);
app.use(express_1.default.json());
app.use("/api/v1/auth", apiLimit, auth_routes_1.default);
app.use("/api/v1/user", authMddlewares_1.authenticateToken, user_routes_1.default);
exports.default = app;
