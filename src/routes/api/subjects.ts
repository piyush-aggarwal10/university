import {Course, Batch, Lecture, Teacher, Student, Subject, StudentBatchMapper} from '../../db'
import db from '../../db'

import express, {Request, Response} from 'express'
const route = express.Router()

//Get all Subjects
route.get('/', (req:Request, res:Response) => {
    Subject.findAll()
    .then((subjects:any) => {
        res.json(subjects)
    })
    .catch((err:Error) => console.log("Error in getting all subjects"))
})

//Get a particular subject
route.get('/:id', (req:Request, res:Response) => {
    Subject.findOne({
        where: {
            subjectId: (req.params.id)
        }
    })
    .then((subject:any) => {
        res.json(subject)
    })
    .catch((err:Error) => {
        console.log("Error in getting a subject")
        res.send({success: false})
    })
})

//Add a new subject
route.post('/', (req:Request, res:Response) => {
   Course.findOne({
       where: {
           courseId: (req.body.courseId)
       }
   })
   .then((course:any) => {
        Subject.create({
            subjectName: req.body.subjectName,
            courseId: (req.body.courseId)
        })
        .then((subject:any) => {
            res.json(subject)
        })
        .catch((err:Error) => {
            console.log("Error adding new subject")
            res.send({success: false})
        })
   })
   .catch(() => {
       console.log("Error getting course")
       res.send({success: false})
    })
})


//Update subject
route.put('/:id', (req:Request, res:Response) => {
    Subject.findOne({
        where: {
            subjectId: req.params.id
        }
    })
    .then((subject:any) => {
        Course.findOne({
            where: {
                courseId: (req.body.courseId)
            }
        })
        .then((course:any) => {
            Subject.update({
                subjectName: req.body.subjectName,
                courseId: (req.body.courseId)
            },{
                where:{
                    subjectId: (req.params.id)
                }
            })
            .then((response:any) => {
                console.log("Update subject successful")
                res.json(response)
            })
            .catch((err:Error) => {
                console.log("Error updating subject")
                res.send({success: false})
            })
        })
        .catch((err:Error) => {
            console.log("Error getting course")
            res.send({success: false})
        })
    })
    .catch((err:Error) => {
        console.log("Error getting subject")
        res.send({success: false})
    })
})


//Get all teachers of a particular subject
route.get('/:id/teachers', (req:Request, res:Response) => {
   Subject.findOne({
       where: {
           subjectId: (req.params.id)
       }
   })
   .then((subject:any) => {
        Teacher.findAll({
            where: {
                subjectId: (req.params.id)
            }
        })
        .then((teachers:any) => {
            res.json(teachers)
        })
        .catch((err:Error) => {
            console.log("Error in getting all teachers")
            res.send({success: false})
        })
   })
   .catch((err:Error) => {
       console.log("Error getting subject")
       res.send({success: false})
   })
})

//Add new teacher for a subject
route.post('/:id/teachers', (req:Request, res:Response) => {
    Subject.findOne({
        where: {
            subjectId: req.params.id
        }
    })
    .then((subject:any) => {
        Teacher.create({
            teacherName: req.body.teacherName,
            subjectId: (req.params.id)
        })
        .then((teacher:any) => {
            res.json(teacher)
        })
        .catch((err:Error) => {
            console.log("Error adding teacher")
            res.send({success: false})
        })
    })
    .catch(() => {
        console.log("Error getting subject")
        res.send({success: false})
    })
})



export default route
