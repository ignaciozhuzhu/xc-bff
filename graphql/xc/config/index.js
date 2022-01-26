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
const LoginModule = new GraphQLObjectType({
  name: 'LoginModule',
  //description: '反馈类',
  fields: () => {
    return {
      w: { type: GraphQLString }, 
      h: { type: GraphQLString }, 
      backgroundImageUrl: { type: GraphQLString }, 
    };
  },
});

// 定义schema及resolver
const SiderMenuModule = new GraphQLObjectType({
  name: 'SiderMenuModule',
  //description: '反馈类',
  fields: () => {
    return {
      logoStyles: { type: LogoStyles }, 
    };
  },
});
// 定义schema及resolver
const LogoStyles = new GraphQLObjectType({
  name: 'LogoStyles',
  //description: '反馈类',
  fields: () => {
    return {
      width: { type: GraphQLString }, 
      height: { type: GraphQLString }, 
      marginTop: { type: GraphQLString }, 
    };
  },
});
// 定义schema及resolver
const Branding = new GraphQLObjectType({
  name: 'Branding',
  //description: '反馈类',
  fields: () => {
    return {
      stickerImages: { type: new GraphQLList(GraphQLString) }, 
      tapsImages: { type: new GraphQLList(GraphQLString) }, 
    };
  },
});

// 定义schema及resolver
const Icons = new GraphQLObjectType({
  name: 'Icons',
  description: '反馈22222类',
  fields: () => {
    return {
      //id: { type: GraphQLInt }, 
      editB: { type: GraphQLString }, 
      addB: { type: GraphQLString }, 
    };
  },
});

// 定义schema及resolver
const Config = new GraphQLObjectType({
  name: 'Config',
  //description: '反馈类',
  fields: () => {
    return {
      id: { type: GraphQLInt }, 
      name: { type: GraphQLString }, 
      platform: { type: GraphQLString }, 
      appName: { type: GraphQLString }, 
      scriptUrl: { type: GraphQLString }, 
      GlobalSwitchIconNormal: { type: GraphQLString }, 
      GlobalSwitchIconHover: { type: GraphQLString }, 
      url: { type: GraphQLString }, 
      devUrl: { type: GraphQLString }, 
      publicPath: { type: GraphQLString }, 
      primaryColor: { type: GraphQLString }, 
      primaryHoverBackgroundColor: { type: GraphQLString }, 
      navBackgroundColor: { type: GraphQLString }, 
      navItemColor: { type: GraphQLString }, 
      navItemOnColor: { type: GraphQLString }, 
      navItemBackgroundColor: { type: GraphQLString }, 
      productCardSelectedBorderColor: { type: GraphQLString }, 
      sourcingListMessageBackgroundColor: { type: GraphQLString }, 
      assetsDirectory: { type: GraphQLString }, 
      loginModule: { type: LoginModule }, 
      siderMenuModule: { type: SiderMenuModule }, 
      branding: { type: Branding }, 
      icons: { type: Icons }, 
      favicon: { type: GraphQLString }, 
      intercom: { type: GraphQLBoolean }, 
      HomePath: { type: GraphQLString }, 
      chromeExtensionEnable: { type: GraphQLBoolean },  
      AEPlatformEnable: { type: GraphQLBoolean },  
      TopdserOfficialWebsiteEnable: { type: GraphQLBoolean }, 
    };
  },
});
module.exports = {
  query: {
    config: {
      type: Config,
      //description: '获取反馈列表',
      args: {
        name: { type: GraphQLString },
        id: { type: GraphQLInt },
      },
      resolve: async (source, { name, id }) => {
        let sql=`select * from t_config `
        if(util.isValue(name))
          sql+=` where name like'%${name}%'`
        let result = await util.searchSql(sql);

        let sqlLoginModule=`select * from t_loginModule where id = ${result[0].id}`
        let resultLoginModule = await util.searchSql(sqlLoginModule);

        let sqlSiderMenuModule=`select * from t_logoStyles where id = ${result[0].id}`
        let resuSiderMenuModule = await util.searchSql(sqlSiderMenuModule);

        let sqlBranding=`select * from t_branding where brandId = ${result[0].id}`
        let resultBranding = await util.searchSql(sqlBranding);


        let sqlIcons=`select * from t_icons where id = ${result[0].id}`
        let resultIcons = await util.searchSql(sqlIcons);

        result[0].loginModule=resultLoginModule[0]
        result[0].siderMenuModule={logoStyles:resuSiderMenuModule[0]}
        result[0].branding={stickerImages: [
        'https://cdn.image.kfbuy.com/kfbuy1612170426490.jpg',
        'https://cdn.image.kfbuy.com/kfbuy1612170443340.jpg',
        'https://cdn.image.kfbuy.com/kfbuy1612170464993.jpg',
        'https://cdn.image.kfbuy.com/kfbuy1612170479295.jpg'
      ],
      tapsImages: [
        'https://cdn.image.kfbuy.com/kfbuy1612170297524.jpg',
        'https://cdn.image.kfbuy.com/kfbuy1612170344956.jpg',
        'https://cdn.image.kfbuy.com/kfbuy1612170362070.jpg'
      ]}
        result[0].icons=resultIcons[0]

        return result[0];
      },
    },
    configList: {
      type: new GraphQLList(Config),
      //description: '获取反馈列表',
      args: {
        name: { type: GraphQLString },
        id: { type: GraphQLInt },
      },
      resolve: async (source, { name, id }) => {
        let sql=`select * from t_config `
        if(util.isValue(name))
          sql+=` where name like'%${name}%'`
        //sql+=` order by id desc`
        let result = await util.searchSql(sql);
        return result;
      },
    },
  },
  mutation: {
    addconfig: {
      type: Config,
      description: '添加反馈',
      args: {
        id: { type: GraphQLInt }, 
        content: { type: GraphQLString }, 
      },
      resolve: async (source, { id, content }) => {
        let sql =`INSERT INTO xh_config(content) VALUES('${content?content:''}')`
        //console.log(5,sql)
        let result = await util.searchSql(sql);
        return result;
      },
    },
  },
};
