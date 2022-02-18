"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prize extends Model {
    static associate() {}
  }
  Prize.init(
    {
      item: DataTypes.TEXT,
      content: DataTypes.TEXT,
      url: DataTypes.TEXT,
      ratio: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Prize",
    }
  );
  return Prize;
};
