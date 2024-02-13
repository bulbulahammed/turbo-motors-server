import { Model } from 'mongoose'

export type IProduct = {
  title: string
  img: string
  price: number
  releaseDate: string
  brand: string
  model: string
  type: string
  size: string
  color: string
  suspension: string
  quantity: number
  seller: string
}

export type ProductModel = Model<IProduct>

export type IProductFilters = {
  searchTerm?: string
}
