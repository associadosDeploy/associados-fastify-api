import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function updateAssociate(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/associates/:id',
      {
        schema: {
          tags: ['members'],
          summary: 'Update a course.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string(),
          }),
          body: z.object({
            oab: z.string(),
            state: z.string(),
            city: z.string(),
            cep: z.string(),
            cpf: z.string(),
            birthDate: z.string(),
            name: z.string(),
            rg: z.string(),
            rg_uf: z.string(),
            emissor: z.string(),
            shipping_date: z.string(),
            naturalness: z.string(),
            naturalness_uf: z.string(),
            address: z.string(),
            email_data: z.string(),
            profession: z.string(),
            education: z.string(),
            specialization: z.string(),
            phone: z.string(),
            email_profession: z.string(),
            acting: z.string(),
            valid: z.string(),
            affiliation: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params;
        const userId = await request.getCurrentUserId()
        const { oab,
          state,
          city,
          cep,
          cpf,
          birthDate,
          name,
          rg,
          rg_uf,
          emissor,
          shipping_date,
          naturalness,
          naturalness_uf,
          address,
          email_data,
          profession,
          education,
          specialization,
          phone,
          email_profession,
          acting,
          valid,
          affiliation, } = request.body
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
            oab,
            state,
            city,
            cep,
            cpf,
            birthDate,
            name,
            rg,
            rg_uf,
            emissor,
            shipping_date,
            naturalness,
            naturalness_uf,
            address,
            email_data,
            profession,
            education,
            specialization,
            phone,
            email_profession,
            acting,
            valid: Number(valid),
            affiliation,
            user_id: userId
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
