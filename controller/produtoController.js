const Produto = require('../models/Produto')

module.exports = class ProdutoController{
	static async listarProdutos (req, res) {
		const lista_produto = await Produto.findAll({raw:true, order: [['id','ASC']]});
		  res.render("produtos", {lista_produto});
	};

	static async cadastrarProdutoGet (req, res) {
		res.render("formProduto");
	};

	static async cadastrarProdutoPost (req,res) {
		const { NOME, DESCRICAO, UNIDADE, QUANTIDADE, VALOR } = req.body;

		const dadosProduto ={
			nome: NOME,
			descricao: DESCRICAO,
			unidade: UNIDADE,
			quantidade: QUANTIDADE,
			valor: VALOR
		}
	
		await Produto.create(dadosProduto);
		res.redirect("/menu/produtos");
	};

	static async alterarProdutoGet (req, res) {
		const id = (req.params.id)
		const produto = await Produto.findByPk(id, {raw:true})
		if (produto != null){
			res.render("formProduto", {produto});
		}else{
			res.redirect("/menu/Produtos")
		}
		
	};

	static async alterarProdutoPost (req, res) {
		const id = (req.params.id)
	
	
		const { NOME, DESCRICAO, UNIDADE, QUANTIDADE, VALOR} = req.body;
		console.log
		const dadosProduto ={
			nome: NOME,
			descricao: DESCRICAO,
			unidade: UNIDADE,
			quantidade: QUANTIDADE,
			valor: VALOR
		}
		await Produto.update(dadosProduto, {where: {id: id}});
	
		res.redirect("/menu/produtos");
	};

	static async buscarProduto (req, res) {
		const id = (req.params.id);
		const produto = await Produto.findByPk(id , {raw:true})
		
		res.render("produto", { produto });
	   
	};

	static async removerProduto (req, res) {
		const id = (req.params.id)
		await Produto.destroy({where: {id:id}})
		res.redirect("/menu/produtos");
		
	};
}













