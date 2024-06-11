const fastify = require('fastify')
const app = require('./build/app') // Importe o arquivo principal da sua aplicação Fastify

// Crie uma instância Fastify
const server = fastify({ logger: true })

// Registre sua aplicação Fastify
server.register(app)

// Exporte a instância Fastify para uso como função serverless
module.exports = server
