const conn = require("../db/conn");
const { DataTypes } = require("sequelize");
const Compra = require("./Compra");
const Produto = require("./Produto");

const ItemCompra = conn.define("ItemCompra", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  quantidade: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },

  valorUnitario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

// Relacionamento muitos-para-muitos entre Compra e Produto
Compra.belongsToMany(Produto, { through: 'ItemCompra', foreignKey: 'compraId' });
Produto.belongsToMany(Compra, { through: 'ItemCompra', foreignKey: 'produtoId' });

module.exports = ItemCompra;
