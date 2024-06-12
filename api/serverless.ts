import * as dotenv from 'dotenv'

// Require the framework
import { app } from '@/http/app'
dotenv.config()

export default async (req: unknown, res: unknown) => {
  await app.ready()
  app.server.emit('request', req, res)
}
