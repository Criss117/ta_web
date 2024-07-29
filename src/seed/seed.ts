import fs from "fs";
import prisma from "../lib/prisma";

async function main() {
  const products = JSON.parse(fs.readFileSync("./src/seed/data.json", "utf8"));

  await prisma.product
    .deleteMany()
    .then(async () => {
      await prisma.product.createMany({ data: products });
    })
    .catch((e) => console.log(e))
    .finally(() => prisma.$disconnect());
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
