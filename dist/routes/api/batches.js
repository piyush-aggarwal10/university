"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
//Get all batches
route.get('/', (req, res) => {
    db_1.Batch.findAll({
        include: [db_1.Course]
    })
        .then((batches) => {
        res.json(batches);
    })
        .catch((err) => console.log("Error in getting all batches"));
});
exports.default = route;
