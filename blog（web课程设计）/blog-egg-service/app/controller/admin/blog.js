"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async getBlogConfig() {
    this.ctx.body = await this.ctx.service.admin.getBlogConfig();
  }

  async updateBlogConfig() {
    const config = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.admin.updateBlogConfig(config);
  }
}

module.exports = HomeController;
