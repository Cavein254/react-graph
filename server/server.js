import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  { id: "1", name: "John Doe", age: "30", isMarried: true },
  { id: "1", name: "Jane Smith", age: "25", isMarried: false },
  { id: "1", name: "Alice Wonder", age: "28", isMarried: false },
];

const typeDefs = `
type Query {
    getUsers: [User]
    getUserById(id:ID!): User
}

type Mutation {
    createUser(input:UserInput): User!
}

type User {
    id:ID
    name: String
    age: Int
    isMarried: Boolean
}

input UserInput {
    name: String!
    age: Int!
    isMarried: Boolean
}
`;

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUserById: (parent, args) => {
      console.log(JSON.stringify(parent));
      return users.find((user) => user.id === args.id);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      console.log(JSON.stringify(parent));
      const { name, age, isMarried } = args.input;
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        isMarried,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.info(`Server running at: ${url}`);
