import mongoose from 'mongoose'
import config from '../config/config'
import { Logging } from './logger'

export const connectToDB = async () => {
  try {
    await mongoose.connect(config.CONNECTION)
    Logging.info('Connected to database')
  } catch (error) {
    Logging.error(error)
    process.exit(1)
  }
}

export const disconnectDB = async () => {
  await mongoose.connection.close()
  Logging.info('Disconnected')
  return
}
