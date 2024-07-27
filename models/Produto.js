const conn = require("../db/conn");
const { DataTypes } = require("sequelize");

const Produto = conn.define("Produto", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unidade: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Produto;

