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
        response: {
          200: z.array(
            z.object({
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
            }),
          ),
        },
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
