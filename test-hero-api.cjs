const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log("=== Testing: No filter ===");
    const all = await p.hero.findMany();
    console.log("Count:", all.length);
    console.log("First hero:", JSON.stringify(all[0], null, 2));
    
    console.log("\n=== Testing: page=HOME ===");
    const filtered = await p.hero.findMany({ where: { page: "HOME" } });
    console.log("Count:", filtered.length);
    
    console.log("\n=== Testing: page=ABOUT ===");
    const about = await p.hero.findMany({ where: { page: "ABOUT" } });
    console.log("Count:", about.length);
    
    console.log("\n=== Success! ===");
  } catch (e) {
    console.error("ERROR:", e.message);
    if (e.meta) console.error("Meta:", JSON.stringify(e.meta));
  } finally {
    await p.$disconnect();
  }
}

main();
