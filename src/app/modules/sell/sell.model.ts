import { Schema, model } from 'mongoose'
import { ISell, SellModel } from './sell.interface'

const sellSchema = new Schema<ISell>(
  {
    seller: {
      type: String,
      required: true,
    },
    buyer: {
      type: String,
      required: true,
    },
    salesQuantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    salesDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Sell = model<ISell, SellModel>('Sell', sellSchema)
