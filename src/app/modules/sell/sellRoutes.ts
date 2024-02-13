import express from 'express'
import { SellController } from './sell.controller'
const router = express.Router()

// Create a new Sell
router.post('/', SellController.createSell)

// Get Sales
router.get('/', SellController.getSales)

export const SellRotes = router
