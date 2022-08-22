import { Router } from 'express'
import requireUser from '../../middlewares/requireUser'
import { fetchAllVideo, updateVideo, uploadVideo } from './video.controller'
const router = Router()

router.post('/', requireUser, uploadVideo)
router.patch('/:videoId', requireUser, updateVideo)
router.get('/', fetchAllVideo)
export default router
