/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/apiError'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { paginationHelpers } from '../../../pelpers/paginationHelpers'
import { productFilterableFields } from './product.constant'
import { IProduct, IProductFilters } from './product.interface'
import { Product } from './product.model'

// Create Product Service
const createProduct = async (product: IProduct): Promise<IProduct | null> => {
  try {
    const createdProduct = await Product.create(product)
    return createdProduct
  } catch (error) {
    console.error('Error creating product:', error)
    throw new ApiError(500, 'Internal Server Error')
  }
}

// Get all Product
const getAllProduct = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IProduct[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const { searchTerm, ...filtersData } = filters
  // Define the `whereConditions` variable
  const whereConditions: any = {}
  // Create an empty array to store the `$and` conditions
  const andConditions = []
  // Search
  if (searchTerm) {
    andConditions.push({
      $or: productFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  // Filter
  if (Object.keys(filtersData).length) {
    // Loop through the filter data and add each condition to the array
    for (const [field, value] of Object.entries(filtersData)) {
      // If the value is not an empty string, add the condition to the array
      if (value !== '') {
        andConditions.push({ [field]: value })
      }
    }
  }
  // If there are any conditions in the array, add them to the where clause
  if (andConditions.length > 0) {
    whereConditions.$and = andConditions
  }
  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  const result = await Product.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Product.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// Update Product Service
const updateProduct = async (
  id: string,
  payload: Partial<IProduct>,
): Promise<IProduct | null> => {
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

// Get Single Product By ID
const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id)
  return result
}

// Delete Single Product Service
const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findByIdAndDelete(id)
  return result
}

// Delete Multiple Products Service
const deleteMultipleProduct = async (ids: string[]): Promise<number> => {
  try {
    const result = await Product.deleteMany({ _id: { $in: ids } })
    return result.deletedCount || 0
  } catch (error) {
    // Handle errors here
    console.error('Error deleting products:', error)
    throw error
  }
}

export default {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  deleteMultipleProduct,
}
