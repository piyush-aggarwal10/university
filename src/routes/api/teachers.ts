import {Course, Batch, Lecture, Teacher, Student, Subject} from '../../db'
import db from '../../db'

import express, {Request, Response} from 'express'
const route = express.Router()

//Get all teachers
route.get('/', (req: any, res: any) => {
    Teacher.findAll()
    .then((teachers: any) => {
        res.json(teachers)
    })
    .catch((err: Error) => {
        console.log("Error in getting all teachers")
        res.send({success: false})
    })
})

//Get a particular teacher
route.get('/:id', (req: any, res: any) => {
    Teacher.findOne({
        where: {
            teacherId: req.params.id
        }
    })
    .then((teacher: any) => {
        res.json(teacher)
    })
    .catch((err : Error) => {
        console.log("Error in getting teacher")
        res.send({success: false})
    })
})

//Add a new teacher
route.post('/', (req: any, res: any) => {
    Subject.findOne({
        where: {
            subjectId: (req.body.subjectId)
        }
    })
    .then((subject: any) => {
        Teacher.create({
            teacherName: req.body.teacherName,
            subjectId: (req.body.subjectId)
        })
        .then((teacher:  any) => {
            res.json(teacher)
        })
        .catch((err: Error) => {
            console.log("Error adding new teacher")
            res.send({success: false})
        })
    })
    .catch((err: Error) => {
        console.log("Error getting subject")
        res.send({success: false})
    })
})

//Update teacher
route.put('/:id', (req: any, res:any) => {
    Subject.findOne({
        where: {
            subjectId: (req.body.subjectId)
        }
    })
    .then((subject:any) => {
        Teacher.findOne({
            where: {
                teacherId: req.params.id
            }
        })
        .then((teacherany) => {
            Teacher.update({
                teacherName: req.body.teacherName,
                subjectId: (req.body.subjectId)
            },{
                where:{
                    teacherId: (req.params.id)
                }
            })
            .then((response:any) => {
                console.log("Update teacher successful")
                res.json(response)
            })
            .catch((err:Error) => {
                console.log("Error updating teacher")
                res.send({success: false})
            })
        })
        .catch((err:Error) => {
            console.log("Error getting teacher")
            res.send({success: false})
        })
    })
    .catch((err:Error) => {
        console.log("Error getting subject")
        res.send({success: false})
    })
})

//Get all batches of a particular teacher
route.get('/:id/batches', (req:any, res:any) => {
    Teacher.findOne({
        where: {
            subjectId: (req.params.id)
        },
        attributes: ['subjectId']
    })
    .then((subId:any) => {
        Subject.findOne({
            where: {
                subjectId: subId
            },
            attributes: ['courseId']
        })
        .then((courseId:any) => {
            Batch.findAll({
                where: {
                    courseId: courseId
                }
            })
            .then((batches:any) => {
                console.log("batches: ", batches)
                res.json(batches)
            })
            .catch((err:Error) => {
                console.log("Error in getting batches")
                res.send({success: false})
            })
        })
        .catch((err:Error) => {
            console.log("Error in getting course")
            res.send({success: false})
        })
    })
    .catch((err:Error) => {
        console.log("Error in getting subject")
        res.send({success: false})
    })
})


export default route
