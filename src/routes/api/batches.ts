import {Course, StudentBatchMapper, Batch, Lecture, Teacher, Student, Subject} from '../../db'
import db from '../../db'

import express, {Request, Response} from 'express'
const route = express.Router()

//Get all batches
route.get('/', (req:Request, res:Response) => {
    Batch.findAll({
        include: [Course]
    })
        .then((batches:any) => {
            res.json(batches)
        })
        .catch((err:Error) => console.log("Error in getting all batches"))
})

export default route
