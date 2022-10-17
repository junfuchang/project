let adminUrl = "http://127.0.0.1:7001/admin/";
let defaultUrl = "http://127.0.0.1:7001/default/";

let servicePath = {
  getUsers: adminUrl + "getUsers",
  judgeUser: adminUrl + "judgeUser", //  判断用户是否有权限
  updateUser: adminUrl + "updateUser", //更改用户信息
  addUser: adminUrl + "addUser",
  deleteUser: adminUrl + "deleteUser",

  getArticleList: adminUrl + "getArticleList", //  首页文章列表接口

  getArticleTypes: defaultUrl + "getArticleTypes", // 获取所有的types
  updateArticle: adminUrl + "updateArticle",
  deleteArticleById: adminUrl + "deleteArticleById",
  getArticleBySearch: adminUrl + "getArticleBySearch",
  addArticle: adminUrl + "addArticle",
  getBlogConfig: adminUrl + "getBlogConfig", //获取博客配置接口
  updateBlogConfig: adminUrl + "updateBlogConfig", //获取博客配置接口
};
export default servicePath;
