"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
//Get all students
route.get('/', (req, res) => {
    db_1.Student.findAll()
        .then((students) => {
        res.json(students);
    })
        .catch((err) => {
        console.log("Error in getting students");
        res.send({ success: false });
    });
});
//Get a particular student
route.get('/:id', (req, res) => {
    db_1.Student.findOne({
        where: {
            studentId: (req.params.id)
        }
    })
        .then((student) => {
        res.json(student);
    })
        .catch((err) => {
        console.log("Error in getting student");
        res.send({ success: false });
    });
});
//Add a new student
route.post('/', (req, res) => {
    db_1.Student.create({
        studentName: req.body.studentName
    })
        .then((student) => {
        res.json(student);
    })
        .catch((err) => {
        console.log("Error adding new product");
        res.send({ success: false });
    });
});
//Update student 
route.put('/:id', (req, res) => {
    db_1.Student.findOne({
        where: {
            studentId: req.params.id
        }
    })
        .then((student) => {
        db_1.Student.update({
            studentName: req.body.studentName
        }, {
            where: {
                studentId: (req.params.id)
            }
        })
            .then((response) => {
            console.log("Update student successful");
            res.json(response);
        })
            .catch((err) => {
            console.log("Error updating student");
            res.send({ success: false });
        });
    })
        .catch((err) => {
        res.send({ success: false });
    });
});
//Get all batches for a particular student
route.get('/:id/batches', (req, res) => {
    db_1.Student.findOne({
        where: {
            studentId: (req.params.id)
        }
    })
        .then((student) => {
        db_1.StudentBatchMapper.findAll({
            include: [db_1.Batch],
            where: {
                studentId: (req.params.id)
            }
        })
            .then((studentBatchMappers) => {
            let batches = studentBatchMappers.map((studentBatchMapper) => {
                return studentBatchMapper.batch;
            });
            res.json(batches);
        })
            .catch((err) => {
            console.log("Error in getting batches");
            res.send({ success: false });
        });
    })
        .catch(() => {
        res.send({ success: false });
    });
});
//Add new batch for a student
route.post('/:id/batches', (req, res) => {
    db_1.Student.findOne({
        where: {
            studentId: (req.params.id)
        }
    })
        .then((student) => {
        db_1.Batch.findOne({
            where: {
                batchId: (req.body.batchId)
            }
        })
            .then((batch) => {
            db_1.StudentBatchMapper.create({
                studentId: (req.params.id),
                batchId: (req.body.batchId)
            })
                .then((response) => {
                res.json(response);
            })
                .catch(() => {
                console.log("Error adding batch");
                res.send({ success: false });
            });
        })
            .catch(() => {
            console.log("Error getting batch");
            res.send({ success: false });
        });
    })
        .catch((err) => {
        console.log("Unable to add new batch. Student id doesn't exist");
        res.send({ success: false });
    });
});
exports.default = route;
