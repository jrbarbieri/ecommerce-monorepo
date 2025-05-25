const { ApolloServer, gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    products: [Product!]!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
    users: [User!]!
  }

  type Query {
    products: [Product!]!
    user(userId: ID!): User!
    product(productId: ID!): Product!
    userProducts(userId: ID!): [Product!]!
  }

  type Mutation {
    createUser(name: String!): User!
    buyProduct(userId: ID!, productId: ID!): Product!
  }
`;

const resolvers = {
  Query: {
    products: async () => {
      return await prisma.product.findMany();
    },
    user: async (_, { userId }) => {
      return await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
    },
    product: async (_, { productId }) => {
      return await prisma.product.findUnique({
        where: { id: parseInt(productId) },
        include: { users: true },
      });
    },
    userProducts: async (_, { userId }) => {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        include: { products: true },
      });
      return user.products;
    },
  },

  Mutation: {
    createUser: async (_, { name }) => {
      return await prisma.user.create({
        data: { name },
      });
    },

    buyProduct: async (_, { userId, productId }) => {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock <= 0) {
        throw new Error("Product out of stock");
      }

      // Decrement stock
      await prisma.product.update({
        where: { id: product.id },
        data: {
          stock: { decrement: 1 },
        },
      });

      // Connect product to user
      await prisma.user.update({
        where: { id: parseInt(userId) },
        data: {
          products: {
            connect: { id: product.id },
          },
        },
      });

      return product;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 GraphQL server ready at ${url}`);
});
