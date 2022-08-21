import { Router } from 'express'
import requireUser from '../../middlewares/requireUser'
import { uploadVideo } from './video.controller'
const router = Router()

router.post('/', requireUser, uploadVideo)
export default router
