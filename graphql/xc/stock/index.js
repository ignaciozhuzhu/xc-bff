var util = require('../../../util/util');

var {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLUnionType,
  GraphQLBoolean,
} = require('graphql');

// 定义schema及resolver
const StockList = new GraphQLObjectType({
  name: 'StockList',
  //description: '反馈类',
  fields: () => {
    return {
      id: { type: GraphQLInt }, 
      quantity: { type: GraphQLInt }, 
    };
  },
});
// 定义schema及resolver
const ProductList = new GraphQLObjectType({
  name: 'ProductList',
  //description: '反馈类',
  fields: () => {
    return {
      id: { type: GraphQLInt }, 
      name:{ type: GraphQLString },
      quantity: { type: GraphQLInt }, 
    };
  },
});

// 定义schema及resolver
const Order = new GraphQLObjectType({
  name: 'Order',
  //description: '反馈类',
  fields: () => {
    return {
      productList: { type: new GraphQLList(ProductList) }, 
      city: {type: GraphQLString}
    };
  },
});

module.exports = {
  query: {
    stock: {
      type: Order,
      //description: '获取反馈列表',
      // args: {
      //   name: { type: GraphQLString },
      //   id: { type: GraphQLInt },
      // },
      resolve: async (source) => {
        const result = await util.searchByApi();
        console.log(11,result)

        return result;
      },
    },
  },
};
