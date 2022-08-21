import pino from 'pino'

export const Logging = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
})
