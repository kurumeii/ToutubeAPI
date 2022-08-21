/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import busboy from 'busboy'
import { Request, Response } from 'express'
import { createWriteStream } from 'fs'
import { StatusCodes } from 'http-status-codes'
import { Video } from './video.model'
import { createVideo } from './video.service'

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
  const user = res.locals.user

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
