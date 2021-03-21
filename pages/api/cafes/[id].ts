import type { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"
import Cafe from "../../../models/Cafe"
import connectDB from "../../../db"

connectDB()

const getCafeById = async (req: NextApiRequest, res: NextApiResponse) => {
  const matchingCafe = await Cafe.findById(req.query.id)

  if (!matchingCafe || !matchingCafe.isShown) {
    return res.status(404).send({ success: 0, message: "No matching cafes found" })
  }
  return res.send({ success: 1, data: { ...matchingCafe.toJSON(), reviewAverage: matchingCafe.reviewAverage } })
}

const handler = nc().get(getCafeById)

export default handler
