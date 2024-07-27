

const express = require("express");
const router = express.Router();

const FornecedorController = require("../controller/fornecedorController");

//Fornecedor -----------------------------------------------
//Listagem de fornecedores
router.get("/fornecedores", FornecedorController.listarFornecedores)

//Cadastro de fornecedor (GET)
router.get("/fornecedores/cadastrar", FornecedorController.cadastrarFornecedorGet);

//Cadastro de fornecedor (POST)
router.post("/fornecedores/novo", FornecedorController.cadastrarFornecedorPost);

//Alterar fornecedor (GET)
router.get("/fornecedores/alterar/:id", FornecedorController.alterarFornecedorGet);

//Alterar Fornecedor (POST)
router.post("/fornecedores/alterar/:id", FornecedorController.alterarFornecedorPost);

//Ver fornecedor específico
router.get("/fornecedores/:id", FornecedorController.buscarFornecedor);

//Remover fornecedor
router.get("/fornecedores/remover/:id",FornecedorController.removerFornecedor);

module.exports = router