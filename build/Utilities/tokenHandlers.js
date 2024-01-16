"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const tokens_1 = require("../Constants/tokens");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(email, password, username) {
    return jsonwebtoken_1.default.sign({ email, password, username }, tokens_1.ACCESS_TOKEN, {
        expiresIn: "1m",
    });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(email, password, username) {
    return jsonwebtoken_1.default.sign({ email, password, username }, tokens_1.REFRESH_TOKEN, {
        expiresIn: "2d",
    });
}
exports.generateRefreshToken = generateRefreshToken;
function verifyAccessToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, tokens_1.ACCESS_TOKEN);
    }
    catch (error) {
        throw new Error("Invalid access token");
    }
}
exports.verifyAccessToken = verifyAccessToken;
function verifyRefreshToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, tokens_1.REFRESH_TOKEN);
    }
    catch (error) {
        throw new Error("Invalid refresh token");
    }
}
exports.verifyRefreshToken = verifyRefreshToken;
