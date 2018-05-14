import {Course, StudentBatchMapper, Batch, Lecture, Teacher, Student, Subject} from '../../db'
import db from '../../db'

import express, {Request, Response} from 'express'
const route = express.Router()

//Get all courses
route.get('/', (req:any, res:any) => {
    Course.findAll()
        .then((courses:any) => {
            res.json(courses)
        })
        .catch((err:Error) => console.log("Error in getting all courses"))
})

//Get a particular course
route.get('/:id', (req:any, res:any) => {
    Course.findOne({
        where: {
            courseId: req.params.id
        }
    })
    .then((course:any) => {
        res.json(course)
    })
    .catch((err:Error) => console.log("Error in getting course"))
})

//Add new course
route.post('/',(req:any,res:any)=>{

    let courseName=req.body.courseName
    Course.create({courseName:courseName})
    .then((addedCourse:any)=>{
        res.json({success:true})
    })
    .catch((err:Error)=>res.send({success:false}))
})

//Update course
route.put('/:id',(req:any,res:any)=>{
    Course.findOne({
        where:
        {
            courseId: req.params.id
        }
    })
    .then((course:any)=>{
        Course.update({
            courseName: req.body.courseName
        })
        .then((response:any) => res.json(response))
        .catch(() => res.send({success: false}))
    })    
    .catch((err:Error)=>res.send({success:false}))
})

//Get all batches for a particular course
route.get('/:id/batches', (req:any, res:any) => {
    Batch.findAll({
        where: {
            courseId: req.params.id
        }
    })
    .then((batches:any) => {
        res.json(batches)
    })
    .catch((err:Error) => console.log("Error in getting all batches"))
})

//Get a particular batch of a particular course
route.get('/:courseId/batches/:batchId', (req:any, res:any) => {
    Batch.findOne({
        where: {
            courseId: (req.params.courseId),
            batchId: (req.params.batchId)
        }
    })
    .then((batch:any) => {
        res.json(batch)
    })
    .catch((err:any) => console.log("Error in getting batch"))
})

//Add new batch for a particular course
route.post('/:id1/batches',(req:any,res:any)=>{

    let batchName=req.body.batchName
    Batch.create({
        batchName: batchName,
        courseId: req.params.id1
    })
    .then((addedBatch:any)=>{
        res.json({success:true})
    })
    .catch((err:Error)=>res.send({success:false}))
})


//Update batch for a particular course
route.put('/:courseId/batches/:batchId', (req:any, res:any) => {
    Batch.findOne({
        where:
        {
            courseId: req.params.courseId,
            batchId: req.params.batchId
        }
    })
    .then((batch:any)=>{
        Batch.update({
            batchName: req.body.batchName
        },{
            where: {
                courseId: req.params.courseId,
                batchId: req.params.batchId  
            }
        })
        .then((updatedBatch:any)=>{
            res.send({success:true})
        })
        .catch((err:any) => {
            console.log("Error updating batch")
            res.send({success:false})
        })     
    })
    .catch((err:any) => {
        console.log("Error getting batch")
        res.send({success:false})
    })     
})

//Get all lectures for a particular batch of a particular course
route.get('/:courseId/batches/:batchId/lectures', (req:any, res:any) => {
    Lecture.findAll({
        where: {
            batchId: req.params.batchId
        }
    })
    .then((lectures:any) => {
        res.json(lectures)
    })
    .catch((err:any) => console.log("Error in getting all lectures"))
})

//Get a particular lecture for a particular batch of a particular course
route.get('/:courseId/batches/:batchId/lectures/:lectureId', (req:any, res:any) => {
    Lecture.findOne({
        where: {
            batchId: req.params.batchId
        }
    })
    .then((lecture:any) => {
        res.json(lecture)
    })
    .catch((err:any) => console.log("Error in getting lectures"))
})

//Add new lecture for a particular batch
route.post('/:id1/batches/:id2/lectures', (req:any, res:any) => {
    Teacher.findOne({
        where:{
            teacherId: req.body.teacherId
        },
        attributes: ['subjectId']
    })
    .then((subject:any)=>{
        Lecture.create({
            lectureName: req.body.lectureName,
            subjectId: subject.subjectId,
            teacherId: (req.body.teacherId),
            batchId: (req.params.id2)
        })
        .then((lecture:any)=>{
            res.json(lecture)
        })
        .catch((err:any) => {
            res.send({success:false})
        })
    })
    
})

//Update lecture
route.put('/:id1/batches/:id2/lectures/:id3', (req:any, res:any)=>{
    Lecture.update({
        lectureName: req.body.lectureName
    },{
        where: {
            lectureId: req.params.id3,
            batchId: req.params.id2
        }
    })
    .then((updatedLecture:any)=>{
        res.json(updatedLecture)
    })
    .catch((err:any) => res.send({success:false}))
})

//Get all students for a particular batch of a particular course
route.get('/:courseId/batches/:batchId/students', (req:any, res:any) => {
    StudentBatchMapper.findAll({
        include: [Student],
        where: {
            batchId: req.params.batchId
        }
    })
    .then((studentBatchMappers:any) => {
        let students = studentBatchMappers.map((studentBatchMapper) => {
            return studentBatchMapper.student
           })
    
           res.json(students)
    })
})

//Add new student for a batch
route.post('/:id1/batches/:id2/students',(req:any,res:any)=>{
    StudentBatchMapper.create({
        studentId: req.body.studentId,
        batchId: req.params.id2
    })
    .then((studentBatchMapper:any)=>{
        res.json(studentBatchMapper)
    })
    .catch((err:any) => res.send({success:false}))
})

//Get all teachers for a particular batch of a particular course
route.get('/:id1/batches/:id2/teachers',(req:Request,res:Response)=>{
    var teachersList=[];
    Subject.findAll({
        where:{
            courseId:req.params.id1
        }
    })
    .then((subjects:any)=>{
        Teacher.findAll()
        .then((teachers:any)=>{
            for(let teacher of teachers)
            {
                for(let subject of subjects)
                {
                    if(teacher.subjectId===subject.subjectId)
                    {
                        teachersList.push(teacher)
                    }
                }
            }

            res.json(teachersList)
        })
    })
    
})


export default route
