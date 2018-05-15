"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db = new sequelize_1.default('nodejs', 'piyush', 'password', {
    dialect: 'sqlite',
    host: 'localhost',
    //port: 98998
    // pool: {
    //     max: 5,
    //     min: 0,
    //     idle: 10000
    // },
    storage: './universitydb.db'
});
//Student table
const Student = db.define('student', {
    studentId: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    studentName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
});
exports.Student = Student;
//Course table
const Course = db.define('course', {
    courseId: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    courseName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
});
exports.Course = Course;
//Batch table
const Batch = db.define('batch', {
    batchId: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    batchName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
});
exports.Batch = Batch;
//Subject table
const Subject = db.define('subject', {
    subjectId: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subjectName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
});
exports.Subject = Subject;
//Teacher table
const Teacher = db.define('teacher', {
    teacherId: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    teacherName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
});
exports.Teacher = Teacher;
//Lecture table
const Lecture = db.define('lecture', {
    lectureId: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lectureName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
});
exports.Lecture = Lecture;
//Student-Batch Mapper table
const StudentBatchMapper = db.define('studentBatchMapper', {
    studentBatchMapperId: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});
exports.StudentBatchMapper = StudentBatchMapper;
Course.hasMany(Batch, { foreignKey: 'courseId', sourceKey: 'courseId' });
Batch.belongsTo(Course, { foreignKey: 'courseId', targetKey: 'courseId' });
Course.hasMany(Subject, { foreignKey: 'courseId', sourceKey: 'courseId' });
Subject.belongsTo(Course, { foreignKey: 'courseId', targetKey: 'courseId' });
Subject.hasMany(Teacher, { foreignKey: 'subjectId', sourceKey: 'subjectId' });
Teacher.belongsTo(Subject, { foreignKey: 'subjectId', targetKey: 'subjectId' });
Subject.hasMany(Lecture, { foreignKey: 'subjectId', sourceKey: 'subjectId' });
Lecture.belongsTo(Subject, { foreignKey: 'subjectId', targetKey: 'subjectId' });
Teacher.hasMany(Lecture, { foreignKey: 'teacherId', sourceKey: 'teacherId' });
Lecture.belongsTo(Teacher, { foreignKey: 'teacherId', targetKey: 'teacherId' });
Batch.hasMany(Lecture, { foreignKey: 'batchId', sourceKey: 'batchId' });
Lecture.belongsTo(Batch, { foreignKey: 'batchId', targetKey: 'batchId' });
Batch.hasMany(StudentBatchMapper, { foreignKey: 'batchId', sourceKey: 'batchId' });
StudentBatchMapper.belongsTo(Batch, { foreignKey: 'batchId', targetKey: 'batchId' });
Student.hasMany(StudentBatchMapper, { foreignKey: 'studentId', sourceKey: 'studentId' });
StudentBatchMapper.belongsTo(Student, { foreignKey: 'studentId', targetKey: 'studentId' });
function task() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.authenticate();
            yield db.sync();
        }
        catch (err) {
            console.error(err);
        }
    });
}
task();
exports.default = db;
