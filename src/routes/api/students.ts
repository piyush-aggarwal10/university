import {Course, Batch, Lecture, Teacher, Student, Subject, StudentBatchMapper} from '../../db'
import db from '../../db'

import express, {Request, Response, Router} from 'express'
const route: Router = express.Router()

//Get all students
route.get('/', (req:Request, res:Response) => {
    Student.findAll()
        .then((students:any) => {
            res.json(students)
        })
        .catch((err:Error) => {
            console.log("Error in getting students")
            res.send({success: false})
        })
})

//Get a particular student
route.get('/:id', (req:Request, res:Response) => { 
    Student.findOne({
        where: {
            studentId: (req.params.id)
        }
    })
    .then((student:any) => {
        res.json(student)
    })
    .catch((err:Error) => {
        console.log("Error in getting student")
        res.send({success: false})
    })
})

//Add a new student
route.post('/', (req:Request, res:Response) => {
    Student.create({
        studentName: req.body.studentName
    })
    .then((student:any) => {
        res.json(student)
    })
    .catch((err:Error) => {
        console.log("Error adding new product")
        res.send({success: false})
    })
})

//Update student 
route.put('/:id', (req:Request, res:Response) => {
    Student.findOne({
        studentId: req.params.id
    })
    .then((student:any) => {
        Student.update({
            studentName: req.body.studentName
        },{
            where:{
                studentId: (req.params.id)
            }
        })
        .then((response:any) => {
            console.log("Update student successful")
            res.json(response)
        })
        .catch((err:Error) => {
            console.log("Error updating student")
            res.send({success: false})
        })
    })
    .catch((err:Error) => {
        res.send({success: false})
    })
})

//Get all batches for a particular student
route.get('/:id/batches', (req:Request, res:Response) => {
    Student.findOne({
        where: {
            studentId: (req.params.id)
        }
    })
    .then((student:any) => {
        StudentBatchMapper.findAll({
            include: [Batch],
            where: {
                studentId: (req.params.id)
            }
        })
        .then((studentBatchMappers:any) => {
           let batches = studentBatchMappers.map((studentBatchMapper) => {
            return studentBatchMapper.batch
           })
    
           res.json(batches)
        })
        .catch((err:Error) => {
            console.log("Error in getting batches")
            res.send({success: false})
        })
    })
    .catch(() => {
        res.send({success: false})
    })
})

//Add new batch for a student
route.post('/:id/batches', (req:Request, res:Response) => {
    Student.findOne({
        where: {
            studentId: (req.params.id)
        }
    })
    .then((student:any) => {
        Batch.findOne({
            where: {
                batchId: (req.body.batchId)
            }
        })
        .then((batch:any) => {
            StudentBatchMapper.create({
                studentId: (req.params.id),
                batchId: (req.body.batchId)
            })
            .then((response:any) => {
                res.json(response)
            })
            .catch(() => {
                console.log("Error adding batch")
                res.send({success: false})
            })
        })
        .catch(() => {
            console.log("Error getting batch")
            res.send({success: false})
        })
    })
    .catch((err:Error) => {
        console.log("Unable to add new batch. Student id doesn't exist")
        res.send({success: false})
    })
})


export default route
