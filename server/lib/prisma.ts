import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// Garante que a string de conexão existe
const connectionString = `${process.env.DATABASE_URL}`

// 1. Cria um Pool de conexão nativo
const pool = new Pool({ connectionString })

// 2. Cria o adaptador do Prisma usando esse pool
const adapter = new PrismaPg(pool)

// 3. Exporta o Prisma Client com o adaptador configurado
export const prisma = new PrismaClient({ adapter })
