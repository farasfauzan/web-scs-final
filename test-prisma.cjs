require('dotenv').config();
const { PrismaClient } = require('./src/generated/prisma');
const p = new PrismaClient();
p.$connect()
  .then(() => {
    console.log('Connected successfully!');
    return p.hero.findMany();
  })
  .then(heroes => {
    console.log('Heroes:', heroes.length);
    return p.$disconnect();
  })
  .then(() => console.log('Disconnected'))
  .catch(e => console.error('Error:', e.message));
