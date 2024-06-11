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
        response: {
          200: z.object({
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
        },
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
