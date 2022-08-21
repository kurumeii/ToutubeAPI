/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Response, Request, NextFunction } from 'express'
import { verifyJwt } from '../modules/auth/auth.utils'

function deserializing(req: Request, res: Response, next: NextFunction) {
  const token: string = (req.headers.authorization || req.cookies.token || '').replace(
    /^Bearer\s/,
    ''
  )
  if (!token) return next()
  const decoded = verifyJwt(token)
  if (decoded) {
    res.locals.user = decoded
  }
  return next()
}

export default deserializing
