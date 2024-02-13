import { Model } from 'mongoose'

export type ISell = {
  seller: string
  buyer: string
  salesQuantity: number
  totalPrice: number
  salesDate: string
}

export type SellModel = Model<ISell>
