import jwt from 'jsonwebtoken'
import config from '../../config/config'
import { Logging } from '../../utils/logger'

export const signJwt = (payload: string | Buffer | object) => {
  return jwt.sign(payload, config.JWT, {
    expiresIn: config.JWT_EXPIRE,
  })
}

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.JWT)
    return decoded
  } catch (error) {
    return Logging.error(error)
  }
}
