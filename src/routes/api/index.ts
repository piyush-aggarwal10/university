import express, {Router} from 'express'
const route:Router = express.Router()

import courseRoute from './courses'
import subjectRoute from './subjects'
import teacherRoute from './teachers'
import studentRoute from './students'

const routes = {
    courses: courseRoute,
    subjects: subjectRoute,
    teachers: teacherRoute,
    students: studentRoute
}

route.use('/courses', routes.courses) 
route.use('/subjects', routes.subjects)
route.use('/teachers', routes.teachers)
route.use('/students', routes.students)

export default route