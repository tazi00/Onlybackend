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
exports.register = exports.logout = exports.login = exports.refreshAccessToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenHandlers_1 = require("../Utilities/tokenHandlers");
const user_service_1 = require("../services/user.service");
const tokens_1 = require("../Constants/tokens");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req;
            const user = yield (0, user_service_1.getUser)(userId);
            if (typeof user === "string") {
                // Handle the case where user is a string (error message)
                return res.status(404).json({
                    status: "error",
                    data: null,
                    message: user,
                });
            }
            // Now you can use email, username, and password to generate tokens
            const { email, username, password } = user;
            const accessToken = (0, tokenHandlers_1.generateAccessToken)(email, password, username);
            const refreshToken = (0, tokenHandlers_1.generateRefreshToken)(email, password, username);
            res.json({
                status: "success",
                data: {
                    accessToken,
                    refreshToken,
                },
                message: "Login successful",
            });
        }
        catch (error) {
            console.error(`Token generation error: ${error.message}`);
            res.status(500).json({
                status: "error",
                data: null,
                message: "Token generation failed",
            });
        }
    });
}
exports.login = login;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password, confirmPassword } = req.body;
            if (password !== confirmPassword) {
                return res.status(400).json({ msg: "Passwords do not match" });
            }
            const existingUserByEmail = yield (0, user_service_1.getUserByEmail)(email);
            if (existingUserByEmail) {
                return res
                    .status(400)
                    .json({ msg: "User with this email already exists" });
            }
            // Check if a user with the same username already exists
            const existingUserWithUsername = yield (0, user_service_1.getUserByUsername)(username);
            if (existingUserWithUsername) {
                return res
                    .status(400)
                    .json({ msg: "User with this username already exists" });
            }
            // Hash the password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Create the new user
            const newUser = yield (0, user_service_1.createUser)(username, email, hashedPassword);
            res.json({
                status: "success",
                data: {
                    user: newUser,
                },
                message: "Registration successful",
            });
        }
        catch (error) {
            if (error.code === "SOME_SPECIFIC_ERROR_CODE") {
                return res.status(400).json({ msg: "Some specific validation error" });
            }
            else {
                console.error(`Registration error: ${error.message}`);
                return res.status(500).json({
                    status: "error",
                    data: null,
                    message: "Registration failed",
                });
            }
        }
    });
}
exports.register = register;
function logout(req, res) {
    res.json({ msg: "logout route" });
}
exports.logout = logout;
function refreshAccessToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const refreshToken = req.body.refreshToken;
            if (!refreshToken) {
                return res.status(400).json({ msg: "Refresh token is missing" });
            }
            jsonwebtoken_1.default.verify(refreshToken, tokens_1.REFRESH_TOKEN, (err, user) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(403).json({ msg: "Invalid refresh token" });
                }
                try {
                    const userData = yield (0, user_service_1.getUserByEmail)(user.email);
                    if (!userData) {
                        return res.status(404).json({ msg: "User not found" });
                    }
                    const newAccessToken = (0, tokenHandlers_1.generateAccessToken)(userData.email, userData.password, userData.username);
                    res.json({
                        status: "success",
                        data: {
                            accessToken: newAccessToken,
                        },
                        message: "Access token refreshed successfully",
                    });
                }
                catch (error) {
                    console.error(`Error getting user details: ${error.message}`);
                    res.status(500).json({
                        status: "error",
                        data: null,
                        message: "Failed to refresh access token",
                    });
                }
            }));
        }
        catch (error) {
            console.error(`Error refreshing access token: ${error.message}`);
            res.status(500).json({
                status: "error",
                data: null,
                message: "Failed to refresh access token",
            });
        }
    });
}
exports.refreshAccessToken = refreshAccessToken;
