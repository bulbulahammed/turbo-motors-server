import ApiError from '../../../errors/apiError'
import { ISell } from './sell.interface'
import { Sell } from './sell.model'

// Create Sell Service
const createSell = async (sell: ISell): Promise<ISell | null> => {
  try {
    const createdSell = await Sell.create(sell)
    return createdSell
  } catch (error) {
    console.error('Error creating Sell:', error)
    throw new ApiError(500, 'Internal Server Error')
  }
}

// Get All Sales
const getSales = async (): Promise<ISell[] | null> => {
  try {
    const sales = await Sell.find()
    return sales
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(400, 'Failed to fetch users')
  }
}

export default {
  createSell,
  getSales,
}
