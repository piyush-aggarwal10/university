"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
//Get all teachers
route.get('/', (req, res) => {
    db_1.Teacher.findAll()
        .then((teachers) => {
        res.json(teachers);
    })
        .catch((err) => {
        console.log("Error in getting all teachers");
        res.send({ success: false });
    });
});
//Get a particular teacher
route.get('/:id', (req, res) => {
    db_1.Teacher.findOne({
        where: {
            teacherId: req.params.id
        }
    })
        .then((teacher) => {
        res.json(teacher);
    })
        .catch((err) => {
        console.log("Error in getting teacher");
        res.send({ success: false });
    });
});
//Add a new teacher
route.post('/', (req, res) => {
    db_1.Subject.findOne({
        where: {
            subjectId: (req.body.subjectId)
        }
    })
        .then((subject) => {
        db_1.Teacher.create({
            teacherName: req.body.teacherName,
            subjectId: (req.body.subjectId)
        })
            .then((teacher) => {
            res.json(teacher);
        })
            .catch((err) => {
            console.log("Error adding new teacher");
            res.send({ success: false });
        });
    })
        .catch((err) => {
        console.log("Error getting subject");
        res.send({ success: false });
    });
});
//Update teacher
route.put('/:id', (req, res) => {
    db_1.Subject.findOne({
        where: {
            subjectId: (req.body.subjectId)
        }
    })
        .then((subject) => {
        db_1.Teacher.findOne({
            where: {
                teacherId: req.params.id
            }
        })
            .then((teacherany) => {
            db_1.Teacher.update({
                teacherName: req.body.teacherName,
                subjectId: (req.body.subjectId)
            }, {
                where: {
                    teacherId: (req.params.id)
                }
            })
                .then((response) => {
                console.log("Update teacher successful");
                res.json(response);
            })
                .catch((err) => {
                console.log("Error updating teacher");
                res.send({ success: false });
            });
        })
            .catch((err) => {
            console.log("Error getting teacher");
            res.send({ success: false });
        });
    })
        .catch((err) => {
        console.log("Error getting subject");
        res.send({ success: false });
    });
});
//Get all batches of a particular teacher
route.get('/:id/batches', (req, res) => {
    db_1.Teacher.findOne({
        where: {
            subjectId: (req.params.id)
        },
        attributes: ['subjectId']
    })
        .then((subId) => {
        db_1.Subject.findOne({
            where: {
                subjectId: subId
            },
            attributes: ['courseId']
        })
            .then((courseId) => {
            db_1.Batch.findAll({
                where: {
                    courseId: courseId
                }
            })
                .then((batches) => {
                console.log("batches: ", batches);
                res.json(batches);
            })
                .catch((err) => {
                console.log("Error in getting batches");
                res.send({ success: false });
            });
        })
            .catch((err) => {
            console.log("Error in getting course");
            res.send({ success: false });
        });
    })
        .catch((err) => {
        console.log("Error in getting subject");
        res.send({ success: false });
    });
});
exports.default = route;
