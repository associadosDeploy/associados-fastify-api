import { compare } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../../../lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with password',
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              password: z.string(),
              created_at: z.date(),
              updated_at: z.date(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const userFromEmail = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (!userFromEmail) {
        throw new BadRequestError('Invalid credentials')
      }

      const isPasswordValid = await compare(password, userFromEmail.password)

      if (!isPasswordValid) {
        throw new BadRequestError('Invalid credentials')
      }

      const token = await reply.jwtSign(
        {
          sub: userFromEmail.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(200).send({ user: userFromEmail, token })
    },
  )
}
