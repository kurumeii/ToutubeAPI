import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import config from './config/config'
import deserializing from './middlewares/deserializeUser'
import AuthRoute from './modules/auth/auth.route'
import UserRoute from './modules/user/user.route'
import VideoRoute from './modules/videos/video.route'
import { connectToDB, disconnectDB } from './utils/database'
import { Logging } from './utils/logger'

const app: express.Application = express()

const signals = ['SIGTERM', 'SIGINT']
/* Middlewares */
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  })
)
app.use(helmet())
app.use(deserializing)
/* ============== */
/* Routing stuff */
app.use('/api/users', UserRoute)
app.use('/api/auth', AuthRoute)
app.use('/api/videos', VideoRoute)
/* ============= */
const server = app.listen(config.PORT, async () => {
  try {
    Logging.info(`Listening on http://localhost:${config.PORT}`)
    await connectToDB()
  } catch (error) {
    Logging.error(error)
  }
})
function shutDown(signal: string) {
  process.on(signal, async () => {
    Logging.info(signal)
    server.close()
    await disconnectDB()
    process.exit(0)
  })
}

signals.forEach(v => shutDown(v))
