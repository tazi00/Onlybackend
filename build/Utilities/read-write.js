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
exports.writeDataToFile = exports.readDataFromFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const delay_1 = require("./delay");
// Generic function to read data from a JSON file
function readDataFromFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield promises_1.default.readFile(path_1.default.join(__dirname, "..", "db", filePath + ".json"), "utf8");
            yield (0, delay_1.delay)(2000);
            return JSON.parse(data);
        }
        catch (error) {
            console.error(`Error reading data from ${filePath}: ${error.message}`);
            return null;
        }
    });
}
exports.readDataFromFile = readDataFromFile;
// Function to write data to a JSON file
function writeDataToFile(filePath, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsonData = JSON.stringify(data, null, 2);
            console.log(jsonData);
            yield (0, delay_1.delay)(2000);
            yield promises_1.default.writeFile(path_1.default.join(__dirname, "..", "db", filePath + ".json"), jsonData, "utf8");
            console.log(`Data written to ${filePath}`);
        }
        catch (error) {
            console.error(`Error writing data to ${filePath}: ${error.message}`);
        }
    });
}
exports.writeDataToFile = writeDataToFile;
