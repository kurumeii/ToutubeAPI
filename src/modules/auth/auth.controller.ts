import { Request, Response } from 'express'
import { findUserByEmail } from '../user/user.service'
import { StatusCodes } from 'http-status-codes'
import { signJwt } from './auth.utils'
import omit from '../../utils/omit'
import { LoginType } from './auth.schema'

export const authLogin = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, LoginType>,
  res: Response
) => {
  const { email, password } = req.body
  const user = await findUserByEmail(email)
  if (!user || !user.comparePw(password))
    return res.status(StatusCodes.UNAUTHORIZED).send('Invalid email or password')

  const payload = omit(user.toJSON(), ['password', '__v'])

  const jwt = signJwt(payload)
  res.cookie('token', jwt, {
    httpOnly: true,
    sameSite: 'strict',
  })
  return res.status(StatusCodes.OK).send(jwt)
}
