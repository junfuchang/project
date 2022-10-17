"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async getArticleList() {
    this.ctx.body = await this.ctx.service.default.getArticleList();
  }
  async getArticleById() {
    let id = this.ctx.params.id;
    this.ctx.body = await this.ctx.service.default.getArticleById(id);
  }
  async getArticleTypes() {
    this.ctx.body = await this.ctx.service.default.getArticleTypes();
  }
  async getListById() {
    let id = this.ctx.params.id;
    this.ctx.body = await this.ctx.service.default.getListById(id);
  }
}

module.exports = HomeController;
