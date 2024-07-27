
const express = require("express");
const router = express.Router();

const compraController = require("../controller/compraController");


//Compra -----------------------------------------------------------------------
router.get("/compras", compraController.listarCompras);

//cadastrar compra get
router.get("/compras/cadastrar", compraController.cadastrarCompraGet);

//cadastrar compra post
router.post("/compras/cadastrar", compraController.cadastrarCompraPost);

//alterar compra get
router.get("/compras/alterar/:id", compraController.alterarCompraGet);

//alterar compra post
router.post("/compras/alterar/:id", compraController.alterarCompraPost);

router.get("/compras/:id", compraController.buscarCompra_e_ItemCompra);

router.get("/compras/remover/:id", compraController.removerCompra_e_ItemCompra);

module.exports = router