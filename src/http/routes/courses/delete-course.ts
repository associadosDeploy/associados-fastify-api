import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function deleteCourse(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/courses/:id',
      {
        schema: {
          tags: ['members'],
          summary: 'Delete course',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params

        const checkCourseExists = await prisma.course.findUnique({
          where: {
            id
          }
        })

        if (!checkCourseExists) {
          throw new BadRequestError('Course not found')
        }

        await prisma.course.delete({
          where: {
            id,
          },
        })

        return reply.status(204).send()
      },
    )
}
