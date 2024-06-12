import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '../../../http/middlewares/auth'
import { prisma } from '../../../lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'
import { hash } from 'bcryptjs'
import { S3 } from 'aws-sdk'

export async function createFile(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/files',
      {
        schema: {
          tags: ['users'],
          summary: 'Create a new file',
          security: [{ bearerAuth: [] }],
          response: {
            201: z.object({
              path: z.string(),
            }),
            500: z.string()
          },
        },
      },
      async (request, reply) => {
        await request.getCurrentUserId()
        const data = await request.file()

        if (!data) {
          throw new BadRequestError('File not found')
        }

        const s3 = new S3({
          region: process.env.AWS_BUCKET_REGION,
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_KEY,
        })
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: `${new Date().getTime()}-${data.filename}`,
          Body: await data.toBuffer(), // Dados do arquivo
          ContentType: data.mimetype,
        };

        try {
          const uploaded = await s3.upload(params).promise();
          console.log(`Arquivo ${data.filename} enviado para o S3`);

          console.log(uploaded)
          return reply.status(201).send(
            {
              path: uploaded.Location,
            }
          )
        } catch (err) {
          console.error('Erro ao enviar arquivo para o S3:', err);
          reply.code(500).send('Erro ao enviar arquivo para o S3');
          // return;
        }
      },
    )
}
