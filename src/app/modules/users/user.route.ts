import express from 'express'
import { UserController } from './user.controller'
const router = express.Router()

// Register a user
router.post('/sign-up', UserController.signUp)

// Login a user
router.post('/login', UserController.login)

// Get All User
router.get('/', UserController.getAllUsers)

// Get User By ID
router.get('/:id', UserController.getUserById)

export const UserRoutes = router
