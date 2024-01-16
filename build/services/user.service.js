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
exports.createUser = exports.deleteUser = exports.updateUser = exports.getUserByUsername = exports.getUserByEmail = exports.getUser = exports.getUsers = void 0;
const fileConstants_1 = require("../Constants/fileConstants");
const read_write_1 = require("../Utilities/read-write");
const uuid_1 = require("uuid");
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, read_write_1.readDataFromFile)(fileConstants_1.USER_FILE);
            if (users) {
                return users;
            }
            else {
                throw new Error("No users found");
            }
        }
        catch (error) {
            console.error(`Error getting users: ${error.message}`);
            return "Getting user operation failed";
        }
    });
}
exports.getUsers = getUsers;
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, read_write_1.readDataFromFile)(fileConstants_1.USER_FILE);
            const user = users.find((u) => u.id === userId);
            if (user) {
                return user;
            }
            else {
                throw new Error(`User with ID ${userId} not found`);
            }
        }
        catch (error) {
            console.error(`Error getting user: ${error.message}`);
            return "Getting user operation failed";
        }
    });
}
exports.getUser = getUser;
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, read_write_1.readDataFromFile)(fileConstants_1.USER_FILE);
            const user = users.find((u) => u.email === email);
            if (user) {
                return user;
            }
            else {
                throw new Error(`User with email ${email} not found`);
            }
        }
        catch (error) {
            console.error(`Error getting user by email: ${error.message}`);
            return null;
        }
    });
}
exports.getUserByEmail = getUserByEmail;
function getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, read_write_1.readDataFromFile)(fileConstants_1.USER_FILE);
            const user = users.find((u) => u.username === username);
            if (user) {
                return user;
            }
            else {
                throw new Error(`User with username ${username} not found`);
            }
        }
        catch (error) {
            console.error(`Error getting user by username: ${error.message}`);
            return "Getting user by username operation failed";
        }
    });
}
exports.getUserByUsername = getUserByUsername;
function updateUser(userId, updatedUserData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, read_write_1.readDataFromFile)(fileConstants_1.USER_FILE);
            const updatedUsers = users.map((user) => user.id === userId ? Object.assign(Object.assign({}, user), updatedUserData) : user);
            yield (0, read_write_1.writeDataToFile)(fileConstants_1.USER_FILE, updatedUsers);
            return "User updated successfully";
        }
        catch (error) {
            console.error(`Error updating user: ${error.message}`);
            return "Update user operation failed";
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, read_write_1.readDataFromFile)(fileConstants_1.USER_FILE);
            const updatedUsers = users.filter((user) => user.id !== userId);
            yield (0, read_write_1.writeDataToFile)(fileConstants_1.USER_FILE, updatedUsers);
            return "User deleted successfully";
        }
        catch (error) {
            console.error(`Error deleting user: ${error.message}`);
            return "Delete user operation failed";
        }
    });
}
exports.deleteUser = deleteUser;
function createUser(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, read_write_1.readDataFromFile)(fileConstants_1.USER_FILE);
            const newUserId = (0, uuid_1.v4)();
            const newUser = {
                id: newUserId,
                username: username,
                email: email,
                password: password,
                bio: "", // Set initial values for other fields
                role: "user", // Set initial values for other fields
                post: [],
                groups: [],
                friends: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                profileImage: null,
                coverImage: null,
            };
            const updatedUsers = [...users, newUser];
            yield (0, read_write_1.writeDataToFile)(fileConstants_1.USER_FILE, updatedUsers);
            return "User created successfully";
        }
        catch (error) {
            console.error(`Error creating user: ${error.message}`);
            return "Create user operation failed";
        }
    });
}
exports.createUser = createUser;
