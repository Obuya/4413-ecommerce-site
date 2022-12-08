import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from './db/connection'
import session from 'express-session'
const v1 = require('./v1/index')
//const errorController = require('./utils/errorController')

dotenv.config()

const app = express()

// middleware and cors options
app.use(express.json())
app.use(cors({credentials: true}))
app.options('*', cors())

// middleware for creating and storing user sessions
app.use(session({
  secret: 'secret_session_secret', // THIS WILL TYPICALLY BE IN THE .env
  resave: false,
  saveUninitialized: true,
}))
// api versioning
app.use('/v1', v1)


// TODO error handling
//app.use(errorController)

// establish db connection before starting server
connectDB().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
  })
})
