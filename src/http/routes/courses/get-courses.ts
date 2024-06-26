import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/lib/prisma'
import { env } from '@/env'
import z from 'zod'
import { auth } from '@/http/middlewares/auth'

export async function getCourses(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth).get(
    '/courses',
    {
      schema: {
        tags: ['free'],
        summary: 'Get all courses',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              link: z.string().url(),
              title: z.string(),
              description: z.string(),
              created_at: z.date(),
              updated_at: z.date(),
              user_id: z.string().nullable(),
              avatar: z.string().nullable(),
            }),
          ),
        },
      },
    },
    async (request, reply) => {
      const courses = await prisma.course.findMany()

      const formattedCourses = courses.map((course) => {
        return {
          ...course,
          avatar: course.avatar
            ? `${env.APP_URL}/files/${course.avatar}`
            : null,
        }
      })
      return reply.send(formattedCourses)
    },
  )
}
