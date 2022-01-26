var {
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

const schema = require('./index');

const Query = new GraphQLObjectType({
  name: 'query',
  //description: '查询',
  fields: () => Object.assign({}, schema.query),
});
const Mutation = new GraphQLObjectType({
  name: 'mutation',
  //description: '修改',
  fields: () => Object.assign({}, schema.mutation),
});
const outSchema = new GraphQLSchema({
  query: Query,
 // mutation: Mutation,
});

module.exports = outSchema;
 
