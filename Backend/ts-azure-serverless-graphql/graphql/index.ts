import { AzureFunction } from "@azure/functions"
import { ApolloServer, gql } from "apollo-server-azure-functions";

const typeDefs = gql`
  type Query {
    hello:  String
  }
`;

const resolvers = {
    Query: {
        hello: () => "world",
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const httpTrigger: AzureFunction = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization'
    },
});

export default httpTrigger;