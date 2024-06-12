import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '../../../lib/prisma'
import z from 'zod'
import { auth } from '@/http/middlewares/auth'

export async function getAssociateFilter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth).get(
    '/associates/filter',
    {
      schema: {
        tags: ['free'],
        summary: 'Get associate filter details.',
        security: [{ bearerAuth: [] }],
        querystring: z.object({
          visible: z.string(),
          valid: z.string(),
        }),
        response: {
          200: z.array(z.object({
            id: z.string().uuid(),
            name: z.string(),
            rg: z.string(),
            emissor: z.string(),
            rg_uf: z.string(),
            shipping_date: z.string(),
            naturalness: z.string(),
            naturalness_uf: z.string(),
            address: z.string(),
            email_data: z.string(),
            profession: z.string(),
            education: z.string(),
            specialization: z.string(),
            email_profession: z.string(),
            acting: z.string(),
            avatar: z.string().nullable(),
            created_at: z.date(),
            updated_at: z.date(),
            valid: z.number(),
            visible: z.boolean(),
            cpf: z.string(),
            birthDate: z.string(),
            phone: z.string(),
            affiliation: z.string(),
            city: z.string(),
            state: z.string(),
            cep: z.string(),
            oab: z.string(),
          })),
        },
      },
    },
    async (request, reply) => {
      const { visible, valid } = request.query
      const newVisible = Boolean(Number(visible));

      const associates = await prisma.associate.findMany({
        where: {
          valid: Number(valid),
          visible: newVisible
        },
      })

      return reply.send(associates)
    },
  )
}
