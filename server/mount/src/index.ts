import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from './db/connection'
const v1 = require('./v1/index')

dotenv.config()

const app = express()

// middleware and cors options
app.use(express.json())
app.use(cors())
app.options('*', cors())

// api versioning
app.use('/v1', v1)


// establish db connection before starting server
connectDB().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
  })
})
