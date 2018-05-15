import express, {Router} from 'express'
const route:Router = express.Router()

import courseRoute from './courses'
import subjectRoute from './subjects'
import teacherRoute from './teachers'
import studentRoute from './students'
import batchRoute from './batches'

const routes = {
    courses: courseRoute,
    subjects: subjectRoute,
    teachers: teacherRoute,
    students: studentRoute,
    batches: batchRoute
}

route.use('/courses', routes.courses) 
route.use('/subjects', routes.subjects)
route.use('/teachers', routes.teachers)
route.use('/students', routes.students)
route.use('/batches', routes.batches)

export default route