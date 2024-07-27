const conn = require("../db/conn");
const { DataTypes } = require("sequelize");

const Fornecedor = conn.define("Fornecedor", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  razaoSocial_forn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj_forn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ieStatus_forn: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  ieNumero_forn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contrIcms_forn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  email_forn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone_forn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep_forn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco_forn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  enderecoNumero_forn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bairro_forn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = Fornecedor;