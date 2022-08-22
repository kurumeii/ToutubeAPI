/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import busboy from 'busboy'
import { Request, Response } from 'express'
import { createWriteStream } from 'fs'
import { StatusCodes } from 'http-status-codes'
import { Document } from 'mongoose'
import { Video } from './video.model'
import { UpdateVideoBodyType, UpdateVideoParamType } from './video.schema'
import { createVideo, findAllVideo, findVideo } from './video.service'

const MIME_TYPES = ['video/mp4']

const getPath = ({
  videoId,
  extension,
}: {
  videoId: Video['videoId']
  extension: Video['extension']
}) => `${process.cwd()}/public/videos/${videoId}.${extension}`

export const uploadVideo = async (req: Request, res: Response) => {
  const bb = busboy({
    headers: req.headers,
  })

  const user: Document = res.locals.user
  const video = await createVideo({ owner: user._id })

  bb.on('file', async (_, file, info) => {
    if (!MIME_TYPES.includes(info.mimeType))
      return res.status(StatusCodes.BAD_REQUEST).send('Invalid file type')
    const ext = info.mimeType.split('/')[1]
    const filePath = getPath({
      videoId: video.videoId,
      extension: ext,
    })

    video.extension = ext
    await video.save()
    const stream = createWriteStream(filePath)
    file.pipe(stream)
  })

  bb.on('close', () => {
    res.writeHead(StatusCodes.CREATED, {
      Connection: 'close',
      'Content-Type': 'application/json',
    })
    res.write(JSON.stringify(video))
    res.end()
  })

  return req.pipe(bb)
}

export const updateVideo = async (
  req: Request<UpdateVideoParamType, Record<string, unknown>, UpdateVideoBodyType>,
  res: Response
) => {
  const { videoId } = req.params
  const { description, title, isPublished } = req.body
  const { _id: userId }: { _id: string } = res.locals.user
  const video = await findVideo(videoId)
  if (!video) return res.status(StatusCodes.NOT_FOUND).send('Video not found')
  if (video.owner?.toString() !== userId)
    return res.status(StatusCodes.UNAUTHORIZED).send('You can only update your videos')
  video.title = title
  video.description = description
  video.isPublished = isPublished

  await video.save()
  return res.status(StatusCodes.OK).send(video)
}

export const fetchAllVideo = async (_, res: Response) => {
  const videos = await findAllVideo()
  return res.status(StatusCodes.OK).send(videos)
}
