"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async addArticle() {
    const newArticle = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.admin.addArticle(newArticle);
  }
  async deleteArticleById() {
    const { id } = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.admin.deleteArticleById(id);
  }
  async updateArticle() {
    const newData = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.admin.updateArticle(newData);
  }
  async getArticleList() {
    this.ctx.body = await this.ctx.service.admin.getArticleList();
  }
  async getArticleBySearch() {
    const tiaojian = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.admin.getArticleBySearch(tiaojian);
  }
}

module.exports = HomeController;
