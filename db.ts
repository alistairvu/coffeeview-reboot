import mongoose from "mongoose"

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log("db connected!")
  } catch (err) {
    console.log(`an error occurred: ${err}`)
  }
}

export default connectDB
