"use strict";

const Service = require("egg").Service;

class Admin extends Service {
  // 获取所有用户
  async getUsers() {
    const results = await this.app.mysql.select("user_table");
    return results;
  }
  // 查询是否存在用户
  async judgeUser(username, password) {
    if (!username || !password) {
      return {
        state: false,
        message: "用户名或密码不能为空!",
      };
    }

    let sql = `select username,password from user_table;`;
    const results = await this.app.mysql.query(sql);
    const result = results.filter(item => item.username === username);
    console.log("results", result);
    if (result.length) {
      if (result[0].password == password) {
        let openId = new Date().getTime();
        this.ctx.session.openId = { openId: openId };
        return {
          state: true,
          message: "登录成功!",
          openId,
        };
      } else {
        return {
          state: false,
          message: "请输入正确的密码!",
        };
      }
    }
    return {
      state: false,
      message: "查无此用户!请联系管理员注册",
    };
  }
  // 修改用户
  async updateUser(newUser) {
    const result = await this.app.mysql.update("user_table", newUser);
    const updateSuccess = result.affectedRows === 1;
    return {
      state: updateSuccess,
    };
  }
  // 增加用户
  async addUser(newUser) {
    const result = await this.app.mysql.insert("user_table", newUser);
    const updateSuccess = result.affectedRows === 1;
    return {
      state: updateSuccess,
    };
  }
  // 删除用户
  async deleteUser(id) {
    const result = await this.app.mysql.delete("user_table", {
      id,
    });
    const updateSuccess = result.affectedRows === 1;
    return {
      state: updateSuccess,
    };
  }

  // 获取全部文章
  async getArticleList() {
    let sql =
      "SELECT d.id as id," +
      "d.title as title," +
      "d.introduce as introduce," +
      "d.add_time as addTime," +
      "d.view_count as viewCount ," +
      "t.type_name as typeName, " +
      "d.content as content " +
      "FROM blog_detail d LEFT JOIN blog_types t ON d.type_id=t.id order by d.id desc";
    const results = await this.app.mysql.query(sql);
    return results;
  }

  //更新文章
  async updateArticle(data) {
    const { id, title, typeName, introduce, content, addTime } = data;

    const newData = {
      id,
      title,
      type_id: typeName,
      introduce: introduce ? introduce : "",
      content: content ? content : "",
      add_time: addTime,
    };
    const result = await this.app.mysql.update("blog_detail", newData);
    const updateSuccess = result.affectedRows === 1;
    return {
      state: updateSuccess,
    };
  }

  //删除文章
  async deleteArticleById(id) {
    const result = await this.app.mysql.delete("blog_detail", {
      id,
    });
    const updateSuccess = result.affectedRows === 1;
    return {
      state: updateSuccess,
    };
  }

  //查询文章
  async getArticleBySearch(record) {
    const { title, content, type_id } = record;
    // 辣鸡玩意儿
    let sql =
      "SELECT d.id as id," +
      "d.title as title," +
      "d.introduce as introduce," +
      "d.add_time as addTime," +
      "d.view_count as viewCount ," +
      "t.type_name as typeName, " +
      "d.content as content " +
      `FROM blog_detail d LEFT JOIN blog_types t ON d.type_id=t.id `;
    if (title || content || type_id) {
      sql += "where ";
    }
    if (title) {
      sql += `d.title like "%${title}%" and `;
    }
    if (content) {
      sql += `d.content like "%${content}%" and `;
    }
    if (type_id) {
      sql += `d.type_id=${type_id}`;
    } else {
      if (title || content || type_id) {
        sql = sql.substring(0, sql.length - 4);
      }
    }
    sql += " order by d.id desc";
    const results = await this.app.mysql.query(sql);
    return results;
  }
  //添加文章
  async addArticle(data) {
    const result = await this.app.mysql.insert("blog_detail", data);
    const insertSuccess = result.affectedRows === 1;
    return {
      state: insertSuccess,
    };
  }

  // 获取博客配置
  async getBlogConfig() {
    const result = await this.app.mysql.get("blog_config", { id: 1 });
    return result;
  }

  //修改博客配置
  async updateBlogConfig(config) {
    let newConfig = { ...config, id: 1 };
    const result = await this.app.mysql.update("blog_config", newConfig);
    const updateSuccess = result.affectedRows === 1;
    return {
      state: updateSuccess,
    };
  }
}
module.exports = Admin;
