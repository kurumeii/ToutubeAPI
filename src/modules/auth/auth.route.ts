import { Router } from 'express'
import { processRequestBody } from 'zod-express-middleware'
import { authLogin } from './auth.controller'
import { loginSchema } from './auth.schema'

const router = Router()
router.post('/', processRequestBody(loginSchema.body), authLogin)

export default router
