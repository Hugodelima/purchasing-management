
const ItemCompra = require('../models/ItemCompra')
const Produto = require("../models/Produto")
const Compra = require("../models/Compra")

module.exports = class ItemCompraController {
    static async cadastrarItemCompraGet(req,res){
        const id_compra = +req.params.id
        const lista_ItemCompras = await ItemCompra.findAll({raw:true, order: [['id','ASC']], where: {compraId:id_compra}});
        res.render("formItemCompra", {lista_ItemCompras, id_compra})
    }

	static async cadastrarItemCompraPost (req,res) {
        const { id_compra, codigoProduto, quantidadeProduto, valorProduto } = req.body;

        const dadosItemCompra = {
            produtoId: codigoProduto,
            compraId: id_compra,
            quantidade: +quantidadeProduto,
            valorUnitario: +valorProduto
        };

        await ItemCompra.create(dadosItemCompra);

        const produtoEncontrado = await Produto.findByPk(dadosItemCompra.produtoId)
        await Produto.update(
            {
                valor: dadosItemCompra.valorUnitario,
                quantidade: +produtoEncontrado.quantidade + dadosItemCompra.quantidade
            },
            {
                where: {
                  id: produtoEncontrado.id,
                },
            },
        )

        const compraEncontrada = await Compra.findByPk(id_compra)
        await Compra.update(
            {
                quantidadeTotal: +compraEncontrada.quantidadeTotal + dadosItemCompra.quantidade,
                valorTotal: +compraEncontrada.valorTotal + dadosItemCompra.valorUnitario
            },
            {
                where: {
                    id: id_compra
                }
            }
        )


        res.redirect('back');
    }

    static async removerItemCompra (req, res) {
		const id_produto = +(req.params.id)


        const itemCompraEncontrado = await ItemCompra.findOne({where: {produtoId:id_produto}})

        const produtoEncontrado = await Produto.findByPk(id_produto)
        await Produto.update(
            {
                valor: +produtoEncontrado.valor - +itemCompraEncontrado.valorUnitario,
                quantidade: +produtoEncontrado.quantidade - +itemCompraEncontrado.quantidade
            },
            {
                where: {
                  id: id_produto,
                },
            },
        )

        const compraEncontrada = await Compra.findByPk(itemCompraEncontrado.compraId)
        await Compra.update(
            {
                quantidadeTotal: +compraEncontrada.quantidadeTotal - +itemCompraEncontrado.quantidade,
                valorTotal: +compraEncontrada.valorTotal - +itemCompraEncontrado.valorUnitario
            },
            {
                where: {
                    id: compraEncontrada.id
                }
            }
        )
        
		await ItemCompra.destroy({where: {produtoId:id_produto}})
		res.redirect('back');
		
	};

}