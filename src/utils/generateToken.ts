import jwt from 'jsonwebtoken'
import config from '../config'

export const generateToken = (id: string) => {
  return jwt.sign({ id }, config.accessTokenSecret!, {
    expiresIn: '60d',
  })
}
