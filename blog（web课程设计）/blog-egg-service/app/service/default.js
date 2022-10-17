"use strict";

const Service = require("egg").Service;

class Default extends Service {
  async getArticleTypes() {
    const results = await this.app.mysql.select("blog_types");
    return results;
  }

  async getArticleList() {
    let sql =
      "SELECT d.id as id," +
      "d.title as title," +
      "d.introduce as introduce," +
      "d.add_time as addTime," +
      "d.view_count as viewCount ," +
      "t.type_name as typeName " +
      "FROM blog_detail d LEFT JOIN blog_types t ON d.type_id=t.id order by d.id desc";
    const results = await this.app.mysql.query(sql);
    return results;
  }

  async getArticleById(id) {
    let sql =
      "SELECT d.id as id," +
      "d.title as title," +
      "d.content as content," +
      "d.add_time as addTime," +
      "d.view_count as viewCount ," +
      "d.type_id as typeId ," +
      "t.type_name as typeName " +
      `FROM blog_detail d LEFT JOIN blog_types t ON d.type_id = t.id where d.id=${
        id ? id : 1
      }`;
    const result = await this.app.mysql.query(sql);
    if (!result) {
      return [
        {
          id: 0,
          title: "失效页面文章",
          content: "失效内容",
          addTime: new Date().toLocaleDateString(),
          viewCount: 0,
          typeName: "其他",
        },
      ];
    }
    return result;
  }

  async getListById(typeId) {
    let sql =
      "SELECT d.id as id," +
      "d.title as title," +
      "d.introduce as introduce," +
      "d.add_time as addTime," +
      "d.view_count as viewCount ," +
      "t.type_name as typeName " +
      `FROM blog_detail d LEFT JOIN blog_types t ON d.type_id = t.id WHERE d.type_id = ${typeId} order by d.id desc`;

    const results = await this.app.mysql.query(sql);
    return results;
  }
}

module.exports = Default;
