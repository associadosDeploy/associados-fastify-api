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

import { errorHandler } from './error-handler'

import { authenticateWithPassword } from './routes/auth/authenticate-with-password'

import { getOrganizationBilling } from './routes/billing/get-organization-billing'
import { acceptInvite } from './routes/invites/accept-invite'
import { createInvite } from './routes/invites/create-invite'
import { getInvites } from './routes/invites/get-inivites'
import { getInvite } from './routes/invites/get-invite'
import { getPendingInvites } from './routes/invites/get-pending-invites'
import { rejectInvite } from './routes/invites/reject-invite'
import { revokeInvite } from './routes/invites/revoke-invite'
import { getMembers } from './routes/members/get-member'
import { removeMember } from './routes/members/remove-member'
import { updateMember } from './routes/members/update-member'
import { createOrganization } from './routes/orgs/create-organization'
import { getMembership } from './routes/orgs/get-membership'
import { getOrganization } from './routes/orgs/get-organization'
import { getOrganizations } from './routes/orgs/get-organizations'
import { shutdownOrganization } from './routes/orgs/shutdown-organization'
import { transferOrganization } from './routes/orgs/transfer-organization'
import { updateOrganization } from './routes/orgs/update-organization'
import { createProject } from './routes/projects/create-project'
import { deleteProject } from './routes/projects/delete-project'
import { getProject } from './routes/projects/get-project'
import { getProjects } from './routes/projects/get-projects'
import { updateProject } from './routes/projects/update-project'
import { getFreeAssociates } from './routes/free/get-free-associates'
import { env } from '@/env'
import { getFreeCourses } from './routes/free/get-free-courses'
import { getFreeCourse } from './routes/free/get-free-course'
import { getFreeAssociate } from './routes/free/get-free-associate'
import { createUser } from './routes/users/create-user'

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

// app.register(getProfile)
// app.register(resetPassword)
// app.register(requestPasswordRecover)
// app.register(authenticateWithGithub)
// app.register(authenticateWithPassword)

// app.register(createOrganization)
// app.register(getMembership)
// app.register(getOrganization)
// app.register(getOrganizations)
// app.register(updateOrganization)
// app.register(shutdownOrganization)
// app.register(transferOrganization)

// app.register(createProject)
// app.register(deleteProject)
// app.register(getProject)
// app.register(getProjects)
// app.register(updateProject)

// app.register(getMembers)
// app.register(updateMember)
// app.register(removeMember)

// app.register(createInvite)
// app.register(getInvite)
// app.register(getInvites)
// app.register(acceptInvite)
// app.register(rejectInvite)
// app.register(revokeInvite)
// app.register(getPendingInvites)
// app.register(getOrganizationBilling)

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is listening on port 3333')
})
