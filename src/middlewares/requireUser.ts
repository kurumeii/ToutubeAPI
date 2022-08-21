import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
function requireUser(req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user: object = res.locals.user
  if (!user) return res.sendStatus(StatusCodes.FORBIDDEN)
  return next()
}

export default requireUser
