import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Criar o cargo GRATIS
  const free = await prisma.roles.upsert({
    where: { name: 'FREE' },
    update: {},
    create: { name: 'FREE' },
  })

  // 2. Criar o cargo PREMIUM
  const premium = await prisma.roles.upsert({
    where: { name: 'PREMIUM' },
    update: {},
    create: { name: 'PREMIUM' },
  })

  // 3. Criar o cargo ADMIN
  const admin = await prisma.roles.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  })

  console.log({ free, premium, admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
