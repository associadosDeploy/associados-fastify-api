import { app } from './http/app'
import { env } from './env'

app
  .listen({
   port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server listening')
  })
