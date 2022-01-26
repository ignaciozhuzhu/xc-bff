# GraphQL+express+mysql 脚手架项目1.0

## 安装步骤:

1.`npm install`

2.数据库安装及连接

使用`/graphql.sql`安装数据库修改`conf/db.js`

3.启动步骤

`npm start`

4.访问:

`localhost:3003`

通过开发者工具查看相关的接口访问

5.访问调试工具:

`http://localhost:3003/graphql`

6.部分demo query:

query stock {
  stock {
    productList{
      id
      name
      quantity
    }
    city
  }
}

7.文件变动监听热更新工具 supervisor


graphql中文官网 https://graphql.cn/