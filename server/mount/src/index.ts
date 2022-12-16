import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from './db/connection'
import session from 'express-session'
const v1 = require('./v1/index')
//const errorController = require('./utils/errorController')

dotenv.config()

const app = express()

app.set('trust proxy', 1)
// middleware and cors options
app.use(express.json())
app.use(cors({credentials: true, origin: ['http://localhost:3000', 'https://4413-ecommerce.vercel.app', 'https://clownfish-app-fcbhe.ondigitalocean.app/']}))
app.options('*', cors())

// middleware for creating and storing user sessions
app.use(session({
  secret: 'secret_session_secret', // THIS WILL TYPICALLY BE IN THE .env
  resave: false,
  saveUninitialized: true,
}))

// global payment number for tracking 3rd payment 
// (because sessions are not working correctly currently)
export let payment_number = 1
export function incPaymentNumber() {
    payment_number++;
}

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
