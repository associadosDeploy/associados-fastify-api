import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function createCourse(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/courses',
      {
        schema: {
          tags: ['members'],
          summary: 'Create a new course',
          security: [{ bearerAuth: [] }],
          body: z.object({
            link: z.string(),
            title: z.string(),
            description: z.string(),
            avatar: z.string()
          }),
          response: {
            204: z.object({
              courseId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { link, title, description, avatar } = request.body

        const course = await prisma.course.create({
          data: {
            description,
            link,
            title,
            user_id: userId,
            avatar
          }
        })

        return reply.status(204).send(
          { courseId: course.id }
        )
      },
    )
}
