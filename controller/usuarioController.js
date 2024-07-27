const Usuario = require("../models/Usuario");

module.exports = class UsuarioController {

  static getFormCadastro(req, res) {
    res.render("formUsuario");
  }

  static async cadastrar(req, res) {
    const dadosUsuario = {
      email: req.body.email,
      password: req.body.senha,
    };

    const usuario = await Usuario.create(dadosUsuario);

    res.send(`Usuário criado com o ID ${usuario.id}!`);
  }

  static async getFormAtualizacao(req, res) {
    const id = parseInt(req.params.id);

    const usuario = await Usuario.findByPk(id, { raw: true });

    if (usuario != null) {
      res.render("formUsuario", { usuario });
    } else {
      res.redirect("/usuarios");
    }
  }

  static async atualizar(req, res) {
    const id = parseInt(req.params.id);

    const dadosUsuario = {
      email: req.body.email,
      password: req.body.senha,
    };

    Usuario.update(dadosUsuario, { where: { id: id } });

    res.redirect("/usuarios");
  }
};