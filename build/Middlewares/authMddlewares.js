"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.authenticateUser = exports.validateRegistration = exports.validateLogin = void 0;
const user_service_1 = require("../services/user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokens_1 = require("../Constants/tokens");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validateLogin(req, res, next) {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
        return res.status(400).json({
            status: "error",
            msg: "Email or Username and password are required",
        });
    }
    if (password.length < 6 || password.length > 10) {
        return res.status(400).json({
            status: "error",
            msg: "Password must be between 6 and 10 characters",
        });
    }
    next();
}
exports.validateLogin = validateLogin;
function validateRegistration(req, res, next) {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    next();
}
exports.validateRegistration = validateRegistration;
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { emailOrUsername, password } = req.body;
        const userByEmail = yield (0, user_service_1.getUserByEmail)(emailOrUsername);
        const userByUsername = yield (0, user_service_1.getUserByUsername)(emailOrUsername);
        let isValidCredentials = false;
        if (userByEmail) {
            isValidCredentials = yield bcrypt_1.default.compare(password, userByEmail.password);
            console.log("email", userByEmail);
        }
        else if (userByUsername) {
            isValidCredentials = yield bcrypt_1.default.compare(password, userByUsername.password);
        }
        if (isValidCredentials) {
            req.userId = userByEmail ? userByEmail.id : userByUsername.id;
            next();
        }
        else {
            res.status(401).json({ msg: "Invalid credentials" });
        }
    }
    catch (error) {
        console.error(`Authentication error: ${error.message}`);
        res.status(500).json({ msg: "Authentication failed" });
    }
});
exports.authenticateUser = authenticateUser;
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ msg: "Access token is missing" });
    }
    jsonwebtoken_1.default.verify(token, tokens_1.ACCESS_TOKEN, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).json({ msg: "Invalid access token" });
        }
        try {
            const userDetails = yield (0, user_service_1.getUserByUsername)(user.username);
            if (!userDetails) {
                return res.status(404).json({ msg: "User not found" });
            }
            console.log(userDetails);
            // Attach user details to the request object
            req.user = userDetails;
            next();
        }
        catch (error) {
            console.error(`Error getting user details: ${error.message}`);
            res.status(500).json({ msg: "Failed to retrieve user details" });
        }
    }));
});
exports.authenticateToken = authenticateToken;
