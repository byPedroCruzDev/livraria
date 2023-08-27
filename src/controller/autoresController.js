import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const response = await autores.find();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    const { id } = req.params;
    try {
      const response = await autores.findById(id);
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(404).send({ menssage: "- id do autor não encontrado " });
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res) => {
    const autor = new autores(req.body);

    try {
      const response = await autor.save();
      res.status(201).send(response.toJSON());
    } catch (err) {
      res
        .status(500)
        .send({ message: `${err.message} - falha ao cadastrar autor` });
    }
  };

  static atualizarAutor = async (req, res) => {
    const { id } = req.params;
    const autor = req.body;

    try {
      await autores.findByIdAndUpdate(id, autor);
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static deleteAutor = async (req, res) => {
    const { id } = req.params;
    try {
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (err) {
      res.status(500).send({ message: err.menssage });
    }
  };
}

export default AutorController;
