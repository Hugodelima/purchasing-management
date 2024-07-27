

const express = require("express");
const router = express.Router();

const itemCompraController = require("../controller/itemCompraController");

//Cadastro de itemCompra (GET)
router.get("/compras/itemcompra/cadastrar/:id", itemCompraController.cadastrarItemCompraGet);

//Cadastro de itemCompra (POST)
router.post("/compras/itemcompra/cadastrar/:id", itemCompraController.cadastrarItemCompraPost);

//remover itemCompra (GET)
router.get("/compras/itemcompra/remover/:id", itemCompraController.removerItemCompra);

module.exports = router