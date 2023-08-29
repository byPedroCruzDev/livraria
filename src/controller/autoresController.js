import { autores } from "../models/index.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const response = await autores.find();

      req.resultado = response;

      next();
    } catch (err) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    const { id } = req.params;
    try {
      const response = await autores.findById(id);
      if (response) {
        res.status(200).send(response);
      } else {
        next(new NaoEncontrado("Id do autor nao encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    const autor = new autores(req.body);

    try {
      const response = await autor.save();
      res.status(201).send(response.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    const { id } = req.params;
    const autor = req.body;

    try {
      const response = await autores.findByIdAndUpdate(id, autor);
      if (response) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do Autor nao localizado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static deleteAutor = async (req, res, next) => {
    const { id } = req.params;
    try {
      const response = await autores.findByIdAndDelete(id);
      if (response) {
        res.status(200).send({ message: "Autor removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do autor nao encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;
