import fastifyCors from '@fastify/cors'
import fastifySwaggerJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'

import { getFreeAssociates } from './routes/free/get-free-associates'
import { getFreeAssociate } from './routes/free/get-free-associate'
import { getFreeCourses } from './routes/free/get-free-courses'
import { getFreeCourse } from './routes/free/get-free-course'
import { createUser } from './routes/users/create-user'
import { env } from '@/env'
import { createCourse } from './routes/courses/create-course'
import { deleteCourse } from './routes/courses/delete-course'
import { getCourseDetail } from './routes/courses/get-course-detail'
import { getCourseFindDetail } from './routes/courses/get-course-find-detail'
import { getCourses } from './routes/courses/get-courses'
import { updateAvatar } from './routes/courses/update-avatar'
import { updateCourse } from './routes/courses/update-course'
import { approveAssociate } from './routes/associates/approve-associate'
import { changeVisibleAssociate } from './routes/associates/change-visible-associate'
import { getAssociateFilter } from './routes/associates/get-associate-filter'
import { getAssociateFindDetail } from './routes/associates/get-associate-find-detail'
import { getAssociateValid } from './routes/associates/get-associate-valid'
import { getAssociates } from './routes/associates/get-associates'
import { updateAssociate } from './routes/associates/update-associate'
import { updateAvatarAssociate } from './routes/associates/update-avatar'
import fastifyMultipart from '@fastify/multipart'
import { createFile } from './routes/files/create-file'
import { createFreeAssociate } from './routes/free/create-free-associate'
export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API APJESC',
      description: 'API in fastify of apjesc',
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

app.register(fastifyMultipart)

app.register(fastifyCors)

app.register(createFreeAssociate)
app.register(getFreeAssociates)
app.register(getFreeAssociate)
app.register(getFreeCourses)
app.register(getFreeCourse)

app.register(authenticateWithPassword)

app.register(createFile)
app.register(createUser)

app.register(createCourse)
app.register(deleteCourse)
app.register(getCourseDetail)
app.register(getCourseFindDetail)
app.register(getCourses)
app.register(updateAvatar)
app.register(updateCourse)

app.register(approveAssociate)
app.register(changeVisibleAssociate)
app.register(getAssociateFilter)
app.register(getAssociateFindDetail)
app.register(getAssociateValid)
app.register(getAssociates)
app.register(updateAssociate)
app.register(updateAvatarAssociate)

// app.listen({ port: env.PORT }).then(() => {
//   console.log('Server is listening on port 3333')
// })
