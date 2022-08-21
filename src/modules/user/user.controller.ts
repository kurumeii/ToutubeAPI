import { Request, Response } from 'express'
import StatusCode from 'http-status-codes'
import { RegisterUserType } from './user.schema'
import { createUser } from './user.service'

export const registerUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, RegisterUserType>,
  res: Response
) => {
  const { username, password, email } = req.body

  try {
    await createUser({ username, password, email })
    res.status(StatusCode.CREATED).send('User has been created')
  } catch (error) {
    if (error.code === 1100) {
      res.status(StatusCode.CONFLICT).send('User already existed')
    }
  }
}
