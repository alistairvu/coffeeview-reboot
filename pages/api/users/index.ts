import type { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"
import jwt from "jsonwebtoken"
import User from "../../../models/User"
import connectDB from "../../../db"

connectDB()

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, password } = req.body

  const matchingUser = await User.findOne({ email: email })

  if (matchingUser) {
    return res.status(401).send({ success: 0, message: `User with email ${email} already exists` })
  }

  const newUser = await User.create({ firstName, lastName, email, password })
  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET)
  res.send({
    success: 1,
    data: {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    },
    token: token,
  })
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body
  const matchingUser = await User.findOne({ email: email })
  if (!matchingUser) {
    return res.status(401).send({ success: 0, message: "Incorrect email or password" })
  }

  const matchPassword = await matchingUser.matchPassword(password)
  if (!matchPassword) {
    return res.status(401).send({ success: 0, message: "Incorrect email or password" })
  }

  const token = jwt.sign({ _id: matchingUser._id }, process.env.JWT_SECRET)
  res.send({
    success: 1,
    data: {
      _id: matchingUser._id,
      firstName: matchingUser.firstName,
      lastName: matchingUser.lastName,
      email: matchingUser.email,
      isAdmin: matchingUser.isAdmin,
    },
    token: token,
  })
}

const handler = nc().post(registerUser).put(loginUser)

export default handler
