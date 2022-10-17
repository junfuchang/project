let ipUrl = "http://127.0.0.1:7001/default/";
let adminUrl = "http://127.0.0.1:7001/admin/";

let servicePath = {
  getArticleList: ipUrl + "getArticleList", //  首页文章列表接口
  getArticleById: ipUrl + "getArticleById/", // 文章详细页内容接口 ,需要接收参数
  getArticleTypes: ipUrl + "getArticleTypes", // header获取说有的types
  getListById: ipUrl + "getListById/", // 根据类别ID获得文章列表
  getBlogConfig: adminUrl + "getBlogConfig", // 根据类别ID获得文章列表
};
export default servicePath;
