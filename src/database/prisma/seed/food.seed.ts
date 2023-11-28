import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const food = await prisma.foods.create({
    data: {
      name: "Chicken Biriyani",
      type: "Non-Veg",
    },
  });

  console.log({ food });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
