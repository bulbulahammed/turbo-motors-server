import { Schema, model } from 'mongoose'
import { IProduct, ProductModel } from './product.interface'

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    suspension: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    seller: {
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

export const Product = model<IProduct, ProductModel>('Product', productSchema)
