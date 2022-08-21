import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000,
  MONGO_USER: string = process.env.MONGO_USER,
  MONGO_PASSWORD: string = process.env.MONGO_PASSWORD,
  CORS_ORIGIN: string = process.env.CORS_ORIGIN || 'http://localhost:3000',
  JWT: string = process.env.JWT,
  JWT_EXPIRE: string = process.env.JWT_EXPIRE

export default {
  PORT,
  CORS_ORIGIN,
  JWT,
  JWT_EXPIRE,
  CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@youtubeclustor.wuhv7dx.mongodb.net/?retryWrites=true&w=majority`,
}
