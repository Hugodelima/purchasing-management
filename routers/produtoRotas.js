

const express = require("express");
const router = express.Router();

const ProdutoController = require("../controller/produtoController");

//Produto -----------------------------------------------------------------------
//Listagem de produtos
router.get("/produtos", ProdutoController.listarProdutos);

//cadastrar produto get
router.get("/produtos/cadastrar", ProdutoController.cadastrarProdutoGet);
//cadastrar produto post
router.post("/produtos/cadastrar", ProdutoController.cadastrarProdutoPost);

//Alterar produto (GET)
router.get("/produtos/alterar/:id", ProdutoController.alterarProdutoGet);

//Alterar produto (POST)
router.post("/produtos/alterar/:id", ProdutoController.alterarProdutoPost);

//Ver produto específico
router.get("/produtos/:id", ProdutoController.buscarProduto);

//Remover produto
router.get("/produtos/remover/:id", ProdutoController.removerProduto);

module.exports = router