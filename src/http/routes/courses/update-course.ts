import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function updateCourse(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/courses/:id',
      {
        schema: {
          tags: ['members'],
          summary: 'Update a course.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string(),
          }),
          body: z.object({
            link: z.string(),
            title: z.string(),
            description: z.string()
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params;
        const userId = await request.getCurrentUserId()
        const { link, title, description } = request.body
        // const avatar = request.file.filename;

        const checkCourseExists = await prisma.course.findUnique({
          where: {
            id
          }
        })

        if (!checkCourseExists) {
          throw new BadRequestError('Course not found')
        }

        await prisma.course.update({
          data: {
            description,
            link,
            title,
            user_id: userId,
            // avatar
          },
          where: {
            id
          }
        })

        return reply.status(204).send()
      },
    )
}
