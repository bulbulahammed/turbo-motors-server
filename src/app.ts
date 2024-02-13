import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import routes from './app/routes'
const app: Application = express()

// cors
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, From Turbo Motors Server')
})

export default app
