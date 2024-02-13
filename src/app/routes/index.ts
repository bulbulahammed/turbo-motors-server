import express from 'express'
import { ProductRoutes } from '../modules/products/product.routes'
import { SellRotes } from '../modules/sell/sellRoutes'
import { UserRoutes } from '../modules/users/user.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/sell',
    route: SellRotes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
