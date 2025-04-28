import { app } from './http/app'
import { env } from './env'

app
  .listen({
   port: process.env.PORT || 4000,
    host: '0.0.0.0'
  })
  .then(() => {
    console.log('HTTP server listening')
  })
