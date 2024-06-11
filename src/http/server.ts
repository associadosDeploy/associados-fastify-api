import fastifyCors from '@fastify/cors'
import fastifySwaggerJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
// import { env } from '@saas/env'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getFreeAssociates } from './routes/free/get-free-associates'
import { getFreeAssociate } from './routes/free/get-free-associate'
import { getFreeCourses } from './routes/free/get-free-courses'
import { getFreeCourse } from './routes/free/get-free-course'
import { env } from '@/env'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
import { createUser } from './routes/users/create-user'
import { errorHandler } from './error-handler'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API APJESC',
      description: 'Api do apjesc',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  prefix: '/docs',
})

app.register(fastifySwaggerJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(getFreeAssociates)
app.register(getFreeAssociate)
app.register(getFreeCourses)
app.register(getFreeCourse)

app.register(authenticateWithPassword)
app.register(createUser)

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is listening on port 3333')
})
