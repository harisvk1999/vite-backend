import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.item.upsert({
    update: {},
    where: { id: 1 },
    create: {
      name: "chicken biriyani",
      price: 150,
      ingredients: ["jeerakashala", "chicken"],
    },
  });

  await prisma.item.upsert({
    update: {},
    where: { id: 2 },
    create: {
      name: "beef biriyani",
      price: 150,
      ingredients: ["jeerakashala", "chicken"],
    },
  });

  await prisma.item.upsert({
    update: {},
    where: { id: 3 },
    create: {
      name: "chicken fry",
      price: 150,
      ingredients: ["chilly powder", "chicken"],
    },
  });
}

main()
  .then(async () => {
    console.log("Items seeded successfully");
  })
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
