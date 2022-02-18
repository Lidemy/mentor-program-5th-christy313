"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate() {}
  }
  Menu.init(
    {
      item: DataTypes.STRING,
      price: DataTypes.INTEGER,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
