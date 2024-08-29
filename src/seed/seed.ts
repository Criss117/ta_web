import fs from "fs";
import prisma from "../lib/prisma";

async function main() {
  const items = JSON.parse(fs.readFileSync("./src/seed/data.json", "utf8"));

  console.log("Seeding...");

  await prisma.product
    .deleteMany()
    .then(async () => {
      await prisma.product.createMany({ data: items.products });
    })
    .catch((e) => console.log(e))
    .finally(() => prisma.$disconnect());

  await prisma.client
    .deleteMany()
    .then(async () => {
      await prisma.client.createMany({ data: items.clients });
    })
    .catch((e) => console.log(e))
    .finally(() => prisma.$disconnect());

  console.log("Completed");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
