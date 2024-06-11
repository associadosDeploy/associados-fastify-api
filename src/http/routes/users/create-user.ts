import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '../../../http/middlewares/auth'
import { prisma } from '../../../lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'
import { hash } from 'bcryptjs'

export async function createUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/users',
      {
        schema: {
          tags: ['users'],
          summary: 'Create a new Users',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
          }),
          response: {
            201: z.object({
              userId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.getCurrentUserId()

        const { name, email, password } = request.body

        const checkUserExists = await prisma.user.findFirst({
          where: { email },
        })

        if (checkUserExists) {
          throw new BadRequestError('Email address already used.')
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        })

        return reply.status(201).send({
          userId: user.id,
        })
      },
    )
}
