import fs from "fs";
import prisma from "../lib/prisma";

async function main() {
  const items = JSON.parse(fs.readFileSync("./src/seed/data.json", "utf8"));

  console.info("Seeding...");

  await prisma.syncRemote.deleteMany().catch((e) => console.log(e));

  await prisma.debtPayment.deleteMany().catch((e) => console.log(e));

  await prisma.settleDebt.deleteMany().catch((e) => console.log(e));

  await prisma.productSale.deleteMany().catch((e) => console.log(e));

  await prisma.ticket.deleteMany().catch((e) => console.log(e));

  await prisma.product
    .deleteMany()
    .then(async () => {
      await prisma.product.createMany({ data: items.products });
    })
    .catch((e) => console.log(e));

  await prisma.client
    .deleteMany()
    .then(async () => {
      await prisma.client.createMany({ data: items.clients });
      // await prisma.ticket.createMany({ data: items.tickets });
      // await prisma.productSale.createMany({ data: items.productSale });
      // await prisma.debtPayment.createMany({ data: items.debtPayment });
    })
    .catch((e) => console.log(e));

  prisma.$disconnect();
  console.info("Completed");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
