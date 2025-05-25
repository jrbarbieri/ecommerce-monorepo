const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = [
    { name: 'Football', price: 30, stock: 10 },
    { name: 'Basketball', price: 25, stock: 8 },
    { name: 'Tennis Racket', price: 120, stock: 5 },
    { name: 'Running Shoes', price: 80, stock: 15 },
    { name: 'Cycling Helmet', price: 60, stock: 7 },
    { name: 'Yoga Mat', price: 20, stock: 12 },
    { name: 'Baseball Glove', price: 50, stock: 4 },
    { name: 'Swimming Goggles', price: 15, stock: 20 },
    { name: 'Boxing Gloves', price: 35, stock: 6 },
    { name: 'Golf Clubs Set', price: 250, stock: 3 }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());