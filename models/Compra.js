const conn = require("../db/conn");
const { DataTypes } = require("sequelize");
const Fornecedor = require("./Fornecedor");

const Compra = conn.define("Compra", {
  quantidadeTotal: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  valorTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dataCompra: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  
});

Fornecedor.hasMany(Compra, { foreignKey: 'fornecedorId' });
Compra.belongsTo(Fornecedor, { foreignKey: 'fornecedorId' });

module.exports = Compra;