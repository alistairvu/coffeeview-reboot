import mongoose from "mongoose"

export interface CafeSchema extends mongoose.Document {
  name: string
  address: string
  district: string
  hours: string
  phone: string
  images: string[]
  tags: string[]
  isShown: boolean
  reviewTotal: number
  reviewCount: number
  reviewAverage: number
}

const Cafe = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  hours: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  isShown: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
    required: true,
  },
  reviewTotal: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
})

Cafe.virtual("reviewAverage").get(function (this: CafeSchema) {
  if (this.reviewCount == 0) {
    return 0
  }
  return this.reviewTotal / this.reviewCount
})

export default (mongoose.models.Cafe as mongoose.Model<CafeSchema>) || mongoose.model<CafeSchema>("Cafe", Cafe)
