import type { NextApiResponse } from "next"
import nc from "next-connect"
import { ExtendedRequest, protect } from "../../../middleware/authMiddleware"
import connectDB from "../../../db"

connectDB()

const getUserInfo = async (req: ExtendedRequest, res: NextApiResponse) => {
  if (req.user._id.toString() !== req.query.id && req.user.isAdmin === false) {
    return res.status(401).send({ success: 0, message: "Invalid request" })
  }

  return res.send({ success: 1, data: req.user })
}

const handler = nc().get(protect, getUserInfo)

export default handler
