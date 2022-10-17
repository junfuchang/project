"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async getUsers() {
    this.ctx.body = await this.ctx.service.admin.getUsers();
  }
  async judgeUser() {
    const { username, password } = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.admin.judgeUser(username, password);
  }
  async updateUser() {
    const newUser = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.admin.updateUser(newUser);
  }

  async addUser(){
    const newUser = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.admin.addUser(newUser);
  }
  async deleteUser(){
    const {id} = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.admin.deleteUser(id);
  }
}

module.exports = UserController;
