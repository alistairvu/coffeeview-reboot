import mongoose from "mongoose"
import bcrypt from "bcrypt"

interface UserSchema extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean

  matchPassword: (password: string) => Promise<boolean>
}

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

User.index({
  email: 1,
})

User.pre("save", async function (this: UserSchema, next: any) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

User.methods = {
  matchPassword: async function (this: UserSchema, password: string) {
    return await bcrypt.compare(password, this.password)
  },
}

export default (mongoose.models.User as mongoose.Model<UserSchema>) || mongoose.model<UserSchema>("User", User)
