import express from 'express'
import { ProductController } from './product.controller'
const router = express.Router()

// Create a new product
router.post('/', ProductController.createProduct)

// Get Single Product Route
router.get('/:id', ProductController.getSingleProduct)

// Update Product Route
router.patch('/:id', ProductController.updateProduct)

// Delete Product Route
router.delete('/:id', ProductController.deleteProduct)

// Delete Multiple  Product Route
router.post('/delete-selected', ProductController.deleteMultipleProduct)

// Get All Product
router.get('/', ProductController.getAllProduct)

export const ProductRoutes = router
