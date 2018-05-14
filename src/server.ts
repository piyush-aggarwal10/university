import express, {Request, Response} from 'express'
import path from 'path'
import routesapi from './routes/api'

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))


app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', routesapi)



app.listen(2222, () => console.log('Running server at http://localhost:2222')) 