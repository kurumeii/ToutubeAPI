import { Router } from 'express'
import { registerUser } from './user.controller'
import { processRequestBody } from 'zod-express-middleware'
import { registerUserSchema } from './user.schema'
import requireUser from '../../middlewares/requireUser'
const router = Router()

router.get('/', requireUser, (req, res) => {
  return res.send(res.locals.user)
})
router.post('/', processRequestBody(registerUserSchema.body), registerUser)

export default router
