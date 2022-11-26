import mongoose from 'mongoose'

const connectDB = async () => {
  if (process.env.NODE_ENV === 'test'){
    // * Connects to test db for __tests__
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING_TEST!, {
      authSource: 'admin'
    })
  } else {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, {
      authSource: 'admin',
    })
  }
}
export default connectDB
