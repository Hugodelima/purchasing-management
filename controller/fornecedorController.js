const Fornecedor = require('../models/Fornecedor')

module.exports = class FornecedorController {
	static async listarFornecedores (req, res) {
		const lista_fornecedor = await Fornecedor.findAll({raw:true, order: [['id','ASC']]});
		  res.render("fornecedores", {lista_fornecedor});
	};

	static async cadastrarFornecedorGet   (req, res) {
		res.render("formFornecedor");
	};

	static async cadastrarFornecedorPost  (req,res) {
		const { NOME, RAZAO_SOCIAL, CNPJ, IE_STATUS, IE_NUMERO, CONTR_ICMS, EMAIL, TELEFONE, CEP, ENDERECO, ENDEREDO_NUMERO, BAIRRO } = req.body;
		console.log
		const dadosFornecedor ={
			nome: NOME,
			razaoSocial_forn: RAZAO_SOCIAL,
			cnpj_forn: CNPJ,
			ieStatus_forn: IE_STATUS,
			ieNumero_forn: IE_NUMERO,
			contrIcms_forn: CONTR_ICMS, 
			email_forn: EMAIL,
			telefone_forn: TELEFONE,
			cep_forn: CEP,
			endereco_forn: ENDERECO,
			enderecoNumero_forn: ENDEREDO_NUMERO,
			bairro_forn: BAIRRO
		}
	
		await Fornecedor.create(dadosFornecedor);
		res.redirect("/menu/fornecedores");
	};

	static async alterarFornecedorGet (req, res) {
		const id = (req.params.id)
		const fornecedor = await Fornecedor.findByPk(id, {raw:true})
		if (fornecedor != null){
			res.render("formFornecedor", {fornecedor});
		}else{
			res.redirect("/menu/fornecedores")
		}
		
	};

	static async alterarFornecedorPost (req, res) {
		const id = (req.params.id)
	
	
		const { NOME, RAZAO_SOCIAL, CNPJ, IE_STATUS, IE_NUMERO, CONTR_ICMS, EMAIL, TELEFONE, CEP, ENDERECO, ENDEREDO_NUMERO, BAIRRO } = req.body;
		console.log
		const dadosFornecedor ={
			nome: NOME,
			razaoSocial_forn: RAZAO_SOCIAL,
			cnpj_forn: CNPJ,
			ieStatus_forn: IE_STATUS,
			ieNumero_forn: IE_NUMERO,
			contrIcms_forn: CONTR_ICMS, 
			email_forn: EMAIL,
			telefone_forn: TELEFONE,
			cep_forn: CEP,
			endereco_forn: ENDERECO,
			enderecoNumero_forn: ENDEREDO_NUMERO,
			bairro_forn: BAIRRO
		}
		await Fornecedor.update(dadosFornecedor, {where: {id: id}});
	
		res.redirect("/menu/fornecedores");
	};

	static async buscarFornecedor (req, res) {
		const id = (req.params.id);
		const fornecedor = await Fornecedor.findByPk(id , {raw:true})
		
		res.render("fornecedor", { fornecedor });
	   
	};
	static async removerFornecedor (req, res) {
		const id = (req.params.id)
		await Fornecedor.destroy({where: {id:id}})
		res.redirect("/menu/fornecedores");
		
	};
}











