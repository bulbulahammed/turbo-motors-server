/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/paginationFields'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { productFilterableFields } from './product.constant'
import { IProduct } from './product.interface'
import productService from './product.service'

// Create Product Controller
const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const { product } = req.body
      const result = await productService.createProduct(product)
      sendResponse<IProduct>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product Added Successfully!',
        data: result,
      })
    } catch (error) {
      sendResponse<IProduct>(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'An error occurred while creating the Product.',
        error: (error as Error).message as string,
      })
    }
  },
)

// Get All Product Controller
const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await productService.getAllProduct(filters, paginationOptions)
  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved Successfully!',
    meta: result.meta,
    data: result.data,
  })
})

// Get Single Product
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await productService.getSingleProduct(id)
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Retrieved Successfully!',
    data: result,
  })
})

// Update Product Controller
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await productService.updateProduct(id, updatedData)
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike Updated Successfully!',
    data: result,
  })
})

// Delete Product
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await productService.deleteProduct(id)
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike Deleted Successfully!',
    data: result,
  })
})

// Delete Products
const deleteMultipleProduct = catchAsync(
  async (req: Request, res: Response) => {
    const ids = req.body.ids // Assuming the IDs are sent in the request body as an array
    const deletedCount = await productService.deleteMultipleProduct(ids)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `${deletedCount} products deleted successfully!`,
      data: null,
    })
  },
)

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  deleteMultipleProduct,
}
