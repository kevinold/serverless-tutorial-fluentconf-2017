import { GraphQLObjectType, GraphQLString } from 'graphql';
import { getJokeAuthor } from './dynamo';

export const Author = new GraphQLObjectType({
  name: "Author",
  description: "Author of the joke",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

export const Joke = new GraphQLObjectType({
  name: "Joke",
  description: "The Joke",
  fields: {
    id: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: Author,
      resolve (source) {
        return getJokeAuthor(source.id);
      }
    }
  }
});
