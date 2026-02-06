import fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'

import { Authenticate } from './authenticate';
import { Expenses } from './expense';


// logger: true faz ele mostrar no terminal quando recebe requisições (útil para debug)
const app = fastify({ logger: true })


// Isso permite que seu Frontend (localhost:3000) consiga acessar este Backend (localhost:3333)
// Sem isso, o navegador bloqueia tudo por segurança.
app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
})


// Registro de Rotas
app.register(Authenticate)
app.register(Expenses)


// Tenta rodar na porta 3333. O host '0.0.0.0' é necessário para o Docker/Render funcionarem bem depois.
const start = async () => {
  try {
    await app.listen({ port: 3333, host: '0.0.0.0' })
    console.log('Rodando projeto: http://localhost:3333')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
