import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString } from 'graphql';
import { getAllJokes } from './dynamo';
import { Joke } from './types';

const rootQuery = new GraphQLObjectType({
  name: "Jokes",
  description: "Jokes!!!",
  fields: {
    hello: {
      type: GraphQLString,
      resolve () {
        return 'Hello World from GraphQL!'
      }
    },
    allJokes: {
      type: new GraphQLList(Joke),
      description: "List of all Dad Jokes",
      resolve: getAllJokes
    }
  }
});

export const publicSchema = new GraphQLSchema({
  query: rootQuery
});
