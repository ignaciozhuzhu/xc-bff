// dao/userSqlMapping.js
// CRUD SQL语句
var user = {

  //product: 'select * from xh_product where dealType=? and isList=? and productId=? and isDelete=0', //已经在graph写好了sql替代


  userbynickNameV: 'select * from zx_user where nickName=? and statusV=1',
  userbynickName: 'select * from zx_user where nickName=? and statusI=1',
  userbyparentid: 'select * from zx_user where parentid=?',
  userlist: 'select * from zx_user',
  userlistbyname: 'select * from zx_user where companyName= ?',
  userlistbynameid:
    'select * from zx_user where companyName= ? and substring(taxID,LENGTH(taxID)-5)= ?', //税号后六位
  userlistbystatusV: 'select * from zx_user where statusV= ?',
  userlistbynamestatus: 'select * from zx_user where companyName= ? and statusV= ?',
  userbyid: 'select * from zx_user where id=?',

  isExistUser: 'select * from zx_user where companyName=? and contactName=?',
  adduser:
    'insert INTO `zx_user`(nickName,contactName,contactPhone,companyName,taxID) VALUES  (?,?,?,?,?);',
  auditv: 'update zx_user set statusV=1 where id=?',
  auditi: 'update zx_user set statusI=1 where id=?',
  updateuserinfo:
    'update zx_user set contactName=?,contactPhone=?,companyName=?,companyAddress=?,companyPhone=?,taxID=?,bank=?,account=?,email=? where id=?',
  addusersub:
    'insert INTO `zx_user`(contactName,contactPhone,companyName,companyAddress,companyPhone,taxID,bank,account,email,parentid) VALUES  (?,?,?,?,?,?,?,?,?,?);',

  invoicelist: 'select * from zx_invoice',
  invoicelistbyname: 'select * from zx_invoice where companyNameSale= ?',
  invoicelistbystatus: 'select * from zx_invoice where status= ?',
  invoicelistbynamestatus: 'select * from zx_invoice where companyNameSale= ? and status= ?',
  invoicebyid: 'select * from zx_invoice where id=?',

  auditinvoice: 'update zx_invoice set status=1 where id=?',
  invoicedetail: 'select * from zx_invoice_detail where parentid=?',

  addinvoice:
    'insert INTO `zx_invoice`(`companyNameBuy`,`companyAddressBuy`,`companyPhoneBuy`,`taxIDBuy`,`bankBuy`,`accountBuy`,`companyNameSale`,`companyAddressSale`,`companyPhoneSale`,`taxIDSale`,`bankSale`,`accountSale`,contactAddress,mailWay,contactName,contactPhone,email,network) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
  addinvoicedetail:
    'insert into zx_invoice_detail(parentid,name,spec,unit,quantity,unitPrice,price,taxPercent,taxPrice) values(?,?,?,?,?,?,?,?,?)',

  reserve: 'select * from zx_reserve',
  addreserve: 'insert INTO `zx_reserve`(nickName,reservetime) VALUES (?,NOW());',
  getuserbyiid:
    'select a.* from zx_user a inner join zx_invoice b on a.companyName=b.companyNameSale where b.id=?',
};

module.exports = user;
