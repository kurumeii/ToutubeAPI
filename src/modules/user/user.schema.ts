import { object, string, TypeOf } from 'zod'

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: 'username is required',
    }),
    email: string({
      required_error: 'email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'password is required',
    })
      .min(6, 'Password must be at least 6 characters long')
      .max(30, 'Password should not be longer than 30 characters'),
    confirmPassword: string({
      required_error: 'confirm password again is required',
    }),
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords does not match',
    path: ['confirmPassword'],
  }),
}

export type RegisterUserType = TypeOf<typeof registerUserSchema['body']>
