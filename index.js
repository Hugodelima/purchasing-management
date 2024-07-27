require("dotenv").config();
const express = require("express");
const app = express();

const fs = require("fs")

const Handlebars = require("handlebars");

const modificarCNPJ = require('node-cnpj');

const conn = require("./db/conn");

const rotasFornecedores = require("./routers/fornecedorRotas.js");
const rotasProdutos = require ("./routers/produtoRotas.js")
const rotasCompras = require("./routers/compraRotas.js")
const rotasItemCompras = require("./routers/itemComprasRotas.js")
const authRotas = require("./routers/authRotas");

//cokies
const session = require("express-session");
const FileStore = require("session-file-store")(session)
const flash = require("express-flash");

//definicao e copnfiguracao da sessao
app.use(session({
  name:"session",
  secret:"nosso_secret",
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: function () {},
    path: require("path").join(__dirname, "sessions"),
  }),
  cookie: {
    secure: false,
    //maxAge:360000,
    httpOnly:true,

  },
}));

//flash mesages
app.use(flash());

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
});

app.use(
  express.urlencoded({
    extended: true,
	contextIsolation: false,
  })
);

app.use(express.json());
app.use(express.static('public'))
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs.engine({//libera o acesso a propriedades que não são do objeto
  defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set("view engine", "handlebars");



//função para converter string para a mascara cnpj na pagina fornecedores.handlebars
Handlebars.registerHelper('converterParaCNPJ', function (cnpj) {
	cnpj =  modificarCNPJ.mask(cnpj)
	return cnpj;
});

Handlebars.registerHelper('pegarData', function (data) {
  data = data.split('-')
  const dia = data[2]
  const mes = data[1]
  const ano = data[0]
  data = `${dia}/${mes}/${ano}`
	return data
});




//rotas
app.use("/", authRotas);


app.get("/", (req, res) => {
  	res.render("menu");
});

//Home
app.get("/menu", (req, res) => {
	res.render("menu");
});

app.use("/menu", rotasFornecedores);
app.use("/menu", rotasProdutos);
app.use("/menu", rotasCompras);
app.use("/menu", rotasItemCompras)










app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server rodando `);
});

conn
  .sync({})
  .then(() => {
    console.log("Conectado com sucesso!");
  })
  .catch((err) => {
    console.log("Erro: " + err);
  });
