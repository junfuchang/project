module.exports = app => {
  const { router, controller } = app;
  // const checkLogin = app.middleware.checkLogin();
  //用户
  router.get("/admin/getUsers", controller.admin.user.getUsers);
  router.post("/admin/judgeUser", controller.admin.user.judgeUser);
  router.delete("/admin/deleteUser", controller.admin.user.deleteUser);
  router.put("/admin/addUser", controller.admin.user.addUser);
  router.post("/admin/updateUser", controller.admin.user.updateUser);

  //文章
  router.get("/admin/getArticleList", controller.admin.home.getArticleList);
  router.post(
    "/admin/getArticleBySearch",
    controller.admin.home.getArticleBySearch
  );
  router.post("/admin/updateArticle", controller.admin.home.updateArticle);
  router.delete(
    "/admin/deleteArticleById",
    controller.admin.home.deleteArticleById
  );
  router.put("/admin/addArticle", controller.admin.home.addArticle);
  //博客
  router.get("/admin/getBlogConfig", controller.admin.blog.getBlogConfig);
  router.post(
    "/admin/updateBlogConfig",
    controller.admin.blog.updateBlogConfig
  );
};
