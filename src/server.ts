import { app } from './http/app'
// import { env } from './env'

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server listening')
  })
