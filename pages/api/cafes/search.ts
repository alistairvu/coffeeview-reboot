import type { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"
import Cafe from "../../../models/Cafe"
import connectDB from "../../../db"

connectDB()

const searchCafes = async (req: NextApiRequest, res: NextApiResponse) => {
  const pageSize = 12
  const offset = Number(req.query.page) || 1
  const matchingCafes = await Cafe.find(req.body)
    .limit(pageSize)
    .skip(offset * pageSize)
    .populate("reviewAverage")

  return res.send({ success: 1, data: matchingCafes })
}

const handler = nc().post(searchCafes)

export default handler
