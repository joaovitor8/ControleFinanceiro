import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Iniciando Seed de Cargos...')

  // Criar FREE
  const free = await prisma.roles.upsert({
    where: { name: 'FREE' },
    update: {},
    create: { name: 'FREE' },
  })

  // Criar PREMIUM
  const premium = await prisma.roles.upsert({
    where: { name: 'PREMIUM' },
    update: {},
    create: { name: 'PREMIUM' },
  })

  // Criar ADMIN
  const admin = await prisma.roles.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  })

  console.log('✅ Cargos criados com sucesso:', { free, premium, admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
