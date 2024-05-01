const express = require("express");
const app = express();
const fs = require("fs")
const Handlebars = require("handlebars");
const modificarCNPJ = require('node-cnpj');


app.use(
  express.urlencoded({
    extended: true,
	contextIsolation: false,
  })
);

app.use(express.json());
app.use(express.static('public'))
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");



//função para converter string para a mascara cnpj na pagina fornecedores.handlebars
Handlebars.registerHelper('converterParaCNPJ', function (cnpj) {
	cnpj =  modificarCNPJ.mask(cnpj)
	return cnpj;
});


//função para pegar os dados da API
function pegarDados(caminho){
	const conteudo = fs.readFileSync(caminho, 'utf-8')
	return JSON.parse(conteudo)
}
//função para modificar os dados da API
function modificarDados(caminho,conteudo){
	const arquivoAtualizado = JSON.stringify(conteudo)
	fs.writeFileSync(caminho,arquivoAtualizado,'utf-8')
}

//ID
const atualJSON = pegarDados("./data/fornecedor.json");
let contador = 1;
if (atualJSON.length > 0) {
  const ultimoElemento = atualJSON[atualJSON.length - 1]
  contador = ultimoElemento.ID + 1
}

//Home
app.get("/", (req, res) => {
  res.redirect("/fornecedores");
});

//Cadastro de fornecedor (GET)
app.get("/fornecedores/cadastrar", (req, res) => {
  res.render("formCadastro");
});

//Cadastro de fornecedor (POST)
app.post("/fornecedores/novo", (req, res) => {

	const { NOME, RAZAO_SOCIAL, CNPJ, IE_STATUS, IE_NUMERO, CONTR_ICMS, EMAIL, TELEFONE, CEP, ENDERECO, ENDEREDO_NUMERO, BAIRRO } = req.body;

	var conteudoAtual = pegarDados("./data/fornecedor.json")

	conteudoAtual.push({
	ID: contador++,
	NOME: NOME,
	RAZAO_SOCIAL: RAZAO_SOCIAL,
	CNPJ: modificarCNPJ.unMask(CNPJ),
	IE_STATUS: IE_STATUS === "true" ? true : false,
	IE_NUMERO: IE_NUMERO,
	CONTR_ICMS: CONTR_ICMS === "true" ? true : false,
	EMAIL: EMAIL,
	TELEFONE: TELEFONE,
	CEP: CEP,
	ENDERECO: ENDERECO,
	ENDEREDO_NUMERO: ENDEREDO_NUMERO,
	BAIRRO: BAIRRO
	});

	modificarDados("./data/fornecedor.json",conteudoAtual);
	res.redirect("/fornecedores");
});

//Alterar fornecedor (GET)
app.get("/fornecedores/alterar/:cnpj", (req, res) => {
	const CNPJ = (req.params.cnpj).toString()
	const fornecedor = pegarDados("./data/fornecedor.json").find ((user)=> user.CNPJ === CNPJ)
	res.render("formAlterar", {fornecedor});
});

//Alterar Fornecedor (POST)
app.post("/fornecedores/alterar/:cnpj", (req, res) =>{
	var conteudoAtual = pegarDados("./data/fornecedor.json")
	const fornecedorCNPJantigo = (req.params.cnpj).toString()
	const fornecedorIdentificador = conteudoAtual.find((user) => user.CNPJ === fornecedorCNPJantigo);

	const { NOME, RAZAO_SOCIAL, CNPJ, IE_STATUS, IE_NUMERO, CONTR_ICMS, EMAIL, TELEFONE, CEP, ENDERECO, ENDEREDO_NUMERO, BAIRRO } = req.body;

	
	const indiceObjeto = conteudoAtual.findIndex((user)=> user.CNPJ === fornecedorCNPJantigo)


	const fornecedorAlterado = ({
		ID: fornecedorIdentificador.ID,
		NOME: NOME,
		RAZAO_SOCIAL: RAZAO_SOCIAL,
		CNPJ: CNPJ,
		IE_STATUS: IE_STATUS === "true" ? true : false,
		IE_NUMERO: IE_NUMERO,
		CONTR_ICMS: CONTR_ICMS === "true" ? true : false,
		EMAIL: EMAIL,
		TELEFONE: TELEFONE,
		CEP: CEP,
		ENDERECO: ENDERECO,
		ENDEREDO_NUMERO: ENDEREDO_NUMERO,
		BAIRRO: BAIRRO
	});

	conteudoAtual.splice(indiceObjeto, 1)
	conteudoAtual.splice(indiceObjeto, 0 , fornecedorAlterado)

	modificarDados("./data/fornecedor.json",conteudoAtual)

	res.redirect("/fornecedores");
})

//Remover fornecedor
app.get("/fornecedores/remover/:cnpj", (req, res) =>{
	const CNPJ = (req.params.cnpj).toString()
	const dadosAtual = pegarDados("./data/fornecedor.json")

	const indiceObjeto = dadosAtual.findIndex((user) => user.CNPJ === CNPJ)
	dadosAtual.splice(indiceObjeto, 1)

	modificarDados("./data/fornecedor.json",dadosAtual)
	res.redirect("/fornecedores");
	
})

//Listagem de fornecedores
app.get("/fornecedores", (req, res) => {
	
	const lista_fornecedor = pegarDados('./data/fornecedor.json')
  	res.render("fornecedores", {lista_fornecedor});
});

//Ver fornecedor específico
app.get("/fornecedores/:cnpj", (req, res) => {
   const CNPJ = (req.params.cnpj).toString();
   const fornecedor = pegarDados('./data/fornecedor.json').find((user) => user.CNPJ === CNPJ);
  
   res.render("fornecedor", { fornecedor });
  
});

app.listen(4000, () => {
  console.log(`Server rodando`);
});
