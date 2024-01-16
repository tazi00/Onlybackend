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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserInfo = exports.getAllUsers = void 0;
const user_service_1 = require("../services/user.service");
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield (0, user_service_1.getUsers)();
            res.json({
                status: "success",
                data: {
                    users: allUsers,
                },
                message: "All users retrieved successfully",
            });
        }
        catch (error) {
            console.error(`Error getting all users: ${error.message}`);
            res.status(500).json({
                status: "error",
                data: null,
                message: "Failed to retrieve all users",
            });
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            res.json({
                status: "success",
                data: user,
                message: "User details retrieved successfully",
            });
        }
        catch (error) {
            console.error(`Error getting user details: ${error.message}`);
            res.status(500).json({ msg: "Failed to retrieve user details" });
        }
    });
}
exports.getUserInfo = getUserInfo;
function createUser(req, res) {
    res.json({ msg: "create user" });
}
exports.createUser = createUser;
function updateUser(req, res) {
    res.json({ msg: "update user" });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    res.json({ msg: "delete user" });
}
exports.deleteUser = deleteUser;
