"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.User);
    }
  }
  Article.init(
    {
      UserId: DataTypes.INTEGER,
      title: DataTypes.TEXT,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
