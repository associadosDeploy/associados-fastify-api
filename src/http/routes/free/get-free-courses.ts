import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/lib/prisma'
import { env } from '@/env'

export async function getFreeCourses(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/free/course',
    {
      schema: {
        tags: ['free'],
        summary: 'Get all courses',
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
