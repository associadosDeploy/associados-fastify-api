import { app } from './http/app'
import { env } from './env'

function init() {
  return app;
}

if (require.main === module) {
  init().listen({ port: env.PORT }).then(() => {
    console.log('HTTP server listening')
  })
} else {
  // required as a module => executed on aws lambda
  module.exports = init;
}