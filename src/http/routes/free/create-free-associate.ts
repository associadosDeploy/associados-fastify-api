import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../../../lib/prisma'

export async function createFreeAssociate(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/free/associate',
      {
        schema: {
          tags: ['users'],
          summary: 'Create a new Users',
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
          }),
          response: {
            201: z.object({
              userId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        let { oab } = request.body;
        const { state,
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
          acting, } = request.body
        const date = new Date();
        const affiliation = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        if (!oab) {
          oab = '';
        }

        const user = await prisma.associate.create({
          data: {
            oab,
            state,
            city,
            cep,
            cpf,
            affiliation,
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
            valid: 0,
          },
        })

        return reply.status(201).send({
          userId: user.id,
        })
      },
    )
}
