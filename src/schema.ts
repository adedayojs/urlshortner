import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import SampleType from './types/sample';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'The query root of Nert.',
  fields: () => ({
    sample: {
      type: SampleType,
      description: 'A sample root schema',
      resolve: () => 'Hello World',
    },
  }),
});

const schema = new GraphQLSchema({
  query,
});

export default schema;
