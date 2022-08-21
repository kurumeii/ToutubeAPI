import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { User } from '../user/user.model'
import { customAlphabet } from 'nanoid'

const customId = customAlphabet('123456789qwertyuioplkjhgfdsazxcvbnm', 10)
export class Video {
  @prop()
  public title: string

  @prop()
  public description: string

  @prop({ enum: ['mp4', 'mov'] })
  public extension: string

  @prop({ required: true, ref: () => User })
  public owner: Ref<User>

  @prop({ unique: true, default: () => customId() })
  public videoId: string

  @prop({ default: false })
  public isPublished: boolean
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: {
    timestamps: true,
  },
})
