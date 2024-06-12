import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function changeVisibleAssociate(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/associates/visible/:id',
      {
        schema: {
          tags: ['members'],
          summary: 'Update a course.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string(),
          }),
          body: z.object({
            visible: z.boolean(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params;
        const { visible } = request.body
        // const avatar = request.file.filename;

        const checkAssociateExists = await prisma.associate.findUnique({
          where: {
            id
          }
        })

        if (!checkAssociateExists) {
          throw new BadRequestError('Associate not found')
        }

        await prisma.associate.update({
          data: {
            ...checkAssociateExists,
            visible
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
