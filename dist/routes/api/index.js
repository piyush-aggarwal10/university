"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
const courses_1 = __importDefault(require("./courses"));
const subjects_1 = __importDefault(require("./subjects"));
const teachers_1 = __importDefault(require("./teachers"));
const students_1 = __importDefault(require("./students"));
const routes = {
    courses: courses_1.default,
    subjects: subjects_1.default,
    teachers: teachers_1.default,
    students: students_1.default
};
route.use('/courses', routes.courses);
route.use('/subjects', routes.subjects);
route.use('/teachers', routes.teachers);
route.use('/students', routes.students);
exports.default = route;
