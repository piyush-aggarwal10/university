"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
//Get all Subjects
route.get('/', (req, res) => {
    db_1.Subject.findAll()
        .then((subjects) => {
        res.json(subjects);
    })
        .catch((err) => console.log("Error in getting all subjects"));
});
//Get a particular subject
route.get('/:id', (req, res) => {
    db_1.Subject.findOne({
        where: {
            subjectId: (req.params.id)
        }
    })
        .then((subject) => {
        res.json(subject);
    })
        .catch((err) => {
        console.log("Error in getting a subject");
        res.send({ success: false });
    });
});
//Add a new subject
route.post('/', (req, res) => {
    db_1.Course.findOne({
        where: {
            courseId: (req.body.courseId)
        }
    })
        .then((course) => {
        db_1.Subject.create({
            subjectName: req.body.subjectName,
            courseId: (req.body.courseId)
        })
            .then((subject) => {
            res.json(subject);
        })
            .catch((err) => {
            console.log("Error adding new subject");
            res.send({ success: false });
        });
    })
        .catch(() => {
        console.log("Error getting course");
        res.send({ success: false });
    });
});
//Update subject
route.put('/:id', (req, res) => {
    db_1.Subject.findOne({
        where: {
            subjectId: req.params.id
        }
    })
        .then((subject) => {
        db_1.Course.findOne({
            where: {
                courseId: (req.body.courseId)
            }
        })
            .then((course) => {
            db_1.Subject.update({
                subjectName: req.body.subjectName,
                courseId: (req.body.courseId)
            }, {
                where: {
                    subjectId: (req.params.id)
                }
            })
                .then((response) => {
                console.log("Update subject successful");
                res.json(response);
            })
                .catch((err) => {
                console.log("Error updating subject");
                res.send({ success: false });
            });
        })
            .catch((err) => {
            console.log("Error getting course");
            res.send({ success: false });
        });
    })
        .catch((err) => {
        console.log("Error getting subject");
        res.send({ success: false });
    });
});
//Get all teachers of a particular subject
route.get('/:id/teachers', (req, res) => {
    db_1.Subject.findOne({
        where: {
            subjectId: (req.params.id)
        }
    })
        .then((subject) => {
        db_1.Teacher.findAll({
            where: {
                subjectId: (req.params.id)
            }
        })
            .then((teachers) => {
            res.json(teachers);
        })
            .catch((err) => {
            console.log("Error in getting all teachers");
            res.send({ success: false });
        });
    })
        .catch((err) => {
        console.log("Error getting subject");
        res.send({ success: false });
    });
});
//Add new teacher for a subject
route.post('/:id/teachers', (req, res) => {
    db_1.Subject.findOne({
        where: {
            subjectId: req.params.id
        }
    })
        .then((subject) => {
        db_1.Teacher.create({
            teacherName: req.body.teacherName,
            subjectId: (req.params.id)
        })
            .then((teacher) => {
            res.json(teacher);
        })
            .catch((err) => {
            console.log("Error adding teacher");
            res.send({ success: false });
        });
    })
        .catch(() => {
        console.log("Error getting subject");
        res.send({ success: false });
    });
});
exports.default = route;
