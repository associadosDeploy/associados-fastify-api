import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'
import { env } from '@/env'

export async function getFreeAssociates(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/free/associate',
    {
      schema: {
        tags: ['free'],
        summary: 'Get all associates',
        querystring: z.object({
          name: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { name } = request.query
      const associates = await prisma.associate.findMany({
        where: {
          name: name ? { contains: name } : undefined,
          visible: true,
          valid: 1,
        },
      })

      const formattedAssociates = associates.map((associate) => {
        return {
          ...associate,
          avatar: associate.avatar
            ? `${env.APP_URL}/files/${associate.avatar}`
            : null,
        }
      })
      return reply.send(formattedAssociates)
    },
  )
}
