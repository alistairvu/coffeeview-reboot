import type { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"
import Cafe from "../../../models/Cafe"
import connectDB from "../../../db"

connectDB()

const searchCafes = async (req: NextApiRequest, res: NextApiResponse) => {
  const pageSize = 12
  const offset = Number(req.query.page) || 1

  const keyword = req.query.keyword
    ? {
        name: { $regex: `${req.query.keyword}`, $options: "i" },
        isShown: true,
      }
    : {
        isShown: true,
      }

  const count = await Cafe.countDocuments(keyword)

  const matchingCafes = await Cafe.find(req.body)
    .limit(pageSize)
    .skip(offset * pageSize)
    .populate("reviewAverage")

  return res.send({
    success: 1,
    data: {
      cafes: matchingCafes,
      page: offset,
      pageCount: Math.ceil(count / pageSize),
    },
  })
}

const handler = nc().get(searchCafes)

export default handler
