const conn = require("../db/conn");
const { DataTypes } = require("sequelize");

const Usuario = conn.define("Usuario", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Usuario;