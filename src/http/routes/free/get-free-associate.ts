import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'
import { env } from '@/env'
import { BadRequestError } from '../_errors/bad-request-error'

export async function getFreeAssociate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/free/associate/:id',
    {
      schema: {
        tags: ['free'],
        summary: 'Get associate detail',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const checkAssociateExists = await prisma.associate.findUnique({
        where: {
          id,
        },
      })

      if (!checkAssociateExists) {
        throw new BadRequestError('Associate not found')
      }

      return reply.send({
        ...checkAssociateExists,
        avatar: checkAssociateExists.avatar
          ? `${env.APP_URL}/files/${checkAssociateExists.avatar}`
          : null,
      })
    },
  )
}
