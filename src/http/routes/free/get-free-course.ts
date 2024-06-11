import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '../../../lib/prisma'
import { env } from '../../../env'
import { z } from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'

export async function getFreeCourse(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/free/course/:id',
    {
      schema: {
        tags: ['free'],
        params: z.object({
          id: z.string(),
        }),
        summary: 'Get all courses',
        response: {
          200: z.object({
            id: z.string().uuid(),
            link: z.string().url(),
            title: z.string(),
            description: z.string(),
            created_at: z.date(),
            updated_at: z.date(),
            user_id: z.string().nullable(),
            avatar: z.string().nullable(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const checkCourseExists = await prisma.course.findUnique({
        where: {
          id,
        },
      })

      if (!checkCourseExists) {
        throw new BadRequestError('Course not found')
      }

      return reply.send({
        ...checkCourseExists,
        avatar: checkCourseExists.avatar
          ? `${env.APP_URL}/files/${checkCourseExists.avatar}`
          : null,
      })
    },
  )
}
