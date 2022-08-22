import { Video, VideoModel } from './video.model'

export const createVideo = ({ owner }: { owner: string }) => VideoModel.create({ owner })

export const findVideo = (videoId: Video['videoId']) => VideoModel.findOne({ videoId })

export const findAllVideo = () => VideoModel.find({ isPublished: true }).sort().lean()
