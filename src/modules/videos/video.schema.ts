import { object, string, TypeOf, boolean } from 'zod'

export const updateVideoSchema = {
  body: object({
    title: string(),
    description: string(),
    isPublished: boolean(),
  }),
  params: object({
    videoId: string(),
  }),
}

export type UpdateVideoBodyType = TypeOf<typeof updateVideoSchema['body']>
export type UpdateVideoParamType = TypeOf<typeof updateVideoSchema['params']>
