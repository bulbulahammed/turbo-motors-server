/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ISell } from './sell.interface'
import sellService from './sell.service'

// Create Sell Controller
const createSell: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const { sell } = req.body
      const result = await sellService.createSell(sell)
      sendResponse<ISell>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Make a Sale!',
        data: result,
      })
    } catch (error) {
      sendResponse<ISell>(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'An error occurred while creating the Sale.',
        error: (error as Error).message as string,
      })
    }
  },
)

// Get All users
const getSales: RequestHandler = catchAsync(
  async (_req: Request, res: Response) => {
    const sales = await sellService.getSales()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sales retrieved successfully!',
      data: sales,
    })
  },
)
export const SellController = {
  createSell,
  getSales,
}
