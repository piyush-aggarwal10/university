"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
//Get all courses
route.get('/', (req, res) => {
    db_1.Course.findAll()
        .then((courses) => {
        res.json(courses);
    })
        .catch((err) => console.log("Error in getting all courses"));
});
//Get a particular course
route.get('/:id', (req, res) => {
    db_1.Course.findOne({
        where: {
            courseId: req.params.id
        }
    })
        .then((course) => {
        res.json(course);
    })
        .catch((err) => console.log("Error in getting course"));
});
//Add new course
route.post('/', (req, res) => {
    let courseName = req.body.courseName;
    db_1.Course.create({ courseName: courseName })
        .then((addedCourse) => {
        res.json({ success: true });
    })
        .catch((err) => res.send({ success: false }));
});
//Update course
route.put('/:id', (req, res) => {
    db_1.Course.findOne({
        where: {
            courseId: req.params.id
        }
    })
        .then((course) => {
        db_1.Course.update({
            courseName: req.body.courseName
        })
            .then((response) => res.json(response))
            .catch(() => res.send({ success: false }));
    })
        .catch((err) => res.send({ success: false }));
});
//Get all batches for a particular course
route.get('/:id/batches', (req, res) => {
    db_1.Batch.findAll({
        where: {
            courseId: req.params.id
        }
    })
        .then((batches) => {
        res.json(batches);
    })
        .catch((err) => console.log("Error in getting all batches"));
});
//Get a particular batch of a particular course
route.get('/:courseId/batches/:batchId', (req, res) => {
    db_1.Batch.findOne({
        where: {
            courseId: (req.params.courseId),
            batchId: (req.params.batchId)
        }
    })
        .then((batch) => {
        res.json(batch);
    })
        .catch((err) => console.log("Error in getting batch"));
});
//Add new batch for a particular course
route.post('/:id1/batches', (req, res) => {
    let batchName = req.body.batchName;
    db_1.Batch.create({
        batchName: batchName,
        courseId: req.params.id1
    })
        .then((addedBatch) => {
        res.json({ success: true });
    })
        .catch((err) => res.send({ success: false }));
});
//Update batch for a particular course
route.put('/:courseId/batches/:batchId', (req, res) => {
    db_1.Batch.findOne({
        where: {
            courseId: req.params.courseId,
            batchId: req.params.batchId
        }
    })
        .then((batch) => {
        db_1.Batch.update({
            batchName: req.body.batchName
        }, {
            where: {
                courseId: req.params.courseId,
                batchId: req.params.batchId
            }
        })
            .then((updatedBatch) => {
            res.send({ success: true });
        })
            .catch((err) => {
            console.log("Error updating batch");
            res.send({ success: false });
        });
    })
        .catch((err) => {
        console.log("Error getting batch");
        res.send({ success: false });
    });
});
//Get all lectures for a particular batch of a particular course
route.get('/:courseId/batches/:batchId/lectures', (req, res) => {
    db_1.Lecture.findAll({
        where: {
            batchId: req.params.batchId
        }
    })
        .then((lectures) => {
        res.json(lectures);
    })
        .catch((err) => console.log("Error in getting all lectures"));
});
//Get a particular lecture for a particular batch of a particular course
route.get('/:courseId/batches/:batchId/lectures/:lectureId', (req, res) => {
    db_1.Lecture.findOne({
        where: {
            batchId: req.params.batchId
        }
    })
        .then((lecture) => {
        res.json(lecture);
    })
        .catch((err) => console.log("Error in getting lectures"));
});
//Add new lecture for a particular batch
route.post('/:id1/batches/:id2/lectures', (req, res) => {
    db_1.Teacher.findOne({
        where: {
            teacherId: req.body.teacherId
        },
        attributes: ['subjectId']
    })
        .then((subject) => {
        db_1.Lecture.create({
            lectureName: req.body.lectureName,
            subjectId: subject.subjectId,
            teacherId: (req.body.teacherId),
            batchId: (req.params.id2)
        })
            .then((lecture) => {
            res.json(lecture);
        })
            .catch((err) => {
            res.send({ success: false });
        });
    });
});
//Update lecture
route.put('/:id1/batches/:id2/lectures/:id3', (req, res) => {
    db_1.Lecture.update({
        lectureName: req.body.lectureName
    }, {
        where: {
            lectureId: req.params.id3,
            batchId: req.params.id2
        }
    })
        .then((updatedLecture) => {
        res.json(updatedLecture);
    })
        .catch((err) => res.send({ success: false }));
});
//Get all students for a particular batch of a particular course
route.get('/:courseId/batches/:batchId/students', (req, res) => {
    var studentBatchList;
    db_1.StudentBatchMapper.findAll({
        include: [db_1.Student],
        where: {
            batchId: req.params.batchId
        }
    })
        .then((studentBatchList) => {
        let students = studentBatchList.map((studentBatchMapper) => {
            return studentBatchMapper.student;
        });
        res.json(students);
    });
});
//Add new student for a batch
route.post('/:id1/batches/:id2/students', (req, res) => {
    db_1.StudentBatchMapper.create({
        studentId: req.body.studentId,
        batchId: req.params.id2
    })
        .then((studentBatchMapper) => {
        res.json(studentBatchMapper);
    })
        .catch((err) => res.send({ success: false }));
});
//Get all teachers for a particular batch of a particular course
route.get('/:id1/batches/:id2/teachers', (req, res) => {
    var teachersList;
    db_1.Subject.findAll({
        where: {
            courseId: req.params.id1
        }
    })
        .then((subjects) => {
        db_1.Teacher.findAll()
            .then((teachers) => {
            for (let teacher of teachers) {
                for (let subject of subjects) {
                    if (teacher.subjectId === subject.subjectId) {
                        teachersList.push(teacher);
                    }
                }
            }
            res.json(teachersList);
        });
    });
});
exports.default = route;
