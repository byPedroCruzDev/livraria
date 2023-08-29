import NaoEncontrado from "../errors/NaoEncontrado.js";
import { livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const response = await livros.find().populate("autor").exec();
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };
  static listarLivrosPorId = async (req, res, next) => {
    const { id } = req.params;
    try {
      const response = await livros.findById(id).populate("autor", "nome");
      if (response) {
        res.status(200).send(response);
      } else {
        next(new NaoEncontrado("Id do livro nao encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivros = async (req, res, next) => {
    const livro = new livros(req.body);

    try {
      const cadastroDeLivro = await livro.save();
      res.status(201).send(cadastroDeLivro.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivros = async (req, res, next) => {
    const { id } = req.params;
    const livro = req.body;

    try {
      const response = await livros.findByIdAndUpdate(id, livro);
      if (response) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro nao encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static deleteLivros = async (req, res, next) => {
    const { id } = req.params;
    try {
      const response = await livros.findByIdAndDelete(id);
      if (response) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id nao encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static listarLivrosPorEditora = async (req, res, next) => {
    const editora = req.query.editora;

    try {
      await livros.find({ editora: editora });
      res.status(200).send(livros);
    } catch (err) {
      next(err);
    }
  };
}
export default LivroController;
