import express from "express";
import LivroController from "../controller/livrosController.js";

export const livroRouter = express.Router();

livroRouter
  .get("", LivroController.listarLivros)
  .get("/busca", LivroController.listarLivrosPorEditora)
  .get("/:id", LivroController.listarLivrosPorId)
  .post("", LivroController.cadastrarLivros)
  .put("/:id", LivroController.atualizarLivros)
  .delete("/:id", LivroController.deleteLivros);
