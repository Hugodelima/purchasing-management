const Compra = require('../models/Compra')
const ItemCompra = require('../models/ItemCompra')

exports.listarCompras = async (req, res) => {
	const lista_Compra = await Compra.findAll({raw:true, order: [['id','ASC']]});
  	res.render("compras", {lista_Compra});
};

exports.cadastrarCompraGet = async (req, res) => {
	res.render("formCompra");
};

exports.cadastrarCompraPost = async (req,res) =>{
	const {data, fornecedorId } = req.body;

	const dadosCompra ={
		quantidadeTotal: 0,
		valorTotal: 0,
		dataCompra: data,
        fornecedorId: fornecedorId,
	}
	await Compra.create(dadosCompra)


	res.redirect("/menu/compras");
};

exports.alterarCompraGet = async(req, res) => {
	const id = (req.params.id)
	const compra = await Compra.findByPk(id, {raw:true})
	if (compra != null){
		res.render("formCompra", {compra});
	}else{
		res.redirect("/menu/Produtos")
	}
	
};

exports.alterarCompraPost = async (req, res) =>{
	const id = (req.params.id)


	const { fornecedorId, data } = req.body;
	const dadosCompra ={
		fornecedorId: fornecedorId,
		dataCompra: data,
	}
	await Compra.update(dadosCompra, {where: {id: id}});

	res.redirect("/menu/compras");
};

exports.buscarCompra_e_ItemCompra = async (req, res) => {
	const id_compra = +(req.params.id);
	const compra = await Compra.findByPk(id_compra, {raw:true})
	const lista_ItemCompras = await ItemCompra.findAll({where: {compraId:id_compra}})
	
	res.render("compra", { compra,lista_ItemCompras });
   
};

 exports.removerCompra_e_ItemCompra = async(req, res) =>{
	const id = +(req.params.id)
	await Compra.destroy({where: {id:id}})
	await ItemCompra.destroy({where: {compraId:id}})
	res.redirect("/menu/compras");
	
};