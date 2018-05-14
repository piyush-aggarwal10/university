import Sequelize from 'sequelize' 
const db = new Sequelize('nodejs', 'piyush', 'password', {
    dialect: 'sqlite',
    host: 'localhost',
    //port: 98998
    // pool: {
    //     max: 5,
    //     min: 0,
    //     idle: 10000
    // },
    storage: './universitydb.db'
})


//Student table
const Student = db.define('student', {
    studentId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    studentName: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

//Course table
const Course = db.define('course', {
    courseId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    courseName: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

//Batch table
const Batch = db.define('batch', {
    batchId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    batchName: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

//Subject table
const Subject = db.define('subject', {
    subjectId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    subjectName: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})
//Teacher table
const Teacher = db.define('teacher', {
    teacherId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    teacherName: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})



//Lecture table
const Lecture = db.define('lecture', {
    lectureId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    lectureName: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})



//Student-Batch Mapper table
const StudentBatchMapper = db.define('studentBatchMapper', {
    studentBatchMapperId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
})

Course.hasMany(Batch, {foreignKey: 'courseId', sourceKey: 'courseId'});
Batch.belongsTo(Course, {foreignKey: 'courseId', targetKey: 'courseId'}); 

Course.hasMany(Subject, {foreignKey: 'courseId', sourceKey: 'courseId'});
Subject.belongsTo(Course, {foreignKey: 'courseId', targetKey: 'courseId'}); 

Subject.hasMany(Teacher, {foreignKey: 'subjectId', sourceKey: 'subjectId'});
Teacher.belongsTo(Subject, {foreignKey: 'subjectId', targetKey: 'subjectId'}); 

Subject.hasMany(Lecture, {foreignKey: 'subjectId', sourceKey: 'subjectId'});
Lecture.belongsTo(Subject, {foreignKey: 'subjectId', targetKey: 'subjectId'}); 

Teacher.hasMany(Lecture, {foreignKey: 'teacherId', sourceKey: 'teacherId'});
Lecture.belongsTo(Teacher, {foreignKey: 'teacherId', targetKey: 'teacherId'}); 

Batch.hasMany(Lecture, {foreignKey: 'batchId', sourceKey: 'batchId'});
Lecture.belongsTo(Batch, {foreignKey: 'batchId', targetKey: 'batchId'}); 

Batch.hasMany(StudentBatchMapper, {foreignKey: 'batchId', sourceKey: 'batchId'});
StudentBatchMapper.belongsTo(Batch, {foreignKey: 'batchId', targetKey: 'batchId'});

Student.hasMany(StudentBatchMapper, {foreignKey: 'studentId', sourceKey: 'studentId'});
StudentBatchMapper.belongsTo(Student, {foreignKey: 'studentId', targetKey: 'studentId'});



async function task () {
    try {
        await db.authenticate()
        await db.sync()
    } catch (err) {
        console.error(err)
    }
}
task ()

export {
    Batch,
    Subject,
    Teacher,
    Course,
    Lecture,
    Student,
    StudentBatchMapper
}

export default db

