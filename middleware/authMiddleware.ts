import jwt from "jsonwebtoken"
import User, { UserSchema } from "../models/User"
import type { NextApiRequest, NextApiResponse } from "next"

interface TokenData {
  _id: string
  iat: number
  exp: number
}

export interface ExtendedRequest extends NextApiRequest {
  user: UserSchema
}

export const protect = async (req: ExtendedRequest, res: NextApiResponse, next: any) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorised, no token" })
  }

  try {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenData
    req.user = await User.findById(decoded._id)
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: "Not authorised, token failed" })
  }
}
