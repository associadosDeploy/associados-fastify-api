import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'
import { S3 } from 'aws-sdk'

export async function updateAvatar(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/courses/avatar/:id',
      {
        schema: {
          tags: ['members'],
          summary: 'Change avatar profile',
          params: z.object({
            id: z.string(),
          }),
          security: [{ bearerAuth: [] }],
          response: {
            204: z.null(),
            500: z.string(),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params
        const data = await request.file()
        if (!data) {
          throw new BadRequestError('File not found')
        }

        const checkCourseExists = await prisma.course.findUnique({
          where: {
            id
          }
        })

        if (!checkCourseExists) {
          throw new BadRequestError('Course not found')
        }

        const s3 = new S3({
          region: process.env.AWS_BUCKET_REGION,
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_KEY,
        })

        try {
          // Fazer upload do novo arquivo
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${new Date().getTime()}-${data.filename}`,
            Body: await data.toBuffer(), // Dados do arquivo
            ContentType: data.mimetype,
          };

          const uploaded = await s3.upload(uploadParams).promise();

          if (uploaded) {
            await prisma.course.update({
              where: {
                id
              },
              data: {
                avatar: uploaded.Location
              }
            })
          }

          reply.status(204).send();
        } catch (error) {
          console.error(error)
          reply.status(500).send('Error uptade avatar');
        }
      },
    )
}
